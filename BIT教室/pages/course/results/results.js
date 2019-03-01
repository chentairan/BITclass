// pages/course/results/results.js
const AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: ''
  },
  search: function (inst, course, teacher) {
    var content = new Array();
    var that = this;
    var record = new AV.Query('record');
    if (inst !='开课学院'&&inst !='其他'&& inst !='全部')
    {
      record.equalTo('kkyxmc', inst);
    }
    if (teacher)
    {
      record.contains('jsxm',teacher);
    }
    if (course)
    {
      record.contains('kcmc',course);
    }
    if(inst == '其他')
    {
      record.notEqualTo('kkyxmc', '国际教育学院')
      record.notEqualTo('kkyxmc', '化学与化工学院')
      record.notEqualTo('kkyxmc', '信息与电子学院')
      record.notEqualTo('kkyxmc', '外国语学院')
      record.notEqualTo('kkyxmc', '法学院')
      record.notEqualTo('kkyxmc', '数学与统计学院')
      record.notEqualTo('kkyxmc', '生命学院')
      record.notEqualTo('kkyxmc', '计算机学院')
      record.notEqualTo('kkyxmc', '自动化学院')
      record.notEqualTo('kkyxmc', '光电学院')
      record.notEqualTo('kkyxmc', '管理与经济学院')
      record.notEqualTo('kkyxmc', '物理学院')
      record.notEqualTo('kkyxmc', '软件学院')
      record.notEqualTo('kkyxmc', '宇航学院')
      record.notEqualTo('kkyxmc', '体育部')
      record.notEqualTo('kkyxmc', '马克思主义学院')
      record.notEqualTo('kkyxmc', '设计与艺术学院')
      record.notEqualTo('kkyxmc', '人文与社会科学学院')
      record.notEqualTo('kkyxmc', '生命学院')
      record.notEqualTo('kkyxmc', '材料学院')
      record.notEqualTo('kkyxmc', '机电学院')
      record.notEqualTo('kkyxmc', '徐特立学院')
    }
    record.limit(1000);
    wx.showLoading({
      title: '请稍候',
    })
    record.find().then(function (results) {
      wx.hideLoading();
      for (let i = 0; i < results.length; i++) 
      {
        let course = results[i];
        let kcmc = course.get('kcmc') ? course.get('kcmc'):'暂无';
        let jsxm = course.get('jsxm') ? course.get('jsxm'):'暂无';
        let jsmc = course.get('jsmc') ? course.get('jsmc'):'暂无';
        content[i] = new Object();
        content[i].kcmc = kcmc;
        content[i].jsxm = '教师：' + jsxm;
        content[i].jsmc = '地点：' + jsmc;
        content[i].sksj = '时间：'+course.get('skzc') + '周 ' + course.get('skxq') + ' ' + course.get('skjc');
        content[i].kkyxmc = '开课：'+course.get('kkyxmc');
      }
      that.setData({
        content: content 
      })
    },
      function (error) {
        console.log("查询失败!");
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.inst = decodeURIComponent(options.inst);
    options.course = decodeURIComponent(options.course);
    options.teacher = decodeURIComponent(options.teacher);
    let inst = JSON.parse(options.inst);
    let course = JSON.parse(options.course);
    let teacher = JSON.parse(options.teacher);
    console.log(inst);
    console.log(course);
    console.log(teacher);
    if(inst!='开课学院')
    {
      this.setData({
        condition: inst
      })      
    }
    else if(course)
    {
      this.setData({
        condition: course
      }) 
    }
    else if(teacher)
    {
      this.setData({
        condition: teacher
      })
    }
    else{
      this.setData({
        condition: '全部'
      })
    }
    this.search(inst,course,teacher);
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