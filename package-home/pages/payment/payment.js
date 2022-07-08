// package-home/pages/payment/payment.js
Page({
    // 页面的初始数据
    data: {
        flag: false,
        showPopup: false,
        countdown: 5,
        timer: null,
        disabledBtn: true,
        disabled: true
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {

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

    agreeBtnEv() {
        if (!this.data.disabledBtn) {
            this.setData({
                disabled: false,
                showPopup: false
            })
        }
    },

    payEv() {
        wx.navigateTo({
            url: '/package-home/pages/paymentSuccess/paymentSuccess',
        })
    }
});