import { get } from './apiClient.api';
import type { ApiResponse } from '@/types/api.types';
import {
    ProductSchema,
    ProductsListSchema,
    type Product,
} from '@/types/product.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformProductResponse = (json: any): any => ({
    ...json,
    name: json.title,
    id: `${json.id}`,
    imageUrl: json.image,
    categories: [json.category],
    stock: 10,
});

export const getProduct = (
    productId: string,
): Promise<ApiResponse<Product>> => {
    const response = get(
        `https://fakestoreapi.com/products/${productId}`,
        ProductSchema,
        transformProductResponse,
    );

    return response;
};

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
    const response = get(
        'https://fakestoreapi.com/products',
        ProductsListSchema,
        (jsonArray) => jsonArray.map(transformProductResponse),
    );

    return response;
};
