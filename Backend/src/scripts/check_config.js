require("dotenv/config");

const key = process.env.RAZORPAY_KEY_ID || "";
console.log("CWD:", process.cwd());
console.log(`Key Length: ${key.length}`);
console.log(`Key Preview: ${key.substring(0, 10)}... (ends with ${key.substring(key.length - 3)})`);

(async () => {
    try {
        require("../controllers/order");
        console.log("Razorpay initialized successfully (Import passed).");
    } catch (error) {
        console.error("FATAL ERROR during Import:", error);
        process.exit(1);
    }
})();
