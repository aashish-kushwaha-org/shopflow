import type { Product } from '@/types/product.types';

export type CreateProductInput = Omit<Product, 'id'>;
