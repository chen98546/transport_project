// components/a/aa.js
Component({
  // 组件的属性列表
  properties: {
    couponsList: {
      type: Array,
    },
    route: {
      type: String,
    },
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {
    // 优惠券详情
    couponsDetailEv(e) {
      // 上一页为用户页面有则点击进入详情 不是则为选取优惠券
      if (this.data.route == 'pages/user/user') {
        wx.navigateTo({
          url: '/package-user/pages/couponsDetail/couponsDetail?coupons=' + JSON.stringify(e.currentTarget.dataset.coupons),
        })
      } else {
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.setData({
          coupons: e.currentTarget.dataset.coupons
        })
        wx.navigateBack()
      }
    }
  },
});