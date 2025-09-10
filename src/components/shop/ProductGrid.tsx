
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/pages/Shop';

interface FilterState {
  category: string;
  brand: string;
  deviceType: string;
  priceRange: [number, number];
}

interface ProductGridProps {
  filters: FilterState;
  onAddToCart: (product: Product) => void;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Lightning Cable',
    price: 29.99,
    originalPrice: 39.99,
  image: '',
    rating: 4.8,
    reviews: 1250,
    category: 'Cables',
    brand: 'Apple',
    deviceType: 'Smartphones',
    inStock: true,
    description: 'Genuine Apple Lightning cable for iPhone 15 Pro'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Fast Charger',
    price: 49.99,
    originalPrice: 59.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 890,
    category: 'Chargers',
    brand: 'Samsung',
    deviceType: 'Smartphones',
    inStock: true,
    description: '45W Super Fast Charging adapter'
  },
  {
    id: '3',
    name: 'MacBook Pro 16" Replacement Screen',
    price: 299.99,
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 156,
    category: 'Screens',
    brand: 'Apple',
    deviceType: 'Laptops',
    inStock: true,
    description: 'High-quality replacement screen for MacBook Pro 16"'
  },
  {
    id: '4',
    name: 'Universal Phone Battery Pack',
    price: 79.99,
    originalPrice: 99.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 567,
    category: 'Batteries',
    brand: 'Universal',
    deviceType: 'Smartphones',
    inStock: true,
    description: '10000mAh portable battery pack with wireless charging'
  },
  {
    id: '5',
    name: 'iPad Pro Protective Cover',
    price: 39.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 234,
    category: 'Covers',
    brand: 'Apple',
    deviceType: 'Tablets',
    inStock: true,
    description: 'Premium leather cover for iPad Pro'
  },
  {
    id: '6',
    name: 'OnePlus Warp Charge Cable',
    price: 24.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 445,
    category: 'Cables',
    brand: 'OnePlus',
    deviceType: 'Smartphones',
    inStock: false,
    description: 'Official OnePlus Warp Charge USB-C cable'
  }
];

export const ProductGrid: React.FC<ProductGridProps> = ({ filters, onAddToCart }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesDeviceType = !filters.deviceType || product.deviceType === filters.deviceType;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      
      return matchesCategory && matchesBrand && matchesDeviceType && matchesPrice;
    });
  }, [filters]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div id="products" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Products ({filteredProducts.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          <p className="text-gray-400">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};
