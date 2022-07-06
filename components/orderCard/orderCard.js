import { copyInfoFn } from "../../utils/methods.js";
Component({
  // 组件的属性列表
  properties: {
    orderInfo: {
      type: Array,
    },
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {
    // 复制
    copyOrderNumber(e) {
      copyInfoFn(e.currentTarget.dataset.phonenum);
    },
  },
});
