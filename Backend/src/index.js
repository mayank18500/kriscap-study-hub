const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const app = require("./app");
const config = require("./config/env");

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
mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        server.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

module.exports = { io };
