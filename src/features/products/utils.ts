import type { Product } from '@/types/product.types';

interface ProductFilters {
    price?: { min?: number; max?: number };
    inStock?: boolean;
    categories?: string[];
    searchTerm?: string;
}

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
