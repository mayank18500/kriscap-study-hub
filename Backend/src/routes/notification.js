const express = require("express");

const router = express.Router();

router.get("/unread-count", (req, res) => {
    // Mock for now, or implement real DB count
    res.json({ count: 2 });
});

module.exports = router;
