import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IUser } from "../types";
import api from "../api/axios";

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    login: (userData: IUser, authToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored && stored !== "undefined" ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    const [token, setToken] = useState<string | null>(() => {
        const stored = localStorage.getItem("token");
        return stored && stored !== "undefined" ? stored : null;
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get("/auth/me");
                if (response.data.success) {
                    setUser(response.data.data);
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Failed to fetch current user", error);
                logout(); // Logout if token is invalid or expired
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = (userData: IUser, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isAuthenticated: !!token, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};