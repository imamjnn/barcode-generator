export type ResponseAPI<R = any> = Promise<R | null>;

export type ReportTransList = {
  id: number;
  transaction_code: string;
  total_price: number;
  total_qty: number;
  nominal_cash: number;
  total_discount: number;
  ppn: number;
  status: string;
  created: string;
  updated: string;
  member_id: number;
  user_id: number;
  cashier_name: string;
  member_name: null | string;
};

// product trans
export interface ReporProductTransData {
  total_sold: number;
  total_discount: number;
  total_purchase: number;
  total_stock_reduced: number;
  total_profit: number;
  total_transaction: number;
  debt: {
    total_price: number;
    total_nominal_cash: number;
    total_debt: number;
  };
  transactions: ReportTransList[];
}

export type ReporProductTransResults = {
  status: number;
  message: string;
  data: ReporProductTransData;
};

export type ReporProductTransResponse = ResponseAPI<ReporProductTransResults>;
