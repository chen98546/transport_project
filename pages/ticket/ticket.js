// pages/ticket/ticket.js
Page({
  // 页面的初始数据
  data: {
    couponsList: [{
      id: 1,
      num: 15,
      status: 1,
      deduction: false,
      validityDate: "2022-10-10",
      expiryDate: "2020.11.11",
      meet: "满150元使用",
      src:'/asset/images/ticket1.png'
    },
    {
      id: 2,
      num: 8.8,
      status: 1,
      deduction: true,
      validityDate: "2022-10-10",
      expiryDate: "2020.11.11",
      meet: "满100元使用",
      src:'/asset/images/ticket2.png'
    },
    {
      id: 3,
      num: 10,
      status: 1,
      deduction: false,
      validityDate: "2022-10-10",
      expiryDate: "2020.11.11",
      meet: "满90元使用",
      src:'/asset/images/ticket3.png'
    }
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

  toCouponEv(e){
    console.log(e);
    wx.navigateTo({
      url: '/package-user/pages/couponsDetail/couponsDetail?coupons='+ JSON.stringify(e.target.dataset.coupons),
    })
  }
  
});
