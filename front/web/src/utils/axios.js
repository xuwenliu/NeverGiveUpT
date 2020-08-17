import axios from "axios";
import Vue from "vue";
import router from "../router";
const vue = new Vue({
  router,
});

axios.interceptors.request.use(
  (config) => {
    config.baseURL = "/api/v1/web";
    config.timeout = 60 * 1000; // Timeout
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const data = response.data;

    // let code = response.data.code;
    // if (code === 71001 || code === 1008) {
    //   sessionStorage.removeItem("token");
    //   vue.$router.push({
    //     name: "login",
    //   });
    // }
    // if (code === 71006) {
    //   sessionStorage.removeItem("token");
    //   vue.$router.push({
    //     name: "402",
    //   });
    // }
    if (response.status === 200) {
      if (data.code === 0) {
        return data;
      } else {
        vue.$toast.error(data.msg);
      }
    }
    return response;
  },
  (error) => {
    vue.$toast.error("服务器连接异常");
    return Promise.resolve(error.response);
  }
);

const get = (url, data) => {
  return axios({
    method: "get",
    url,
    data,
  }).then((response) => {
    return response;
  });
};

const post = (url, data) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return axios({
    method: "post",
    url,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + user.token || "",
    },
    data,
  }).then((response) => {
    return response;
  });
};

//上传文件
const form = (url, data) => {
  return post(url, data, true);
};

export default {
  get,
  post,
  form,
};
