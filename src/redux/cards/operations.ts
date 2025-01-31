import api from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CardData, Card, CardStatus } from "./card.types";

export const getCardsByBoard = createAsyncThunk(
  "cards/getAll",
  async (boardId: string, thunkAPI) => {
    try {
      const response = await api.get(`/card${boardId}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const createCard = createAsyncThunk(
  "cards/create",
  async (data: CardData, thunkAPI) => {
    try {
      const response = await api.post("/card", data);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/update",
  async (data: Card, thunkAPI) => {
    try {
      const { title, description, status, order } = data;
      const response = await api.put(`/card/${data._id}`, {
        title,
        description,
        status,
        order
      });
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const updateCardStatus = createAsyncThunk(
  "cards/updateStatus",
  async (data: CardStatus, thunkAPI) => {
    try {
      const { _id, status } = data;
      const response = await api.patch(`/card/${_id}`, { status });
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(`/card/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);
