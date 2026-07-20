import { useState } from 'react';
import { List } from '@/components/List';
import { filterProducts } from '@/features/products/utils';
import { ProductList } from '@/features/products/components/ProductList';
import type { Product } from '@/types/product.types';
import type { ProductFiltersType } from '../types';

interface ProductsListingProps {
    products: Product[];
}

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
    price: { min: -Infinity, max: Infinity },
};

export const ProductsListing = ({ products }: ProductsListingProps) => {
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(products);
    const [filters, setFilters] = useState<ProductFiltersType>(defaultFilters);

    const searchTermChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setFilters((filters) => ({ ...filters, searchTerm: e.target.value }));
    };

    const categoriesChangeHandler = (category: string) => {
        const categoryIndex = filters.categories.findIndex(
            (c) => c === category,
        );
        if (categoryIndex === -1) {
            setFilters((filters) => ({
                ...filters,
                categories: [...filters.categories, category],
            }));
        } else {
            const categoriesCopy = [...filters.categories];
            categoriesCopy.splice(categoryIndex, 1);

            setFilters((filters) => ({
                ...filters,
                categories: categoriesCopy,
            }));
        }
    };

    const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;
        setFilters((filters) => ({
            ...filters,
            price: {
                ...filters.price,
                [e.target.name]: Number.isNaN(value) ? 0 : value,
            },
        }));
    };

    const filterProductsHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilteredProducts(filterProducts(products, filters));
    };

    return (
        <div>
            <form onSubmit={filterProductsHandler}>
                <input
                    type="text"
                    value={filters.searchTerm}
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
                                        checked={filters.categories.includes(
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
                        value={filters.price.min}
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
                        value={filters.price.max}
                        onChange={priceChangeHandler}
                    />
                </div>
                <button>Search</button>
                <button
                    type="reset"
                    onClick={() => {
                        setFilteredProducts(
                            filterProducts(products, defaultFilters),
                        );
                        setFilters(defaultFilters);
                    }}
                >
                    Reset Filters
                </button>
            </form>
            {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} />
            ) : (
                <h3>No Products found for filter criteria</h3>
            )}
        </div>
    );
};
