export interface Item {
  id: string;
  name: string;
  packed: boolean;
}

export interface Category {
  id: string;
  name: string;
  items: {
    [key: string]: Item;
  };
}

export type ShowValues = "all" | "packed" | "unpacked";
