const request = require("./require.js");
let api = 'http://103.24.177.147:8084/api/member/'

module.exports.getAddressListFn = function (data) {
    return request({
        data,
        url: api + "address/list",
    });
};

module.exports.addAddressFn = function (info) {
    return request({
        url: api + "address/save",
        method: 'post',
        data: info
    });
};

module.exports.delAddressFn = function (id) {
    return request({
        url: api + "address/delete",
        method: 'post',
        data: {
            id
        }
    });
};

module.exports.updateAddressFn = function (info) {
    return request({
        url: api + "address/update",
        method: 'post',
        data: info
    });
};

module.exports.setAddressDetaultFn = function (addrId) {
    return request({
        url: api + "address/setDefault",
        method: 'post',
        data: {
            id: addrId
        }
    });
};