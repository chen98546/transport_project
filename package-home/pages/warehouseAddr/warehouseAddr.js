import {
  copyInfoFn
} from "../../../utils/methods.js";
Page({
  // 页面的初始数据
  data: {
    address: wx.getStorageSync('warehouseAddress'),
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let address = this.data.address;
    let index = address.address.indexOf('(')
    let postcodeIndex = address.address.indexOf('：')
    address.postcode = address.address.slice(postcodeIndex + 1, address.address.length - 1);
    address.address = address.address.slice(0, index);
    this.setData({
      address: this.data.address
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

  // 复制仓库地址
  copyInfoEv() {
    let address = this.data.address;
    let fullAddress = address.provinces + address.city + address.address + address.phone + address.name;
    copyInfoFn(fullAddress);
  },
});