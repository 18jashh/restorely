
export interface Product {
  id: string;
  name: string;
  model: string;
  year: number;
}

export interface ProductData {
  [brand: string]: {
    [category: string]: Product[];
  };
}

export interface ProductSelectorProps {
  onProductSelect?: (brand: string, category: string, product: Product) => void;
}
