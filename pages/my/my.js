// pages/my/my.js
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickName: '未登录',
    src:'/images/index.png',
    num: 0,

  },
  // 获取用户信息
  getMyInfo: function(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res),
        this.setData({
          isLogin: true,
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        // 获取用户收藏列表
        this.getMyFavourites();
      }
    })
  },

  // 获取收藏列表
  getMyFavourites: function() {
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;
    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    // 更新收藏列表
    this.setData({
      newList: myList,
      num: num
    });
  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 如果已经登陆
    if (this.data.isLogin) {
      // 更新收藏列表
      this.getMyFavourites();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})