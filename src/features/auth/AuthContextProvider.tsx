import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AuthContext } from './authContext';
import type { User } from '@/types/product.types';

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useLocalStorage<User | null>('auth-user', null);

    const login = (user: User) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
