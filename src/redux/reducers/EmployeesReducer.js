import { createAsyncThunk, createReducer, current } from "@reduxjs/toolkit";
import { EmployeesApiServices } from "../actions/EmployeesApiServices";
import { getFilterredEmployees } from "../utilities";
import {
  logoutRequest,
  stopLoaderAndEmptyErrors,
  userEmployeeRequest,
  clearStore,
} from "./AuthenticationReducer";

export const allEmployeesRequest = createAsyncThunk(
  "EmployeesReducer/allEmployeesRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiAllEmployeesRequest(
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

export const addUpdateEmployeeRequest = createAsyncThunk(
  "EmployeesReducer/addUpdateEmployeeRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiAddUpdateEmployeeRequest(
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

export const exportEmployeeRequest = createAsyncThunk(
  "EmployeesReducer/exportEmployeeRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiExportEmployeeRequest(
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

export const exportEmployeesListRequest = createAsyncThunk(
  "EmployeesReducer/exportEmployeesListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiExportEmployeesListRequest(
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

// export const unarchiveBulkEmployeeRequest = createAsyncThunk (
//   "EmployeesReducer/unarchiveBulkEmployeeRequest", async (payload, { rejectWithValue }) => {
//     try {
//       const response = await EmployeesApiServices.apiUserBulkUnarchaiveRequest(
//         payload
//       );

//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// )

export const deleteEmployeeRequest = createAsyncThunk(
  "EmployeesReducer/deleteEmployeeRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiDeleteEmployeesRequest(
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

export const bulkUploadUserRequest = createAsyncThunk(
  "EmployeesReducer/bulkUploadUserRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiBulkUploadUserRequest(
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

export const archiveBulkEmployeeRequest = createAsyncThunk(
  "EmployeesReducer/archiveBulkEmployeeRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmployeesApiServices.apiArchiveBulkEmployeeRequest(
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
  allEmployees: [],
  employeesCount: 0,
};
const EmployeesReducer = createReducer(initialState, (builder) => {
  builder
    // allEmployeesRequest
    .addCase(allEmployeesRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(allEmployeesRequest.fulfilled, (state, action) => {
      return {
        ...state,
        allEmployees: action.payload.data.users,
        employeesCount: action.payload.data.count,
        loading: false,
        error: null,
      };
    })
    .addCase(allEmployeesRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // exportEmployeeRequest
    .addCase(exportEmployeeRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(exportEmployeeRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(exportEmployeeRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // exportEmployeesListRequest
    .addCase(exportEmployeesListRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(exportEmployeesListRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(exportEmployeesListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // addUpdateEmployeeRequest
    .addCase(addUpdateEmployeeRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(addUpdateEmployeeRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(addUpdateEmployeeRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // deleteEmployeeRequest
    .addCase(deleteEmployeeRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(deleteEmployeeRequest.fulfilled, (state, action) => {
      return {
        ...state,
        allEmployees: getFilterredEmployees(
          current(state.allEmployees),
          action.meta.arg.userid
        ),
        loading: false,
        error: null,
      };
    })
    .addCase(deleteEmployeeRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(userEmployeeRequest.rejected, (state, action) => {
      return initialState;
    })

    // bulkUploadUserRequest
    .addCase(bulkUploadUserRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(bulkUploadUserRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(bulkUploadUserRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // stopLoaderAndEmptyErrors
    .addCase(stopLoaderAndEmptyErrors.fulfilled, (state, _) => {
      return { ...state, loading: false, error: null };
    })

    // logoutRequest
    .addCase(logoutRequest.fulfilled, (state, _) => {
      return initialState;
    })

    .addCase(logoutRequest.rejected, (state, _) => {
      return initialState;
    })

    .addCase(clearStore.fulfilled, (state, _) => {
      return initialState;
    })

    //Archive Employee Bulk Request
    .addCase(archiveBulkEmployeeRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(archiveBulkEmployeeRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(archiveBulkEmployeeRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addDefaultCase((state, action) => {});
});

export default EmployeesReducer;
