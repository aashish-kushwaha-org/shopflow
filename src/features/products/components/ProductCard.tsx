import type React from 'react';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/lib/price';

export interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: string) => void;
    children?: React.ReactNode;
}

export const ProductCard = ({
    product,
    onAddToCart,
    children,
}: ProductCardProps) => {
    const productImageUrl =
        product.imageUrl !== undefined && product.imageUrl.trim().length > 0
            ? product.imageUrl
            : 'favicon.svg';

    return (
        <div>
            <img src={productImageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h3>{formatPrice(product.price)}</h3>
            <button
                disabled={!(product.stock > 0)}
                onClick={() => onAddToCart(product.id)}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
            </button>
            {children}
        </div>
    );
};
