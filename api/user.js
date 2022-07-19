const request = require("./require.js");
// module.exports.wxlogin = function (code) {
//   return request({
//     url: "http://127.0.0.1:5566/maoyan/wxlogin",
//     method: "post",
//     data: { code },
//   });
// };

module.exports.wxlogin = function (userInfo) {
  return request({
    url: "http://103.24.177.147:8084/api/member/v2/login",
    method: "post",
    data: userInfo
  });
};
module.exports.getFlowFn = function () {
  return request({
    url: "http://103.24.177.147:8084/api/content/getFlow",
  });
};

module.exports.fetchPhoneNumber = function (sessionKey, encryptedData, iv) { 
  return request({
    url: "http://127.0.0.1:5566/maoyan/getPhoneNumber",
    method: "post",
    data: {
      sessionKey,
      encryptedData,
      iv
    },
  });
};

module.exports.fetchOpenId = function (code) {
  return request({
    url: "http://127.0.0.1:5566/maoyan/getOpenid",
    method: "post",
    data: {
      code
    },
  });
};