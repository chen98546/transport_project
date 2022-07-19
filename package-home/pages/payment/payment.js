import {
    payOrderFn,
    getOrderInfo
} from '../../../api/order.js'
import {
    getcouponListFn
} from '../../../api/coupon.js'
Page({
    // 页面的初始数据
    data: {
        flag: false,
        showPopup: false,
        countdown: 5,
        timer: null,
        disabledBtn: true,
        disabled: true,
        coupons: {},
        id: '',
        orderInfo: {},
        usableCoupons: [],
        couponsItem: {},
        payInfo: {},
    },

    // 生命周期函数--监听页面加载
    onLoad: async function (options) {
        const pages = getCurrentPages()
        const current = pages[pages.length - 1];
        const event = current.getOpenerEventChannel();
        if (JSON.stringify(event) == '{}') return
        // 接收投保页面的数据
        event.on('valuationPriceEv', params => {
            this.setData({
                id: params.id,
            })
        });

        let res = await getOrderInfo(this.data.id)
        this.setData({
            orderInfo: res.data
        })
        // 预选渠道
        res.data.orderType == 1 && (res.data.orderTypeText = '电子产品')
        res.data.orderType == 2 && (res.data.orderTypeText = '液体粉末')
        res.data.orderType == 3 && (res.data.orderTypeText = '内地EMS')
        res.data.orderType == 4 && (res.data.orderTypeText = '广东EMS')
        res.data.orderType == 5 && (res.data.orderTypeText = '普通货物')

        let memberId = wx.getStorageSync('userInfo').id
        let coupons = await getcouponListFn(memberId)
        let usableCoupons = coupons.data.filter(item => item.propertyType.indexOf(res.data.orderType)).map(item => {
            if (this.data.orderInfo.amount >= item.usedMinAmount) {
                item.amount && (item.totalPrice = this.data.orderInfo.amount - item.amount).toFixed(2);
                item.discount && (item.totalPrice = this.data.orderInfo.amount * item.discount).toFixed(2);
                return item
            }
        }).filter(item => item).sort((a, b) => a.totalPrice - b.totalPrice)
        this.setData({
            usableCoupons,
            couponsItem: usableCoupons[0]
        })
        this.data.orderInfo.amountTotal = ((this.data.couponsItem.totalPrice || 0) + this.data.orderInfo.amountPaid + this.data.orderInfo.lossRisk + this.data.orderInfo.tariffsRisk).toFixed(2)
        let payInfo = await payOrderFn(this.data.id);

        this.setData({
            payInfo: payInfo.data,
            orderInfo: this.data.orderInfo
        })
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady: function () {},

    // 生命周期函数--监听页面显示
    onShow: function () {
        if (JSON.stringify(this.data.coupons) !== '{}') {
            this.data.coupons.amount && (this.data.coupons.totalPrice = this.data.orderInfo.amount - this.data.coupons.amount).toFixed(2);
            this.data.coupons.discount && (this.data.coupons.totalPrice = this.data.orderInfo.amount * this.data.coupons.discount).toFixed(2);
            this.data.orderInfo.amountTotal = ((this.data.coupons.totalPrice || 0) + this.data.orderInfo.amountPaid + this.data.orderInfo.lossRisk + this.data.orderInfo.tariffsRisk).toFixed(2);
            this.setData({
                couponsItem: this.data.coupons,
                orderInfo: this.data.orderInfo
            })
        }

    },

    // 生命周期函数--监听页面隐藏
    onHide: function () {},

    // 生命周期函数--监听页面卸载
    onUnload: function () {},

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function () {},

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {},

    // 用户点击右上角分享
    onShareAppMessage: function () {},

    // 协议勾选
    isFlagFn() {
        this.setData({
            flag: !this.data.flag
        });
        if (this.data.flag) {
            this.setData({
                showPopup: true
            })
            // 倒计时
            this.data.timer = setInterval(() => {
                this.setData({
                    countdown: this.data.countdown - 1
                });
                if (this.data.countdown <= 0) {
                    clearInterval(this.data.timer);
                    this.setData({
                        disabledBtn: false
                    });
                }
            }, 1000);
        }
    },

    // 同意本条款按钮
    agreeBtnEv() {
        if (!this.data.disabledBtn) {
            this.setData({
                disabled: false,
                showPopup: false
            })
        }
    },

    // 支付按钮  成功后跳转会首页
    payEv() {
        let payInfo = this.data.payInfo
        wx.requestPayment({
            timeStamp: payInfo.timeStamp,
            nonceStr: payInfo.nonceStr,
            package: payInfo.package,
            signType: payInfo.signType,
            paySign: payInfo.paySign,
            success(res) {
                wx.navigateTo({
                    url: '/package-home/pages/paymentSuccess/paymentSuccess',
                })
            },
        })

    },

    // 跳转我的优惠券页面
    toCouponsEv() {
        wx.navigateTo({
            url: '/package-user/pages/myCoupons/myCoupons?price=' + this.data.orderInfo.amount,
        })
    }
});