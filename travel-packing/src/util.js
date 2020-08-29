import { v4 as uuidv4 } from "uuid";

export const getGuid = () => uuidv4();

export const blurOnKey = (event) => {
  const { code } = event;
  if (code === "Enter" || code === "Escape" || code === "Tab")
    event.target().blur();
};

export const sortOnName = (array) =>
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase())
  );
