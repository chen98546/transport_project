// pages/index/index.js
Page({
  // 页面的初始数据
  data: {
    closeModal: true,
    swiperData: [
      {
        id: "banner1",
        src: "/asset/images/banner1.png",
      },
      {
        id: "banner2",
        src: "/asset/images/banner2.png",
      },
      {
        id: "banner3",
        src: "/asset/images/banner3.png",
      },
      {
        id: "banner4",
        src: "/asset/images/banner4.png",
      },
      {
        id: "banner5",
        src: "/asset/images/banner5.png",
      },
      {
        id: "banner6",
        src: "/asset/images/banner6.png",
      },
    ],
    channelList: [
      { id: 1, text: "普通货物", selected: true },
      { id: 2, text: "电子产品", selected: false },
      { id: 3, text: "液体粉末", selected: false },
      { id: 4, text: "内地EMS", selected: false },
      { id: 5, text: "广东EMS", selected: false },
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

  selectedChannelEv(e) {
    let channelList = this.data.channelList.map((item) => {
      if (item.id == e.target.dataset.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    this.setData({ channelList });
  },

  transportBtnEv() {
    this.setData({ closeModal: false });
  },
  cancelEv() {
    this.setData({ closeModal: true });
  },
  nextStepEv() {
    this.setData({ closeModal: true });
    wx.navigateTo({
      url: "/package-home/pages/fillInAddress/fillInAddress",
    });
  },
  selectContryEv() {
    wx.navigateTo({
      url: "/package-home/pages/selectCountry/selectCountry",
    });
  },

  toTransportEv() {
    wx.navigateTo({
      url: "/package-user/pages/transportNotice/transportNotice",
    });
  },
});
