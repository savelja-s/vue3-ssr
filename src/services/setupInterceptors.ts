import api from "./api";
import TokenService from "./token";

const requestsOfWaiting: any[] = [];

const axiosInstance = api.getInstance();
const setup = (store: any) => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token = TokenService.getLocalAccessToken();
      // console.log("token", token);
      if (token) config.headers["Authorization"] = "Bearer " + token;
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (err: any) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/token/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            // console.log("originalConfig.params", originalConfig.params);
            const rs = await axiosInstance.post(
              "/token/refresh/",
              {
                refresh: TokenService.getLocalRefreshToken(),
              },
              originalConfig
            );
            const { access } = rs.data;
            store.dispatch("auth/refreshToken", access);
            TokenService.updateLocalAccessToken(access);
            return axiosInstance(originalConfig);
          } catch (_error) {
            store.dispatch("auth/logout");
            return Promise.reject(_error);
          }
        }
      }
      console.log("err", err);
      requestsOfWaiting.push(err.config);
      return Promise.reject(err);
    }
  );
};
export default setup;
