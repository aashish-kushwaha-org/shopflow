import { List } from '@/components/List';
import { formatPrice } from '@/lib/price';
import type { ProductCardProps } from './ProductCard';
import { useAddToCart } from '@/features/cart/useAddToCart';
import { useEffect, useState } from 'react';

type ProductDetailProps = Omit<ProductCardProps, 'children'>;

export const ProductDetail = ({
    product,
    onAddError = () => {},
    onAddSuccess = () => {},
}: ProductDetailProps) => {
    const [quantity, setQuantity] = useState('1');
    const { addToCart, isPending, isSuccess } = useAddToCart();

    const {
        name,
        description,
        stock,
        imageUrl = '',
        price,
        categories = [],
    } = product;

    const productImageUrl =
        imageUrl.trim().length > 0 ? imageUrl : 'favicon.svg';

    const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const quantity = Number(value);

        if (Number.isNaN(quantity) && value !== '') return setQuantity('');
        if (quantity < 1 && value !== '') {
            alert(`Min quantity should be 1`);
            return setQuantity('1');
        }
        if (quantity > stock) return alert(`Max ${stock} quantity available.`);
        setQuantity(value);
    };

    const addToCartHandler = () => {
        if (quantity === '') return alert('Please select the quantity.');

        addToCart(
            {
                name,
                imageUrl,
                quantity: Number(quantity),
                price,
                productId: product.id,
            },
            {
                onError: onAddError,
                onSuccess: onAddSuccess,
            },
        );
        setQuantity('1');
    };

    useEffect(() => {
        if (isSuccess) alert(`Item added to the cart : ${name}`);
    }, [isSuccess, name]);

    return (
        <div>
            <img src={productImageUrl} alt={name} />
            <h3>
                {name} -{' '}
                <span>
                    <i>{formatPrice(price)}</i>
                </span>
            </h3>
            {categories.length > 0 && (
                <div>
                    <span>Categories: </span>
                    <List
                        items={categories}
                        keyExtractor={(category) => category}
                        renderItem={(category, index) => (
                            <span>
                                {index > 0 ? ' | ' : null} {category}
                            </span>
                        )}
                    />
                </div>
            )}
            <h3 style={{ color: stock < 4 ? 'tomato' : 'inherit' }}>
                {stock === 0
                    ? 'Currently Unavailable'
                    : `Only ${stock} items left.`}
            </h3>
            <p>{description}</p>
            <div>
                <label htmlFor="product-quantity">Select Quantity: </label>
                <input
                    type="number"
                    name="quantity"
                    id="product-quantity"
                    min={0}
                    max={product.stock}
                    value={quantity}
                    onChange={quantityChangeHandler}
                />
            </div>
            <button
                disabled={!(stock > 0) || isPending}
                onClick={addToCartHandler}
            >
                {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
            </button>
        </div>
    );
};
