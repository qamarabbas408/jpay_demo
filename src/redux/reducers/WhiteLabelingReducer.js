import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { WhiteLabelingApiServices } from "../actions/WhiteLabelingApiServices";
import { stopLoaderAndEmptyErrors } from "./AuthenticationReducer";

const initialState = {
  loading: false,
  error: null,
  whiteLabelling: null,
};

export const whiteLabelingRequest = createAsyncThunk(
  "WhiteLabelingReducer/whiteLabelingRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await WhiteLabelingApiServices.apiWhiteLabelingRequest(
        payload
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const WhiteLabelingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(stopLoaderAndEmptyErrors.fulfilled, (state, _) => {
      return { ...state, loading: false, error: null };
    })

    .addCase(whiteLabelingRequest.pending, (state, action) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(whiteLabelingRequest.fulfilled, (state, action) => {
      return {
        ...state,
        whiteLabelling: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(whiteLabelingRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addDefaultCase((state, action) => {});
});

export default WhiteLabelingReducer;
