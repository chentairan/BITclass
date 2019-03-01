// pages/push/push.js
const AV = require('../../utils/av-weapp-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  submit: function(e)
  {
    try {
      var value = wx.getStorageSync('objectid')
      var query = new AV.Query('_User');
      query.get(value).then(function (todo) {
        todo.set('formid', e.detail.formId);
        todo.save().then(function (tod) {
          wx.navigateTo({
            url: '/pages/infoflow/list/list',
          })
        }, function (error) {
          console.error(error);
        });
      }, function (error) {
      });
    }
    catch (e) {
      console.log('错误')
    }
  },
  back: function(e)
  {
    try {
      var value = wx.getStorageSync('objectid')
      var query = new AV.Query('_User');
      query.get(value).then(function (todo) {
        todo.set('formid', e.detail.formId);
        todo.save().then(function (tod) {
          wx.navigateTo({
            url: '/pages/home/home'
          })
        }, function (error) {
          console.error(error);
        });
      }, function (error) {
      });
    }
    catch (e) {
      console.log('错误')
    }
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