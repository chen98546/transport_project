const request = require("./require.js");
let api = 'http://103.24.177.147:8084/api/'

module.exports.getGoodsPropertyFn = function () {
    return request({
        url: api + "property/list",
    });
};