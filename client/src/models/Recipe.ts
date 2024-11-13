export interface Recipe {
  id: number;
  title: string;
  picture: string;
  ingredients?: string[];
  steps?: string[];
  author: string;
}
