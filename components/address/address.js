// components/address/address.js
Component({
  // 组件的属性列表
  properties: {
    address: {
      type: Array,
    },
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {
    isFlagFn(e) {
      let address = this.data.address.map((item) => {
        if (item.id == e.target.dataset.id) {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      });
      this.setData({ address });
    },
    getAddressEv(e) {
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2]; //获取上一个页面的js里面的pages的所有信息,-2 是上一个页面
      prevPage.setData({ address: e.currentTarget.dataset.address });
      wx.navigateBack({delta: 1});
    },
  },
});
