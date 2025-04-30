import React, { createContext, useState, useContext, useEffect } from "react";

const backendUrl = "http://localhost:4000";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("[AuthContext] Initializing auth context");
        // Check if there's a token in localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            console.log("[AuthContext] Found stored token, verifying...");
            // Verify token and get user data
            verifyToken(storedToken);
        } else {
            console.log("[AuthContext] No stored token found");
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        console.log("[AuthContext] Verifying token...");
        try {
            const response = await fetch(`${backendUrl}/api/user/verify`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("[AuthContext] Token verified successfully", data);
                setUser(data.user);
                setToken(token);
            } else {
                console.error("[AuthContext] Token verification failed", {
                    status: response.status,
                    statusText: response.statusText,
                });
                // Clear the invalid token and user data
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
                // Set loading to false since we're done
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error("[AuthContext] Token verification error:", {
                error: error.message,
                stack: error.stack,
            });
            // Clear the invalid token and user data
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        console.log("[AuthContext] Attempting login...", { email });
        try {
            const response = await fetch(`${backendUrl}/api/user/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("[AuthContext] Login failed", {
                    status: response.status,
                    statusText: response.statusText,
                    errorData,
                });
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            console.log("[AuthContext] Login successful", data);

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);

            return { success: true };
        } catch (error) {
            console.error("[AuthContext] Login error:", {
                error: error.message,
                stack: error.stack,
            });
            return {
                success: false,
                error: error.message,
            };
        }
    };

    const logout = () => {
        console.log("[AuthContext] Logging out user");
        try {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
            console.log("[AuthContext] Logout successful");
        } catch (error) {
            console.error("[AuthContext] Logout error:", {
                error: error.message,
                stack: error.stack,
            });
        }
    };

    return <AuthContext.Provider value={{ user, token, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("[AuthContext] useAuth must be used within an AuthProvider");
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
