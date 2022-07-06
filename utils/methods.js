// 节流
module.exports.throttle = function (fn, delay) {
  var lastTime = 0;
  return function () {
    var nowTime = Date.now();
    var context = this;
    if (nowTime - lastTime > delay) {
      fn.apply(context, arguments);
      lastTime = nowTime;
    }
  };
};

module.exports.copyInfoFn = function (data) {
  wx.setClipboardData({
    data: data.toString(),
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          wx.showToast({ title: "复制成功" });
        },
      });
    },
  });
};
