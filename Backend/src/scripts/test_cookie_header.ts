import axios from "axios";

const run = async () => {
    try {
        const res = await axios.post("http://localhost:5000/auth/login", {
            email: "client@test.com",
            password: "password123"
        });

        console.log("Status:", res.status);
        console.log("Set-Cookie Header:", res.headers["set-cookie"]);
    } catch (error: any) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Data:", error.response.data);
        }
    }
};
run();
