export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
    description: string;
    category?: string[];
}

export type CartItem = Pick<Product, 'name' | 'price' | 'imageUrl'> & {
    quantity: number;
    productId: Product['id'];
};

export interface Address {
    city: string;
    house: string;
    state: string;
    street: string;
    zipCode: string;
    country: string;
    type?: 'home' | 'work';
}

export type UserRole = 'admin' | 'staff' | 'customer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    addresses: Address[];
    profileImageUrl?: string;
}

export type OrderStatus =
    'pending' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface Order {
    id: string;
    total: number;
    items: CartItem[];
    userId: User['id'];
    status: OrderStatus;
    billingAddress: Address;
    shippingAddress: Address;
}
