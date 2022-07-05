// package-User/pages/myTicket/myTicket.js
Page({
  // 页面的初始数据
  data: {
    closeModal: true,
    couponsList: [
      {
        id: 1,
        num: 15,
        status: 1,
        deduction: false,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满150元使用",
      },
      {
        id: 2,
        num: 8.8,
        status: 1,
        deduction: true,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满100元使用",
      },
      {
        id: 3,
        num: 10,
        status: 1,
        deduction: false,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满90元使用",
      },
      {
        id: 4,
        num: 9,
        status: 2,
        deduction: true,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满100元使用",
      },
      {
        id: 5,
        num: 20,
        status: 2,
        deduction: false,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满200元使用",
      },
      {
        id: 6,
        num: 7,
        status: 1,
        deduction: true,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满1000元使用",
      },
      {
        id: 7,
        num: 5,
        status: 0,
        deduction: false,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满50元使用",
      },
      {
        id: 8,
        num: 3,
        status: 0,
        deduction: true,
        validityDate: "2022-10-10",
        expiryDate: "2020.11.11",
        meet: "满210元使用",
      },
    ],
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let couponsList = this.data.couponsList.map((item) => {
      if (item.status == 0) {
        item.style = "grayscale(1)";
      } else if (item.status == 1) {
        item.style = "opacity(0.5)";
      } else {
        item.style = "none";
      }
      return item;
    });
    this.setData({ couponsList });
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

  // 模态框取消操作
  modalRefuseEv() {
    this.setData({ closeModal: true });
  },
  // 模态框确认操作
  modalAllowEv() {
    this.setData({ closeModal: true });
  },

  transportBtn() {
    this.setData({ closeModal: false });
  },
});
