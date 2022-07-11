import {
  copyInfoFn
} from "../../../utils/methods.js";

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
    closeModal4: true,
    closeModal5: true,
    submitBtn: true,
    arrValue: "",
    orderNumber: 20220509140712345678,
    params: [],
    isPaid: false,
    showSupplement: true,
    fieldSisabled: false,
    package: false
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {
    const pages = getCurrentPages()
    const current = pages[pages.length - 1];
    const event = current.getOpenerEventChannel();
    if (JSON.stringify(event) == '{}') return
    // 接收订单列表对应订单的数据
    event.on('getOrderInfoEV', params => {
      this.setData({
        params
      })

      if (params.payState == 0 && params.orderstate == 2) {
        this.setData({
          isPaid: true
        })
      }

      if (params.orderList.length) {
        for (let i = 0; i < params.orderList.length; i++) {
          let list = {
            nodeId: this.data.nodeId++,
            value: params.orderList[i].id,
            orderStatus: params.orderList[i].orderStatus,
          };
          this.data.orderItemList.push(list);
        }
        this.data.orderItemList.map(item => {
          item.fieldSisabled = false
          return item
        }).filter(item => {
          if (item.orderStatus == 1) {
            item.fieldSisabled = true
          }
          return item
        })
        this.setData({
          orderItemList: this.data.orderItemList,
          disabledInput: true,
          inputValue: "",
        });
      }
    });

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

  // 复制手机号和订单号
  copyDetailInfoEv(e) {
    copyInfoFn(e.currentTarget.dataset.phonenum);
  },

  // 失焦弹出对应数量的订单输入框
  gettingDataEv(e) {
    this.setData({
      inputValue: e.detail.value
    });

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
      this.setData({
        disabledInput: false
      });
    } else {
      this.setData({
        disabledInput: true
      });
    }
  },

  // 删除订单号输入框
  removeItemEv(e) {
    wx.showModal({
      title: '是否确认删除该订单',
      success(res) {
        if (res.confirm) {
          this.data.orderItemList.splice(e.target.dataset.index, 1);
          this.setData({
            orderItemList: this.data.orderItemList
          });
          if (!this.data.orderItemList.length) {
            this.setData({
              disabledInput: false,
              submitBtn: true
            });
          } else {
            this.setData({
              disabledInput: true,
              submitBtn: false
            });
          }
        }
      }
    })
  },

  // 补充单号
  addOrderItemEv() {
    this.setData({
      closeModal: false
    });
  },

  // 模态框取消操作
  modalRefuseEv() {
    this.setData({
      closeModal: true
    });
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
      submitBtn: true
    });
  },

  // 模态框取消操作
  cancleHandleEv() {
    this.setData({
      closeModal2: true
    });
  },
  // 模态框确认操作
  confirmHandleEv() {
    this.setData({
      closeModal2: true
    });
    wx.switchTab({
      url: "/pages/index/index"
    });
  },

  // 模态框取消操作
  cancleHandleEv2() {
    this.setData({
      closeModal3: true
    });
  },
  // 模态框确认操作
  confirmHandleEv2() {
    this.setData({
      closeModal3: true
    });
    wx.switchTab({
      url: "/pages/order/order"
    });
  },

  // 模态框取消操作
  cancleHandleEv3() {
    this.setData({
      closeModal4: true
    });
  },
  // 模态框确认操作
  confirmHandleEv3() {
    this.setData({
      closeModal4: true,
      showSupplement: false,
      package: true
    });
  },

  // 模态框取消操作
  cancleHandleEv4() {
    this.setData({
      closeModal5: true
    });
  },
  // 模态框确认操作
  confirmHandleEv4() {
    this.setData({
      closeModal5: true,
      isPaid: true
    });

    wx.navigateTo({
      url: '/package-home/pages/valuation/valuation',
    })
  },

  // 快递单号选项卡内容改变时触发
  changeEv(e) {
    let orderItemList = this.data.orderItemList.map((item, index) => {
      if (index == e.target.dataset.index) item.value = e.detail;
      return item;
    });
    let submitBtn = orderItemList.every((item) => item.value !== "");
    this.setData({
      orderItemList,
      submitBtn: !submitBtn
    });
  },

  // 弹框取消
  cancleBtnEv() {
    this.setData({
      closeModal2: false
    });
  },

  // 提交订单
  submitBtnEv() {
    let arrValue = this.data.orderItemList.map((item) => item.value);
    this.setData({
      closeModal3: false,
      arrValue: arrValue.join(",")
    });
  },

  // 订单打包
  orderPackageEv() {
    this.setData({
      closeModal4: false,
    });
  },

  // 支付选项
  paidOptionsEv() {
    this.setData({
      closeModal5: false,
    });
  },

  // 跳转客服页面
  toServiceEv() {
    wx.navigateTo({
      url: '/package-user/pages/service/service',
    })
  }
});