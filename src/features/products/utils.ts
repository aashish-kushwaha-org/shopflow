import type { Product } from '@/types/product.types';
import type { ProductFilters, ProductSortOptionsType } from './product.types';

export const filterProducts = (
    products: Product[],
    filters: ProductFilters,
): Product[] => {
    if (filters.categories && filters.categories.length > 0) {
        const { categories } = filters;
        products = products.filter((product) => {
            return categories.some((category) =>
                product.categories?.includes(category),
            );
        });
    }

    if (filters.inStock) {
        products = products.filter((product) => product.stock > 0);
    }

    if (filters.searchTerm) {
        const { searchTerm } = filters;
        products = products.filter((product) =>
            product.name.includes(searchTerm),
        );
    }

    if (filters.price) {
        const { min, max } = filters.price;
        if (min !== undefined) {
            products = products.filter((product) => product.price >= min);
        }
        if (max !== undefined) {
            products = products.filter((product) => product.price <= max);
        }
    }

    return products;
};

export const sortProductsBy = (
    products: Product[],
    key: ProductSortOptionsType,
): Product[] => {
    return products.sort((a, b) =>
        key === 'price - low to high' ? a.price - b.price : b.price - a.price,
    );
};
