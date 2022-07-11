const request = require("./require.js");
let api = 'http://103.24.177.147:8084/api/content/'

module.exports.getBannerList = function () {
    return request({
        url: api + "carousel/images",
    });
};