const { getAuth, clerkClient } = require("@clerk/express");
const prisma = require("../config/prisma");

// 1. First, require authentication via Clerk
const protectClerk = (req, res, next) => {
    const auth = getAuth(req);
    console.log("protectClerk: getAuth(req) returned:", auth);
    if (!auth || !auth.userId) {
        return res.status(401).json({ message: "Not authenticated via Clerk", auth });
    }
    req.auth = auth; // Attach for the next middleware
    next();
};

// 2. Second, attach our local Prisma user
const attachLocalUser = async (req, res, next) => {
    try {
        // Clerk attaches req.auth which contains userId (Clerk ID)
        console.log("Clerk Auth Object:", req.auth);
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        let user = await prisma.user.findUnique({ where: { clerkId: req.auth.userId } });
        
        // Lazy creation or linking for local development when webhooks aren't reachable
        if (!user) {
            try {
                const clerkUser = await clerkClient.users.getUser(req.auth.userId);
                const email = clerkUser.emailAddresses[0]?.emailAddress;
                const name = clerkUser.firstName + (clerkUser.lastName ? ` ${clerkUser.lastName}` : "");
                
                if (email) {
                    user = await prisma.user.findUnique({ where: { email } });
                }
                
                if (user) {
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { clerkId: req.auth.userId }
                    });
                    console.log("Linked existing DB user to Clerk ID:", user.email);
                } else {
                    user = await prisma.user.create({
                        data: {
                            clerkId: req.auth.userId,
                            email: email || "unknown@example.com",
                            name: name || "User",
                            role: "user"
                        }
                    });
                    console.log("Lazily created user in DB:", user.email);
                }
            } catch (err) {
                console.error("Failed to fetch user from Clerk for lazy creation", err);
                return res.status(404).json({ message: "User not found in local DB" });
            }
        }

        // Attach local DB id to req.userId so existing controllers work
        req.userId = user.id;
        req.userRole = user.role;
        next();
    } catch (error) {
        console.error("Error attaching local user:", error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

const protect = [protectClerk, attachLocalUser];

const admin = async (req, res, next) => {
    try {
        if (req.userRole === "admin") {
            next();
        } else {
            res.status(403).json({ message: "Not authorized as admin" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error checking admin status" });
    }
};

module.exports = { protect, admin };
