const request = require("./require.js");
let api = 'http://103.24.177.147:8084/api/order/'
// 订单列表
module.exports.getOrderList = function (memberId, page = 1, limit = 10) {
    return request({
        data: {
            memberId,
            page,
            limit
        },
        url: api + "page",
    });
};
// 创建订单
module.exports.createOrderData = function (data) { 
    return request({
        data,
        url: api + "create",
        method: 'post',
    });
};
// 增加快递单号数量
module.exports.setExpressNumData = function (expressNum, id) {
    return request({
        url: api + "setExpressNum",
        method: 'post',
        data: {
            expressNum,
            id
        }
    });
};
// 订单备注
module.exports.addUserRemarksData = function (id, userRemarks) {
    return request({
        url: api + "addUserRemarks",
        method: 'post',
        data: {
            id,
            userRemarks
        }
    });
};
// 取消订单
module.exports.orderCancle = function (orderId) {
    return request({
        url: api + "cancel",
        method: 'post',
        data: {
            id: orderId
        }
    });
};
// 快递单号+1
module.exports.addExpress = function (id, expressNo) {
    return request({
        url: api + "addExpress",
        method: 'post',
        data: {
            id,
            expressNo
        }
    });
};

// 获取订单信息
module.exports.getOrderInfo = function (id) {
    return request({
        url: api + "get",
        data: {
            id
        },
    });
};

// 快递单号-1
module.exports.removeExpressNum = function (id) {
    return request({
        url: api + "removeExpressNum",
        data: {
            id
        },
        method: 'post'
    });
};

// 订单打包
module.exports.confirmPacking = function (id) {
    return request({
        url: api + "confirmPacking",
        data: {
            id,
        },
        method: 'post'
    });
};

// 订单打包
module.exports.setSafeFn = function (id, logisticsValue, lossRisk, tariffsRisk) {
    return request({
        url: api + "setSafe",
        data: {
            id,
            logisticsValue,
            lossRisk,
            tariffsRisk
        },
        method: 'post'
    });
};

// 订单支付
module.exports.payOrderFn = function (id, memberCouponId) {
    return request({
        url: api + "payOrder",
        data: {
            id,
            memberCouponId
        },
        method: 'post'
    });
};