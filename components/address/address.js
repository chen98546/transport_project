// components/address/address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
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
  },
});
