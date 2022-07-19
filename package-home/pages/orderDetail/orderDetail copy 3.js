import {
  copyInfoFn
} from "../../../utils/methods.js";

import {
  setExpressNumData,
  addUserRemarksData,
  orderCancle,
  addExpress,
  getOrderInfo,
  removeExpressNum,
  confirmPacking,
} from '../../../api/order.js'

Page({
  // 页面的初始数据
  data: {
    warehouseInfo: wx.getStorageSync('warehouseAddress'), // 仓库地址信息
    address: wx.getStorageSync('address'), // 收货地址信息 
    inputValue: '', // 快递个数
    disabledInput: false, // 禁用快递个数input框
    disabledField: false, // 禁用快递单号input框
    orderItemList: [], // 生成快递单号输入框
    orderInfo: {}, // 当前订单的详细信息
    isSubmit: false, // 是否显示提交订单按钮
    textAreaNoteInfo: '', // 订单备注
    removeOrderIndex: '', // 需要删除的快递单号的下标
    closeAddOrderNoModal: true, // 增加快递单号弹窗提示
    closeRemoveOrderNoModal: true, // 删除快递单号弹窗提示
    closeCancleOrderModal: true, // 取消订单弹窗提示
    closeConfirmOrderModal: true, // 确认订单弹窗提示
    closeConfirmPackingModal: true, // 确认打包弹窗提示
    closeConfirmAddressModal: true, // 支付选项确认地址弹窗提示
    timer: null, // 取消订单后延时返回上一页或首页
    orderNoArr: [], // 所有快递单号集合
    showSupplement: true, // 是否显示补充快递单号按钮
    dvAllStatus: false, // 所有快递单号的状态
    dvArr: [], // 快递单号状态对应标签（带入仓/已入库）
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    const pages = getCurrentPages()
    if (pages[0].route == 'pages/order/order') {
      let res = await getOrderInfo(options.id)
      console.log(res.data.expressItems);
      if (res.data.orderStatus != 0) {
        for (let i = 0; i < res.data.expressItems.length; i++) {
          this.data.orderItemList.push({
            value: res.data.expressItems[i].expressNo
          })
        }
        this.setData({
          orderItemList: this.data.orderItemList,
          dvArr: res.data.expressItems,
          dvAllStatus: res.data.expressItems.every(item => item.isDv)
        })
        if (res.data.orderStatus != 1) {
          this.setData({
            inputValue: res.data.expressItems.length,
            disabledInput: true,
            disabledField: true,
            showSupplement: false
          })
        }
      }


    }
    const current = pages[pages.length - 1];
    const event = current.getOpenerEventChannel();
    if (JSON.stringify(event) == '{}') return
    // 接收订单列表对应订单的数据
    event.on('getOrderInfoEV', params => {
      this.setData({
        orderInfo: params
      })
    });
    event.on('emitOrderInfo', params => {
      this.setData({
        orderInfo: params
      })
    });
    // 订单状态
    this.data.orderInfo.orderStatus == 0 && (this.data.orderInfo.orderStatusText = '待填写')
    this.data.orderInfo.orderStatus == 1 && (this.data.orderInfo.orderStatusText = '待入仓')
    this.data.orderInfo.orderStatus == 2 && (this.data.orderInfo.orderStatusText = '待拣货')
    this.data.orderInfo.orderStatus == 3 && (this.data.orderInfo.orderStatusText = '待打包')
    this.data.orderInfo.orderStatus == 4 && (this.data.orderInfo.orderStatusText = '待出仓')
    this.data.orderInfo.orderStatus == 5 && (this.data.orderInfo.orderStatusText = '已出仓')
    this.data.orderInfo.orderStatus == 6 && (this.data.orderInfo.orderStatusText = '有异常')
    this.data.orderInfo.orderStatus == 7 && (this.data.orderInfo.orderStatusText = '已取消')
    // 预选渠道
    this.data.orderInfo.orderType == 1 && (this.data.orderInfo.orderTypeText = '电子产品')
    this.data.orderInfo.orderType == 2 && (this.data.orderInfo.orderTypeText = '液体粉末')
    this.data.orderInfo.orderType == 3 && (this.data.orderInfo.orderTypeText = '内地EMS')
    this.data.orderInfo.orderType == 4 && (this.data.orderInfo.orderTypeText = '广东EMS')
    this.data.orderInfo.orderType == 5 && (this.data.orderInfo.orderTypeText = '普通货物')
    this.setData({
      orderInfo: this.data.orderInfo
    })
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


  // 公共函数：判断是否显示提交订单按钮
  isShowSubmitBtnFn() {
    let itemValueIsEmpty = this.data.orderItemList.every(item => item.value != '')
    if (itemValueIsEmpty) {
      // 快递单号不为空时显示提交订单按钮
      this.setData({
        isSubmit: true,
      })
    } else {
      // 快递单号为空时不显示提交订单按钮
      this.setData({
        isSubmit: false,
      })
    }
  },


  // 复制手机号和订单号
  copyDetailInfoEv(e) {
    copyInfoFn(e.currentTarget.dataset.phonenum);
  },


  // 跳转客服页面
  toServiceEv() {
    wx.navigateTo({
      url: '/package-user/pages/service/service',
    })
  },
  // 快递个数失焦事件
  async gettingDataEv(e) {
    // 生成快递单号输入框
    for (let i = 0; i < e.detail.value; i++) {
      this.data.orderItemList.push({
        value: ''
      })
    }
    if (e.detail.value != Number(e.detail.value) || !Number(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的快递单号数量',
        icon: 'none'
      })
      return
    } else {
      // 快递个数请求
      await setExpressNumData(e.detail.value, this.options.id)
      this.setData({
        disabledInput: true, // 禁用快递个数input框
        inputValue: e.detail.value, // 记录输入的快递个数,
        orderItemList: this.data.orderItemList, // 生成快递单号后重新赋值
      })
    }
  },
  // 订单备注事件
  textAreaEv(e) {
    this.setData({
      textAreaNoteInfo: e.detail.value
    })
  },
  // 快递单号内容发生改变事件
  orderItemChangeEv(e) {
    // 将输入的快递单号赋值给对应的每一项
    this.data.orderItemList.forEach((item, index) => index == e.target.dataset.index && (item.value = e.detail))
    console.log('detail', e.detail);
    this.isShowSubmitBtnFn();
  },
  // 快递单号输入框失焦事件
  async fieldBlurEv(e) {
    await addExpress(this.options.id, e.detail.value)
  },



  // 补充快递单号按钮事件
  addOrderItemEv() {
    this.setData({
      closeAddOrderNoModal: false
    });
  },
  // 补充快递单号弹窗取消事件
  addOrderNoRefuseEv() {
    this.setData({
      closeAddOrderNoModal: true // 取消后关闭弹窗 
    });
  },
  // 补充快递单号弹窗确认事件
  addOrderNoAllowEv() {
    // 点击添加一个快递单号输入框
    this.data.orderItemList.push({
      value: ''
    })
    this.isShowSubmitBtnFn();
    this.setData({
      closeAddOrderNoModal: true, // 确认后关闭弹窗 
      orderItemList: this.data.orderItemList, // 添加快递单号后重新赋值
      inputValue: this.data.orderItemList.length // 快递单号数量
    })
  },



  // 删除快递单号事件
  removeOrderNoEv(e) {
    this.setData({
      removeOrderIndex: e.target.dataset.index, // 保存需要删除的下标
      closeRemoveOrderNoModal: false // 显示删除提示弹窗
    })
  },
  // 删除快递单号弹窗取消事件
  removeOrderNoRefuseEv() {
    this.setData({
      closeRemoveOrderNoModal: true // 取消后关闭弹窗 
    });
  },
  // 删除快递单号弹窗确认事件
  async removeOrderNoAllowEv() {
    // 发送删除快递单号请求
    let res = await removeExpressNum(this.data.orderInfo.id)
    if (res.status == 200) {
      // 删除指定下标的快递单号输入框
      this.data.orderItemList.splice(this.data.removeOrderIndex, 1)
      this.setData({
        orderItemList: this.data.orderItemList, // 删除后重新赋值
        closeRemoveOrderNoModal: true, // 确认后关闭弹窗 
        inputValue: this.data.orderItemList.length // 快递单号数量
      })
    }
    if (!this.data.orderItemList.length) {
      this.setData({
        disabledInput: false, // 如果快递个数为0，则隐藏提交订单按钮和取消禁用快递个数输入框，将输入框赋值为空
        isSubmit: false,
        inputValue: ''
      })
    }
  },



  // 取消订单按钮事件
  cancleBtnEv() {
    this.setData({
      closeCancleOrderModal: false
    })
  },
  // 取消订单弹窗取消事件
  cancleOrderNoRefuseEv() {
    this.setData({
      closeCancleOrderModal: true
    })
  },
  // 取消订单弹窗确认事件
  async cancleOrderNoAllowEv() {
    let res = await orderCancle(this.data.orderInfo.id)
    if (res.status == 200) {
      wx.showToast({
        title: '订单取消成功',
        icon: 'success',
        mask: true,
      })
      this.setData({
        closeCancleOrderModal: true
      })
      let pages = getCurrentPages();
      this.data.timer = setTimeout(() => {
        if (pages[0].route == 'pages/order/order') {
          wx.navigateBack();
          clearTimeout(this.data.timer)
        } else {
          wx.switchTab({
            url: '/pages/index/index',
          })
          clearTimeout(this.data.timer)
        }
      }, 500)
    }

  },



  // 提交订单按钮事件
  submitBtnEv() {
    // 判断快递个数是否为空
    if (!Number(this.data.inputValue)) {
      wx.showToast({
        title: '请先填写快递个数',
        icon: 'none'
      })
      return
    }
    // 判断快递单号是否有为空的
    let allOrderIsEmpty = this.data.orderItemList.some(item => item.value == '');
    // 有空的则不能直接提交订单
    if (allOrderIsEmpty) {
      wx.showToast({
        title: '快递单号不能为空',
        icon: 'none'
      })
      return
    }
    this.setData({
      closeConfirmOrderModal: false, // 显示弹窗
      orderNoArr: this.data.orderItemList.map(item => item.value).join(',') // 快递单号集合
    })
  },
  // 提交订单弹窗取消事件
  confirmOrderNoRefuseEv() {
    this.setData({
      closeConfirmOrderModal: true // 取消后关闭弹窗
    })
  },
  // 提交订单弹窗确认事件
  async confirmOrderNoAllowEv() {
    // 订单备注请求
    await addUserRemarksData(this.options.id, this.data.textAreaEv)
    this.setData({
      closeConfirmOrderModal: true // 确认后关闭弹窗
    })
    wx.showToast({
      title: '订单提交成功',
      icon: 'success',
      mask: true,
    })

    this.data.timer = setTimeout(() => {
      wx.switchTab({
        url: '/pages/order/order',
        success() {
          clearTimeout(this.data.timer)
        }
      })
    }, 500)
  },



  // 确认打包按钮事件
  orderPackageEv() {
    this.setData({
      closeConfirmPackingModal: false
    })
  },
  // 确认打包弹窗取消事件
  confirmPackingNoRefuseEv() {
    this.setData({
      closeConfirmPackingModal: true
    })
  },
  // 确认打包弹窗确认事件
  async confirmPackingNoAllowEv() {
    let res = await confirmPacking(this.options.id)
    console.log(res);
    if (res.status == 200) {
      wx.showToast({
        title: '订单打包成功',
        icon: 'success',
        mask: true,
      })

      this.data.timer = setTimeout(() => {
        wx.switchTab({
          url: '/pages/order/order',
          success() {
            clearTimeout(this.data.timer)
          }
        })
      }, 500)
    }
    this.setData({
      closeConfirmPackingModal: true
    })
  },


  // 支付选项按钮事件
  paidOptionsEv() {
    this.setData({
      closeConfirmAddressModal: false
    })
  },
  // 支付选项弹窗取消按钮
  confirmAddressRefuseEv() {
    this.setData({
      closeConfirmAddressModal: true
    })
  },
  // 支付选项弹窗确认按钮
  confirmAddressAllowEv() {
    this.setData({
      closeConfirmAddressModal: true
    })
    wx.navigateTo({
      url: '/package-home/pages/valuation/valuation?id=' + this.data.orderInfo.id,
    })
  }


});