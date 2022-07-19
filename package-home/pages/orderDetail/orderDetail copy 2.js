import {
  copyInfoFn
} from "../../../utils/methods.js";

import {
  setExpressNumData,
  addUserRemarksData,
  orderCancle,
  addExpress,
  getOrderInfo,
  removeExpressNum
} from '../../../api/order.js'

Page({
  // 页面的初始数据
  data: {
    warehouseInfo: wx.getStorageSync('warehouseAddress'),
    address: wx.getStorageSync('address'),
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
    // orderNumber: 20220509140712345678,
    params: {},
    isPaid: false,
    showSupplement: true,
    fieldSisabled: false,
    package: false,
    orderInfo: {},
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    const pages = getCurrentPages()
    const current = pages[pages.length - 1];
    const event = current.getOpenerEventChannel();
    if (JSON.stringify(event) == '{}') return
    // 接收订单列表对应订单的数据
    event.on('getOrderInfoEV', params => {
      this.setData({
        params
      })

      console.log(params);

      // if (params.paymentStatus == 0) {
      //   this.setData({
      //     isPaid: true
      //   })
      // }
      // if (JSON.stringify(params) != '{}') {
      //   for (let i = 0; i < params.expressNum; i++) {
      //     let list = {
      //       value: params.expressItems[i].expressNo
      //     };
      //     this.data.orderItemList.push(list);
      //   }
      //   console.log(this.data.orderItemList);
      // this.data.orderItemList.map(item => {
      //   item.fieldSisabled = false
      //   return item
      // }).filter(item => {
      //   if (item.orderStatus == 1) {
      //     item.fieldSisabled = true
      //   }
      //   return item
      // })
      // this.setData({
      //   orderItemList: this.data.orderItemList,
      //   disabledInput: true,
      //   inputValue: "",
      // });
      // }
    });
    let res = await getOrderInfo({
      id: options.id || this.data.params.id
    })
    this.setData({
      orderInfo: res.data
    })
    console.log(996, this.data.orderInfo);
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {

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
  async gettingDataEv(e) {
    this.setData({
      inputValue: e.detail.value
    });
    for (let i = 0; i < e.detail.value; i++) {
      let list = {
        value: this.data.value
      }
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

    // 快递个数
    await setExpressNumData({
      expressNum: e.detail.value,
      id: this.options.id
    })
  },

  // 订单备注信息
  async textAreaEv(e) {

    let res = await addUserRemarksData({
      id: this.options.id || this.data.params.id,
      userRemarks: e.detail.value
    })
  },
  // 删除快递单号输入框
  removeItemEv(e) {
    wx.showModal({
      title: '是否确认删除该快递单号',
      success: (res) => {
        if (res.confirm) {
          this.data.orderItemList.splice(e.target.dataset.index, 1);
          this.setData({
            orderItemList: this.data.orderItemList
          });
          // if (!this.data.orderItemList.length) {
          //   this.setData({
          //     disabledInput: false,
          //     submitBtn: true
          //   });
          // } else {
          //   this.setData({
          //     disabledInput: true,
          //     submitBtn: false
          //   });
          // }
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
  async confirmHandleEv() {
    this.setData({
      closeModal2: true
    });
    await orderCancle({
      id: this.options.id || this.data.params.id,
    })
    // wx.switchTab({
    //   url: "/pages/index/index"
    // });
    wx.navigateBack()
  },

  // 模态框取消操作
  cancleHandleEv2() {
    this.setData({
      closeModal3: true
    });
  },
  // 模态框确认操作
  async confirmHandleEv2() {
    this.setData({
      closeModal3: true
    });
    await removeExpressNum({
      id: this.options.id || this.data.params.id,
    })
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
    let submitBtn = orderItemList.every((item) => {
      return item.value !== ""
    });
    this.setData({
      orderItemList,
      submitBtn: !submitBtn
    });
  },

  // 取消订单按钮
  cancleBtnEv() {
    this.setData({
      closeModal2: false
    });
  },

  // 快递单号失焦事件
  async fieldBlurEv(e) {
    await addExpress({
      id: this.options.id || this.data.params.id,
      expressNo: e.detail.value
    })
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