import {
  copyInfoFn
} from "../../../utils/methods.js";
Page({
  // 页面的初始数据
  data: {
    warehouseInfo:{},
    address: {},
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      warehouseInfo: wx.getStorageSync('warehouseAddress')
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

  // 复制手机号
  copyPhoneNumber(e) {
    copyInfoFn(e.currentTarget.dataset.phonenum);
  },

  // 跳转转运流程
  receiveInfoEv(e) {
    wx.setStorageSync('address', e.detail)
    wx.navigateTo({
      url: "/package-home/pages/transportNotice/transportNotice",
    });
  },

  // 冒泡触发receiveInfoEv
  transportEv() {},

  // 跳转我的地址页面
  selectAddrEv() {
    wx.navigateTo({
      url: "/package-user/pages/myAddress/myAddress",
    });
  },
});