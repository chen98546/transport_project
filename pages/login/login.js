// pages/login/login.js

import {
  wxlogin,
  fetchPhoneNumber,
  fetchOpenId
} from "../../api/user.js";

Page({
  // 页面的初始数据
  data: {
    flag: false,
    closeModal: true,
    userInfo: "",
    session_key: "",
    purePhoneNumber: "",
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let _this = this
    // 获取session_key和openid
    wx.login({
      timeout: 10000,
      success: async (res) => {
        let {
          session_key,
          openid
        } = await fetchOpenId(res.code);
        wx.setStorageSync("openid", openid);
        _this.setData({
          session_key
        });
      },
      fail() {
        _this.showToast("网络异常");
        return;
      },
    });

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


  // 协议勾选
  isFlagFn() {
    this.setData({
      flag: !this.data.flag
    });
  },
  // 模态框显示隐藏
  closeModalFn() {
    this.setData({
      closeModal: !this.data.closeModal
    });
  },
  // 模态框取消操作
  modalRefuseFn() {
    this.setData({
      closeModal: true
    });
    wx.showToast({
      title: "拒绝授权",
      icon: "error"
    });
  },
  // 模态框确认操作
  modalAllowFn() {
    this.setData({
      closeModal: true
    });
  },

  // 获取授权
  loginFn() {
    if (!this.data.flag) return;
    wx.getUserProfile({
      desc: "授权登录",
      success: (res) => {
        wx.login({
          timeout: 10000,
          success: async (result) => {
            let info = {
              code: result.code,
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }
            let {
              data
            } = await wxlogin(info);
            this.setData({
              closeModal: false,
              userInfo: data
            })
          },
          fail() {
            _this.showToast("未登录");
          },
        });
      },
      fail() {
        wx.showToast({
          title: "取消登录",
          icon: "error"
        });
      },
    });
  },

  // 获取用户手机号
  async getPhoneNumber(e) {
    let {
      encryptedData,
      iv
    } = e.detail;
    let {
      purePhoneNumber
    } = await fetchPhoneNumber(
      this.data.session_key,
      encryptedData,
      iv
    );
    if (!purePhoneNumber) {
      wx.setStorageSync("userInfo", "");
      wx.showToast({
        title: "取消操作",
        icon: "error"
      });
      return;
    }

    wx.setStorageSync("userInfo", this.data.userInfo);
    this.setData({
      purePhoneNumber
    });
    wx.reLaunch({
      url: "/pages/user/user"
    });
  },
});