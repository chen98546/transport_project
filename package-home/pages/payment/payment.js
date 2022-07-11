// package-home/pages/payment/payment.js
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
        p1: 0,
        p2: 0,
        transferCost: 218,
        surcharge: 68,
        totalPrice: 0
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        const pages = getCurrentPages()
        const current = pages[pages.length - 1];
        const event = current.getOpenerEventChannel();
        if (JSON.stringify(event) == '{}') return
        // 接收投保页面的数据
        event.on('valuationPriceEv', params => {
            this.setData({
                p1: params.p1 || 0,
                p2: params.p2 || 0,
            })
        });

        let totalPrice = (Number(this.data.transferCost) + Number(this.data.surcharge) + Number(this.data.p1 || 0) + Number(this.data.p2 || 0)).toFixed(2)
        this.setData({
            totalPrice
        })
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady: function () {},

    // 生命周期函数--监听页面显示
    onShow: function () {},

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
        wx.navigateTo({
            url: '/package-home/pages/paymentSuccess/paymentSuccess',
        })
    },

    // 跳转我的优惠券页面
    toCouponsEv() {
        wx.navigateTo({
            url: '/package-user/pages/myCoupons/myCoupons',
        })
    }
});