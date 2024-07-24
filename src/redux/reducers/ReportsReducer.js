import { createAsyncThunk, createReducer, current } from "@reduxjs/toolkit";
import { ReportsApiServices } from "../actions/ReportsApiServices";
import {
  logoutRequest,
  stopLoaderAndEmptyErrors,
  userEmployeeRequest,
  clearStore,
} from "./AuthenticationReducer";

export const getReportsRequest = createAsyncThunk(
  "ReportsReducer/getReportsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ReportsApiServices.apiGetReportsRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const clickThroughRateRequest = createAsyncThunk(
  "ReportsReducer/clickThroughRateRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ReportsApiServices.apiClickThroughRateRequest(
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

const initialState = {
  loading: false,
  error: null,
  analytics: null,
};

const ReportsReducer = createReducer(initialState, (builder) => {
  builder
    // clickThroughRateRequest
    .addCase(clickThroughRateRequest.pending, (state, _) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(clickThroughRateRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(clickThroughRateRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // getReportsRequest
    .addCase(getReportsRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(getReportsRequest.fulfilled, (state, action) => {
      return {
        ...state,
        analytics: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(getReportsRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(userEmployeeRequest.rejected, (state, action) => {
      return initialState;
    })

    .addCase(stopLoaderAndEmptyErrors.fulfilled, (state, _) => {
      return { ...state, loading: false, error: null };
    })

    .addCase(logoutRequest.fulfilled, (state, _) => {
      return initialState;
    })

    .addCase(logoutRequest.rejected, (state, _) => {
      return initialState;
    })

    .addCase(clearStore.fulfilled, (state, _) => {
      return initialState;
    })

    .addDefaultCase((state, action) => {});
});

export default ReportsReducer;
