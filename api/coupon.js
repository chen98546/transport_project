const request = require("./require.js");
let api = 'http://103.24.177.147:8084/api/member/'

module.exports.getcouponListFn = function (memberId) {
    return request({
        url: api + "coupon/page",
        data: {
            memberId
        }
    });
};