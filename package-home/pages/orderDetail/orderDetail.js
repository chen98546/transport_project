import { copyInfoFn } from "../../../utils/methods.js";
Page({
  // 页面的初始数据
  data: {
    warehouseInfo: {
      warehouse: "物流仓库",
      warehouseNum: "15566669999",
      warehouseAddr: "深圳市龙华区龙华街道工业路壹城环智中心C座2607室",
    },
    inputValue: "",
    nodeId: 1,
    value: "",
    orderItemList: [],
    disabledInput: false,
    closeModal: true,
    closeModal2: true,
    closeModal3: true,
    submitBtn: true,
    arrValue: "",
    orderNumber: 20220509140712345678,
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

  // 复制手机号和订单号
  copyDetailInfoEv(e) {
    copyInfoFn(e.currentTarget.dataset.phonenum);
  },

  gettingDataEv(e) {
    this.setData({ inputValue: e.detail.value });
    for (let i = 0; i < e.detail.value; i++) {
      let list = {
        nodeId: this.data.nodeId++,
        value: this.data.value,
      };
      this.data.orderItemList.push(list);
    }
    this.setData({
      orderItemList: this.data.orderItemList,
      disabledInput: true,
      inputValue: "",
    });
    if (!this.data.orderItemList.length) {
      this.setData({ disabledInput: false });
    } else {
      this.setData({ disabledInput: true });
    }
  },

  removeItemEv(e) {
    this.data.orderItemList.splice(e.target.dataset.index, 1);
    this.setData({ orderItemList: this.data.orderItemList });
    if (!this.data.orderItemList.length) {
      this.setData({ disabledInput: false, submitBtn: true });
    } else {
      this.setData({ disabledInput: true, submitBtn: false });
    }
  },

  // 补充单号
  addOrderItemEv() {
    this.setData({ closeModal: false });
  },

  // 模态框取消操作
  modalRefuseEv() {
    this.setData({ closeModal: true });
  },
  // 模态框确认操作
  modalAllowEv() {
    let list = {
      nodeId: this.data.nodeId++,
      value: this.data.value,
    };
    this.data.orderItemList.push(list);
    this.setData({
      closeModal: true,
      orderItemList: this.data.orderItemList,
      disabledInput: true,
      inputValue: "",
      submitBtn:true
    });
  },

  // 模态框取消操作
  cancleHandleEv() {
    this.setData({ closeModal2: true });
  },
  // 模态框确认操作
  confirmHandleEv() {
    this.setData({ closeModal2: true });
    wx.switchTab({ url: "/pages/index/index" });
  },

  // 模态框取消操作
  cancleHandleEv2() {
    this.setData({ closeModal3: true });
  },
  // 模态框确认操作
  confirmHandleEv2() {
    this.setData({ closeModal3: true });
    wx.switchTab({ url: "/pages/order/order" });
  },

  changeEv(e) {
    let orderItemList = this.data.orderItemList.map((item, index) => {
      if (index == e.target.dataset.index) item.value = e.detail;
      return item;
    });
    let submitBtn = orderItemList.every((item) => item.value !== "");
    this.setData({ orderItemList, submitBtn: !submitBtn });
  },

  cancleBtnEv() {
    this.setData({ closeModal2: false });
  },

  submitBtnEv() {
    let arrValue = this.data.orderItemList.map((item) => item.value);
    this.setData({ closeModal3: false, arrValue: arrValue.join(",") });
  },
});
