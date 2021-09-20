import { Category } from "./category";

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface RecordForm {
  title: string;
  amount: number;
  category_id: number | null;
  recordId?: number;
}

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}
