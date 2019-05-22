// pages/waitingList/waitingList.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    matcher:{
      _id: "",
      _openid: "",
      address: "",
      destiny: "",
      latitude: "",
      longitude: ""
    },
    listData: [
      { _id:"",
        _openid: "",
        address: "",
        destiny: "",
        latitude: "",
        longitude: ""}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*where({
      _openid: this.data.openid
    }).*/
    const db = wx.cloud.database()
    db.collection('waitings').get({
      success: res=>{
        console.log(res);
        this.setData({
          /*
          "_id":res._id,
          "_openid":res._openid,
          "address":res.address,
          "destiny":res.destiny,
          "latitude":res.latitude,
          "longitude":res.longitude*/
          "listData":res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      }, 
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发起请求失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
  })
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

  //展示名片
  onNamepiece: function(){

  },
  onMatch:function(e){
    const db = wx.cloud.database()
    var target_finder = e.target.id
    console.log(e)
  //查询记录，拿出finder方的数据
    db.collection('waitings').where({_id:target_finder, }).get({
      success: res => {
        console.log(target_finder)
        console.log(res);
        this.setData({
          "matcher": res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', res)

        //添加记录
          db.collection('matchers').add({
            data: {
              //没伞方的数据
              finder_id: this.data.matcher._id,
              finder_openid: this.data.matcher._openid,
              finder_address: this.data.matcher.address,
              finder_longitude: this.data.matcher.longitude,
              finder_latitude: this.data.matcher.latitude,
              //有伞方的openid
              haver_openid: app.globalData.openid

            },
            success: res => {
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id);

                console.log(e.target.id)
                
                wx.cloud.callFunction({
                  name:'deleteWaitingUser',
                  data:{
                    target:e.target.id,
                  },
                  success: res => {                    
                    wx.showToast({
                      icon: 'none',
                      title: '匹配成功'
                    })
                    getApp().data.waitingUmbrella = true;


                    db.collection('waitings').get({
                      success: res => {
                        this.setData({
                          "listData": res.data
                        })
                        console.log('[数据库] [查询记录] 成功: ', res)
                      },
                      fail: err => {
                        wx.showToast({
                          icon: 'none',
                          title: '发起请求失败'
                        })
                        console.error('[数据库] [新增记录] 失败：', err)
                      }
                    })
                  },
                  fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '匹配失败',
                    })
                    console.error('[数据库] [删除记录] 失败：', err)
                  }

                  
                })


            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '发起匹配失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '匹配查询失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})