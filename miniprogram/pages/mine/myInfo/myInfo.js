// pages/mine/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '男', value: '0', type: "male", checked: true },
      { name: '女', value: '1', type: "female" }
    ],
    name: "",
    tel: "",
    disabled: false
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].type == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    if (e.detail.value.name == '' && e.detail.value.tel == '') {
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    else {
      this.setData({
        disabled: true
      })
      var self = this
      const db = wx.cloud.database()
      wx.cloud.callFunction({
        name:"updateInfo",
        data: e.detail.value,
        success(res){
          console.log(res)
          wx.showToast({
            title: '修改成功！',
            icon: 'success'
          })
          self.setData({
            disabled: false
          })
        }
      })
    }
  },

  getMySettings: function(){
    var self = this;
    wx.cloud.callFunction({
      name:"getUserInfo",
      success(res){
        console.log(res)
        var radioItems = [
          { name: '男', value: '0', type: "male"},
          { name: '女', value: '1', type: "female" }
        ]
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].type == res.result.data[0].type;
        }

        self.setData({
          radioItems: radioItems,
          name: res.result.data[0].name,
          tel: res.result.data[0].tel
        });
        console.log(self.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getMySettings()
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