import api from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BoardData,
  CreateBoardData,
  StatusBody,
  OrderBody
} from "./board.types";

export const getAllBoards = createAsyncThunk(
  "boards/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/board");
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const getBoardById = createAsyncThunk(
  "boards/getBoardById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/board/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/create",
  async (data: BoardData, thunkAPI) => {
    try {
      const response = await api.post("/board", data);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/update",
  async (data: CreateBoardData, thunkAPI) => {
    try {
      const { name } = data;
      const response = await api.patch(`/board/${data._id}`, { name });
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const chandeCardStatus = createAsyncThunk(
  "boards/changeColumns",
  async ({ id, body }: { id: string; body: StatusBody }, thunkAPI) => {
    try {
      const response = await api.patch(`/board/${id}/move-card`, body);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const chandeCardsOrder = createAsyncThunk(
  "boards/changeOrder",
  async (
    { id, columnId, body }: { id: string; columnId: string; body: OrderBody },
    thunkAPI
  ) => {
    try {
      const response = await api.patch(
        `/board/${id}/columns/${columnId}`,
        body
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(`/board/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);
