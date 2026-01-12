import crypto from 'crypto';

const API_URL = "http://127.0.0.1:5001";

// Helper to handle cookies and tokens
let clientCookie = "";
let clientToken = "";
let adminCookie = "";
let adminToken = "";

const login = async (email: string, password: string, role: string) => {
    console.log(`Logging in as ${role} (${email})...`);
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error(`Login failed for ${role}: ${res.statusText}`);

    const cookie = res.headers.get("set-cookie");
    if (cookie) {
        const cookieVal = cookie.split(';')[0];
        const tokenVal = cookieVal.split('=')[1];
        if (role === "client") {
            clientCookie = cookieVal;
            clientToken = tokenVal;
        } else {
            adminCookie = cookieVal;
            adminToken = tokenVal;
        }
    }
    console.log(`Login successful for ${role}`);
};

const getProducts = async () => {
    console.log("Fetching products...");
    const res = await fetch(`${API_URL}/api/products`);
    const products = await res.json();
    console.log(`Found ${products.length} products`);
    return products.find((p: any) => p.type === "TMA"); // Find a TMA product for instant completion
};

const createOrder = async (productId: string) => {
    console.log(`Creating order for product ${productId}...`);
    const res = await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": clientCookie,
            "Authorization": `Bearer ${clientToken}`
        },
        body: JSON.stringify({ productId })
    });

    if (!res.ok) throw new Error(`Create order failed: ${res.statusText}`);
    const data = await res.json();
    console.log(`Order created. Internal ID: ${data.orderId}, Razorpay ID: ${data.id}`);
    return data;
};

const verifyPayment = async (razorpayOrderId: string, internalOrderId: string) => {
    console.log("Simulating Payment Verification...");
    const fakePaymentId = "pay_mock_" + Date.now();
    const secret = "n08kDk8roMJd4hP69FVNDQaw"; // Matches .env

    const body = razorpayOrderId + "|" + fakePaymentId;
    const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    const res = await fetch(`${API_URL}/api/payments/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": clientCookie,
            "Authorization": `Bearer ${clientToken}`
        },
        body: JSON.stringify({
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: fakePaymentId,
            razorpay_signature: signature
        })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error(`Status: ${res.status}`);
        console.error(`Response: ${err}`);
        throw new Error(`Payment verification failed: ${err}`);
    }
    console.log("Payment verified successfully.");
    return fakePaymentId;
};

const checkMyOrders = async (orderId: string) => {
    console.log("Checking Client Orders...");
    const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: {
            "Cookie": clientCookie,
            "Authorization": `Bearer ${clientToken}`
        }
    });
    const orders = await res.json();
    const order = orders.find((o: any) => o.id === orderId);

    if (!order) throw new Error("Order not found in client history");
    console.log(`Order found: Status = ${order.status}`);
    if (order.status !== "Completed") throw new Error("Order status is not Completed");
};

const checkAdminOrders = async (orderId: string) => {
    console.log("Checking Admin Orders...");
    const res = await fetch(`${API_URL}/api/admin/orders`, {
        headers: {
            "Cookie": adminCookie,
            "Authorization": `Bearer ${adminToken}`
        }
    });
    const orders = await res.json();
    const order = orders.find((o: any) => o.id === orderId);

    if (!order) throw new Error("Order not found in Admin Panel");
    console.log(`Admin sees order: Status = ${order.status}, Amount = ${order.amount}`);
};

const checkAdminPayments = async (paymentId: string) => {
    console.log("Checking Admin Payments...");
    const res = await fetch(`${API_URL}/api/admin/payments`, {
        headers: {
            "Cookie": adminCookie,
            "Authorization": `Bearer ${adminToken}`
        }
    });
    const payments = await res.json();
    const payment = payments.find((p: any) => p.id === paymentId);

    if (!payment) throw new Error("Payment not found in Admin Panel");
    console.log(`Admin sees payment: Amount = ${payment.amount}`);
};

const run = async () => {
    try {
        await login("client@test.com", "password123", "client");
        await login("admin@kriscap.com", "password123", "admin");

        const product = await getProducts();
        if (!product) throw new Error("No TMA product found");

        const orderData = await createOrder(product._id || product.id);
        const paymentId = await verifyPayment(orderData.id, orderData.orderId);

        await checkMyOrders(orderData.orderId);
        await checkAdminOrders(orderData.orderId);
        await checkAdminPayments(paymentId);

        console.log("✅ Verification SUCCESS: End-to-End Purchase Flow checks out!");
    } catch (error) {
        console.error("❌ Verification FAILED:", error);
        process.exit(1);
    }
};

run();
