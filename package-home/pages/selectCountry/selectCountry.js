Page({
  // 页面的初始数据
  data: {
    contryList: [
      { id: 1, contry: "中国" },
      { id: 2, contry: "美国" },
      { id: 3, contry: "俄罗斯" },
      { id: 4, contry: "日本" },
      { id: 5, contry: "韩国" },
      { id: 6, contry: "泰国" },
    ],
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let contryList = this.data.contryList.map((item) => {
      return item.contry;
    });
    contryList.sort((a, b) =>
      a.localeCompare(b, "zh-Hans-CN", { sensitivity: "accent" })
    );
    this.setData({ contryList });
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
});
