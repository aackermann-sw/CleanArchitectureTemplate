export interface IProduct {
  id?: number;
  barcode: string;
  description: string;
  name: string;
  productCategory: any;
  rate: number;
}


export interface IResponse {
  succeeded: boolean;
  message: string;
  errors: any;
  data: any;
}
