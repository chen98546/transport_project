// package-home/pages/fillInAddress/fillInAddress.js
Page({
  // 页面的初始数据
  data: {
    warehouseInfo: {
      warehouse: "物流仓库",
      warehouseNum: "15566669999",
      warehouseAddr: "深圳市龙华区龙华街道工业路壹城环智中心C座2607室",
    },
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},

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

  //   transportBtnEv() {
  //     // wx.navigateTo({
  //     // url: '/package-user/pages/transportNotice/transportNotice',
  //     // });
  //   },

  // 复制手机号
  copyPhoneNumber(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.phonenum,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({ title: "复制成功" });
          },
        });
      },
    });
  },

  receiveInfoEv(data) {
    console.log(data.detail);
    // wx.navigateTo({
    //   url: "/package-user/pages/transportNotice/transportNotice",
    // });
  },

  transportBtnEv() {
    wx.navigateTo({
      url: "/package-home/pages/transportNotice/transportNotice",
    });
  },
});
