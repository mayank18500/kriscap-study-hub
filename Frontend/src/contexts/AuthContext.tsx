import { createContext, useContext, useEffect, useState } from "react";
import api, { setClerkTokenGetter } from "@/lib/api";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";

interface AuthContextType {
    user: any | null; 
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<any>;
    register: (credentials: any) => Promise<any>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn, getToken, signOut } = useClerkAuth();
    const { user: clerkUser } = useUser();
    
    const [localUser, setLocalUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Provide the token getter to our Axios instance
    useEffect(() => {
        setClerkTokenGetter(getToken);
    }, [getToken]);

    const fetchLocalUser = async () => {
        try {
            const { data } = await api.get("/auth/me");
            setLocalUser(data.user);
        } catch (error) {
            console.log("Failed to fetch local DB user data");
            setLocalUser(null);
        }
    };

    useEffect(() => {
        if (!isLoaded) {
            setIsLoading(true);
            return;
        }

        if (isSignedIn) {
            // Fetch local DB user to get role, wishlist, etc.
            fetchLocalUser().finally(() => setIsLoading(false));
        } else {
            setLocalUser(null);
            setIsLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    // Dummy functions to avoid breaking existing components that call them
    const login = async () => {
        console.warn("Login is handled by Clerk now");
    };

    const register = async () => {
        console.warn("Register is handled by Clerk now");
    };

    const logout = async () => {
        await signOut();
    };

    const checkAuth = async () => {
        if (isSignedIn) {
            await fetchLocalUser();
        }
    };

    const combinedUser = localUser ? {
        ...localUser,
        ...clerkUser,
        id: localUser._id, // Map for compatibility
        name: clerkUser?.fullName || localUser.name,
        email: clerkUser?.primaryEmailAddress?.emailAddress || localUser.email,
        role: localUser.role
    } : null;

    return (
        <AuthContext.Provider value={{ 
            user: combinedUser, 
            isAuthenticated: !!isSignedIn, 
            isLoading, 
            login, 
            register, 
            logout, 
            checkAuth 
        }}>
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
