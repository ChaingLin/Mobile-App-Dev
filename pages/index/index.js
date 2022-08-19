// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','崂山区'],
    locationId: "101120201",
    now: {
      cloud: "0", // 云量，百分比数值。可能为空
      dew: "0", // 露点温度，可能为空
      feelsLike: "0", // 体感温度
      humidity: "0", // 相对湿度
      icon: "999", // 天气状况和图标的代码
      obsTime: "", //数据观测时间
      precip: "0.0", // 当前小时累计降水量，默认单位：毫米
      pressure: "0", //大气压强，默认单位：百帕
      temp: "0", // 温度，默认单位：摄氏度
      text: "未知", // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
      vis: "0", // 能见度，默认单位：公里
      wind360: "0", // 风向360角度
      windDir: "0", // 风向
      windScale: "0", // 风力等级
      windSpeed: "0", // 风速 公里/小时
    }
  },
  /**
   * 更新省市区信息
   */
  regionChange: function(e) {
    this.setData({region: e.detail.value});
    console.log(this.data.region);
    
    this.getLocationId();
    
    
  },

    /**
   * 获取实况天气数据
   * @param {} options 
   */
  getWeather:function() {
    var that = this;
    console.log("请求前locationid" + that.data.locationId);
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      // url:'https://api.qweather.com/s6/weather/now',
      data: {
        location: that.data.locationId,
        key:'56a50a24c4f74866bba5e16ba2f52e44'
      },
      success: function(res) {
        that.setData({now: res.data.now})
        console.log(res.data.now);
      }
    });
  },

    /**
   * 获取位置id信息
   * @param {} options 
   */
  getLocationId:function(){
    var that = this;
    console.log("请求前位置region" + that.data.region[1]);
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        location: that.data.region[1],
        key: '56a50a24c4f74866bba5e16ba2f52e44'
      },
      success: function(res) {
        // console.log(res.data);
        that.setData({locationId: res.data.location[0].id});
        that.getWeather();
      }
    });
  },



  sleep:function(d){
    for(var t = Date.now();Date.now() - t <= d;);
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocationId();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

