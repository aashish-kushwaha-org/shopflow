import { List } from '@/components/List';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/product.types';

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <ul>
            <List
                items={products}
                keyExtractor={(item) => item.id}
                renderItem={(product) => (
                    <li>
                        <ProductCard product={product} />
                    </li>
                )}
            />
        </ul>
    );
};
