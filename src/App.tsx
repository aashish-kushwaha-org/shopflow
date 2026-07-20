import {
    Link,
    Route,
    Routes,
    useParams,
    BrowserRouter,
} from 'react-router-dom';
import { NotFound } from '@/404';
import { ProductsListing } from '@/features/products/pages/ProductsListing';
import { ProductDetail } from '@/features/products/components/ProductDetail';
import type { Product } from '@/types/product.types';

const products: Product[] = [
    {
        id: '1',
        stock: 10,
        price: 99.99,
        name: 'Mobile',
        imageUrl: 'https://picsum.photos/800/400',
        categories: ['electronics', 'accessories'],
        description: 'Branded new 5G mobile phone from Apple',
    },
    {
        id: '2',
        stock: 0,
        price: 3.49,
        name: 'Bread',
        imageUrl: 'https://picsum.photos/800/400',
        categories: ['home'],
        description: 'Soft fresh bread made with oil & wheat flour.',
    },
    {
        id: '3',
        stock: 10,
        price: 199.99,
        name: 'Laptop',
        imageUrl: 'https://picsum.photos/800/400',
        categories: ['electronics'],
        description: 'Branded new 5G mobile phone from Apple',
    },
    {
        id: '4',
        stock: 5,
        price: 7.99,
        name: 'Milk',
        imageUrl: 'https://picsum.photos/800/400',
        categories: ['food'],
        description: 'Soft fresh bread made with oil & wheat flour.',
    },
];

const ProductDetailsPage = () => {
    const { productId } = useParams();

    const product = products.find((p) => p.id === productId);

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

    return (
        <ProductDetail
            product={product}
            onAddToCart={(productId) => alert(`Product Added ${productId}`)}
        />
    );
};

function App() {
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
                    element={<ProductsListing products={products} />}
                />
                <Route
                    path="/products/:productId"
                    element={<ProductDetailsPage />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
