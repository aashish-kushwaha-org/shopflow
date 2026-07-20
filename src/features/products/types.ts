import type { Product } from '@/types/product.types';

export type CreateProductInput = Omit<Product, 'id'>;

export interface ProductFiltersType {
    searchTerm: string;
    categories: string[];
    price: { min: number; max: number };
}
