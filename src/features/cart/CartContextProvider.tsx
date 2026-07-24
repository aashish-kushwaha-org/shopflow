import React, { useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './CartContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CartItem } from '@/types/product.types';

export const CartContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [cartState, setCartState] = useLocalStorage<{ items: CartItem[] }>(
        'cart',
        {
            items: [],
        },
    );
    const [state, dispatch] = useReducer(cartReducer, cartState);

    useEffect(() => {
        setCartState(state);
    }, [state, setCartState]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
