import type { Product } from '@/types/product.types';

export type CreateProductInput = Omit<Product, 'id'>;

export interface ProductFiltersType {
    searchTerm: string;
    categories: string[];
    price: { min: number; max: number };
}

export type ProductSortOptionsType =
    'price - low to high' | 'price - high to low';

export interface ProductFilters {
    price?: { min?: number; max?: number };
    inStock?: boolean;
    categories?: string[];
    searchTerm?: string;
}
