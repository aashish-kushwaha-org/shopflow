import { useState } from 'react';
import { ProductList } from '@/features/products/components/ProductList';
import { filterProducts } from '@/features/products/utils';
import type { Product } from '@/types/product.types';
import { List } from '@/components/List';

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

export const ProductsListing = ({ products }: ProductsListingProps) => {
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(products);
    const [filters, setFilters] = useState<{
        searchTerm: string;
        categories: string[];
    }>({ searchTerm: '', categories: [] });

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
                <button>Search</button>
            </form>
            <ProductList products={filteredProducts} />
        </div>
    );
};
