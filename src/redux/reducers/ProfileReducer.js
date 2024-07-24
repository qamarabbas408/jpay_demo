import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ProfileApiServices } from "../actions/ProfileApiServices";
import {
  logoutRequest,
  stopLoaderAndEmptyErrors,
  userEmployeeRequest,
  clearStore,
} from "./AuthenticationReducer";
import { handleDocumentDataAppend, handleRemoveDocuments } from "../utilities";
import AppLogger from "../../helpers/AppLogger";

export const bulkUploadDocumentRequest = createAsyncThunk(
  "ProfileReducer/bulkUploadDocumentRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiBulkUploadDocumentRequest(
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

export const expportEmployeeSampleCsvRequest = createAsyncThunk(
  "ProfileReducer/expportEmployeeSampleCsvRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response =
        await ProfileApiServices.apiExpportEmployeeSampleCsvRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const downloadPayslipsRequest = createAsyncThunk(
  "ProfileReducer/downloadPayslipsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiDownloadPayslipsRequest(
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

export const payslipsListRequest = createAsyncThunk(
  "ProfileReducer/payslipsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiPayslipsListRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentDeleteRequest = createAsyncThunk(
  "ProfileReducer/documentDeleteRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiDocumentDeletRequest(
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

export const deleteMultipleDocumentsRequest = createAsyncThunk(
  "ProfileReducer/deleteMultipleDocumentsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response =
        await ProfileApiServices.apiDeleteMultipleDocumentsRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const p45DocumentsListRequest = createAsyncThunk(
  "ProfileReducer/p45DocumentsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiP45DocumentsListRequest(
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

export const p60DocumentsListRequest = createAsyncThunk(
  "ProfileReducer/p60DocumentsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiP60DocumentsListRequest(
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

export const p11dDocumentsListRequest = createAsyncThunk(
  "ProfileReducer/p11dDocumentsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiP11dDocumentsListRequest(
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

export const otherDocumentsListRequest = createAsyncThunk(
  "ProfileReducer/otherDocumentsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiOtherDocumentsListRequest(
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

export const profileEmployeeRequest = createAsyncThunk(
  "ProfileReducer/profileEmployeeRequest",
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

export const getUserAddressRequest = createAsyncThunk(
  "ProfileReducer/getUserAddressRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiGetUserAddressRequest(
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

export const updateUserAddressRequest = createAsyncThunk(
  "ProfileReducer/updateUserAddressRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiUpdateUserAddressRequest(
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

export const submitContactDetails = createAsyncThunk(
  "ProfileReducer/submitContactDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiSubmitContactDetails(
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

export const getContactDetailsRequest = createAsyncThunk(
  "ProfileReducer/getContactDetailsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiGetContactDetailsRequest(
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

export const updateContactDetailsRequest = createAsyncThunk(
  "ProfileReducer/updateContactDetailsRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiUpdateContactDetailsRequest(
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

export const getRolesListRequest = createAsyncThunk(
  "ProfileReducer/getRolesListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiGetRolesListRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRoleRequest = createAsyncThunk(
  "ProfileReducer/addRoleRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiAddRoleRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRoleRequest = createAsyncThunk(
  "ProfileReducer/updateRoleRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiUpdateRoleRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRoleRequest = createAsyncThunk(
  "ProfileReducer/deleteRoleRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiDeleteRoleRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTagsListRequest = createAsyncThunk(
  "ProfileReducer/getTagsListRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiGetTagsListRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTagRequest = createAsyncThunk(
  "ProfileReducer/addTagRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiAddTagRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTagRequest = createAsyncThunk(
  "ProfileReducer/updateTagRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiUpdateTagRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTagRequest = createAsyncThunk(
  "ProfileReducer/deleteTagRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiDeleteTagRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDocumentRequest = createAsyncThunk(
  "ReportsReducer/addDocumentRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiAddDocumentRequest(payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addP60DocumentRequest = createAsyncThunk(
  "ProfileReducer/addP60DocumentRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiAddP60DocumentRequest(
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

export const addP45DocumentRequest = createAsyncThunk(
  "ProfileReducer/addP45DocumentRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiAddP45DocumentRequest(
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

export const resendLoginEmail = createAsyncThunk(
  "ProfileReducer/resendLoginEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ProfileApiServices.apiResendLoginEmailRequest(
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
  contactDetails: null,
  userAddress: null,
  rolesList: [],
  tagsList: [],
  profileUser: null,
  p45Documents: { documents: [], count: 0 },
  p45BulkDocuments: { documents: [], count: 0 },
  p60Documents: { documents: [], count: 0 },
  p60BulkDocuments: { documents: [], count: 0 },
  p11dDocuments: { documents: [], count: 0 },
  otherDocuments: { documents: [], count: 0 },
  payslipsList: null,
};

const ProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(payslipsListRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        payslipsList: null,
      };
    })
    .addCase(payslipsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        payslipsList: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(payslipsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // resendLoginEmailRequest
    .addCase(resendLoginEmail.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(resendLoginEmail.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(resendLoginEmail.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // downloadPayslipsRequest
    .addCase(downloadPayslipsRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(downloadPayslipsRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(downloadPayslipsRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // bulkUploadDocumentRequest
    .addCase(bulkUploadDocumentRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(bulkUploadDocumentRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(bulkUploadDocumentRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // expportEmployeeSampleCsvRequest
    .addCase(expportEmployeeSampleCsvRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(expportEmployeeSampleCsvRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(expportEmployeeSampleCsvRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // addDocumentRequest
    .addCase(addDocumentRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(addDocumentRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        [`${action.meta.arg.type}Documents`]: handleDocumentDataAppend(
          state,
          action
        ),
      };
    })
    .addCase(addDocumentRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // p45DocumentsListRequest;
    .addCase(p45DocumentsListRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        p45Documents: null,
      };
    })
    .addCase(p45DocumentsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        p45Documents: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(p45DocumentsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // p45BulkDocumentsListRequest;
    .addCase(addP45DocumentRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        p45BulkDocuments: null,
      };
    })
    .addCase(addP45DocumentRequest.fulfilled, (state, action) => {
      return {
        ...state,
        p45BulkDocuments: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(addP45DocumentRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // p60DocumentsListRequest;
    .addCase(p60DocumentsListRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        p60Documents: null,
      };
    })
    .addCase(p60DocumentsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        p60Documents: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(p60DocumentsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // p60BulkDocumentsListRequest;
    .addCase(addP60DocumentRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        p60BulkDocuments: null,
      };
    })
    .addCase(addP60DocumentRequest.fulfilled, (state, action) => {
      return {
        ...state,
        p60BulkDocuments: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(addP60DocumentRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // p11DocumentsListRequest;
    .addCase(p11dDocumentsListRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        p11dDocuments: null,
      };
    })
    .addCase(p11dDocumentsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        p11dDocuments: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(p11dDocumentsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })
    // otherDocumentsListRequest;
    .addCase(otherDocumentsListRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        otherDocuments: null,
      };
    })
    .addCase(otherDocumentsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        otherDocuments: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(otherDocumentsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // deleteMultipleDocumentsRequest
    .addCase(deleteMultipleDocumentsRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    })
    .addCase(deleteMultipleDocumentsRequest.fulfilled, (state, action) => {
      return {
        ...state,
        // [`${action.meta.arg.item.itemType}Documents`]: handleRemoveDocuments(
        //   state,
        //   action
        // ),
        loading: false,
        error: null,
      };
    })
    .addCase(deleteMultipleDocumentsRequest.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    })

    //document delete request
    // documentDeleteRequest
    .addCase(documentDeleteRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    })
    .addCase(documentDeleteRequest.fulfilled, (state, action) => {
      return {
        ...state,
        [`${action.meta.arg.item.itemType}Documents`]: handleRemoveDocuments(
          state,
          action
        ),
        loading: false,
        error: null,
      };
    })
    .addCase(documentDeleteRequest.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    })

    // profileEmployeeRequest
    .addCase(profileEmployeeRequest.pending, (state, _) => {
      return {
        ...state,
        loading: true,
        error: null,
        profileUser: null,
      };
    })
    .addCase(profileEmployeeRequest.fulfilled, (state, action) => {
      return {
        ...state,
        profileUser: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(profileEmployeeRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // getUserAddressRequest
    .addCase(getUserAddressRequest.pending, (state, _) => {
      return { ...state, userAddress: null, loading: true, error: null };
    })
    .addCase(getUserAddressRequest.fulfilled, (state, action) => {
      return {
        ...state,
        userAddress: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(getUserAddressRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // updateUserAddressRequest
    .addCase(updateUserAddressRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(updateUserAddressRequest.fulfilled, (state, action) => {
      return {
        ...state,
        userAddress: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(updateUserAddressRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // getContactDetailsRequest
    .addCase(getContactDetailsRequest.pending, (state, _) => {
      return { ...state, contactDetails: null, loading: true, error: null };
    })
    .addCase(getContactDetailsRequest.fulfilled, (state, action) => {
      return {
        ...state,
        contactDetails: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(getContactDetailsRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // submitContactDetails
    .addCase(submitContactDetails.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(submitContactDetails.fulfilled, (state, action) => {
      return {
        ...state,
        profileUser: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(submitContactDetails.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // updateContactDetailsRequest
    .addCase(updateContactDetailsRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(updateContactDetailsRequest.fulfilled, (state, action) => {
      return {
        ...state,
        contactDetails: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(updateContactDetailsRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // getRolesListRequest
    .addCase(getRolesListRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(getRolesListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        rolesList: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(getRolesListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })
    // addRoleRequest
    .addCase(addRoleRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(addRoleRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(addRoleRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    //updateRoleRequest
    .addCase(updateRoleRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(updateRoleRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(updateRoleRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // deleteRoleRequest
    .addCase(deleteRoleRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(deleteRoleRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(deleteRoleRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // getTagsListRequest
    .addCase(getTagsListRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(getTagsListRequest.fulfilled, (state, action) => {
      return {
        ...state,
        tagsList: action.payload.data,
        loading: false,
        error: null,
      };
    })
    .addCase(getTagsListRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // addTagRequest
    .addCase(addTagRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(addTagRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(addTagRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // updateTagRequest
    .addCase(updateTagRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(updateTagRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(updateTagRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    // deleteTagRequest
    .addCase(deleteTagRequest.pending, (state, _) => {
      return { ...state, loading: true, error: null };
    })
    .addCase(deleteTagRequest.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null };
    })
    .addCase(deleteTagRequest.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })

    .addCase(userEmployeeRequest.rejected, (state, action) => {
      return initialState;
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

    .addDefaultCase((state, action) => {});
});

export default ProfileReducer;
