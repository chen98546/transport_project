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
    price: {
      type: String,
    },
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {
    // 优惠券详情
    couponsDetailEv(e) {
      if (this.data.route == 'pages/user/user') {
        wx.navigateTo({
          url: '/package-user/pages/couponsDetail/couponsDetail?coupons=' + JSON.stringify(e.currentTarget.dataset.coupons),
        })
      } else {
        if (e.currentTarget.dataset.coupons.status == 20) {
          wx.showToast({
            title: '该优惠券已使用',
            icon: 'none',
          })
          return
        }
        if (e.currentTarget.dataset.coupons.status == 30) {
          wx.showToast({
            title: '该优惠券已过期',
            icon: 'none',
          })
          return
        }
        if (e.currentTarget.dataset.coupons.status == 10 || this.data.price < e.currentTarget.dataset.coupons.usedMinAmount) {
          wx.showToast({
            title: '未满足活动需求',
            icon: 'none'
          })
          return
        }
        
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