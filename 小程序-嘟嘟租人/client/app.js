//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  onLaunch: function () {

    // 展示本地存储能力///////////////////
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //未授权时不登录，这里无法直接调用弹窗，只能使用 button 引导用户授权
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.loginwx();
        }
      }
    })

  },
  loginwx() {

    qcloud.setLoginUrl(config.service.loginUrl)

    //登录并存数数据/////////////////////
    if (this.globalData.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.globalData.userInfo = result;
          that.globalData.logged = true;
          that.requestAddress();
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.globalData.userInfo = result.data.data;
              that.globalData.logged = true;
              that.requestAddress()
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })

  },
  requestAddress() {

    //请求地址参数
    var that = this
    wx.request({
      url: config.service.modifyAddressUrl,
      data: {
        id: that.globalData.userInfo.nickName
      },
      success(res) {
        console.log(res.data)
        //返回的 msg 是一个对象数组
        that.globalData.userAddress = res.data.data.msg[0].address || '';
        that.globalData.userPhone = res.data.data.msg[0].phone || '';
      }
    })

  },
  globalData: {
    userInfo: {},
    logged: false,
    userAddress: '',
    userPhone: ''
  }
})