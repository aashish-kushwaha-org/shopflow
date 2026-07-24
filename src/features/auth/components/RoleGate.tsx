import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../useAuth';
import type { UserRole } from '@/types/product.types';

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
    const location = useLocation();
    const { user } = useAuth();

    if (user === null) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <h1>
                Unauthorized: You don't have permission to access this page.
            </h1>
        );
    }

    return children;
};
