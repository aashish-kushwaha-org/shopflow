import type { ApiResponse } from '@/types/api.types';

export const unwrapApiResponse = <T>(response: ApiResponse<T>): T => {
    if (!response.success) throw new Error(response.error);
    return response.data;
};
