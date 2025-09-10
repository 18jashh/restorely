
import { Product, ProductData } from '@/types/product';
import productData from '@/data/products.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productApi = {
  // Get all brands
  async getBrands(): Promise<string[]> {
    await delay(300);
    return Object.keys(productData as ProductData);
  },

  // Get categories for a specific brand
  async getCategories(brand: string): Promise<string[]> {
    await delay(200);
    const data = productData as ProductData;
    return data[brand] ? Object.keys(data[brand]) : [];
  },

  // Get products for a specific brand and category
  async getProducts(brand: string, category?: string): Promise<Product[]> {
    await delay(400);
    const data = productData as ProductData;
    
    if (!data[brand]) {
      return [];
    }

    if (category) {
      return data[brand][category] || [];
    }

    // Return all products for the brand if no category specified
    return Object.values(data[brand]).flat();
  },

  // Search products across all brands
  async searchProducts(query: string): Promise<Product[]> {
    await delay(500);
    const data = productData as ProductData;
    const allProducts: Product[] = [];
    
    Object.values(data).forEach(brandData => {
      Object.values(brandData).forEach(categoryProducts => {
        allProducts.push(...categoryProducts);
      });
    });

    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.model.toLowerCase().includes(query.toLowerCase())
    );
  }
};
