export type Card = {
  _id: string;
  title: string;
  description?: string;
};

export type CreateCardData = {
  boardId: string;
  title: string;
  description?: string;
};

export type CardData = {
  title: string;
  description?: string;
};
