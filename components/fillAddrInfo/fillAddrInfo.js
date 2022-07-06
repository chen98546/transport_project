// components/fillAddrInfo/fillAddrInfo.js
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多 slot 支持
  },

  // 组件的属性列表
  properties: {},

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
    transmitInfoEv() {
      let username = this.data.username;
      let phone = this.data.phone;
      let address = this.data.address;
      let city = this.data.city;
      let postcode = this.data.postcode;
      let userInfo = { username, phone, address, city, postcode };
      if (!username || !phone || !address || !city || !postcode) {
        wx.showToast({
          title: "地址信息不能为空，请补全地址信息",
          icon: "none",
        });
        return;
      }
      let reg = /^[A-Za-z0-9]+$/;
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

    InfoBlurEv1() {
      let reg = /^[A-Za-z0-9]+$/;
      if (!reg.test(this.data.username)) {
        this.setData({ errorMessage1: "格式错误" });
        return;
      } else {
        this.setData({ errorMessage1: "" });
      }
    },
    InfoBlurEv2() {
      let reg = /^[A-Za-z0-9]+$/;
      if (!reg.test(this.data.address)) {
        this.setData({ errorMessage2: "格式错误" });
        return;
      } else {
        this.setData({ errorMessage2: "" });
      }
    },
    InfoBlurEv3() {
      let reg = /^[A-Za-z0-9]+$/;
      if (!reg.test(this.data.city)) {
        this.setData({ errorMessage3: "格式错误" });
        return;
      } else {
        this.setData({ errorMessage3: "" });
      }
    },
  },
});
