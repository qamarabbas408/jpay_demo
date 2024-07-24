import APIConstants from "../../helpers/APIConstants";
import NetworkRequest from "../../helpers/NetworkRequest";
import AppUtilities from "../../helpers/AppUtilities";
import AppLogger from "../../helpers/AppLogger";

function apiAllEmployeesRequest(payload) {
  const { token, companyId, offset, search, pageSize, archive } = payload;

  const limit = pageSize;

  let path = `${APIConstants.allEmployees}${companyId}`;

  if (limit) {
    path += `?limit=${limit}&offset=${offset === 1 ? 0 : offset ?? 0}`;
  }

  // if (offset || offset == 0) {
  //   path += `&offset=${offset ? offset : 0}`;
  // }

  if (search) {
    path += `&search=${search}`;
  }
  if (archive) {
    path += `&archive=${archive}`;
  }
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiAddUpdateEmployeeRequest(payload) {
  const { userdata, companyId, token, id } = payload;
  if (id) {
    let path = APIConstants.employee + id;
    return NetworkRequest.put(path, userdata, AppUtilities.getHeaders(token));
  }
  if (companyId) {
    let path = APIConstants.employee + companyId;
    return NetworkRequest.post(path, userdata, AppUtilities.getHeaders(token));
  }
}
function apiDeleteEmployeesRequest(payload) {
  const { id, token } = payload;
  let path = APIConstants.singleArchiveEmp + id;
  return NetworkRequest.put(path, {}, AppUtilities.getHeaders(token));
}

function apiExportEmployeeRequest(payload) {
  const { id, token } = payload;
  let path = `${APIConstants.employee}export/${id}`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiBulkUploadUserRequest(payload) {
  const { token, company_id, file, tags } = payload;
  let path = `${APIConstants.employee}bulk/${company_id}`;
  const body = new FormData();

  body.append("file", file);
  for (var i = 0; i < tags.length; i++) {
    body.append("tags[]", tags[i]);
  }
  return NetworkRequest.post(
    path,
    body,
    AppUtilities.getHeaders(token, { "Content-Type": "multipart/form-data" })
  );
}

function apiExportEmployeesListRequest(payload) {
  const { token, companyId } = payload;
  let path = `${APIConstants.exportEmployees}${companyId}`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiArchiveBulkEmployeeRequest(payload) {
  const { id, token, company_user_ids = [], isToArchive = false } = payload;
  let path = isToArchive ? APIConstants.archiveEmp : APIConstants.unarchiveEmp;

  if (id) {
    path += id;
  }
  return NetworkRequest.put(
    path,
    { company_user_ids: company_user_ids },
    AppUtilities.getHeaders(token)
  );
}

export const EmployeesApiServices = {
  apiAllEmployeesRequest,
  apiAddUpdateEmployeeRequest,
  apiDeleteEmployeesRequest,
  apiExportEmployeeRequest,
  apiBulkUploadUserRequest,
  apiExportEmployeesListRequest,
  apiArchiveBulkEmployeeRequest,
};
