
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Smartphone, Laptop, Tablet } from 'lucide-react';
import { Product, ProductSelectorProps } from '@/types/product';
import { productApi } from '@/services/productApi';
import { useToast } from '@/hooks/use-toast';

export const ProductSelector: React.FC<ProductSelectorProps> = ({ onProductSelect }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState({
    brands: false,
    categories: false,
    products: false
  });

  const { toast } = useToast();

  // Load brands on component mount
  useEffect(() => {
    const loadBrands = async () => {
      setLoading(prev => ({ ...prev, brands: true }));
      try {
        const brandList = await productApi.getBrands();
        setBrands(brandList);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load brands. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, brands: false }));
      }
    };

    loadBrands();
  }, [toast]);

  // Load categories when brand changes
  useEffect(() => {
    if (!selectedBrand) {
      setCategories([]);
      setProducts([]);
      setSelectedCategory('');
      setSelectedProduct(null);
      return;
    }

    const loadCategories = async () => {
      setLoading(prev => ({ ...prev, categories: true }));
      try {
        const categoryList = await productApi.getCategories(selectedBrand);
        setCategories(categoryList);
        setSelectedCategory('');
        setProducts([]);
        setSelectedProduct(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };

    loadCategories();
  }, [selectedBrand, toast]);

  // Load products when category changes
  useEffect(() => {
    if (!selectedBrand || !selectedCategory) {
      setProducts([]);
      setSelectedProduct(null);
      return;
    }

    const loadProducts = async () => {
      setLoading(prev => ({ ...prev, products: true }));
      try {
        const productList = await productApi.getProducts(selectedBrand, selectedCategory);
        setProducts(productList);
        setSelectedProduct(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, products: false }));
      }
    };

    loadProducts();
  }, [selectedBrand, selectedCategory, toast]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phones':
        return <Smartphone className="h-4 w-4" />;
      case 'laptops':
        return <Laptop className="h-4 w-4" />;
      case 'tablets':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    if (onProductSelect) {
      onProductSelect(selectedBrand, selectedCategory, product);
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand Selection */}
      <div className="space-y-2">
        <Label htmlFor="brand-select">Select Brand</Label>
        <Select 
          value={selectedBrand} 
          onValueChange={setSelectedBrand}
          disabled={loading.brands}
        >
          <SelectTrigger id="brand-select">
            <SelectValue placeholder={loading.brands ? "Loading brands..." : "Choose a brand"} />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Selection */}
      {selectedBrand && (
        <div className="space-y-2">
          <Label htmlFor="category-select">Select Category</Label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            disabled={loading.categories}
          >
            <SelectTrigger id="category-select">
              <SelectValue placeholder={loading.categories ? "Loading categories..." : "Choose a category"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(category)}
                    <span className="capitalize">{category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Product List */}
      {selectedCategory && (
        <div className="space-y-2">
          <Label>Select Product</Label>
          {loading.products ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading products...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-3">
              {products.map((product) => (
                <Card 
                  key={product.id}
                  className={`cursor-pointer transition-all ${
                    selectedProduct?.id === product.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">Model: {product.model}</p>
                        <p className="text-sm text-gray-500">Year: {product.year}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(selectedCategory)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No products found for {selectedBrand} {selectedCategory}.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedCategory('');
                  }}
                >
                  Try Different Selection
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Selected Product Summary */}
      {selectedProduct && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800 mb-2">Selected Device</h3>
            <div className="text-sm text-green-700">
              <p><strong>Brand:</strong> {selectedBrand}</p>
              <p><strong>Category:</strong> {selectedCategory}</p>
              <p><strong>Product:</strong> {selectedProduct.name}</p>
              <p><strong>Model:</strong> {selectedProduct.model}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductSelector;
