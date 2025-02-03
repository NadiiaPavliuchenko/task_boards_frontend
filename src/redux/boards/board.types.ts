export type Board = {
  _id: string;
  name: string;
  todo: string[];
  inProgress: string[];
  done: string[];
};

export type BoardData = {
  name: string;
};

export type StatusBody = {
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
};

export type OrderBody = {
  crads: string[];
};
