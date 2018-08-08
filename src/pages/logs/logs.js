//logs.js
const app = getApp();
const { getProducts, getPersonMes, HOST } = require('../../utils/fetch');
const { unique, formatTimeCH } = require('../../utils/util');

Page({
  data: {
    logs: [],
    userInfo: {},
    tab: 1,
    host: HOST,
    cells: [],
    authorIdJSON: {},
  },
  onLoad: function () {
    this.getGlobal();
    getProducts().then( data => {
      if (data.statusCode === 200) {
        let arr = [];
        data.data.map( item => {
          item['CHN'] = formatTimeCH(item.create_at)
          arr.push(item.author_id)
        })
        // this.mapAuthor(unique(arr));
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

  getGlobal: function () {
    const that = this;
    if (app.globalData.userInfo) {
      console.log('has')
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }else{
      console.log('no')
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.setData({
            userInfo: app.globalData.userInfo
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            console.log('callback')
            this.userInfoReadyCallback(res)
          }
        }
      })
    }



    if (app.globalData.keys) {
      this.setData({
        authorIdJSON: app.globalData.keys
      })
    }else{
      wx.getStorage({
        key: 'keys',
        success: function (res) {
          that.setData({
            authorIdJSON: res.data
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  }

})
