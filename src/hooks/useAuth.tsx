'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Decode the JWT token to get user information
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    email: payload.sub || 'user@example.com',
                    role: payload.role || 'USER'
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                setUser({ email: 'user@example.com', role: 'USER' }); // Fallback
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string, refreshToken: string) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        try {
            // Decode the JWT token to get user information
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                email: payload.sub || 'user@example.com',
                role: payload.role || 'USER'
            });
        } catch (error) {
            console.error('Error decoding token:', error);
            setUser({ email: 'user@example.com', role: 'USER' }); // Fallback
        }
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        router.push('/auth/signin');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
