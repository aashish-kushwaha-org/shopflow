import type { CartItem } from '@/types/product.types';

export const calculateCartTotal = (items: CartItem[]): number => {
    let total = 0;
    for (const item of items) {
        total += item.price * item.quantity;
    }
    return total;
};
