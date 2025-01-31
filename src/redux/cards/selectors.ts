import { RootState } from "../store";

export const selectCards = (state: RootState) => state.cards.items;
