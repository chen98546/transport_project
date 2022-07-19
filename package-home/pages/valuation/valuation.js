import {
    setSafeFn
} from '../../../api/order.js'
Page({
    // 页面的初始数据
    data: {
        checked1: false,
        checked2: false,
        p1: 0,
        p2: 0,
        value: '',
        closeModal: true,
        orderNo: ''
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        const pages = getCurrentPages()
        const current = pages[pages.length - 1];
        const event = current.getOpenerEventChannel();
        if (JSON.stringify(event) == '{}') return
        // 接收订单列表对应订单的数据
        event.on('orderNoEv', params => {
            this.setData({
                orderNo: params
            })
        });

        
    },

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

    // 保价输入框
    fieldChangeEv(e) {
        this.setData({
            value: e.detail
        })
        if (this.data.checked1) {
            this.setData({
                p1: (this.data.value * 0.03).toFixed(2)
            })
        } else {
            this.setData({
                p1: 0
            })
        }
        if (this.data.checked2) {
            this.setData({
                p2: (this.data.value * 0.02).toFixed(2)
            })
        } else {
            this.setData({
                p2: 0
            })
        }
    },


    // 丢失险
    onChangeEv1() {
        this.setData({
            checked1: !this.data.checked1
        })

        if (this.data.checked1) {
            this.setData({
                p1: (this.data.value * 0.03).toFixed(2)
            })
        } else {
            this.setData({
                p1: 0
            })
        }
    },
    // 关税险
    onChangeEv2() {
        this.setData({
            checked2: !this.data.checked2
        })
        if (this.data.checked2) {
            this.setData({
                p2: (this.data.value * 0.02).toFixed(2)
            })
        } else {
            this.setData({
                p2: 0
            })
        }
    },


    // 跳转客服页面
    toServiceEv() {
        wx.navigateTo({
            url: '/package-user/pages/service/service',
        })
    },


    // 弹窗下一步按钮
    async nextStepEv() {
        if (!this.data.checked1 && !this.data.checked2) {
            this.setData({
                closeModal: false
            });
        }
        if (this.data.checked1 || this.data.checked2) {
            if (!Number(this.data.value)) {
                wx.showToast({
                    title: '请输入保价的价格',
                    icon: 'none'
                })
                return
            } else {
                this.setData({
                    closeModal: false
                });
            }
        }

        if (this.data.checked1 && this.data.checked2) {
            if (!Number(this.data.value)) {
                wx.showToast({
                    title: '请输入保价的价格',
                    icon: 'none'
                })
                return
            } else {
                this.setData({
                    closeModal: true
                });
                let result = await setSafeFn(this.options.id, this.data.value, this.data.p1, this.data.p2)
                if (result.status == 200) {
                    wx.navigateTo({
                        url: '/package-home/pages/payment/payment',
                        success: (res) => {
                            res.eventChannel.emit('valuationPriceEv', {
                                id: this.options.id
                            })
                        }
                    })
                }
            }
        }

    },
    // 承担风险按钮事件
    async cancleHandleEv() {
        this.setData({
            closeModal: true
        });
        await setSafeFn(this.options.id, this.data.value || 0, this.data.p1 || 0, this.data.p2 || 0)
        wx.navigateTo({
            url: '/package-home/pages/payment/payment',
            success: (res) => {
                res.eventChannel.emit('valuationPriceEv', {
                    id: this.options.id
                })
            }
        })
    },
    // 购买保险按钮事件
    async confirmHandleEv() {
        this.setData({
            closeModal: true,
        });
    },
});