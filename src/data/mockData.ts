import { Product, PromoBanner, CartItemType } from '../types';

export const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    price: 134900,
    originalPrice: 159900,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    ],
    category: 'Mobiles',
    sizes: ['128GB', '256GB', '512GB', '1TB'],
    description:
      'The most powerful iPhone ever with A17 Pro chip, titanium design, 48MP camera system, and USB-C connectivity.',
    stock: 25,
    rating: 4.8,
    reviewCount: 2450,
  },
  {
    _id: '2',
    title: 'Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    price: 108999,
    originalPrice: 136999,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    ],
    category: 'Mobiles',
    sizes: ['128GB', '256GB', '512GB'],
    description:
      'A premium 14.6" AMOLED tablet with Snapdragon 8 Gen 2, S Pen included, and IP68 water resistance.',
    stock: 30,
    rating: 4.7,
    reviewCount: 890,
  },
  {
    _id: '3',
    title: 'MacBook Air M3 15-inch',
    brand: 'Apple',
    price: 134900,
    originalPrice: 149900,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    ],
    category: 'Laptops',
    sizes: ['8GB/256GB', '16GB/512GB', '24GB/1TB'],
    description:
      'Supercharged by M3 chip with up to 18 hours battery life. Fanless, silent design with Liquid Retina display.',
    stock: 40,
    rating: 4.9,
    reviewCount: 3100,
  },
  {
    _id: '4',
    title: 'ROG Strix G16 Gaming Laptop',
    brand: 'ASUS',
    price: 119990,
    originalPrice: 149990,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    ],
    category: 'Laptops',
    sizes: ['RTX 4060', 'RTX 4070', 'RTX 4080'],
    description:
      'Intel Core i9, 16" QHD 240Hz display, 32GB DDR5 RAM, 1TB SSD. Built for competitive gaming.',
    stock: 20,
    rating: 4.6,
    reviewCount: 760,
  },
  {
    _id: '5',
    title: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    ],
    category: 'Audio',
    sizes: ['Black', 'Silver', 'Midnight Blue'],
    description:
      'Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery, multipoint connection, speak-to-chat.',
    stock: 50,
    rating: 4.8,
    reviewCount: 5200,
  },
  {
    _id: '6',
    title: 'AirPods Pro 2 (USB-C)',
    brand: 'Apple',
    price: 24900,
    originalPrice: 24900,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
    ],
    category: 'Audio',
    sizes: ['Standard'],
    description:
      'Active Noise Cancellation with Adaptive Transparency. Personalized Spatial Audio with H2 chip and USB-C charging.',
    stock: 80,
    rating: 4.7,
    reviewCount: 4100,
  },
  {
    _id: '7',
    title: 'JBL Charge 5 Bluetooth Speaker',
    brand: 'JBL',
    price: 14999,
    originalPrice: 18999,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    ],
    category: 'Audio',
    sizes: ['Black', 'Blue', 'Red', 'Teal'],
    description:
      'Portable Bluetooth speaker with 20 hours playtime, IP67 waterproof, dual passive bass radiators, and power bank feature.',
    stock: 60,
    rating: 4.6,
    reviewCount: 2800,
  },
  {
    _id: '8',
    title: 'Samsung 55" Crystal 4K Smart TV',
    brand: 'Samsung',
    price: 42990,
    originalPrice: 52990,
    discount: 19,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    ],
    category: 'TV',
    sizes: ['43"', '50"', '55"', '65"'],
    description:
      'Crystal 4K UHD resolution with PurColor technology, Crystal Processor 4K, and Tizen smart TV platform.',
    stock: 35,
    rating: 4.5,
    reviewCount: 1950,
  },
  {
    _id: '9',
    title: 'Apple Watch Series 9 GPS',
    brand: 'Apple',
    price: 41900,
    originalPrice: 41900,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
    ],
    category: 'Wearables',
    sizes: ['41mm', '45mm'],
    description:
      'Advanced health monitoring with blood oxygen, ECG, temperature sensing. S9 SiP with double tap gesture.',
    stock: 45,
    rating: 4.7,
    reviewCount: 3200,
  },
  {
    _id: '10',
    title: 'Canon EOS R50 Mirrorless Camera',
    brand: 'Canon',
    price: 68990,
    originalPrice: 79990,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    ],
    category: 'Cameras',
    sizes: ['Body Only', 'With 18-45mm Lens', 'With 18-150mm Lens'],
    description:
      '24.2MP APS-C CMOS sensor, DIGIC X processor, 4K 30fps video, subject detection AF, and vlogging-ready design.',
    stock: 20,
    rating: 4.6,
    reviewCount: 680,
  },
  {
    _id: '11',
    title: 'OnePlus 12 5G',
    brand: 'OnePlus',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    ],
    category: 'Mobiles',
    sizes: ['128GB', '256GB', '512GB'],
    description:
      'Snapdragon 8 Gen 3, 6.82" 2K 120Hz ProXDR display, 50MP Hasselblad camera, 100W SUPERVOOC charging.',
    stock: 55,
    rating: 4.6,
    reviewCount: 1800,
  },
  {
    _id: '12',
    title: 'Logitech MX Master 3S Mouse',
    brand: 'Logitech',
    price: 8995,
    originalPrice: 10995,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    ],
    category: 'Laptops',
    sizes: ['Graphite', 'Pale Gray'],
    description:
      'Wireless performance mouse with 8K DPI sensor, MagSpeed scroll wheel, quiet clicks, and USB-C fast charging.',
    stock: 70,
    rating: 4.8,
    reviewCount: 4500,
  },
  {
    _id: '13',
    title: 'Sony HT-S400 2.1ch Soundbar',
    brand: 'Sony',
    price: 18990,
    originalPrice: 24990,
    discount: 24,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
    ],
    category: 'TV',
    sizes: ['Standard'],
    description:
      'Powerful 2.1ch soundbar with wireless subwoofer, S-Force PRO surround, Bluetooth 5.0, and HDMI ARC.',
    stock: 40,
    rating: 4.4,
    reviewCount: 1200,
  },
  {
    _id: '14',
    title: 'Galaxy Watch 6 Classic',
    brand: 'Samsung',
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
    ],
    category: 'Wearables',
    sizes: ['43mm', '47mm'],
    description:
      'Premium smartwatch with rotating bezel, BioActive sensor, sapphire crystal glass, and Wear OS by Google.',
    stock: 35,
    rating: 4.5,
    reviewCount: 1450,
  },
  {
    _id: '15',
    title: 'GoPro HERO12 Black',
    brand: 'GoPro',
    price: 39990,
    originalPrice: 44990,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
    ],
    category: 'Cameras',
    sizes: ['Standard', 'Creator Edition'],
    description:
      '5.3K60 video, 27MP photos, HyperSmooth 6.0 stabilization, 10-bit color, HDR, and waterproof up to 33ft.',
    stock: 25,
    rating: 4.7,
    reviewCount: 920,
  },
  {
    _id: '16',
    title: 'Razer BlackWidow V4 Pro Keyboard',
    brand: 'Razer',
    price: 22999,
    originalPrice: 27999,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400',
    ],
    category: 'Laptops',
    sizes: ['Green Switch', 'Yellow Switch'],
    description:
      'Mechanical gaming keyboard with Razer Green switches, command dial, Chroma RGB, and magnetic wrist rest.',
    stock: 50,
    rating: 4.5,
    reviewCount: 780,
  },
  {
    _id: '17',
    title: 'Logitech C920 HD Pro Webcam',
    brand: 'Logitech',
    price: 7499,
    originalPrice: 8999,
    discount: 17,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400',
    ],
    category: 'Laptops',
    sizes: ['Standard'],
    description:
      'Full HD 1080p webcam with dual stereo mics, auto light correction, and 78° field of view for clear video calls.',
    stock: 90,
    rating: 4.4,
    reviewCount: 6200,
  },
  {
    _id: '18',
    title: 'Samsung Galaxy Buds3 Pro',
    brand: 'Samsung',
    price: 17999,
    originalPrice: 19999,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    ],
    category: 'Audio',
    sizes: ['Silver', 'White'],
    description:
      'Intelligent ANC with 2-way speakers, 360 Audio, IP57 water resistance, and 30 hours total battery life.',
    stock: 65,
    rating: 4.5,
    reviewCount: 1600,
  },
  {
    _id: '19',
    title: 'Manfrotto Befree Advanced Tripod',
    brand: 'Manfrotto',
    price: 16990,
    originalPrice: 21990,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400',
    ],
    category: 'Cameras',
    sizes: ['Aluminium', 'Carbon Fiber'],
    description:
      'Travel tripod with ball head, 150cm max height, 8kg load capacity, and quick-release plate. Folds to 40cm.',
    stock: 30,
    rating: 4.6,
    reviewCount: 520,
  },
  {
    _id: '20',
    title: 'Sony Bravia 65" 4K OLED TV',
    brand: 'Sony',
    price: 189990,
    originalPrice: 229990,
    discount: 17,
    images: [
      'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=400',
    ],
    category: 'TV',
    sizes: ['55"', '65"', '77"'],
    description:
      'Cognitive Processor XR with OLED panel, Dolby Vision & Atmos, Acoustic Surface Audio+, and Google TV.',
    stock: 10,
    rating: 4.9,
    reviewCount: 450,
  },
];

