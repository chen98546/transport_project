// pages/user/user.js
Page({
  // 页面的初始数据
  data: {
    myOrderList: [
      { id: 1, icon: "pending-payment", text: "待付款", info: 2 },
      { id: 2, icon: "logistics", text: "待发货", info: 3 },
      { id: 3, icon: "gift-o", text: "待收货", info: 2 },
      { id: 4, icon: "flower-o", text: "待评价", info: 1 },
    ],
    pathList: [
      {
        id: 1,
        text: "我的地址",
        url: "/package-user/pages/myAddress/myAddress",
      },
      {
        id: 2,
        text: "我的优惠券",
        url: "/package-user/pages/myCoupons/myCoupons",
      },
      { id: 3, text: "活动中心", url: "/package-user/pages/activity/activity" },
      { id: 4, text: "联系客服", url: "/package-user/pages/service/service" },
      {
        id: 5,
        text: "转运流程",
        url: "/package-user/pages/transportProcess/transportProcess",
      },
      {
        id: 6,
        text: "转运须知",
        url: "/package-user/pages/transportNotice/transportNotice",
      },
      { id: 7, text: "关于我们", url: "/package-user/pages/aboutUs/aboutUs" },
    ],
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

  toSpecifiedPageEv(e) {
    console.log(e);
    wx.navigateTo({
      url: e.target.dataset.url,
    });
  },
});
