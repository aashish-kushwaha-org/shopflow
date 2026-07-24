import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from './cart.types';

export const useCart = (): CartContextType => {
    const cartContext = useContext(CartContext);

    if (cartContext === undefined) {
        throw new Error("useCart can't be used outside CartContext");
    }

    return cartContext;
};
