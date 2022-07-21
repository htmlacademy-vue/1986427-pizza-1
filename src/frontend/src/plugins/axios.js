import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    return Promise.reject(
      e?.response?.data?.error?.message ||
        "Возникла ошибка при выполнении запроса к серверу"
    );
  }
);

export default axiosInstance;
