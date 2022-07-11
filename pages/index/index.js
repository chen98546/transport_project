import {
  getBannerList
} from '../../api/banner.js'
import {
  getGoodsPropertyFn
} from '../../api/goods.js'
Page({
  // 页面的初始数据
  data: {
    closeModal: true,
    swiperData: [],
    channelList: [],
    addr: "美国",
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    let {
      data
    } = await getBannerList()
    this.setData({
      swiperData: data
    })
    let res = await getGoodsPropertyFn()
    this.setData({
      swiperData: data,
      channelList: res.data.reverse()
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

  // 预选渠道
  selectedChannelEv(e) {
    let channelList = this.data.channelList.map((item) => {
      if (item.id == e.target.dataset.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    this.setData({
      channelList
    });
  },

  // 模态框显示隐藏
  transportBtnEv() {
    this.setData({
      closeModal: false
    });
  },

  // 模态框取消
  cancelEv() {
    this.setData({
      closeModal: true
    });
  },

  // 模态框下一步操作
  nextStepEv() {
    this.setData({
      closeModal: true
    });
    wx.navigateTo({
      url: "/package-home/pages/fillInAddress/fillInAddress",
    });
  },

  // 选择国家
  selectContryEv() {
    wx.navigateTo({
      url: "/package-home/pages/selectCountry/selectCountry",
    });
  },

  // 跳转转运须知
  toTransportEv() {
    wx.navigateTo({
      url: "/package-user/pages/transportNotice/transportNotice",
    });
  },

  // 跳转客服页面
  toServicePageEv() {
    wx.navigateTo({
      url: "/package-user/pages/service/service",
    });
  },

  // 跳转重量预估页面
  toWeightEv() {
    wx.navigateTo({
      url: "/package-home/pages/weight/weight",
    });
  },

  // 跳转选择地址页面
  toWarehouseAddrEv() {
    wx.navigateTo({
      url: "/package-home/pages/warehouseAddr/warehouseAddr",
    });
  }
});