//index.js
//获取应用实例
const app = getApp()
const { getProducts, getPersonMes } = require('../../utils/fetch')
const { unique, formatTimeCH } = require('../../utils/util')
// app.globalData.userInfo

Page({
  data: {
    tab: 1,
    authorIdJSON: {},
    cells: [],
    dots: false,
    auto: false,
    current: 2,
    pre: '80rpx',
    next: '80rpx',

  },
  
  backTime: function (time) {
    console.log(time)
    return '123'
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true,
    })
    getProducts().then( data => {
      if (data.statusCode === 200) {
        console.log(data.data, '*&')
        let arr = [];
        data.data.map( item => {
          item['CHN'] = formatTimeCH(item.create_at)
          arr.push(item.author_id)
        })
        this.mapAuthor(unique(arr));
        this.setData({
          cells: data.data
        })
      }else {
        wx.showToast({
          title: '获取信息失败'
        })
      }
    })

  },
  mapAuthor: function (mes) {
    const that = this;
    let arr = [];
    for(let i=0; i<mes.length; i++) {
      arr.push(getPersonMes(mes[i]))
    }
    Promise.all(arr).then( data => {
      let json = {};
      data.map( item => {
        json[item.data.id] = item.data;
      })
      that.setData({
        authorIdJSON: json
      })
    })
  },
  //事件处理函数
  bindViewTap: function(e) {
    const id = e.currentTarget.dataset
    wx.navigateTo({
      url: `../detail/detail?id=${id.id}&author=${id.auth}`
    })
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
  


  handleChange: function (event) {
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
      path: '/pages/index/index?id=123',
      imageUrl: '/images/produce.png',
    }
  }











})
