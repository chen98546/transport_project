// package-user/pages/myParcel/myParcel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [{
                id: 1,
                num: 3,
                title: '待处理',
                desc: []
            },
            {
                id: 2,
                num: 6,
                title: '待入仓',
                desc: [{
                        id: 1,
                        text: '待拣货',
                        n: 6
                    },
                    {
                        id: 2,
                        text: '待打包',
                        n: 0
                    },
                ],
            },
            {
                id: 3,
                num: 7,
                title: '待出仓',
                desc: [{
                        id: 1,
                        text: '未付款',
                        n: 3
                    },
                    {
                        id: 2,
                        text: '已付款',
                        n: 4
                    },
                    {
                        id: 3,
                        text: '打包中',
                        n: 7
                    },
                    {
                        id: 4,
                        text: '打包完毕',
                        n: 0
                    },
                ],
            },
            {
                id: 4,
                num: 8,
                title: '待收货',
                desc: [{
                    id: 1,
                    text: '转运中',
                    n: 8
                }, ],
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})