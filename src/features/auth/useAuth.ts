import { useContext } from 'react';
import { AuthContext } from './authContext';
import type { AuthContextType } from './auth.types';

export const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);

    if (authContext === undefined) {
        throw new Error('useAuth cannot be used outside AuthContext');
    }

    return authContext;
};
