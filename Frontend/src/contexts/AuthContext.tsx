import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { User } from "@/types/user"; // Assume we need to create this type or use any

interface AuthContextType {
    user: any | null; // Replace 'any' with explicit User type later
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<any>;
    register: (credentials: any) => Promise<any>;
    verifyEmail: (token: string) => Promise<any>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const { data } = await api.get("/auth/me");
            setUser(data.user);
        } catch (error) {
            console.log("Not authenticated");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: any) => {
        const { data } = await api.post("/auth/login", credentials);
        setUser(data.user);
        return data.user;
    };

    const register = async (credentials: any) => {
        const { data } = await api.post("/auth/register", credentials);
        return data;
    };

    const verifyEmail = async (token: string) => {
        const { data } = await api.post("/auth/verify-email", { token });
        setUser(data.user);
        return data.user;
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, verifyEmail, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
