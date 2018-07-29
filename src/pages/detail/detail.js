Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
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
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },







  handlePing() {
    console.log('123', this.data.bool)
    this.setData({
      bool: !this.data.bool
    })
  }




})