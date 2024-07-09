// types.ts
export interface Order {
  order_id: string;
  customer: string;
  date: string;
  time: string;
  mode: string;
  total: string;
  payment_method: string;
  status: string;
}
