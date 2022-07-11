import {
  getAddressListFn,
} from '../../../api/address.js'
Page({
  // 页面的初始数据
  data: {
    // address: [{
    //     id: 1,
    //     username: "laoliu",
    //     userPhone: 18600005555,
    //     userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
    //     city: "Los Angeles",
    //     status: true,
    //     postcode: '566530',
    //   },
    //   {
    //     id: 2,
    //     username: "zhangsan",
    //     userPhone: 15566668888,
    //     userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
    //     city: "Washington",
    //     status: false,
    //     postcode: '606214',
    //   },
    //   {
    //     id: 3,
    //     username: "lisi",
    //     userPhone: 13322226666,
    //     userAddr: "MEGASYSTEMS INC 799 E DRAGRAM SUITE 5A TUCSON, AZ 85705 USA",
    //     city: "Washington",
    //     status: false,
    //     postcode: '012545',
    //     // info: {}
    //   },
    // ],
    address: []
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: async function () {
    this.addressInfoFn()
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

  // 跳转添加地址页面
  toAddAddressEv() {
    wx.navigateTo({
      url: '/package-user/pages/addAddress/addAddress',
    })
  },

  // 地址数据加工处理
  async addressInfoFn() {
    let memberId = wx.getStorageSync('userInfo').id
    let reg = /(\d{3})\d{4}(\d{4})/; //正则表达式
    let {
      data
    } = await getAddressListFn({
      memberId,
      type: 1
    })
    let myAddr = data.map((item) => {
      item.surnames = item.name.split("")[0];
      item.encryPhone = item.phone.toString().replace(reg, "$1****$2");
      return item;
    });
    this.setData({
      address: myAddr
    });
  },

  // 删除时刷新地址数据
  refreshEv(e) {
    if (e.detail == 200) {
      this.addressInfoFn()
    }
  },

  // 设置默认
  async emitSetDefaultEv(e) {
    if (e.detail) {
      this.addressInfoFn()
    }
  }
});