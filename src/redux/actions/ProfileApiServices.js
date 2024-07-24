import APIConstants from "../../helpers/APIConstants";
import NetworkRequest from "../../helpers/NetworkRequest";
import AppUtilities from "../../helpers/AppUtilities";
import { get } from "lodash";
import AppLogger from "../../helpers/AppLogger";
import AppConstants from "../../helpers/AppConstants";

function apiPayslipsListRequest(payload) {
  const { token, userId, body } = payload;

  var path = APIConstants.payslips + userId;

  if (get(body, "start_date", "")) {
    path += `?start_date=${get(body, "start_date", "")}&end_date=${get(
      body,
      "end_date",
      ""
    )}`;
  }

  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiP45DocumentsListRequest(payload) {
  const { token, userId } = payload;
  let path = APIConstants.documents + userId + `?type=p45`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiDownloadPayslipsRequest(payload) {
  const { token, user_id, start_date, end_date } = payload;
  let path = APIConstants.downloadPayslip + user_id;
  path += `?start_date=${start_date}&end_date=${end_date}`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiP60DocumentsListRequest(payload) {
  const { token, userId } = payload;
  let path = APIConstants.documents + userId + `?type=p60`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiP11dDocumentsListRequest(payload) {
  const { token, userId } = payload;
  let path = APIConstants.documents + userId + `?type=p11d`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiOtherDocumentsListRequest(payload) {
  const { token, userId } = payload;
  let path = APIConstants.documents + userId + `?type=other`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiProfileEmployeeRequest(payload) {
  const { token, user_id } = payload;
  let path = APIConstants.employee + user_id;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiGetUserAddressRequest(payload) {
  const { token, user_id } = payload;
  let path = APIConstants.userAddress + user_id;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiUpdateUserAddressRequest(payload) {
  const { token, user_id, addressBody } = payload;
  let path = APIConstants.userAddress + user_id;
  return NetworkRequest.put(path, addressBody, AppUtilities.getHeaders(token));
}

function apiGetContactDetailsRequest(payload) {
  const { token, user_id } = payload;
  let path = APIConstants.contactDetails + "/" + user_id;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiSubmitContactDetails(payload) {
  const { token, user_id, contactBody } = payload;
  let path = APIConstants.userContact + "/" + user_id;
  return NetworkRequest.put(path, contactBody, AppUtilities.getHeaders(token));
}

function apiUpdateContactDetailsRequest(payload) {
  const { token, user_id, company_id, contactBody } = payload;
  let path = APIConstants.contactDetails;

  if (user_id) {
    path += `?user_id=${user_id}`;
  } else if (company_id) {
    path += `?company_id=${company_id}`;
  }
  return NetworkRequest.put(path, contactBody, AppUtilities.getHeaders(token));
}

function apiGetTagsListRequest(payload) {
  const { token, companyId } = payload;
  let path = APIConstants.tags + companyId;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiAddTagRequest(payload) {
  const { token, companyId, name } = payload;
  let path = APIConstants.tag + companyId;
  const body = { name };
  return NetworkRequest.post(path, body, AppUtilities.getHeaders(token));
}

function apiUpdateTagRequest(payload) {
  const { token, tag_id, name } = payload;
  let path = APIConstants.tag + tag_id;
  const body = { name };
  return NetworkRequest.put(path, body, AppUtilities.getHeaders(token));
}

function apiDeleteTagRequest(payload) {
  const { token, tag_id } = payload;
  let path = APIConstants.tag + tag_id;
  return NetworkRequest.delete(path, AppUtilities.getHeaders(token));
}

function apiGetRolesListRequest(payload) {
  const { token, companyId } = payload;
  let path = APIConstants.roles + companyId;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiAddRoleRequest(payload) {
  const { token, companyId, name } = payload;
  let path = APIConstants.role + companyId;
  const body = { name };
  return NetworkRequest.post(path, body, AppUtilities.getHeaders(token));
}

function apiUpdateRoleRequest(payload) {
  const { token, role_id, name } = payload;
  let path = APIConstants.role + role_id;
  const body = { name };
  return NetworkRequest.put(path, body, AppUtilities.getHeaders(token));
}

function apiDeleteRoleRequest(payload) {
  const { token, role_id } = payload;
  let path = APIConstants.role + role_id;
  return NetworkRequest.delete(path, AppUtilities.getHeaders(token));
}

function apiAddDocumentRequest(payload) {
  const { token, userId, type, file } = payload;
  const path = APIConstants.addDocument + userId;
  const body = new FormData();
  body.append("file", file);
  body.append("type", type);
  return NetworkRequest.post(
    path,
    body,
    AppUtilities.getHeaders(token, { "Content-Type": "multipart/form-data" })
  );
}

function apiAddP60DocumentRequest(payload) {
  const { token, userId, file } = payload;
  const path = APIConstants.addP60Document + userId;
  const body = new FormData();
  body.append("file", file);
  return NetworkRequest.post(
    path,
    body,
    AppUtilities.getHeaders(token, { "Content-Type": "multipart/form-data" })
  );
}

function apiAddP45DocumentRequest(payload) {
  const { token, userId, files } = payload;
  const path = APIConstants.addP45Document + userId;
  const body = new FormData();
  files.forEach((element) => {
    body.append("files[]", element);
  });

  return NetworkRequest.post(
    path,
    body,
    AppUtilities.getHeaders(token, { "Content-Type": "multipart/form-data" })
  );
}

function apiExpportEmployeeSampleCsvRequest(payload) {
  const { token } = payload;
  const path = APIConstants.exportEmpSampCsv;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token, {}));
}

function apiBulkUploadDocumentRequest(payload) {
  const { token, company_id, pay_slips, isPdf = false, file } = payload;
  let path =
    (isPdf ? APIConstants.paySlipPdfUpload : APIConstants.payslips) +
    company_id;

  var body = null;
  var headers = {};
  // if (isPdf) {
  body = new FormData();
  body.append("file", file);
  headers = {
    "Content-Type": "multipart/form-data",
  };
  // } else {
  //   body = { pay_slips };
  // }

  return NetworkRequest.post(
    path,
    body,
    AppUtilities.getHeaders(token, headers)
  );
}

function apiDocumentDeletRequest(payload) {
  var endPoint = "";
  const { item, token } = payload;
  if (item.itemType == null) {
    //document = payslip
    endPoint = APIConstants.deletePayslip + item.itemID;
    //Delete PaylSlip Request and Return
  } else {
    //else not a payslip then delete request and return
    endPoint = APIConstants.addDocument + item.itemID;
  }
  let path = APIConstants.baseUrl + endPoint;
  return NetworkRequest.delete(path, AppUtilities.getHeaders(token, {}));
}

function apiDeleteMultipleDocumentsRequest(payload) {
  const { type, token, docsArray, company_user_id } = payload;
  let path = APIConstants.baseUrl;
  var body = {};

  if (type == AppConstants.documentTypes.payslip) {
    path += APIConstants.payslipsBulkDelete + company_user_id;
    body.pay_slip_ids = docsArray;
  } else {
    path += APIConstants.documentsBulkDelete + company_user_id;
    body.document_ids = docsArray;
  }

  return NetworkRequest.post(path, body, AppUtilities.getHeaders(token, {}));
}

function apiResendLoginEmailRequest(payload) {
  const { userId, token } = payload;

  let path = APIConstants.baseUrl + APIConstants.resendEmail + userId;
  return NetworkRequest.post(path, {}, AppUtilities.getHeaders(token, {}));
}

export const ProfileApiServices = {
  apiDownloadPayslipsRequest,
  apiPayslipsListRequest,
  apiP45DocumentsListRequest,
  apiP60DocumentsListRequest,
  apiP11dDocumentsListRequest,
  apiOtherDocumentsListRequest,
  apiProfileEmployeeRequest,
  apiGetUserAddressRequest,
  apiUpdateUserAddressRequest,
  apiGetContactDetailsRequest,
  apiSubmitContactDetails,
  apiUpdateContactDetailsRequest,
  apiGetTagsListRequest,
  apiAddTagRequest,
  apiUpdateTagRequest,
  apiDeleteTagRequest,
  apiGetRolesListRequest,
  apiAddRoleRequest,
  apiUpdateRoleRequest,
  apiDeleteRoleRequest,
  apiAddDocumentRequest,
  apiBulkUploadDocumentRequest,
  apiExpportEmployeeSampleCsvRequest,
  apiAddP60DocumentRequest,
  apiAddP45DocumentRequest,
  apiDocumentDeletRequest,
  apiResendLoginEmailRequest,
  apiDeleteMultipleDocumentsRequest,
};
