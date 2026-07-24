import {
    Link,
    Route,
    Routes,
    useParams,
    BrowserRouter,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { NotFound } from '@/404';
import { ProductsListing } from '@/features/products/pages/ProductsListing';
import { ProductDetail } from '@/features/products/components/ProductDetail';
import { RoleGate } from '@/features/auth/components/RoleGate';
import { useAuth } from '@/features/auth/useAuth';
import { getProduct } from '@/api/product.api';
import { unwrapApiResponse } from '@/lib/utils';
import { useCart } from '@/features/cart/useCart';
import { getCartItemsCount } from '@/features/cart/utils';
import type { User } from '@/types/product.types';

const ProductDetailsPage = () => {
    const { productId = '' } = useParams();

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct(productId).then(unwrapApiResponse),
    });

    if (isLoading) return <h2>Loading product details...</h2>;

    if (isError) return <h2>{String(error)}</h2>;

    if (product === undefined)
        return (
            <h1
                style={{
                    height: '40vh',
                    textAlign: 'center',
                    verticalAlign: 'center',
                }}
            >
                Product Not Found
            </h1>
        );

    return <ProductDetail product={product} />;
};

function App() {
    const { user, login, logout } = useAuth();
    const {
        state: { items },
    } = useCart();
    const isUserAvailable = user !== null;

    const newUser: User = {
        id: '1',
        name: 'John Paul',
        email: 'john@paul.com',
        profileImageUrl:
            'https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925',
        role: 'staff',
        addresses: [],
    };

    return (
        <BrowserRouter>
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '.8rem 1.6rem',
                }}
            >
                <div>
                    <Link
                        to="/"
                        style={{ fontSize: '2rem', textDecoration: 'none' }}
                    >
                        ShopFlow
                    </Link>
                </div>
                <nav>
                    <Link to="/products">Check Products</Link>
                    <button
                        style={{ marginLeft: '.75rem' }}
                        onClick={() =>
                            isUserAvailable ? logout() : login(newUser)
                        }
                    >
                        {isUserAvailable ? 'Logout' : 'Login'}
                    </button>
                    <Link
                        to="/cart"
                        style={{ marginLeft: '.75rem', textDecoration: 'none' }}
                    >
                        Cart ({getCartItemsCount(items)})
                    </Link>
                </nav>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <h1>ShopFlow | Perfect destination for shopping 🛍</h1>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <RoleGate allowedRoles={['admin', 'staff']}>
                            <ProductsListing />
                        </RoleGate>
                    }
                />
                <Route
                    path="/products/:productId"
                    element={
                        <RoleGate allowedRoles={['admin', 'staff']}>
                            <ProductDetailsPage />
                        </RoleGate>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
