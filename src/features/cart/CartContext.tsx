import { createContext } from 'react';
import type { CartContextType, CartAction, CartState } from './cart.types';

export const cartReducer = (
    state: CartState,
    action: CartAction,
): CartState => {
    switch (action.type) {
        case 'CLEAR':
            return { ...state, items: [] };
        case 'ADD_ITEM': {
            const itemsCopy = structuredClone(state.items);
            const productId = action.payload.productId;
            const productIndex = itemsCopy.findIndex(
                (item) => item.productId === productId,
            );
            if (productIndex !== -1) {
                itemsCopy[productIndex].quantity++;
            } else itemsCopy.push(action.payload);
            return { ...state, items: itemsCopy };
        }
        case 'REMOVE_ITEM': {
            const itemsCopy = structuredClone(state.items);
            const productIndex = itemsCopy.findIndex(
                (item) => item.productId === action.payload,
            );
            if (productIndex !== -1) {
                itemsCopy.splice(productIndex, 1);
            }
            return { ...state, items: itemsCopy };
        }
        case 'UPDATE_QUANTITY': {
            const itemsCopy = structuredClone(state.items);
            const productIndex = itemsCopy.findIndex(
                (item) => item.productId === action.payload.productId,
            );
            if (productIndex !== -1) {
                itemsCopy[productIndex].quantity = action.payload.quantity;
            }
            return { ...state, items: itemsCopy };
        }
    }
};

export const CartContext = createContext<CartContextType | undefined>(
    undefined,
);
