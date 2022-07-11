// components/address/address.js
import {
  delAddressFn,
  setAddressDetaultFn
} from '../../api/address.js'
Component({
  // 组件的属性列表
  properties: {
    address: {
      type: Array,
    },
  },

  // 组件的初始数据
  data: {
    fetchSetDefault: false
  },

  // 组件的方法列表
  methods: {
    // 设为默认地址选项
    async isFlagFn(e) {
      let res = await setAddressDetaultFn(e.target.dataset.id);
      if (res.status == 200) {
        this.setData({
          fetchSetDefault: true
        })
      }
      this.triggerEvent('emitSetDefault', this.data.fetchSetDefault)
    },

    // 获取地址信息
    getAddressEv(e) {
      let pages = getCurrentPages(); // 获取当前页面js里面的pages里的所有信息。
      if (pages[0].route == 'pages/index/index') {
        let prevPage = pages[pages.length - 2]; // 获取上一个页面的js里面的pages的所有信息,-2 是上一个页面
        prevPage.setData({
          address: e.currentTarget.dataset.address
        });
        wx.navigateBack();
      } else {
        return
      }
    },

    // 发送需要编辑的地址的数据到编辑页面
    editAddressEv(e) {
      wx.navigateTo({
        url: '/package-user/pages/addAddress/addAddress?id=' + e.target.dataset.item.id,
        success(res) {
          res.eventChannel.emit('transmitAddrEv', e.target.dataset.item)
        }
      })
    },

    // 删除地址
    removeAddressEv(e) {
      let _this = this
      wx.showModal({
        title: '是否删除该地址',
        async success(res) {
          if (res.confirm) {
            let res = await delAddressFn(e.target.dataset.id)
            if (res.status == 200) {
              _this.triggerEvent("refreshEv", res.status)
            }
          }
        }
      })
    }
  },
});