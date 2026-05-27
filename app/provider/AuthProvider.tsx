"use client";

import { ReactNode, useActionState, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContextType, Role, User } from "../types";
import { apiClient } from "../lib/apiClient";

type LoginState = {
    success?: boolean;
    user?: User | null;
    error?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

    // LOGIN ACTION
    const [loginState, loginAction, isLoginPending] =
        useActionState(
            async (
                prevState: LoginState,
                formData: FormData
            ): Promise<LoginState> => {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;

                try {
                    const data = await apiClient.login(email, password) as unknown as { user: User };

                    if (!data) {
                        return {
                            success: false,
                            user: null,
                            error: "No response from server",
                        };
                    }

                    setUser(data.user);

                    return {
                        success: true,
                        user: data.user,
                        error: undefined,
                    };
                } catch (error) {
                    return {
                        success: false,
                        user: null,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Login failed",
                    };
                }
            },
            {
                success: undefined,
                user: undefined,
                error: undefined,
            }
        );

    // LOGOUT
    const logout = async () => {
        try {
            await apiClient.logout();
            setUser(null);
            window.location.href = "/"
        } catch (error) {
            console.log("logout error", error);
        }
    };

    // PERMISSION CHECK
    const hashPermission = (requiredRole: Role): boolean => {
        if (!user) {
            return false;
        }
        const roleHierarcy = {
            [Role.GUEST]: 0,
            [Role.USER]: 1,
            [Role.MANAGER]: 2,
            [Role.ADMIN]: 3,
        }
        return roleHierarcy[user.role] >= roleHierarcy[requiredRole];
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await apiClient.getCurrentUser();
                setUser(userData || null);
            } catch (error) {
                console.error("failed to load user: ", error);
            }
        }
        loadUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                login: loginAction,
                logout,
                hashPermission,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("use Auth must be in auth provider")
    }
    return context;
} 