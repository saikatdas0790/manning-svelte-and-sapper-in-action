import { v4 as uuidv4 } from "uuid";

interface NameType {
  name: string;
}

export const getGuid = (): string => uuidv4();

export const blurOnKey = (event: KeyboardEvent): void => {
  const { code } = event;
  if (code === "Enter" || code === "Escape" || code === "Tab") {
    (event.target as HTMLElement).blur();
  }
};

export const sortOnName = <T extends NameType>(array: T[]): T[] =>
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase()),
  );
