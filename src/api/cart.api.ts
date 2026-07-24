import type { CartItem } from '@/types/product.types';

export const addItemToCart = async (item: CartItem): Promise<CartItem> => {
    return new Promise((resolve, reject) => {
        // simulate api call
        setTimeout(() => {
            if (item.productId === '2') {
                reject({
                    error: `Item ${item.name} is currently unavailable.`,
                });
            } else {
                resolve(item);
            }
        }, 2000);
    });
};
