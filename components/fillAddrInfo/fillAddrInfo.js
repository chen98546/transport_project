// components/fillAddrInfo/fillAddrInfo.js
import {
  addAddressFn,
  updateAddressFn,
  setAddressDetaultFn
} from '../../api/address.js'
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多 slot 支持
  },

  // 组件的属性列表
  properties: {
    addressInfo: {
      type: Object,
    },
    params: {
      type: Object,
    },
    isHome: {
      type: Boolean
    },
    checked: {
      type: Boolean
    },
  },

  // 组件的初始数据
  data: {
    username: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    errorMessage1: "",
    errorMessage2: "",
    errorMessage3: "",
  },

  // 组件的方法列表
  methods: {
    commonFn() {},

    // 首页立即转运按钮
    transmitInfoEv() {
      let username = this.data.username;
      let phone = this.data.phone;
      let address = this.data.address;
      let city = this.data.city;
      let postcode = this.data.postcode;
      this.commonFn()
      let userInfo = {
        username,
        phone,
        address,
        city,
        postcode
      };
      if (!username || !phone || !address || !city || !postcode) {
        wx.showToast({
          title: "地址信息不能为空，请补全地址信息",
          icon: "none",
        });
        return;
      }
      let reg = /^[A-Za-z0-9,，\x20]+$/;
      let info = reg.test(username) && reg.test(address) && reg.test(city);
      if (info) {
        this.triggerEvent("receiveInfo", userInfo);
      } else {
        wx.showToast({
          title: "格式错误，请检查输入的内容是否正确",
          icon: "none",
        });
        return;
      }
    },

    // InfoBlurFn(data) {
    //   let errorMessage = '';
    //   let reg = /^[A-Za-z0-9,，\x20]+$/;
    //   if (!reg.test(data)) {
    //     errorMessage = "格式错误"
    //     return;
    //   } else {
    //     errorMessage = ""
    //   }
    //   return errorMessage
    // },

    // 用户名失焦事件
    InfoBlurEv1() { 
      // this.setData({
      //   errorMessage1: this.InfoBlurFn(this.data.username)
      // })
      let reg = /^[A-Za-z0-9,，\x20]+$/;
      if (!reg.test(this.data.username)) {
        this.setData({
          errorMessage1: "格式错误"
        });
        return;
      } else {
        this.setData({
          errorMessage1: ""
        });
      }
    },

    // 地址失焦事件
    InfoBlurEv2() {
      // this.InfoBlurFn(this.data.address, this.data.errorMessage2)
      let reg = /^[A-Za-z0-9,，\x20]+$/;
      if (!reg.test(this.data.address)) {
        this.setData({
          errorMessage2: "格式错误"
        });
        return;
      } else {
        this.setData({
          errorMessage2: ""
        });
      }
    },

    // 城市失焦事件
    InfoBlurEv3() {
      // this.InfoBlurFn(this.data.city, this.data.errorMessage3)
      let reg = /^[A-Za-z0-9,，\x20]+$/;
      if (!reg.test(this.data.city)) {
        this.setData({
          errorMessage3: "格式错误"
        });
        return;
      } else {
        this.setData({
          errorMessage3: ""
        });
      }
    },

    // 确认添加地址事件
    async confirmAddAddressEv() {
      let memberId = wx.getStorageSync('userInfo').id
      let info = {
        memberId,
        name: this.data.username,
        phone: this.data.phone,
        area: this.data.address,
        city: this.data.city,
        code: this.data.postcode,
        country: "us",
        status: this.data.checked ? 1 : 0,
        type: 1
      }
      if (!info.name || !info.phone || !info.area || !info.city || !info.code) {
        wx.showToast({
          title: "地址信息不能为空，请补全地址信息",
          icon: "none",
        });
        return;
      }
      let res = await addAddressFn(info);
      if (res.status == 200) {
        wx.showToast({
          title: '地址添加成功',
          icon: 'none'
        })
        wx.navigateBack()
      } else {
        return
      }
    },

    // 确认修改地址事件
    async confirmEditAddressEv(e) {
      let memberId = wx.getStorageSync('userInfo').id
      let info = {
        id: this.data.params.id,
        memberId,
        name: this.data.username,
        phone: this.data.phone,
        area: this.data.address,
        city: this.data.city,
        code: this.data.postcode,
        country: "us",
        status: this.data.checked ? 1 : 0,
        type: 1
      }
      if (!info.name || !info.phone || !info.area || !info.city || !info.code) {
        wx.showToast({
          title: "地址信息不能为空，请补全地址信息",
          icon: "none",
        });
        return;
      }
      let res = await updateAddressFn(info);
      if (res.status == 200) {
        wx.showToast({
          title: '地址添加成功',
          icon: 'none'
        })
        wx.navigateBack()
      } else {
        return
      }
      if (this.data.checked) {
        await setAddressDetaultFn(this.data.params.id)
      }
    },
  },

});