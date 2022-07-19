import {
  createOrderData
} from '../../../api/order.js'
Page({
  // 页面的初始数据
  data: {
    countdown: 0,
    timer: null,
    disabledBtn: true,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
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

  // 跳转订单详情页面
  async transportBtnEv() {
    let warehouseAddress = wx.getStorageSync('warehouseAddress')
    let address = wx.getStorageSync('address')
    let info = {
      provenance: '中国',
      destination: wx.getStorageSync('contry'),
      memberId: wx.getStorageSync('userInfo').id,
      orderType: wx.getStorageSync('selected').id,
      shelfer: warehouseAddress.name,
      shelfPhone: warehouseAddress.phone,
      shelfAddress: warehouseAddress.provinces + warehouseAddress.city + warehouseAddress.address,
      recipient: address.username,
      recipientPhone: address.phone,
      recipientCountry: wx.getStorageSync('contry'),
      recipientCode: address.postcode,
      recipientAddress: address.address,
      recipientCity: address.city,
    }
    let res = await createOrderData(info)
    wx.navigateTo({
      url: "/package-home/pages/orderDetail/orderDetail?id=" + res.data.id,
      success(result) {
        result.eventChannel.emit('emitOrderInfo', res.data)
      }
    });
  },
});