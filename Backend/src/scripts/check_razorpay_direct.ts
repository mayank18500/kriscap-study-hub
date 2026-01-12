import "dotenv/config";
import Razorpay from "razorpay";

const key = process.env.RAZORPAY_KEY_ID || "";
const secret = process.env.RAZORPAY_KEY_SECRET || "fallback";

console.log("Checking Razorpay Direct...");
console.log(`Key: ${key ? key.length : "MISSING"}`);

try {
    const r = new Razorpay({
        key_id: key,
        key_secret: secret
    });
    console.log("Razorpay Initialized DIRECTLY successfully!");
} catch (e) {
    console.error("Razorpay Direct Init FAILED:", (e as Error).message);
    process.exit(1);
}
