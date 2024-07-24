import APIConstants from "../../helpers/APIConstants";
import NetworkRequest from "../../helpers/NetworkRequest";
import AppUtilities from "../../helpers/AppUtilities";
import { useSelector } from "react-redux";

function apiLogoutRequest(payload) {
  const { token } = payload;
  let path = APIConstants.logout;
  return NetworkRequest.post(path, null, AppUtilities.getHeaders(token));
}

function apiLoginRequest(payload) {
  const { loginBody } = payload;
  const body = {
    email: loginBody.ni_number,
    password: loginBody.password,
    sub_domain: loginBody.sub_domain,
  };
  let path = APIConstants.login; // .ssoStaggingUrl
  return NetworkRequest.post(path, body);
}

function apiVivupLoginRequest(payload) {
  const { userId, token } = payload;
  // const body = {
  //   userId: userId,
  // };

  let path = `${APIConstants.vivupSAML}${userId}`;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token)); // , body);
}

// function apiVivupACSRequest(payload) {
//   const { xmlString } = payload;
//   const config = {
//     // headers: { "Content-Type": "text/xml" },
//     headers: { Accept: "" },
//   };
//   const body = new FormData();
//   body.append("SAMLResponse", xmlString);
//   // const body = {
//   //   // RelayState: "",
//   //   SAMLResponse: xmlString,
//   // };
//   let path = APIConstants.vivupACSURL;
//   return NetworkRequest.post(path, body, config);
// }

function apiSignupRequest(payload) {
  const { signUpBody, subDomain } = payload;
  let path = APIConstants.signUp + subDomain;
  return NetworkRequest.post(path, signUpBody);
}

function apiReadNotificationsRequest(payload) {
  const { token, user_id } = payload;
  let path = APIConstants.notifications + `read/${user_id}`;
  return NetworkRequest.post(path, null, AppUtilities.getHeaders(token));
}

function apiGetNotificationsRequest(payload) {
  const { token, user_id } = payload;
  let path = APIConstants.notifications + user_id;
  return NetworkRequest.get(path, AppUtilities.getHeaders(token));
}

function apiResetPasswordRequest(payload) {
  const { body } = payload;
  let path = APIConstants.resetPassword;
  // const body = {
  //   phone_number: phone_number,
  // };
  return NetworkRequest.post(path, body);
}

function apiChangePasswordRequest(payload) {
  const { changePassBody, user_id } = payload;
  let path = APIConstants.changePassword + user_id;
  return NetworkRequest.post(path, changePassBody);
}

function apiVerifyOTpRequest(payload) {
  const { otp, user_id, reset, type } = payload;
  let path = APIConstants.verifyOtp + user_id;
  var body = {
    otp: otp,
    reset: reset,
  };
  if (reset == 1) {
    body.type = type;
  }
  return NetworkRequest.post(path, body);
}

export const AuthApiServices = {
  apiLogoutRequest,
  apiGetNotificationsRequest,
  apiReadNotificationsRequest,
  apiLoginRequest,
  apiVivupLoginRequest,
  // apiVivupACSRequest,
  apiSignupRequest,
  apiResetPasswordRequest,
  apiChangePasswordRequest,
  apiVerifyOTpRequest,
};
