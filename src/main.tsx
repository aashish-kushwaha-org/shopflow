import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from '@/App.tsx';
import { AuthContextProvider } from '@/features/auth/AuthContextProvider.tsx';
import { CartContextProvider } from '@/features/cart/CartContextProvider';
import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <CartContextProvider>
                    <App />
                </CartContextProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    </StrictMode>,
);
