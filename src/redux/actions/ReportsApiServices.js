import APIConstants from "../../helpers/APIConstants";
import NetworkRequest from "../../helpers/NetworkRequest";
import AppUtilities from "../../helpers/AppUtilities";

function apiGetReportsRequest(payload) {
  const { token, companyId } = payload;
  let path = APIConstants.reports + companyId;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiClickThroughRateRequest(payload) {
  const { token, userId, key } = payload;
  let path = APIConstants.clickThroughRate + userId;
  const body = { key: key };
  return NetworkRequest.post(path, body, AppUtilities.getHeaders(token));
}

export const ReportsApiServices = {
  apiClickThroughRateRequest,
  apiGetReportsRequest,
};
