import axios from "axios";
import APIConstants from "./APIConstants";

const NetworkRequest = axios.create({
  baseURL: APIConstants.baseUrl,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export default NetworkRequest;
