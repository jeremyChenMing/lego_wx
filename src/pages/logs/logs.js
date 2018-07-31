//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: [],
    userInfo: {},
    tab: 1,
    arr: ['/images/produce.png','/images/produce.png','/images/produce.png']
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    // this.getList()
  },
  getList: function () {
    wx.request({
      url: 'https://api.d.51bricks.com',
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        console.log(data)
      }
    })
  },
  handleNav: function(e) {
    console.log(e)
    const dataSet = e.currentTarget.dataset
    this.setData({
      tab: dataSet.id
    })
  },



})
