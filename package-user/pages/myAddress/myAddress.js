// package-User/pages/addAddress/addAddress.js
Page({
  // 页面的初始数据
  data: {
    address: [
      {
        id: 1,
        username: "laoliu",
        userPhone: 18600005555,
        userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
        city: "Los Angeles",
        status: true,
        postcode: '566530',
      },
      {
        id: 2,
        username: "zhangsan",
        userPhone: 15566668888,
        userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
        city: "Washington",
        status: false,
        postcode: '606214',
      },
      {
        id: 3,
        username: "lisi",
        userPhone: 13322226666,
        userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
        city: "Washington",
        status: false,
        postcode: '012545',
      },
    ],
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let reg = /(\d{3})\d{4}(\d{4})/; //正则表达式
    let address = this.data.address.map((item) => {
      item.surnames = item.username.split("")[0];
      item.encryPhone = item.userPhone.toString().replace(reg, "$1****$2");
      return item;
    });
    this.setData({ address });
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

  toAddAddressEv(){
    console.log(123);
    wx.navigateTo({
      url: '/package-user/pages/addAddress/addAddress',
    })
  }
});
