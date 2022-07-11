import {
  areaList
} from "@vant/area-data";
import {
  setAddressDetaultFn
} from '../../../api/address.js'
Page({
  // 页面的初始数据
  data: {
    areaList,
    isShowCountry: false,
    checked: 0,
    params: null,
    info: {},
    addrId: ''
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      addrId: options.id
    })
    const pages = getCurrentPages()
    const current = pages[pages.length - 1];
    const event = current.getOpenerEventChannel();
    event.on('transmitAddrEv', params => {
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

  // 国家选择显示隐藏
  showCountryEv() {
    this.setData({
      isShowCountry: !this.data.isShowCountry,
    });
  },

  // 选中的国家
  async onChange(e) {
    this.setData({
      checked: e.detail
    });
  },

  // 取消按钮
  cancelEv() {
    this.setData({
      isShowCountry: false,
    });
  },

  // 确认按钮
  confirmEv() {
    this.setData({
      isShowCountry: false,
    });
  },
});