// pages/email/email.js
var AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
  },

  email:function(e)
  {
    this.data.name=e.detail.value;
  },
  
  done: function ()
  {
    var name = this.data.name;
    var organization = this.data.organization;
    var password = this.data.passeword;
    if (name=='')
    {
      wx.showToast({
        title: '请填写组织名称',
        image:'/image/warning.png',
        duration: 1500
      })
    }
    else{
      var that = this;
      try {
        var value = wx.getStorageSync('user')
        var Rel = AV.Object.extend('userTonote');
        var rel = new Rel();
        if (value) {
          var username = value[7]
          rel.set('user', username);
          rel.set('password', that.data.password);
          rel.set('organization', that.data.organization);
          rel.set('type', false);
          rel.set('oname', that.data.name)
          rel.save().then(function (todo) {
            wx.navigateTo({
              url: '/pages/cooperation/note/note',
            })
          }, function (error) {
            console.error(error);
          });
        }
      } catch (e) {
        // Do something when catch error
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.organization = decodeURIComponent(options.organization);
    options.password = decodeURIComponent(options.password);
    var organization = JSON.parse(options.organization);
    var password = JSON.parse(options.password);
    
    this.setData({
      organization: organization,
      password: password,
     
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
  
  }
})