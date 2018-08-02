
const { getProductsOfDetail, getPersonMes, givePraise } = require('../../utils/fetch')

Page({
  data: {
    imgUrls: [],
    message: {},
    person: {},
    animationData: {},
    params: {},
    loading: false,

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    src:" /images/avart.png",
    dian:" /images/dian.png",
    ping:" /images/ping.png",
    proTitle: [
      {name: '投票阶段'},
      {name: '众筹阶段'},
      {name: '生产优化'},
      {name: '生产中'},
    ],
    bool: false
  },
  onLoad: function (e) {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
    })
    this.animation = animation
    this.setData({
      params: e
    })

    getProductsOfDetail(e.id).then( data => {
      if (data.statusCode === 200) {
        // console.log(data.data, '&&')
        this.setData({
          imgUrls: data.data.images,
          message: data.data
        })
      }else{
        wx.showToast({
          title: '获取信息失败'
        })
      }
    })
    getPersonMes(e.author).then( data => {
      if (data.statusCode === 200) {
        // console.log(data.data, '&&person')
        this.setData({
          person: data.data
        })
      }else{

      }
    })



    

  },
  prise: function () {
    console.log()
    const that = this;
    this.setData({
      loading: true
    })


    givePraise(this.data.params.id).then( data => {
      if (data.statusCode === 200) {
        this.data.message.num_votes = this.data.message.num_votes + 1;
        this.animation.scale(2,2).opacity(.5).step();
        this.animation.scale(1,1).opacity(1).step();
        this.setData({
          message: this.data.message, 
          animationData: this.animation.export()
        })
        setTimeout(function () {
          that.setData({
            loading: false
          })
        }, 600)
      }else{
        wx.showToast({
          icon: 'none',
          mask: true,
          title: data.data.message
        })
        setTimeout(function () {
          that.setData({
            loading: false
          })
        }, 600)
      }
    })
    
  },








  handlePing() {
    console.log('123', this.data.bool)
    this.setData({
      bool: !this.data.bool
    })
  }




})