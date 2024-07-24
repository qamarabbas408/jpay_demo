import APIConstants from "../../helpers/APIConstants";
import NetworkRequest from "../../helpers/NetworkRequest";

function apiWhiteLabelingRequest(payload) {
  const { subDomain } = payload;
  let path = APIConstants.whiteLabelling + subDomain;
  return NetworkRequest.get(path);
}

export const WhiteLabelingApiServices = {
  apiWhiteLabelingRequest,
};
