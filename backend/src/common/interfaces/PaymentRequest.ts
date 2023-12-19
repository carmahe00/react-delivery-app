export interface PaymentRequest {
    description: string;
    installments: number;
    issuer_id: string;
    payment_method_id: string;
    transaction_amount: number;
    token: string;
    payer: Payer;
    order: Order;
}

export interface Order {
    idClient: IDClient;
    idAddress: string;
    products: Product[];
}

export interface IDClient {
    id: number;
    email: string;
    name: string;
    phone: string;
    image: null;
    lastName: string;
    session_token: string;
    roles: any[];
    address: Address;
}

export interface Address {
    id: string;
    address: string;
    neighborhood: string;
    refPoint: string;
    lat: number;
    lng: number;
    createdAt: Date;
    updateAt: null;
    userId: number;
}

export interface Product {
    id: string;
    name: string;
    image1: string;
    image2: string;
    image3: string;
    description: string;
    price: string;
    idCategory: number;
    createdAt: Date;
    updateAt: null;
    quantity: number;
}

export interface Payer {
    last_name: string,
    name: string,
    email: string;
    identification: Identification;
}

export interface Identification {
    number: string;
    type: string;
}
