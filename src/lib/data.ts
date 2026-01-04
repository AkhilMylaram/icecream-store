import type { Product, Promotion, Order } from './types';

const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Summer Special',
    description: 'Get 20% off all fruity flavors!',
    discount: 20,
  },
  {
    id: 'promo-2',
    title: 'Chocolate Lovers',
    description: 'Buy one chocolate-based flavor, get a second 50% off.',
    discount: 50, // Simplified for this context
  },
    {
    id: 'promo-3',
    title: 'Weekend Binge',
    description: 'Free toppings on any order over $20 this weekend!',
    discount: 0,
  },
];

const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Classic Vanilla Bean',
    description: 'Creamy and rich, made with real vanilla beans from Madagascar.',
    price: 5.99,
    imageId: 'vanilla-1',
    inventory: 150,
  },
  {
    id: 'prod-002',
    name: 'Decadent Chocolate Fudge',
    description: 'A deep, dark chocolate experience with swirls of fudge.',
    price: 6.5,
    imageId: 'chocolate-1',
    inventory: 120,
    promotionId: 'promo-2',
  },
  {
    id: 'prod-003',
    name: 'Summer Strawberry Swirl',
    description: 'Fresh strawberry ice cream with chunks of real, ripe berries.',
    price: 6.25,
    imageId: 'strawberry-1',
    inventory: 90,
    promotionId: 'promo-1',
  },
  {
    id: 'prod-004',
    name: 'Mint Chocolate Chip',
    description: 'Cool mint ice cream loaded with rich chocolate chips.',
    price: 6.25,
    imageId: 'mint-1',
    inventory: 110,
  },
  {
    id: 'prod-005',
    name: 'Cookie Dough Delight',
    description: 'Vanilla ice cream packed with chunks of chocolate chip cookie dough.',
    price: 6.75,
    imageId: 'cookie-dough-1',
    inventory: 80,
  },
  {
    id: 'prod-006',
    name: 'Salted Caramel Craze',
    description: 'A perfect balance of sweet and salty with a gooey caramel ribbon.',
    price: 6.75,
    imageId: 'salted-caramel-1',
    inventory: 0,
  },
   {
    id: 'prod-007',
    name: 'Perfect Pistachio',
    description: 'Authentic pistachio flavor with real roasted pistachio nuts.',
    price: 7.00,
    imageId: 'pistachio-1',
    inventory: 60,
  },
  {
    id: 'prod-008',
    name: 'Espresso Buzz',
    description: 'Rich coffee ice cream for the perfect afternoon pick-me-up.',
    price: 6.50,
    imageId: 'coffee-1',
    inventory: 75,
  },
];

const orders: Order[] = [
    {
        id: 'ORD-12345',
        date: '2023-10-26',
        items: [
            { productId: 'prod-001', name: 'Classic Vanilla Bean', quantity: 1 },
            { productId: 'prod-002', name: 'Decadent Chocolate Fudge', quantity: 2 },
        ],
        total: 18.99,
        status: 'Delivered'
    },
    {
        id: 'ORD-12346',
        date: '2023-10-28',
        items: [
            { productId: 'prod-003', name: 'Summer Strawberry Swirl', quantity: 2 },
        ],
        total: 12.50,
        status: 'Delivered'
    },
    {
        id: 'ORD-12347',
        date: '2023-11-01',
        items: [
            { productId: 'prod-005', name: 'Cookie Dough Delight', quantity: 1 },
            { productId: 'prod-004', name: 'Mint Chocolate Chip', quantity: 1 },
        ],
        total: 13.00,
        status: 'Shipped'
    },
    {
        id: 'ORD-12348',
        date: '2023-11-02',
        items: [
            { productId: 'prod-007', name: 'Perfect Pistachio', quantity: 3 },
        ],
        total: 21.00,
        status: 'Processing'
    }
];

// Functions to simulate fetching data from microservices
export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 3);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getAllPromotions(): Promotion[] {
    return promotions;
}

export function getPromotions(): Promotion[] {
  return promotions;
}

export function getPromotionById(id?: string): Promotion | undefined {
  if (!id) return undefined;
  return promotions.find(p => p.id === id);
}

export function getPastOrders(): string[] {
    return ['Classic Vanilla Bean', 'Summer Strawberry Swirl', 'Cookie Dough Delight'];
}

export function getAllOrders(): Order[] {
    return orders;
}
