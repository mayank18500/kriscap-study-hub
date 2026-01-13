
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { verifyEmail } = useAuth();
    const token = searchParams.get("token");
    const hasVerified = useRef(false);

    useEffect(() => {
        const verify = async () => {
            // Prevent dual execution in React.StrictMode
            if (hasVerified.current) return;
            hasVerified.current = true;

            if (!token) {
                toast.error("Invalid verification link.");
                navigate("/login");
                return;
            }

            try {
                await verifyEmail(token);
                toast.success("Email verified successfully!");
                navigate("/dashboard");
            } catch (error: any) {
                console.error(error);
                toast.error(error.response?.data?.message || "Verification failed.");
                navigate("/login");
            }
        };

        verify();
    }, [token, verifyEmail, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Verifying your email...</h2>
            <p className="text-gray-500 mt-2">Please wait while we set up your account.</p>
        </div>
    );
};

export default VerifyEmail;
