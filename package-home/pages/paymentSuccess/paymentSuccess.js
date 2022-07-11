// package-home/pages/paymentSuccess/paymentSuccess.js
Page({
    // 页面的初始数据
    data: {
        countdown: 3,
        timer: null,
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {},

    // 生命周期函数--监听页面初次渲染完成
    onReady: function () {},

    // 生命周期函数--监听页面显示
    onShow: function () {
        this.data.timer = setInterval(() => {
            this.setData({
                countdown: this.data.countdown - 1
            });
            if (this.data.countdown < 1) {
                clearInterval(this.data.timer);
                wx.switchTab({
                    url: '/pages/index/index',
                })
            }
        }, 1000);
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

    // 支付成功跳转回首页
    completeEv() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    }
});