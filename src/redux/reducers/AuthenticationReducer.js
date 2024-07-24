import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { AuthApiServices } from "../actions/AuthApiServices";
import { ProfileApiServices } from "../actions/ProfileApiServices";
import { handleCredentials } from "../utilities";
import { get } from "lodash";

export const clearStore = createAsyncThunk(
  "AuthenticationReducer/clearStore",
  async (payload) => {
    return payload;
  }
);

export const stopLoaderAndEmptyErrors = createAsyncThunk(
  "AuthenticationReducer/stopLoaderAndEmptyErrors",
  async (payload) => {
    return payload;
  }
);

export const logoutRequest = createAsyncThunk(
  "AuthenticationReducer/logoutRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiLogoutRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userEmployeeRequest = createAsyncThunk(
  "AuthenticationReducer/userEmployeeRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiProfileEmployeeRequest(
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

export const readNotificationsRequest = createAsyncThunk(
  "AuthenticationReducer/readNotificationsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiReadNotificationsRequest(
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

export const getNotificationsRequest = createAsyncThunk(
  "AuthenticationReducer/getNotificationsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiGetNotificationsRequest(
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

export const loginRequest = createAsyncThunk(
  "AuthenticationReducer/loginRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiLoginRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const VivupLoginRequest = createAsyncThunk(
  "AuthenticationReducer/VivupLoginRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiVivupLoginRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// export const VivupACSRequest = createAsyncThunk(
//   "AuthenticationReducer/VivupACSRequest",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await AuthApiServices.apiVivupACSRequest(payload);
//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const signupRequest = createAsyncThunk(
  "AuthenticationReducer/signupRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiSignupRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordRequest = createAsyncThunk(
  "AuthenticationReducer/resetPasswordRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiResetPasswordRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePasswordRequest = createAsyncThunk(
  "AuthenticationReducer/changePasswordRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiChangePasswordRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTpRequest = createAsyncThunk(
  "AuthenticationReducer/verifyOTpRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApiServices.apiVerifyOTpRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleMenu = createAsyncThunk(
  "toggleMenu/AuthenticationReducer",
  (payload) => {
    return payload;
  }
);

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: null,
  token: null,
  toggle: false,
  notifications: [],
  unreadCount: 0,
  credentials: null,
  vivupSAMLResponse: null,
  // vivupACSResponse: null,
};

const AuthenticationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleMenu.fulfilled, (state, { payload }) => {
      return { ...state, loading: false, error: null, toggle: payload };
    })
    .addCase(loginRequest.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: null,
        credentials: handleCredentials(action.meta.arg),
      };
    })
    .addCase(loginRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: get(action.payload, "data.user", null),
        token: get(action.payload, "data.access_token", null),
        error: null,
      };
    })
    .addCase(loginRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(VivupLoginRequest.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: null,
        // credentials: handleCredentials(action.meta.arg),
      };
    })
    .addCase(VivupLoginRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        vivupSAMLResponse: action.payload, // get(action.payload, "data.user", null),
        // token: get(action.payload, "data.access_token", null),
        error: null,
      };
    })
    .addCase(VivupLoginRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // .addCase(VivupACSRequest.pending, (state, action) => {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };
    // })
    // .addCase(VivupACSRequest.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     vivupACSResponse: action.payload,
    //     error: null,
    //   };
    // })
    // .addCase(VivupACSRequest.rejected, (state, action) => {
    //   return { ...state, loading: false, error: action.payload };
    // })

    .addCase(signupRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(signupRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: get(action.payload, "data.user", null),
        token: get(action.payload, "data.access_token", null),
        error: null,
      };
    })
    .addCase(signupRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(getNotificationsRequest.pending, (state, _) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(getNotificationsRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        notifications: action.payload.data.notifications,
        unreadCount: action.payload.data.unread_count,
      };
    })
    .addCase(getNotificationsRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(resetPasswordRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(resetPasswordRequest.fulfilled, (state, _) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(resetPasswordRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(verifyOTpRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(verifyOTpRequest.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.access_token,
        loading: false,
        error: null,
      };
    })
    .addCase(verifyOTpRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(userEmployeeRequest.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        rememberMe: false,
      };
    })

    .addCase(stopLoaderAndEmptyErrors.fulfilled, (state, _) => {
      return { ...state, loading: false, error: null };
    })

    .addCase(logoutRequest.fulfilled, (state, _) => {
      return {
        ...initialState,
        credentials: state.credentials,
      };
    })

    .addCase(logoutRequest.rejected, (state, _) => {
      return {
        ...initialState,
        credentials: state.credentials,
      };
    })

    .addCase(clearStore.fulfilled, (state, _) => {
      return {
        ...initialState,
        credentials: state.credentials,
      };
    })

    .addDefaultCase((state, action) => {});
});

export default AuthenticationReducer;
