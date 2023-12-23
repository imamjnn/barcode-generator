export type ResponseAPI<R = any> = Promise<R | null>;

export type ProductPrices = {
  type: string;
  price: number;
  discount: number;
};

// products
export interface ProductData {
  id: number;
  product_code: number;
  name: string;
  category: string;
  unit: string;
  photo: string | null;
  stock: number;
  stock_limit: number;
  stock_opname: number;
  created: string;
  purchase_price: number;
  prices: ProductPrices[];
  category_id: number;
  product_unit_id: number;
  time_promotion: Date | null;
}

export type ProductListResults = {
  status: number;
  message: string;
  total: number;
  page: number;
  totalPage: number;
  limit: number;
  data: ProductData[];
};

export type ProductListResponse = ResponseAPI<ProductListResults>;

export type ProductSelectedParams = {
  name: string;
  price: number;
  product_code: number;
};
