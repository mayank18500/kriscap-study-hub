const http = require("http");
const { Server } = require("socket.io");
// Load environment variables FIRST before importing app which relies on them
const config = require("./config/env");
const app = require("./app");

const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
    cors: {
        origin: config.ALLOWED_ORIGINS,
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

// Database Connection & Server Start
const prisma = require("./config/prisma");

prisma.$connect()
    .then(() => {
        console.log("Connected to PostgreSQL via Prisma");
        server.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((err) => {
        console.error("PostgreSQL connection error:", err);
    });

module.exports = { io };
