import { Profile } from './profile.model';

export interface Product {
  barcode: string;
  name: string;
  description: string;
  rate: number;
  author: Profile;
}
