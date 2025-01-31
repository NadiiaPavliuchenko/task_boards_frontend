export type Card = {
  _id: string;
  boardId: string;
  title: string;
  description?: string;
  status: "ToDo" | "In Progress" | "Done";
  order: number;
};

export type CardData = {
  boardId: string;
  title: string;
  description?: string;
  status: "ToDo" | "In Progress" | "Done";
  order: number;
};

export type CardStatus = {
  _id: string;
  status: "ToDo" | "In Progress" | "Done";
};
