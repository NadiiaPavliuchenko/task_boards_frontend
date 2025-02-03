import api from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Card, CreateCardData } from "./card.types";

export const getCardsById = createAsyncThunk(
  "cards/getAll",
  async (ids: string[], thunkAPI) => {
    try {
      const responses = await Promise.all(
        ids.map((id) => api.get(`/card/${id}`))
      );
      return responses.map((res) => res.data);
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
  async (data: CreateCardData, thunkAPI) => {
    try {
      const response = await api.post("/card", data);
      console.log(response.data);
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
      const { title, description } = data;
      const response = await api.put(`/card/${data._id}`, {
        title,
        description
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

export const deleteCard = createAsyncThunk(
  "cards/delete",
  async ({ id, boardId }: { id: string; boardId: string }, thunkAPI) => {
    try {
      const response = await api.delete(`/card/${id}/board/${boardId}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);
