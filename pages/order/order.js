// pages/order/order.js
Page({
  // 页面的初始数据
  data: {
    tabList: [
      { id: 1, status: 0, title: "全部" },
      { id: 2, status: 1, title: "待支付" },
      { id: 3, status: 2, title: "已支付" },
      { id: 4, status: 3, title: "已完成" },
    ],
    testData: [
      { id: 1, status: 1, orderstate:0, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 2, status: 1, orderstate:1, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 3, status: 2, orderstate:2, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 4, status: 3, orderstate:3, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 5, status: 2, orderstate:2, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 6, status: 3, orderstate:1, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
    ],
    orderInfoList: [
      { id: 1, status: 1, orderstate:0, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 2, status: 1, orderstate:1, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 3, status: 2, orderstate:2, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 4, status: 3, orderstate:3, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 5, status: 2, orderstate:2, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
      { id: 6, status: 3, orderstate:1, warehouse:false, origin:'中国', terminus:'美国', orderNumber:'20220506015545223215' },
    ],
    status: 0,
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

  changTabEv(e) {
    let orderInfoList = this.data.testData
      .map((item) => {
        if (item.status == e.detail.index) {
          return item;
        }
      })
      .filter((item) => item);
    if (e.detail.index == 0) {
      this.setData({ orderInfoList: this.data.testData });
    } else {
      this.setData({ orderInfoList });
    }
    console.log(this.data.orderInfoList);
  },
});
