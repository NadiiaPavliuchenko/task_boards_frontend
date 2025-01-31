import { v4 as uuidv4 } from "uuid";

export const generateHashId = (): string => {
  const uuid = uuidv4().replace(/-/g, "");

  const length = Math.random() * (20 - 9) + 9;

  return uuid.slice(0, length);
};
