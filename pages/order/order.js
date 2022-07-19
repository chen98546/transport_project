import {
  getOrderList, 
} from '../../api/order.js'
Page({
  // 页面的初始数据
  data: {
    tabList: [{
        id: 1,
        title: "全部"
      },
      {
        id: 2,
        title: "待支付"
      },
      {
        id: 3,
        title: "已支付"
      },
      {
        id: 4,
        title: "已完成"
      },
    ],
    orderInfoTabList: [],
    orderInfoList: [],
    page: 1,
    limit: 10,
    orderListLen: 0,
    state: 0,
    orderInfoArr: []
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: async function () {
    let memberId = wx.getStorageSync('userInfo').id
    let res = await getOrderList(memberId, this.data.page, this.data.limit); 


    res.data = res.data.reverse() // 反转数组 将添加的订单显示在最前面 
    this.setData({
      orderInfoTabList: res.data,
      orderInfoList: res.data,
      orderListLen: res.data.length
    })
  },

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

  // tab栏切换
  changTabEv(e) {
    let orderInfoList = this.data.orderInfoTabList.map((item) => {
      item.paymentStatus == 0 && (item.state = 1) // 待支付
      item.paymentStatus == 1 && (item.state = 2) // 已支付
      item.orderStatus == 7 && (item.state = 3) // 已完成
      return item
    }).filter((item) => item.state == e.detail.index); // 过滤出对应tab栏状态的数据 

    // 为0说明状态栏为‘全部’显示所有数据 不为0则将过滤好的对应tab栏的数据赋值渲染 
    if (e.detail.index == 0) {
      this.setData({
        orderInfoList: this.data.orderInfoTabList
      });
    } else {
      this.setData({
        orderInfoList
      });
    }
  },
});