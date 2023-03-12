import axios from "axios";

const BASE_URL = process.env.REACT_APP_TMDB_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let pendingRequests = new Map();

api.interceptors.request.use((config) => {
  // Generate a unique identifier for the request
  const requestId = JSON.stringify({
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.data,
  });

  // Check if there's a pending request with the same identifier
  if (pendingRequests.has(requestId)) {
    const cancelToken = pendingRequests.get(requestId);
    config.cancelToken = cancelToken;
  } else {
    // Create a new cancel token for the request
    const cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;
    pendingRequests.set(requestId, cancelToken);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // Remove the request from the pending requests map
    const requestId = JSON.stringify({
      method: response.config.method,
      url: response.config.url,
      params: response.config.params,
      data: response.config.data,
    });
    pendingRequests.delete(requestId);
    return response;
  },
  (error) => {
    // Remove the request from the pending requests map
    const requestId = JSON.stringify({
      method: error.config.method,
      url: error.config.url,
      params: error.config.params,
      data: error.config.data,
    });
    console.log("requestId = ", requestId);
    pendingRequests.delete(requestId);
    throw error;
  }
);

export default api;
