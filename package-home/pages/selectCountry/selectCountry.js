import {
  contryAddress
} from "../../utils/contryAddr";
const {
  pinyin,
  customPinyin
} = require("pinyin-pro");
Page({
  // 页面的初始数据
  data: {
    contryList: [],
    contryMap: [],
    indexList: []
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let contryList = contryAddress.map((item) => {
      return item.address;
    });
    contryList.sort((a, b) =>
      a.localeCompare(b, "zh-Hans-CN", {
        sensitivity: "accent"
      })
    );
    let contryMap = {};
    let firstName;
    contryList.map((item) => {
      if (item == "朝鲜") {
        customPinyin({
          朝鲜: "chaoxian"
        });
        firstName = pinyin(item, {
          pattern: "first",
          toneType: "none",
        }).toLocaleUpperCase();
        if (contryMap[firstName]) {
          contryMap[firstName].push(item);
        } else {
          contryMap[firstName] = [item];
        }
      } else {
        firstName = pinyin(item.split("")[0], {
          pattern: "first",
          toneType: "none",
        }).toLocaleUpperCase();
        if (contryMap[firstName]) {
          contryMap[firstName].push(item);
        } else {
          contryMap[firstName] = [item];
        }
      }
    });
    let arr = [];
    for (const key in contryMap) {
      arr.push(key)
    }
    this.setData({
      contryList,
      contryMap,
      indexList: arr
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

  // 选择国家
  getAddressEv(e) {
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      addr: e.target.dataset.addr
    });
    wx.navigateBack();
  },
});