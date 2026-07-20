import type React from 'react';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/lib/price';
import { Link } from 'react-router-dom';

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
        <Link to={`/products/${product.id}`}>
            <img
                src={productImageUrl}
                alt={product.name}
                style={{ aspectRatio: '16/9', maxWidth: '280px' }}
            />
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
        </Link>
    );
};
