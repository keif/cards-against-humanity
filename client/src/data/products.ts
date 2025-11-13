export interface Product {
  id: string;
  title: string;
  url: string;
  category: 'base' | 'expansion' | 'bundle' | 'mini' | 'special' | 'storage';
  featured?: boolean;
  description?: string;
  image?: string; // Path to product image in /public/images/products/
}

export const products: Product[] = [
  {
    id: 'base-game',
    title: 'Cards Against Humanity',
    url: 'https://amzn.to/47T7TiE',
    image: '/images/products/base-game.jpg',
    category: 'base',
    featured: true,
    description: 'The original party game for horrible people'
  },
  {
    id: 'more-cards',
    title: 'More Cards Against Humanity',
    url: 'https://amzn.to/488f6g5',
    image: '/images/products/more-cards.jpg',
    category: 'expansion',
    featured: true,
    description: '600-card Essential Expansion • Includes The Best Cards from The Red, Blue, & Green Boxes'
  },
  {
    id: 'nasty-bundle',
    title: 'Nasty Bundle',
    url: 'https://amzn.to/4r09xba',
    image: '/images/products/nasty-bundle.jpg',
    category: 'bundle',
    description: '6 Nasty Themed Packs + 10 All-New Cards'
  },
  {
    id: 'ultimate-expansion',
    title: 'Ultimate Expansion',
    url: 'https://amzn.to/4hREt9e',
    image: '/images/products/ultimate-expansion.jpg',
    category: 'expansion',
    description: 'Nearly 2,000 Cards Pre-Packed in Our Boks Storage Case'
  },
  {
    id: 'hot-box',
    title: 'Hot Box',
    url: 'https://amzn.to/4hYAacn',
    image: '/images/products/hot-box.jpg',
    category: 'expansion',
    featured: true,
    description: '300-Card Expansion • Most Recent one'
  },
  {
    id: 'family-edition',
    title: 'Family Edition',
    url: 'https://amzn.to/49LMcn9',
    image: '/images/products/family-edition.jpg',
    category: 'base',
    description: 'Ages 8+ • A party game for mature kids and immature adults'
  },
  {
    id: 'everything-box',
    title: 'Everything Box',
    url: 'https://amzn.to/49gBaq4',
    image: '/images/products/everything-box.jpg',
    category: 'expansion',
    description: '300-Card Expansion • Seamlessly Expand Your Deck'
  },
  {
    id: 'hidden-gems-bundle',
    title: 'Hidden Gems Bundle',
    url: 'https://amzn.to/489Q2Fu',
    image: '/images/products/hidden-gems-bundle.jpg',
    category: 'bundle',
    description: '6 cool themed packs + 10 all-new cards'
  },
  {
    id: 'pop-culture-bundle',
    title: 'Pop Culture Bundle',
    url: 'https://amzn.to/4nPDLe8',
    image: '/images/products/pop-culture-bundle.jpg',
    category: 'bundle',
    description: '6 Popular Themed Packs + 10 All-New Cards'
  },
  {
    id: 'nerd-bundle',
    title: 'Nerd Bundle',
    url: 'https://amzn.to/4i5hp75',
    image: '/images/products/nerd-bundle.jpg',
    category: 'bundle',
    description: '6 Nerdy Themed Packs + 10 All-New Cards'
  },
  {
    id: 'out-of-line',
    title: 'Out of Line',
    url: 'https://amzn.to/49f69CJ',
    image: '/images/products/out-of-line.jpg',
    category: 'special',
    description: 'New Expansion + A New Way to Play Where You Rank Your Cards'
  },
  {
    id: 'canadian-edition',
    title: 'Canadian Edition',
    url: 'https://amzn.to/49OqizL',
    image: '/images/products/canadian-edition.jpg',
    category: 'base',
    description: 'Canadian Edition'
  },
  {
    id: '2000s-nostalgia',
    title: '2000s Nostalgia Pack',
    url: 'https://amzn.to/49PBXyd',
    image: '/images/products/2000s-nostalgia.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: 'tiny-edition',
    title: 'Tiny Edition',
    url: 'https://amzn.to/3WQS5Ik',
    image: '/images/products/tiny-edition.jpg',
    category: 'special',
    description: 'Miniature Main Game with 600 Ridiculously Tiny Cards'
  },
  {
    id: 'tales-vol-1',
    title: 'Tales Vol. 1',
    url: 'https://amzn.to/47RwWm6',
    image: '/images/products/tales-vol-1.jpg',
    category: 'special',
    description: 'A Horrible Fill-in-The-Blank Story Game to Play with Your CAH Cards'
  },
  {
    id: 'jew-pack',
    title: 'Jew Pack',
    url: 'https://amzn.to/4oZ7IJA',
    image: '/images/products/jew-pack.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: '90s-nostalgia',
    title: '90s Nostalgia Pack',
    url: 'https://amzn.to/4hVkMxr',
    image: '/images/products/90s-nostalgia.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: 'ass-pack',
    title: 'Ass Pack',
    url: 'https://amzn.to/4nS5r1Q',
    image: '/images/products/ass-pack.jpg',
    category: 'mini',
    description: 'Mini Expansion'
  },
  {
    id: 'weed-pack',
    title: 'Weed Pack',
    url: 'https://amzn.to/4r2qjGH',
    image: '/images/products/weed-pack.jpg',
    category: 'mini',
    description: 'Mini Expansion'
  },
  {
    id: 'saves-america',
    title: 'Saves America Pack',
    url: 'https://amzn.to/3Jvs4vb',
    image: '/images/products/saves-america.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: 'food-pack',
    title: 'Food Pack',
    url: 'https://amzn.to/47QF4n7',
    image: '/images/products/food-pack.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: 'family-glow',
    title: 'Family Edition: Glow in The Dark Box',
    url: 'https://amzn.to/4hWqJdw',
    image: '/images/products/family-glow.jpg',
    category: 'expansion',
    description: '300-Card Expansion'
  },
  {
    id: 'period-pack',
    title: 'Period Pack',
    url: 'https://amzn.to/4i1QxF2',
    image: '/images/products/period-pack.jpg',
    category: 'mini',
    description: 'Mini expansion'
  },
  {
    id: 'boks-storage',
    title: 'Bōks Storage Case',
    url: 'https://amzn.to/47PbcaG',
    image: '/images/products/boks-storage.jpg',
    category: 'storage',
    featured: true,
    description: 'Official Premium Storage Case • Holds Over 3,500 Cards'
  }
];

export const getCategoryName = (category: Product['category']): string => {
  const categoryNames: Record<Product['category'], string> = {
    base: 'Base Game',
    expansion: 'Expansions',
    bundle: 'Bundles',
    mini: 'Mini Packs',
    special: 'Special Editions',
    storage: 'Storage & Accessories'
  };
  return categoryNames[category];
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getProductsByCategory = (): Map<Product['category'], Product[]> => {
  const categoryMap = new Map<Product['category'], Product[]>();

  products.forEach(product => {
    const existing = categoryMap.get(product.category) || [];
    categoryMap.set(product.category, [...existing, product]);
  });

  return categoryMap;
};
