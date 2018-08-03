//logs.js
const app = getApp()
const { getProducts, getPersonMes } = require('../../utils/fetch')
const { unique, formatTimeCH } = require('../../utils/util')

Page({
  data: {
    logs: [],
    userInfo: {},
    tab: 1,
    arr: ['/images/produce.png','/images/produce.png','/images/produce.png'],
    
    cells: [],
    authorIdJSON: {},
  },
  onLoad: function () {
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
  bindViewTap: function(e) {
    const id = e.currentTarget.dataset
    wx.navigateTo({
      url: `../detail/detail?id=${id.id}&author=${id.auth}`
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
