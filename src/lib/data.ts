import type { Product, Promotion, Order } from './types';

// Functions to fetch data from microservices via API gateway
export function getAllProducts(): Product[] {
  // In the original repository, this was synchronous and used local data
  // We'll keep the API call but make it synchronous by returning fallback data immediately
  // For the exact original behavior, we'll return the mock data directly
  return [
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
    },
    {
      id: 'prod-003',
      name: 'Strawberry Swirl',
      description: 'Fresh strawberry ice cream with chunks of real, ripe berries.',
      price: 6.25,
      imageId: 'strawberry-1',
      inventory: 90,
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
      inventory: 100,
    },
    {
      id: 'prod-007',
      name: 'Perfect Pistachio',
      description: 'Rich, nutty pistachio ice cream with real pistachio pieces.',
      price: 6.5,
      imageId: 'pistachio-1',
      inventory: 60,
    },
    {
      id: 'prod-008',
      name: 'Coffee Heaven',
      description: 'Rich and aromatic coffee-flavored ice cream.',
      price: 6.25,
      imageId: 'coffee-1',
      inventory: 75,
    },
  ];
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().slice(0, 6);
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}

export function getAllPromotions(): Promotion[] {
  return [
    {
      id: 'promo-1',
      title: 'Fruity Fusion',
      description: 'Enjoy a burst of fruity flavors with 20% off!',
      discount: 20,
    },
    {
      id: 'promo-2',
      title: 'Chocolate Lovers',
      description: 'Buy one chocolate-based flavor, get a second 50% off.',
      discount: 50,
    },
    {
      id: 'promo-3',
      title: 'Weekend Binge',
      description: 'Free toppings on any order over $20 this weekend!',
      discount: 0,
    },
    {
      id: 'promo-4',
      title: 'Refer a Friend',
      description: 'Refer a friend and you both get a free scoop on us!',
      discount: 0,
    }
  ];
}

export function getPromotions(): Promotion[] {
  return getAllPromotions();
}

export function getPromotionById(id?: string): Promotion | undefined {
  if (!id) return undefined;
  return getAllPromotions().find(p => p.id === id);
}

export function getPastOrders(): string[] {
  return ['Classic Vanilla Bean', 'Strawberry Swirl', 'Cookie Dough Delight'];
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    // In a real implementation, we would fetch from the API using the user's email
    // For now, return mock data
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return [];
    }

    // In a real implementation, we would fetch from the API
    // const response = await fetch(`/api/orders?userEmail=${userEmail}`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to fetch orders');
    // }
    // const orders = await response.json();
    // return orders;

    // For now, return mock data
    return [
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
          { productId: 'prod-003', name: 'Strawberry Swirl', quantity: 2 },
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
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
