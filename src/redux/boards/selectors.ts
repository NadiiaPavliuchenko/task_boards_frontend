import { RootState } from "../store";

export const selectBoards = (state: RootState) => state.boards.items;

export const selectCurBoard = (state: RootState) => state.boards.curBoard;
