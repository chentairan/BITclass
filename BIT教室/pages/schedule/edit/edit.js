// pages/schedule_edit/schedule_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: 0,
    imgUrls: ['/image/morning.png', '/image/afternoon.png', '/image/evening.png'],
    picker_Index: [20, 1, 1],
    _title:'',
    swiper:0
  },
  bindChange: function (e) {
    const val = e.detail.value;
    var now_year = new Date().getFullYear();
    var date = new Date(now_year, 0, 1);
    var newDate = new Date(date.getTime() + val[0] * (1000 * 60 * 60 * 24));

    this.setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
      day: newDate.getDay(),
      hour: val[1],
      minute: this.data.minutes[val[2]]
    })
  },
  input: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  done: function () {
    var title = this.data.title;
    var year = this.data.year;
    var month = this.data.month + 1;
    var date = this.data.date;
    var day = this.data.day;
    var hour = this.data.hour;
    var minute = this.data.minute;
    var pic = this.data.pic;
    var that = this;
    wx.getStorage({
      key: 'schedule',
      success: function (res) {
        var schedule = res.data;
        schedule[that.data.index]=[title, year, month, date, day, hour, minute, pic,that.data.index];
        wx.setStorage({
          key: "schedule",
          data: schedule
        })
        wx.navigateBack({
          
        })
      }
    })
  },
  switch: function (e) {
    this.setData({
      pic: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.id
    })
    options.content = decodeURIComponent(options.content)
    var content = JSON.parse(options.content);
    var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    var rep = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var day_num = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var now_year = new Date().getFullYear();
    var minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
    if (now_year % 4 == 0 && now_year % 100 != 0 || now_year % 400 == 0) {
      day_num[1] = 29;
    }
    var date = new Date(now_year, 0, 1); //返回今年1月1日
    var now = new Date(content[1],content[2]-1,content[3],content[5],content[6]);            //返回设置日期
    var temp = new Date();
    var start = date.getDay();
    var list = new Array();
    var count = Math.ceil((now - date) / (1000 * 60 * 60 * 24)) - 1;
    var count1 = Math.ceil((temp - date) / (1000 * 60 * 60 * 24)) - 1;
    for (var i = 1; i <= 12; i++)
      for (var j = 1; j <= day_num[i - 1]; j++ , start++) {
        var str = i + '月' + j + '日' + rep[start % 7];
        list.push(str)
      }
    list[count1] = '今天';
    var value = [count, now.getHours(), parseInt(now.getMinutes() / 5)];
    this.setData({
      days: list,
      hours: hours,
      minutes: minutes,
      picker_Index: value,
      year: now.getFullYear(),
      month: now.getMonth(),
      date: now.getDate(),
      day: now.getDay(),
      hour: now.getHours(),
      minute: minutes[ now.getMinutes() / 5],
      _title: content[0],
      swiper: content[7],
      index: content[8],
      title: content[0]
    })
    this.fix(value);
  },
  fix: function (value) {
    this.setData({
      picker_Index: value
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