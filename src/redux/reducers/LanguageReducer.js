import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import AppLanguages from "../../helpers/AppLanguages";

export const changeAppLanguage = createAsyncThunk(
  "LanguageReducer/changeAppLanguage",
  async (payload) => {
    return payload;
  }
);

const initialState = {
  lng: AppLanguages.english,
};

const LanguageReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeAppLanguage.fulfilled, (state, action) => {
    return { ...state, lng: action.payload };
  });
});

export default LanguageReducer;
