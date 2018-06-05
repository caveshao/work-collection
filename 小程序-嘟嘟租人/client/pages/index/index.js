//index.js
//获取应用实例
const app = getApp()
var config = require('../../config')
const util = require('../../utils/util.js')

Page({
  data: {
    posttedTasks: []
  },
  requestTasks() {

    //请求地址参数
    var that = this
    wx.request({
      url: config.service.tasksUrl,
      data: {
      },
      success(res) {
        console.log(res.data)
        that.setData({
          posttedTasks: res.data.data.res
        })
      }
    })

  },
  changeStatus(e) {
    var user = e.currentTarget.dataset.task;
    var that = this;

    (user.id !== app.globalData.userInfo.nickName) && wx.request({
      url: config.service.getTasksUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: user.id,
        employee: app.globalData.userInfo.nickName,
        employeePhone: app.globalData.userPhone,
        status: 1,
        task: user.task,
        address: user.address,
        phone: user.phone,
        amount: user.amount,
        price: user.price
      },
      success(res) {
        console.log(res.data)
        that.requestTasks();
      }
    })
  },
  onShow() {
    this.requestTasks();
  }
})
