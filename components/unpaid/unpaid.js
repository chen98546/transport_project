// components/unpaid/unpaid.js
Component({
    // 组件的属性列表
    properties: {
        isPaid: {
            type: Boolean
        },
        orderInfo: {
            type: Object
        }
    },

    // 组件的初始数据
    data: {
        imageList: [{
                id: 1,
                src: 'https://img1.baidu.com/it/u=919705406,152544108&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=482'
            },
            {
                id: 2,
                src: 'https://img1.baidu.com/it/u=919705406,152544108&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=482'
            },
            {
                id: 3,
                src: 'https://img1.baidu.com/it/u=919705406,152544108&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=482'
            }
        ]
    },

    // 组件的方法列表
    methods: {
        // 图片预览
        previewMediaEv(e) {
            let list = this.data.imageList.map(item => {
                return item.src
            })
            wx.previewImage({
                current: e.target.dataset.src,
                urls: list
            })
        }
    },


});