import type React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/lib/price';
import { useAddToCart } from '@/features/cart/useAddToCart';
import { useEffect } from 'react';

export interface ProductCardProps {
    product: Product;
    onAddSuccess?: () => void;
    children?: React.ReactNode;
    onAddError?: (error: unknown) => void;
}

export const ProductCard = ({
    product,
    children,
    onAddError = () => {},
    onAddSuccess = () => {},
}: ProductCardProps) => {
    const { addToCart, isPending, isSuccess } = useAddToCart();

    const productImageUrl =
        product.imageUrl !== undefined && product.imageUrl.trim().length > 0
            ? product.imageUrl
            : 'favicon.svg';

    const addToCartHandler = () => {
        const cartItem = {
            name: product.name,
            quantity: 1,
            imageUrl: product.imageUrl,
            price: product.price,
            productId: product.id,
        };
        addToCart(cartItem, { onSuccess: onAddSuccess, onError: onAddError });
    };

    useEffect(() => {
        if (isSuccess) alert(`Item added to the cart : ${product.name}`);
    }, [isSuccess, product.name]);

    return (
        <div>
            <Link to={`/products/${product.id}`}>
                <img
                    src={productImageUrl}
                    alt={product.name}
                    style={{ aspectRatio: '16/9', maxWidth: '280px' }}
                />
            </Link>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h3>{formatPrice(product.price)}</h3>
            <button
                disabled={!(product.stock > 0) || isPending}
                onClick={addToCartHandler}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
            </button>
            {children}
        </div>
    );
};
