"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserT } from '../types/interfaces/User';
import useLocalStorage from './use-local-storage';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    token: string;
    user: UserT | null;
    loading: boolean;
    login: (token: string, user: UserT) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useLocalStorage('token', '');
    const [user, setUser] = useState<UserT | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (token: string, user: UserT) => {
        try {
            setLoading(true);
            setToken(token);
            setUser(user);
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        try {
            setLoading(true);
            if (token) {
                try {
                    const userDecoded = jwtDecode<{ user: UserT }>(token);
                    setUser(userDecoded.user);
                } catch (error) {
                    console.error("Invalid token, logging out", error);
                    logout();
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token])

    const logout = async () => {
        try {
            setLoading(true);
            setToken('');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default useAuth;

