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

export interface DragAndDrop {
  drag: (event: DragEvent, categoryId: string, itemId: string) => void;
  drop: (event: DragEvent, categoryId: string) => void;
}
