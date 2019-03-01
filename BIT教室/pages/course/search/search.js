// pages/course/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xueyuan: ['全部',
              '国际教育学院',
              '化学与化工学院',
              '信息与电子学院',
              '外国语学院',
              '法学院',
              '数学与统计学院',
              '生命学院',
              '计算机学院',
              '自动化学院',
              '光电学院',
              '管理与经济学院',
              '物理学院',
              '软件学院',
              '机械与车辆学院',
              '宇航学院',
              '体育部',
              '马克思主义学院',
              '设计与艺术学院',
              '人文与社会科学学院',
              '生命学院',
              '材料学院',
              '机电学院',
              '徐特立学院','其他'],
    inst: '开课学院',
    teacher: '',
    course: ''
  },
  picker: function(e) {
    this.setData({
      inst: this.data.xueyuan[e.detail.value]
    })
  },
  search: function() {
    let teacher = JSON.stringify(this.data.teacher);
    let course = JSON.stringify(this.data.course);
    let inst = JSON.stringify(this.data.inst);
    wx.navigateTo({
      url: '/pages/course/results/results?inst=' + encodeURIComponent(inst) + '&teacher=' + encodeURIComponent(teacher) + '&course=' + encodeURIComponent(course),
    })
  },
  teacher: function(e) {
    this.setData({
      teacher: e.detail.value
    })
  },
  course: function(e) {
    this.setData({
      course: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let isPhone = app.globalData.isIpx;
    this.setData({
      isIpx: isPhone
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