export const mockPromoBanners: PromoBanner[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    subtitle:
      'The most powerful iPhone ever with A17 Pro chip and titanium design.',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    backgroundColor: '#0D47A1',
    textColor: '#FFFFFF',
    discount: '16% OFF | BUY NOW',
    productId: '1',
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5',
    subtitle: 'Industry-leading noise cancellation with 30-hour battery life.',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    backgroundColor: '#FF6B35',
    textColor: '#FFFFFF',
    discount: '23% OFF',
    productId: '5',
  },
  {
    id: '3',
    title: 'MacBook Air M3',
    subtitle: 'Supercharged by M3 chip with up to 18 hours of battery life.',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    backgroundColor: '#004E89',
    textColor: '#FFFFFF',
    discount: '10% OFF',
    productId: '3',
  },
  {
    id: '4',
    title: 'Galaxy Watch 6 Classic',
    subtitle: 'Advanced health tracking with stunning AMOLED display.',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
    backgroundColor: '#1A237E',
    textColor: '#FFFFFF',
    discount: '13% OFF',
    productId: '14',
  },
  {
    id: '5',
    title: 'Galaxy Tab S9 Ultra',
    subtitle: 'Premium 14.6" AMOLED tablet with Snapdragon 8 Gen 2 and S Pen.',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    backgroundColor: '#F3E5F5',
    textColor: '#1A1A1A',
    discount: '20% OFF',
    productId: '2',
  },
  {
    id: '6',
    title: 'AirPods Pro 2',
    subtitle: 'Active Noise Cancellation with Adaptive Transparency and H2 chip.',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
    backgroundColor: '#00838F',
    textColor: '#FFFFFF',
    discount: 'NEW ARRIVAL',
    productId: '6',
  },
];

export const mockCategories = [
  { id: '1', name: 'Mobiles' },
  { id: '2', name: 'Laptops' },
  { id: '3', name: 'Audio' },
  { id: '4', name: 'TV' },
  { id: '5', name: 'Wearables' },
  { id: '6', name: 'Cameras' },
];

export const mockCartItems: CartItemType[] = [
  { product: mockProducts[0], quantity: 1 }, // iPhone 15 Pro Max
  { product: mockProducts[4], quantity: 1 }, // Sony WH-1000XM5
  { product: mockProducts[2], quantity: 1 }, // MacBook Air M3
  { product: mockProducts[6], quantity: 1 }, // JBL Charge 5
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((p) => p._id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category === 'All') return mockProducts;
  return mockProducts.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
};
