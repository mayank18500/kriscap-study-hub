const express = require("express");
const router = express.Router();
const { Webhook } = require("svix");
const prisma = require("../config/prisma");

// Webhook endpoint needs raw body
router.post(
    "/clerk",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const payload = req.body;
        const headers = req.headers;

        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("Missing CLERK_WEBHOOK_SECRET");
            return res.status(500).json({ error: "Server Configuration Error" });
        }

        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ error: "Missing svix headers" });
        }

        const wh = new Webhook(webhookSecret);
        let evt;

        try {
            evt = wh.verify(payload, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.error("Webhook signature verification failed.", err);
            return res.status(400).json({ error: "Invalid signature" });
        }

        const { id, ...attributes } = evt.data;
        const eventType = evt.type;

        try {
            if (eventType === "user.created") {
                const email = attributes.email_addresses?.[0]?.email_address;
                const name = attributes.first_name + (attributes.last_name ? ` ${attributes.last_name}` : "");

                await prisma.user.create({
                    data: {
                        clerkId: id,
                        email,
                        name: name || "User",
                        role: "user"
                    }
                });
                console.log(`User created: ${id}`);
            } else if (eventType === "user.updated") {
                const email = attributes.email_addresses?.[0]?.email_address;
                const name = attributes.first_name + (attributes.last_name ? ` ${attributes.last_name}` : "");

                await prisma.user.update({
                    where: { clerkId: id },
                    data: { email, name: name || "User" }
                });
                console.log(`User updated: ${id}`);
            } else if (eventType === "user.deleted") {
                await prisma.user.delete({ where: { clerkId: id } });
                console.log(`User deleted: ${id}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error processing webhook:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;
