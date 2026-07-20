import { List } from '@/components/List';
import { formatPrice } from '@/lib/price';
import type { ProductCardProps } from './ProductCard';

type ProductDetailProps = Omit<ProductCardProps, 'children'>;

export const ProductDetail = ({ product, onAddToCart }: ProductDetailProps) => {
    const {
        name,
        description,
        stock,
        imageUrl = '',
        price,
        categories = [],
    } = product;

    const productImageUrl =
        imageUrl.trim().length > 0 ? imageUrl : 'favicon.svg';

    return (
        <div>
            <img src={productImageUrl} alt={name} />
            <h3>
                {name} -{' '}
                <span>
                    <i>{formatPrice(price)}</i>
                </span>
            </h3>
            {categories.length > 0 && (
                <div>
                    <List
                        items={categories}
                        keyExtractor={(category) => category}
                        renderItem={(category, index) => (
                            <span>
                                {index > 0 ? ' | ' : null} {category}
                            </span>
                        )}
                    />
                </div>
            )}
            <h3>Only {stock} items left.</h3>
            <p>{description}</p>
            <button
                disabled={!(stock > 0)}
                onClick={() => onAddToCart(product.id)}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
            </button>
        </div>
    );
};
