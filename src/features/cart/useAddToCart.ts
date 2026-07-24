import { useMutation } from '@tanstack/react-query';
import { useCart } from './useCart';
import { addItemToCart } from '@/api/cart.api';
import type { CartItem } from '@/types/product.types';

export const useAddToCart = () => {
    const { state: cartState, dispatch } = useCart();

    const {
        mutate: addToCart,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: (item: CartItem) => addItemToCart(item),
        onMutate: (item: CartItem) => {
            const previousCartState = structuredClone(cartState);
            dispatch({ type: 'ADD_ITEM', payload: item });
            return { previousCartState };
        },
        onError: (error, item, context) => {
            if (context) {
                dispatch({
                    type: 'RESTORE_CART',
                    payload: context.previousCartState.items,
                });
            }
            alert(`Error occurred while adding item: ${item.name} to cart`);
            console.log(error);
        },
    });

    return { addToCart, isPending, isSuccess };
};
