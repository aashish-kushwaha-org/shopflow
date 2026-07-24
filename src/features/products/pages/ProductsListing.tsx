import { useMemo, useState } from 'react';
import { List } from '@/components/List';
import { filterProducts, sortProductsBy } from '@/features/products/utils';
import { ProductList } from '@/features/products/components/ProductList';
import type {
    ProductFiltersType,
    ProductSortOptionsType,
} from '../product.types';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/product.api';
import { unwrapApiResponse } from '@/lib/utils';

const categories = [
    'food',
    'home',
    'books',
    'beauty',
    'travel',
    'mobiles',
    'fashion',
    'furniture',
    'accessories',
    'electronics',
];

const defaultFilters: ProductFiltersType = {
    searchTerm: '',
    categories: [],
    price: { min: 0, max: 1000 },
};

export const ProductsListing = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts().then(unwrapApiResponse),
    });
    const defaultSortValue: ProductSortOptionsType = 'price - low to high';
    const [draftFilters, setDraftFilters] =
        useState<ProductFiltersType>(defaultFilters);
    const [appliedFilters, setAppliedFilters] =
        useState<ProductFiltersType>(defaultFilters);
    const [sortBy, setSortBy] =
        useState<ProductSortOptionsType>(defaultSortValue);

    const filteredProducts = useMemo(() => {
        if (isLoading || data === undefined) return [];

        const filtered = filterProducts(data, appliedFilters);
        return sortProductsBy(filtered, sortBy);
    }, [isLoading, data, sortBy, appliedFilters]);

    if (isLoading) return <h3>Loading Products...</h3>;
    if (isError) return <h3>{String(error)}</h3>;
    if (data === undefined) return <h3>No Products found.</h3>;

    const searchTermChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setDraftFilters((filters) => ({
            ...filters,
            searchTerm: e.target.value,
        }));
    };

    const categoriesChangeHandler = (category: string) => {
        const categoryIndex = draftFilters.categories.findIndex(
            (c) => c === category,
        );
        if (categoryIndex === -1) {
            setDraftFilters((filters) => ({
                ...filters,
                categories: [...filters.categories, category],
            }));
        } else {
            const categoriesCopy = [...draftFilters.categories];
            categoriesCopy.splice(categoryIndex, 1);

            setDraftFilters((filters) => ({
                ...filters,
                categories: categoriesCopy,
            }));
        }
    };

    const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;
        setDraftFilters((filters) => ({
            ...filters,
            price: {
                ...filters.price,
                [e.target.name]: Number.isNaN(value) ? 0 : value,
            },
        }));
    };

    const filterProductsHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAppliedFilters(draftFilters);
    };

    return (
        <div>
            <h1>Products Catalogue</h1>
            <form onSubmit={filterProductsHandler}>
                <input
                    type="text"
                    value={draftFilters.searchTerm}
                    placeholder="Search products..."
                    onChange={searchTermChangeHandler}
                />
                <div>
                    <p>Select Categories: </p>
                    <List
                        items={categories}
                        keyExtractor={(category) => category}
                        renderItem={(category) => (
                            <div>
                                <label>
                                    <input
                                        onChange={() =>
                                            categoriesChangeHandler(category)
                                        }
                                        type="checkbox"
                                        checked={draftFilters.categories.includes(
                                            category,
                                        )}
                                    />
                                    <span>
                                        {' '}
                                        {category.charAt(0).toUpperCase() +
                                            category.slice(1)}
                                    </span>
                                </label>
                            </div>
                        )}
                    />
                </div>
                <div>
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                        type="number"
                        min={0}
                        id="minPrice"
                        name="min"
                        placeholder="Minimum price"
                        value={draftFilters.price.min}
                        onChange={priceChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        type="number"
                        min={0}
                        name="max"
                        id="maxPrice"
                        placeholder="Maximum price"
                        value={draftFilters.price.max}
                        onChange={priceChangeHandler}
                    />
                </div>
                <button>Search</button>
                <button
                    type="reset"
                    onClick={() => {
                        setDraftFilters(defaultFilters);
                        setAppliedFilters(defaultFilters);
                    }}
                >
                    Reset Filters
                </button>
            </form>
            <label htmlFor="sort-products">Sort By</label>
            <select
                id="sort-products"
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value as ProductSortOptionsType)
                }
            >
                <option value="price - low to high">Price - Low to High</option>
                <option value="price - high to low">Price - High to Low</option>
            </select>
            {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} />
            ) : (
                <h3>No Products found for filter criteria</h3>
            )}
        </div>
    );
};
