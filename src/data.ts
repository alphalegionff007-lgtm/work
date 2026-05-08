import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'coffee-vanguard-backpack',
    name: 'Coffee Vanguard Backpack',
    price: 12500,
    category: 'Backpacks',
    collection: 'Foundry',
    description: 'A revolutionary backpack designed for the modern nomad. Crafted from Italian full-grain leather that ages beautifully over time.',
    images: [
      'https://picsum.photos/seed/backpack1/800/800',
      'https://picsum.photos/seed/backpack-side/800/800',
      'https://picsum.photos/seed/backpack-int/800/800',
      'https://picsum.photos/seed/backpack-detail/800/800'
    ],
    colors: [{ name: 'Coffee Brown', hex: '#4B3621' }, { name: 'Black', hex: '#000000' }],
    isNew: true,
    isBestseller: true,
    dimensions: '18" x 12" x 6"',
    materials: 'Full-grain Italian Leather, Brass Hardware'
  },
  {
    id: 'regent-coat-wallet-mahogany',
    name: 'Regent Coat Wallet – Mahogany',
    price: 4800,
    category: 'Wallets',
    collection: 'Bastion',
    description: 'Ultra-slim design meets maximum utility. Fits up to 12 cards and bills with ease.',
    images: [
      'https://picsum.photos/seed/wallet-m/800/800',
      'https://picsum.photos/seed/wallet-side/800/800',
      'https://picsum.photos/seed/wallet-int/800/800',
      'https://picsum.photos/seed/wallet-detail/800/800'
    ],
    colors: [{ name: 'Mahogany', hex: '#4A2C2A' }],
    isBestseller: true
  },
  {
    id: 'regent-coat-wallet-saddle-tan',
    name: 'Regent Coat Wallet – Saddle Tan',
    price: 4800,
    category: 'Wallets',
    collection: 'Bastion',
    description: 'Classic tan aesthetics for the refined individual.',
    images: ['https://picsum.photos/seed/wallet-tan/800/800'],
    colors: [{ name: 'Saddle Tan', hex: '#8B5E3C' }]
  },
  {
    id: 'nomad-vanguard-backpack',
    name: 'Nomad Vanguard Backpack',
    price: 13500,
    category: 'Backpacks',
    collection: 'Foundry',
    description: 'The ultimate urban companion. Minimalist exterior, organized interior.',
    images: ['https://picsum.photos/seed/nomad-bp/800/800'],
    colors: [{ name: 'Midnight Navy', hex: '#0D1B3E' }],
    isNew: true
  },
  {
    id: 'classic-leather-briefcase-black',
    name: 'Classic Leather Briefcase – Black',
    price: 18000,
    category: 'Briefcases',
    collection: 'Bastion',
    description: 'The standard of professional excellence.',
    images: ['https://picsum.photos/seed/briefcase-b/800/800'],
    colors: [{ name: 'Black', hex: '#000000' }]
  },
  {
    id: 'voyager-duffle-bag-cognac',
    name: 'Voyager Duffle Bag – Cognac',
    price: 22000,
    category: 'Duffle Bags',
    collection: 'Foundry',
    description: 'Built for weekend escapes and lifelong memories.',
    images: ['https://picsum.photos/seed/duffle-c/800/800'],
    colors: [{ name: 'Cognac', hex: '#9E5B31' }],
    isBestseller: true
  },
  {
    id: 'slim-cardholder-dark-brown',
    name: 'Slim Cardholder – Dark Brown',
    price: 2200,
    category: 'Wallets',
    collection: 'Bastion',
    description: 'For when you only carry the essentials.',
    images: ['https://picsum.photos/seed/cardholder-db/800/800'],
    colors: [{ name: 'Dark Brown', hex: '#3E2723' }]
  },
  {
    id: 'executive-tote-mahogany',
    name: 'Executive Tote – Mahogany',
    price: 16500,
    category: 'Briefcases',
    collection: 'Foundry',
    description: 'Effortless style for the corporate leader.',
    images: ['https://picsum.photos/seed/tote-m/800/800'],
    colors: [{ name: 'Mahogany', hex: '#4A2C2A' }]
  },
  {
    id: 'weekend-duffle-saddle-tan',
    name: 'Weekend Duffle – Saddle Tan',
    price: 19500,
    category: 'Duffle Bags',
    collection: 'Foundry',
    description: 'Spacious, durable, and unmistakably AMNT.',
    images: ['https://picsum.photos/seed/duffle-tan/800/800'],
    colors: [{ name: 'Saddle Tan', hex: '#8B5E3C' }]
  },
  {
    id: 'minimalist-bifold-wallet-navy',
    name: 'Minimalist Bifold Wallet – Navy',
    price: 3500,
    category: 'Wallets',
    collection: 'Bastion',
    description: 'Navy leather that develops a deep patina.',
    images: ['https://picsum.photos/seed/wallet-navy/800/800'],
    colors: [{ name: 'Navy', hex: '#0D1B3E' }]
  }
];
