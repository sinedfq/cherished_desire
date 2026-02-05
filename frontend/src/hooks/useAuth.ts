// useAuth.ts
import { useState, useEffect } from 'react';

const DJANGO_API = 'http://localhost:8001'; // или 127.0.0.1:8001

interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    role?: string;
    wishesCreated?: number;
    wishesFulfilled?: number;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string, phone: string) => Promise<void>; // ← правильный порядок
    logout: () => void;
    loading: boolean;
}

const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            fetch(`${DJANGO_API}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    localStorage.removeItem('auth_token');
                    setUser(null);
                }
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem('auth_token');
                setUser(null);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${DJANGO_API}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
    };

    const register = async (email: string, password: string, name: string, phone: string) => {
        const response = await fetch(`${DJANGO_API}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, phone })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Registration failed');
        }

        // После регистрации можно сразу войти
        await login(email, password);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return { user, login, register, logout, loading };
};

export default useAuth;