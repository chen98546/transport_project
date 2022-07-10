import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store.js";

Component({
  options: {
    // 覆盖vant默认样式
    styleIsolation: "shared",
  },

  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/asset/images/home.png",
        selectedIconPath: "/asset/images/home_active.png",
        text: "首页",
      },
      {
        pagePath: "/pages/ticket/ticket",
        iconPath: "/asset/images/ticket.png",
        selectedIconPath: "/asset/images/ticket_active.png",
        text: "优惠券",
      },
      {
        pagePath: "/pages/order/order",
        iconPath: "/asset/images/order.png",
        selectedIconPath: "/asset/images/order_active.png",
        text: "订单信息",
      },
      {
        pagePath: "/pages/user/user",
        iconPath: "/asset/images/user.png",
        selectedIconPath: "/asset/images/user_active.png",
        text: "我的",
      },
    ],
  },

  behaviors: [storeBindingsBehavior],

  // 获取共享的数据 
  storeBindings: {
    store,
    fields: {
      tabbarIndex: "tabbarIndex",
    },
    actions: ["activeTabbarIndex"],
  },

  // 监听
  observers: {},

  // 组件的方法列表
  methods: {
    activeFn(event) {
      this.activeTabbarIndex(event.detail);
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      });
    },
    
  },

});
