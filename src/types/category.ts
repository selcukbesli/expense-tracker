export interface Category {
  id: number;
  name: string;
  type: "expense" | "income";
  color: string;
}

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
  id?: number | null;
}

export interface UpdateArgs {
  form: Partial<CategoryForm>;
  categoryId: number;
}
