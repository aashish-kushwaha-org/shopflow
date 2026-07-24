import { Link } from 'react-router-dom';
import { List } from '@/components/List';
import { useAuth } from '../auth/useAuth';
import { useCart } from './useCart';
import { calculateCartTotal, getCartItemsCount } from './utils';
import { formatPrice } from '@/lib/price';
import type { CartItem } from '@/types/product.types';

const CartItem = ({ name, price, quantity, imageUrl, productId }: CartItem) => {
    const { dispatch } = useCart();

    const updateQuantityHandler = (quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const removeItemHandler = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: productId,
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                padding: 4,
                marginInline: 12,
                gap: 32,
                marginBlockEnd: 4,
                border: '2px solid black',
            }}
        >
            <img
                style={{ maxWidth: 120, aspectRatio: '16/6' }}
                src={imageUrl}
                alt={name}
            />
            <div>
                <h3>
                    <Link
                        style={{ color: 'currentColor' }}
                        to={`/product/${productId}`}
                    >
                        {name}
                    </Link>
                </h3>
                <p>Price: {formatPrice(price)}</p>
                <p>Quantity: {quantity}</p>
                <br />
                <p>Total: {formatPrice(price * quantity)}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        disabled={quantity === 1}
                        onClick={() => updateQuantityHandler(quantity - 1)}
                    >
                        Decrease quantity
                    </button>
                    <button onClick={() => updateQuantityHandler(quantity + 1)}>
                        Increase quantity
                    </button>
                    <button onClick={removeItemHandler}>Remove item</button>
                </div>
            </div>
        </div>
    );
};

const CartPage = () => {
    const { user } = useAuth();
    const { state: cartState } = useCart();

    return (
        <div>
            <h1>Hi {user?.name},</h1>
            <p>
                You've total ({getCartItemsCount(cartState.items)}) items in the
                cart.
            </p>
            <br />
            <h3>Cart Items</h3>
            <List
                items={cartState.items}
                keyExtractor={(item) => item.productId}
                renderItem={CartItem}
            />
            <hr />
            <h4>
                Cart Total: {formatPrice(calculateCartTotal(cartState.items))}
            </h4>
        </div>
    );
};

export default CartPage;
