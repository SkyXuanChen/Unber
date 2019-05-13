// pages/newRequest/choosePosition/choosePosition.js

var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'JQXBZ-ZJQWF-L2AJE-J5T5H-UXXZ3-CDFN6'
    });
    this.moveToLocation();
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

  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("..")
        console.log(res);
        // address:"广东省广州市天河区天府路1号"
        // errMsg:"chooseLocation:ok"
        // latitude:23.12463
        // longitude:113.36199
        // name:"广州市天河区人民政府"
        /**确定地点并返回*/
        // submit_location: function () {
        getApp().data.activity_lat = res.latitude;
        getApp().data.activity_lng = res.longitude;
        getApp().data.activity_location = res.name;
        wx.navigateBack({
          delta: 1
        });
        console.log("dd")
        console.log(getApp().data.activity_location);
        // }
        //选择地点之后返回到原来页面
        // wx.navigateTo({
        //   url: "/pages/new/new?address=" + res.name
        // });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
})