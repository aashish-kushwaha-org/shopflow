import type { CartItem } from '@/types/product.types';

export interface CartState {
    items: CartItem[];
}

export type CartAction =
    | { type: 'CLEAR' }
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | {
          type: 'UPDATE_QUANTITY';
          payload: { productId: string; quantity: number };
      };

export interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}
