import api from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBoards = createAsyncThunk(
  "boards/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/board");
      // return response.data._doc;
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);
