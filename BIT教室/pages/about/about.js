// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  copy:function()
  {
    wx.setClipboardData({
      data: 'bitclass.xyz',
      success: function (res) {
      }
    })
    wx.showToast({
      title: '复制成功',
      icon: 'success',
      duration: 1000
    })
  },
  money:function()
  {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['http://ac-vi5l0pvp.clouddn.com/e4bb6ba0b33e7ed99b8f.PNG'] // 需要预览的图片http链接列表
    })
  },
  ad:function()
  {
    wx.navigateTo({
      url: '/pages/advertise/advertise',
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