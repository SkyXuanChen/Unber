// pages/newRequest/waitingUmbrella/waitingUmbrella.js
var app = getApp();

function timing(that) {
  var seconds = that.data.seconds
  setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  }, 1000)
  formatSeconds(that)
}

function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {
  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
  });
}

function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds:0,
    time:'00:00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    timing(this);
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

  },

  cancelOrder: function(){
    console.log(app.data)
    app.data.waitingUmbrella = false;
    const db = wx.cloud.database()
    db.collection('waitings').doc(app.data.orderid).remove({
      success(res) {
        app.data.orderid = ""
      }
    })
    wx.switchTab({
      url: '../../findUmbrella/findUmbrella',
    })
  }
})