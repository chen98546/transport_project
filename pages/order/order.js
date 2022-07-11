// pages/order/order.js
Page({
  // 页面的初始数据
  data: {
    tabList: [{
        id: 1,
        status: 0,
        title: "全部"
      },
      {
        id: 2,
        status: 1,
        title: "待支付"
      },
      {
        id: 3,
        status: 2,
        title: "已支付"
      },
      {
        id: 4,
        status: 3,
        title: "已完成"
      },
    ],
    testData: [{
        id: 1,
        orderstate: 0,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545565256',
        orderList: [],
        payState: 0
      },
      {
        id: 2,
        orderstate: 1,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223312',
        orderList: [{
          id: 124543,
          orderStatus: 0
        }, {
          id: 478556,
          orderStatus: 0
        }, {
          id: 784524529,
          orderStatus: 0
        }, ],
        payState: 0
      },
      {
        id: 3,
        orderstate: 2,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223231',
        orderList: [{
            id: 1245453,
            orderStatus: 0
          },
          {
            id: 45857856,
            orderStatus: 0
          }, {
            id: 78245259,
            orderStatus: 0
          }
        ],
        payState: 0
      },
      {
        id: 4,
        orderstate: 3,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223218',
        orderList: [{
            id: 1212757883,
            orderStatus: 1
          },
          {
            id: 454524526,
            orderStatus: 1
          }, {
            id: 785245,
            orderStatus: 1
          },
        ],
        payState: 1
      },
      {
        id: 5,
        orderstate: 4,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223219',
        orderList: [{
            id: 17585235785,
            orderStatus: 1
          },
          {
            id: 425256,
            orderStatus: 1
          }, {
            id: 45245789,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 6,
        orderstate: 5,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223217',
        orderList: [{
            id: 12652378,
            orderStatus: 1
          },
          {
            id: 45645245,
            orderStatus: 1
          }, {
            id: 7245249,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 7,
        orderstate: 6,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223213',
        orderList: [{
            id: 1452787823,
            orderStatus: 0
          },
          {
            id: 45245256,
            orderStatus: 0
          }, {
            id: 72452489,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 8,
        orderstate: 7,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223213',
        orderList: [{
            id: 1452787823,
            orderStatus: 1
          },
          {
            id: 45245256,
            orderStatus: 1
          }, {
            id: 72452489,
            orderStatus: 1
          }
        ],
        payState: 1
      },
    ],
    orderInfoList: [{
        id: 1,
        orderstate: 0,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545565256',
        orderList: [],
        payState: 0
      },
      {
        id: 2,
        orderstate: 1,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223312',
        orderList: [{
          id: 124543,
          orderStatus: 0
        }, {
          id: 478556,
          orderStatus: 0
        }, {
          id: 784524529,
          orderStatus: 0
        }, ],
        payState: 0
      },
      {
        id: 3,
        orderstate: 2,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223231',
        orderList: [{
            id: 1245453,
            orderStatus: 0
          },
          {
            id: 45857856,
            orderStatus: 0
          }, {
            id: 78245259,
            orderStatus: 0
          }
        ],
        payState: 0
      },
      {
        id: 4,
        orderstate: 3,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223218',
        orderList: [{
            id: 1212757883,
            orderStatus: 1
          },
          {
            id: 454524526,
            orderStatus: 1
          }, {
            id: 785245,
            orderStatus: 1
          },
        ],
        payState: 1
      },
      {
        id: 5,
        orderstate: 4,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223219',
        orderList: [{
            id: 17585235785,
            orderStatus: 1
          },
          {
            id: 425256,
            orderStatus: 1
          }, {
            id: 45245789,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 6,
        orderstate: 5,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223217',
        orderList: [{
            id: 12652378,
            orderStatus: 1
          },
          {
            id: 45645245,
            orderStatus: 1
          }, {
            id: 7245249,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 7,
        orderstate: 6,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223213',
        orderList: [{
            id: 1452787823,
            orderStatus: 0
          },
          {
            id: 45245256,
            orderStatus: 0
          }, {
            id: 72452489,
            orderStatus: 1
          }
        ],
        payState: 1
      },
      {
        id: 8,
        orderstate: 7,
        origin: '中国',
        terminus: '美国',
        orderNumber: '20220506015545223213',
        orderList: [{
            id: 1452787823,
            orderStatus: 1
          },
          {
            id: 45245256,
            orderStatus: 1
          }, {
            id: 72452489,
            orderStatus: 1
          }
        ],
        payState: 1
      },
    ],
    status: 0,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 生命周期函数--监听页面隐藏
  onHide: function () {},

  // 生命周期函数--监听页面卸载
  onUnload: function () {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {},

  // 用户点击右上角分享
  onShareAppMessage: function () {},

  // tab栏切换
  changTabEv(e) {
    let orderInfoList = this.data.testData
      .map((item) => {
        if (item.orderstate == 0 || item.orderstate == 1 || item.orderstate == 2) {
          item.status = 1
        } else if (item.orderstate == 3 || item.orderstate == 4 || item.orderstate == 5) {
          item.status = 2
        } else  if (item.orderstate == 7){
          item.status = 3
        }
        if (item.status == e.detail.index) {
          return item;
        }
      })
      .filter((item) => item);
    if (e.detail.index == 0) {
      this.setData({
        orderInfoList: this.data.testData
      });
    } else {
      this.setData({
        orderInfoList
      });
    }
  },
});