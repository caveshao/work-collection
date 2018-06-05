//logs.js
var config = require('../../config')
const util = require('../../utils/util.js')

var app = getApp();

Page({
  data: {
    ifAccess: false,
    postTask: '',
    amount: 1,
    phone: '',
    price: 1,
    field: {
      focus: false,
      title: '任务',
      placeholder: '比如：红烧牛肉'
    },
    //计数器
    amountStepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      // 最大可到的数字
      max: 4
    },
    //价格计数器
    priceStepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      max: 100
    },
    posttedTask: {},
    gettedTasks: []
  },
  onShow() {
    this.setData({
      ifAccess: app.globalData.userAddress && app.globalData.userInfo.nickName
    })
    this.requestTasks('postted');
    this.requestTasks('getted');
  },
  requestTasks(db) {
    var that = this

    wx.request({
      url: config.service.getTasksUrl,
      data: {
        db: db,
        id: app.globalData.userInfo.nickName
      },
      success(res) {
        if (db === 'postted') {
          that.setData({
            posttedTask: res.data.data.res[0]
          })
        } else if (db === 'getted') {
          that.setData({
            gettedTasks: res.data.data.res
          })
        } else {

        }
      }
    })
  },
  handleFieldChange(event) {
    this.setData({
      postTask: event.detail.detail.value
    })
  },
  // 处理数量更改
  handleAmountChange({
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    detail: stepper
  }) {
    this.setData({
      'amountStepper.stepper': stepper,
      amount: stepper
    });
  },
  // 处理价格更改
  handlePriceChange({
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    detail: stepper
  }) {
    this.setData({
      'priceStepper.stepper': stepper,
      price: stepper
    });
  },
  taskInput(event) {
    this.setData({
      postTask: event.detail.value
    })
  },
  postTasks() {
    /**
     * 发布任务
     */
    var that = this;
    this.data.postTask && wx.request({
      url: config.service.tasksUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: app.globalData.userInfo.nickName,
        task: that.data.postTask,
        address: app.globalData.userAddress,
        amount: that.data.amount,
        phone: app.globalData.userPhone,
        price: that.data.price
      },
      success(res) {
        console.log(res.data)
        that.setData({
          postTask: '',
          'amountStepper.stepper': 1,
          'priceStepper.stepper': 1
        })
      }
    })
  },
  taskCompletion(e) {
    var that = this

    wx.request({
      url: config.service.taskCompletionUrl,
      data: {
        id: app.globalData.userInfo.nickName
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  removeTask(e) {
    if (this.data.posttedTask.status === 1) {
      // 先检测一遍减少网络请求
    } else if (this.data.posttedTask.status === 0) {
      console.log(`remove`)
      wx.request({
        url: config.service.removeTaskUrl,
        data: {
          id: app.globalData.userInfo.nickName,
          status: 0
        },
        success(res) {
          console.log(res.data)
        }
      })
    } else {

    }
  }
})
