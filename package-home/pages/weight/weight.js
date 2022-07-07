// package-home/pages/weight/weight.js
Page({
  // 页面的初始数据
  data: {
    channelList: ["普通货物", "电子产品", "液体粉末", "广东EMS", "内地EMS"],
    channelDetailList: [{
        id: 1,
        status: 1,
        name: "普通货物",
        firstHeavy: 59,
        subsequent: 39,
        date: "4-9",
      },
      {
        id: 2,
        status: 2,
        name: "电子产品",
        firstHeavy: 69,
        subsequent: 49,
        date: "6-10",
      },
      {
        id: 3,
        status: 3,
        name: "液体粉末",
        firstHeavy: 79,
        subsequent: 59,
        date: "6-10",
      },
      {
        id: 4,
        status: 4,
        name: "广东EMS",
        firstHeavy: 128,
        subsequent: 49,
        date: "7-30",
      },
      {
        id: 5,
        status: 5,
        name: "内地EMS",
        firstHeavy: 128,
        subsequent: 35,
        date: "10-30",
      },
    ],
    isShow: true,
    selectChanne: "普通货物",
    totalPrice: 0,
    weightNum: "",
    length: '',
    width: '',
    height: ''
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

  // 展开选择功能
  noticeTipEv() {
    this.setData({
      isShow: false,
    });
  },

  // 渠道选择取消按钮
  onCancelEv() {
    this.setData({
      isShow: true,
    });
  },

  // 价格计算逻辑
  totalPriceFn(value) {
    let channel = this.data.channelDetailList.filter((item) => {
      return item.name == value;
    });
    if (this.data.weightNum <= 1 && this.data.selectChanne == channel[0].name) {
      this.setData({
        totalPrice: this.data.weightNum * channel[0].firstHeavy,
      });
    } else {
      let total = channel[0].firstHeavy + (this.data.weightNum - 1) * channel[0].subsequent;
      this.setData({
        totalPrice: total
      });
    }
    if (!this.data.weightNum || this.data.weightNum == 0) {
      this.setData({
        totalPrice: 0
      })
    }
  },

  // 长宽高计算体积逻辑
  forecastFn(value) {
    if (value != Number(value)) {
      wx.showToast({
        title: '输入格式有误，请输入数字类型',
        icon: 'none'
      })
      this.setData({
        weightNum: '',
        totalPrice: 0
      })
      return
    }
    if (this.data.length && this.data.width && this.data.height) {
      let kg = this.data.length * this.data.width * this.data.height / 6000;
      this.setData({
        weightNum: (kg * 2).toFixed(2)
      })
      this.totalPriceFn(this.data.selectChanne);
    } else {
      this.setData({
        weightNum: '',
        totalPrice: 0
      })
    }
  },

  // 选择渠道
  onConfirmEv(e) {
    this.totalPriceFn(e.detail.value);
    this.setData({
      isShow: true,
      selectChanne: e.detail.value,
    });
  },

  // 预估重量
  changeWeightEv(e) {
    this.setData({
      weightNum: e.detail.value,
    });
    this.totalPriceFn(this.data.selectChanne)

  },

  // 长
  changeLengthEv(e) {
    this.setData({
      length: e.detail.value
    })
    this.forecastFn(e.detail.value)
  },

  // 宽
  changeWidthEv(e) {
    this.setData({
      width: e.detail.value
    })
    this.forecastFn(e.detail.value)
  },

  // 高
  changeHeightEv(e) {
    this.setData({
      height: e.detail.value
    })
    this.forecastFn(e.detail.value)
  }
});