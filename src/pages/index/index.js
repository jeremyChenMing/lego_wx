//index.js
//获取应用实例
const app = getApp()
let startPoint = null;
let disX;
let l;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    show: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,



    tab: 1,
    arr: ['/images/produce.png','/images/produce.png','/images/produce.png'],

    cells: ['','','','',''],
    dots: false,
    auto: false,
    current: 2,
    pre: '80rpx',
    next: '80rpx',

  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../detail/detail'
    // })
  },
  setNavTitle: function (id) { //设置navbar的文字
    const ids = this.data.tab
    wx.setNavigationBarTitle({
      title: ids == 1 ? '推荐作品' : '所有作品'
    })
  },

  handleNav: function(e) {
    console.log(e)
    const dataSet = e.currentTarget.dataset
    this.setData({
      tab: dataSet.id
    })
  },
  onLoad: function () {
    const that = this;
    const n = 0;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }


    setTimeout(function() {
      // that.setData({show: true})
    },1500)


  },
  
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  handleChange: function (event) {
    console.log(event)
    if (event.detail.source === "touch") {
      // 用户操作
      this.setData({
        current: event.detail.current
      })
    }
  },



  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'menu') {
      // 来自右上角的转发菜单
    }else if (res.from === 'button') {
      // 来自按钮转发
    }
    return {
      title: '小霸王其乐无穷',
      path: '/pages/index?id=123',
      imageUrl: '/images/produce.png'
    }
  }











})
