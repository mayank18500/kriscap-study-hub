const axios = require('axios');

const URL = 'http://127.0.0.1:5000';
const ADMIN_EMAIL = 'admin@kriscap.com';
const ADMIN_PASSWORD = 'password123';

async function verifyBackend() {
    try {
        console.log("1. Logging in as Admin...");
        const loginRes = await axios.post(`${URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        // Extract token from Set-Cookie
        const cookies = loginRes.headers['set-cookie'];
        let token;
        if (cookies) {
            const tokenCookie = cookies.find(c => c.startsWith('token='));
            if (tokenCookie) {
                token = tokenCookie.split(';')[0].split('=')[1];
            }
        }
        console.log("   Login successful.");
        console.log("   Token exists:", !!token);

        const headers = { Authorization: `Bearer ${token}` };

        console.log("1.5 Checking User Role...");
        const meRes = await axios.get(`${URL}/auth/me`, { headers });
        console.log("    User Role:", meRes.data.role);

        console.log("2. Creating TMA Product with HANDWRITTEN category...");
        const productData = {
            name: "Test Backend Verification TMA",
            description: "A test file",
            price: 100,
            type: "TMA",
            class: "12",
            medium: "English",
            category: "HANDWRITTEN",
            fileUrl: "http://example.com/test.pdf"
        };

        const createRes = await axios.post(`${URL}/api/admin/products`, productData, { headers });
        const productId = createRes.data._id;
        console.log(`   Product created. ID: ${productId}`);

        console.log("3. Verifying Category is persisted...");
        const getRes = await axios.get(`${URL}/api/admin/products`, { headers });
        const createdProduct = getRes.data.find(p => p.id === productId || p._id === productId);

        if (createdProduct && createdProduct.category === "HANDWRITTEN") {
            console.log("   SUCCESS: Category 'HANDWRITTEN' found on created product.");
        } else {
            console.error("   FAILURE: Category mismatch or product not found.", createdProduct);
            process.exit(1);
        }

        console.log("4. Cleaning up (Deleting Product)...");
        await axios.delete(`${URL}/api/admin/products/${productId}`, { headers });
        console.log("   Cleanup successful.");

    } catch (error) {
        console.error("Verification Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }
        process.exit(1);
    }
}

verifyBackend();
