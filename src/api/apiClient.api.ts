import { ZodType, z as zod } from 'zod';
import type { ApiResponse } from '@/types/api.types';

type ApiClientGet = <T>(
    url: string,
    schema: ZodType<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    performTransformationBeforeValidation?: (data: any) => any,
) => Promise<ApiResponse<T>>;

export const get: ApiClientGet = async function (
    url,
    schema,
    performTransformationBeforeValidation,
) {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        let transformedData = responseData;

        if (typeof performTransformationBeforeValidation === 'function') {
            transformedData =
                performTransformationBeforeValidation(responseData);
        }

        const { data, error, success } = schema.safeParse(transformedData);

        return success
            ? { success, data }
            : { success, error: zod.prettifyError(error) };
    } catch (error) {
        return { success: false, error: String(error) };
    }
};
