// package-User/pages/addAddress/addAddress.js
import {
  areaList
} from "@vant/area-data";
Page({
  // 页面的初始数据
  data: {
    areaList,
    isShowCountry: false,
    checked: true,
    params: null
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const pages = getCurrentPages()
    const current = pages[pages.length - 1];
    const event = current.getOpenerEventChannel();
    event.on('transmitAddrEv', params => {
      console.log(666, params);
      this.setData({
        params
      })
    });
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

  showCountryEv() {
    this.setData({
      isShowCountry: !this.data.isShowCountry,
    });
  },
  onChange({
    detail
  }) {
    this.setData({
      checked: detail
    });
  },

  cancelEv() {
    this.setData({
      isShowCountry: false,
    });
  },

  confirmEv(e) {
    this.setData({
      isShowCountry: false,
    });
  },
  confirmAddAddressEv() {
    wx.navigateBack()
  },
  confirmEditAddressEv() {
    wx.navigateBack()
  }
});