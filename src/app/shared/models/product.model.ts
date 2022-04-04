export interface IProduct {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
  category?: ICategory;
}

export interface CreateProductDto {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryDto {
  name: string;
}

export interface IInventory {
  id: number;
  productId: number;
  count: number;
  product?: IProduct;
}
