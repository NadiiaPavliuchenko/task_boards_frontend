export type Card = {
  _id: string;
  boardId: string;
  title: string;
  description?: string;
  status: string;
  order: number;
};

export type CardData = {
  boardId: string;
  title: string;
  description?: string;
  status: string;
  order: number;
};

export type CardStatus = {
  _id: string;
  status: string;
};
