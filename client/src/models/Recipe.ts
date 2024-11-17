export interface Recipe {
  id: number;
  title: string;
  content: string;
  author?: string;
  picture?: string;
}

export interface RecipeParams {
  title: string;
  content: string;
  picture?: File;
}
