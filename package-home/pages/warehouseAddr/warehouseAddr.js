import { copyInfoFn } from "../../../utils/methods.js";
Page({
  // 页面的初始数据
  data: {
    address: {
      addressee: "河马仓库",
      addrDetail: "深圳市龙华区龙华街道工业路壹城环智中心C座2607室",
      phone: "16966665555",
      postcode: "518000",
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

  copyInfoEv() {
    let address = this.data.address;
   let fullAddress =  address.addrDetail + address.phone + address.postcode + address.addressee;
    copyInfoFn(fullAddress);
  },
});
