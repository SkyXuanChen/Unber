// pages/newRequest/newRequest.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var location = "";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //activity_location: "",
    address: "",
    openid: "",
    longitude: 116.4965075,
    latitude: 40.006103,
    destiny:"",
    suggestion:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    if (options.address != null && options.address != '') {
      //设置变量 address 的值
      this.setData({
        address: options.address
      });
    }else{
      qqmapsdk = new QQMapWX({
        key: 'JQXBZ-ZJQWF-L2AJE-J5T5H-UXXZ3-CDFN6'
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          // console.log(res.result.address);
          that.setData({
             address: res.result.address,
            //activity_location: res.result.address
          });
          // console.log(that.data.address);
        },
        fail: function (res) {
          //console.log(res);
        },
        complete: function (res) {
          //console.log(res);
        }
      });
    }
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
    console.log("hi")
    //console.log(getApp().data.activity_location);//从position跳转过来，可以
    // console.log(this.data.address);
    location = getApp().data.activity_location;
    var that = this;
    if (location != "") {
      that.setData({
        //activity_location: location
        address:location
      });
    }
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

  getLocation: function () {
    wx.navigateTo({
      url: 'choosePosition/choosePosition',
    });
  },

  formSubmit: function (e) {
    // wx.showToast({
    //   title: '现在还不能跳转噢',
    //   icon: 'success',
    //   duration: 3000
    // });

    getApp().data.waitingUmbrella=true;
    const db = wx.cloud.database()
    db.collection('waitings').add({
      data: {
        address:this.data.address,
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        destiny:this.data.destiny,
        //_openid: this.openid
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          title: '发起请求成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发起请求失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    wx.navigateTo({
      url: '/pages/newRequest/waitingUmbrella/waitingUmbrella',
    })
  },

  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          destiny: this.data.suggestion[i].title,
          suggestion:[]
        });
      }
    }
  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})

