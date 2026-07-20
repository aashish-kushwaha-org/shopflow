import { List } from '@/components/List';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/product.types';

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    const addToCart = (productId: string): void => {
        console.log(`product added : ${productId}`);
    };

    return (
        <ul>
            <List
                items={products}
                keyExtractor={(item) => item.id}
                renderItem={(product) => (
                    <li>
                        <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                        />
                    </li>
                )}
            />
        </ul>
    );
};
