//获取小程序实例
var app = getApp()
//user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: app.globalData.userInfo,
        userAddress: app.globalData.userAddress,
        userPhone: app.globalData.userPhone,
        modify: false,
        setPhone: false,
        logged: app.globalData.logged,
        takeSession: false,
        requestResult: ''
    },
    onLoad() {
        this.setData({
            userInfo: app.globalData.userInfo,
            userAddress: app.globalData.userAddress,
            userPhone: app.globalData.userPhone,
            logged: app.globalData.logged
        })
    },
    // 授权并获取用户信息
    login: function (e) {
        if (this.data.logged) return

        var that = this

        this.setData({
            userInfo: e.detail.userInfo,
            logged: true
        })

        app.globalData.userInfo = e.detail.userInfo;
        app.globalData.logged = true;

        //请求地址参数
        wx.request({
            url: config.service.modifyAddressUrl,
            data: {
                id: e.detail.userInfo.nickName
            },
            success(res) {
                console.log(res.data)
                // dataType 默认为 json 所以回调函数会尝试对返回的数据做一次 JSON.parse
                app.globalData.userAddress = res.data.data.msg[0].address
                that.setData({
                    userAddress: res.data.data.msg[0].address,
                    userPhone: res.data.data.msg[0].phone
                })
            }
        })
    },
    /**
     * 修改用户地址
     */
    addressModify(event) {
        //保存并发送新地址
        if (this.data.modify) {
            app.globalData.userAddress = event.detail.value
            // 利用post来进行数组的修改
            // 只有同时具有地址和电话时才可以提交修改信息
            app.globalData.userPhone && wx.request({
                url: config.service.modifyAddressUrl,
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    id: app.globalData.userInfo.nickName || '1',
                    address: event.detail.value,
                    phone: app.globalData.userPhone
                },
                success(res) {
                    console.log(res.data)

                }
            })
        }

        /* 切换修改的状态 */
        this.setData({
            modify: !this.data.modify
        })
    },
    phoneModify(event) {

        if (this.data.setPhone) {
            app.globalData.userPhone = event.detail.value
            // 利用post来进行数组的修改
            // 只有同时具有地址和电话时才可以提交修改信息
            app.globalData.userAddress && wx.request({
                url: config.service.modifyAddressUrl,
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    id: app.globalData.userInfo.nickName || '1',
                    phone: event.detail.value,
                    address: app.globalData.userAddress
                },
                success(res) {
                    console.log(res.data)
                }
            })
        }

        /* 切换修改的状态 */
        this.setData({
            setPhone: !this.data.setPhone
        })
    }
})