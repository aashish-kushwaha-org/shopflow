import { useState, type Dispatch, type SetStateAction } from 'react';

const getFromLocalStorage = (key: string) => localStorage.getItem(key);

const saveToLocalStorage = <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));

export const useLocalStorage = <T>(
    key: string,
    initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState(() => {
        const value = getFromLocalStorage(key);
        let result: T;
        if (value !== null) {
            result = JSON.parse(value);
        } else {
            result = initialValue;
            saveToLocalStorage(key, result);
        }

        return result;
    });

    const setValue = (value: T | ((prev: T) => T)) => {
        let result: T;
        if (typeof value === 'function') {
            result = (value as (prev: T) => T)(state);
        } else result = value;

        setState(result);
        saveToLocalStorage(key, result);
    };

    return [state, setValue];
};
