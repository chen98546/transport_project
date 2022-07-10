// package-home/pages/valuation/valuation.js
Page({
    // 页面的初始数据
    data: {
        checked1: false,
        checked2: false,
        p1: 0,
        p2: 0,
        value: '',
        closeModal: true
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


    nextStepEv() {
        if (!this.data.checked1 && !this.data.checked2) {
            this.setData({
                closeModal: false
            });
        } else if (!this.data.checked1 || !this.data.checked2) {
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
        } else if (this.data.checked1 && this.data.checked2) {
            if (!Number(this.data.value)) {
                wx.showToast({
                    title: '请输入保价的价格',
                    icon: 'none'
                })
                return
            } else {
                let price = {
                    p1: this.data.p1,
                    p2: this.data.p2,
                }
                wx.navigateTo({
                    url: '/package-home/pages/payment/payment',
                    success(res) {
                        res.eventChannel.emit('valuationPriceEv', price)
                    }
                })
            }
        }

    },


    // 模态框取消操作
    cancleHandleEv() {
        this.setData({
            closeModal: true
        });
        let price = {
            p1: this.data.p1,
            p2: this.data.p2,
        }
        wx.navigateTo({
            url: '/package-home/pages/payment/payment',
            success(res) {
                res.eventChannel.emit('valuationPriceEv', price)
            }
        })
    },
    // 模态框确认操作
    confirmHandleEv() {
        this.setData({
            closeModal: true,
        });
    },
});