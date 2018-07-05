// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    build_array:['选择教学楼','理教','综教A','综教B'],
    Index_build:0,
    multiArray_classroom: [
      ['请选择楼层'],
      ['不选']
    ],
    multiIndex_classroom:[0,0],
    multiArray_time: [
      ["日期", "第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周", "第八周", "第九周", "第十周", "第十一周", "第十二周", "第十三周", "第十四周", "第十五周", "第十六周", "第十七周", "第十八周", "第十九周"],
      [" ", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      [" ", "第一大节", "第二大节", "第三大节", "第四大节", "第五大节"]
    ],
    multiIndex_time:[0,0,0]
  },
  //教学楼Picker
  bindPickerbuild: function (e)
  {
    if (e.detail.value!=0)
    {
      this.setData({
        multiArray_classroom: [['不选', '一层', '二层', '三层', '四层', '五层'],['不选']]
      })
    }
    else
    {
      this.setData({
        multiArray_classroom: [
          ['请选择楼层'],
          ['不选']
        ]
      })
    }
    this.setData({
      Index_build: e.detail.value
    })
  },
  //教室Picker
  bindMultiPickerClass: function(e)
  {
    this.setData({
      multiIndex_classroom: e.detail.value
    })
  },
  //教室列改变
  bindMultiPickerColumnClass: function(e)
  {
    var data = this.data.multiArray_classroom;
    if (e.detail.column==0)
    {
      
      switch(this.data.Index_build)
      { //li
        case '1':
          
          switch (e.detail.value)
          {
            case 0:
              data[1] = ['不选'];
              break;
            case 1:
              data[1] = ['不选', '1-101', '1-102', '1-103', '1-104', '1-105', '1-106', '1-107', '1-108', '1-109'];
              break;
            case 2:
              data[1] = ['不选', '1-201', '1-202', '1-203', '1-204', '1-205', '1-206', '1-207', '1-208', '1-209', '1-210'];
              break;
            case 3:
              data[1] = ['不选', '1-301', '1-302', '1-303', '1-304', '1-305', '1-306', '1-307', '1-308', '1-309', '1-310'];
              break;
            case 4:
              data[1] = ['不选', '1-401', '1-402', '1-403', '1-404', '1-405', '1-406', '1-407', '1-408', '1-409'];
              break;
            case 5:
              data[1] = ['不选', '1-501', '1-502', '1-503', '1-504', '1-505', '1-506'];
              break;
          }
          break;
        //zongA
        case '2':
          switch (e.detail.value)
          {
            case 0:
              data[1] = ['不选'];
              break;
            case 1:
              data[1] = ['不选', '2A-101', '2A-102', '2A-103', '2A-104', '2A-105', '2A-106'];
              break;
            case 2:
              data[1] = ['不选', '2A-201', '2A-202', '2A-203', '2A-204', '2A-205', '2A-206'];
              break;
            case 3:
              data[1] = ['不选', '2A-301', '2A-302', '2A-303', '2A-304', '2A-305', '2A-306'];
              break;
            case 4:
              data[1] = ['不选', '2A-401', '2A-402', '2A-403', '2A-404', '2A-405', '2A-406'];
              break;
            case 5:
              data[1] = ['不选', '2A-501', '2A-502', '2A-503', '2A-504'];
              break;
          }
          break;
        //zongB
        case '3':
          switch (e.detail.value) {
            case 0:
              data[1] = ['不选'];
              break;
            case 1:
              data[1] = ['不选', '2B-101', '2B-102', '2B-103', '2B-104', '2B-105'];
              break;
            case 2:
              data[1] = ['不选', '2B-201', '2B-202', '2B-203', '2B-204', '2B-205', '2B-206'];
              break;
            case 3:
              data[1] = ['不选', '2B-301', '2B-302', '2B-303', '2B-304', '2B-305', '2B-306'];
              break;
            case 4:
              data[1] = ['不选', '2B-401', '2B-402', '2B-403', '2B-404', '2B-405', '2B-406'];
              break;
            case 5:
              data[1] = ['不选', '2B-501', '2B-502', '2B-503', '2B-504', '2B-505', '2B-506'];
              break;
          }
          break;
      }
    }
    this.setData
    ({
        multiArray_classroom:data
    })
  },
  bindMultiPickerTime :function(e)
  {
    this.setData({
      multiIndex_time: e.detail.value
    })
  },
  find: function()
  {
    var temp = parseInt(this.data.Index_build);
    var choiceOfSearch = [temp, this.data.multiIndex_classroom[0], this.data.multiIndex_classroom[1], this.data.multiIndex_time[0], this.data.multiIndex_time[1], this.data.multiIndex_time[2]];
    wx.navigateTo({
      url: '/pages/freeclass/liangxiang/class_search/class_search?id=' + JSON.stringify(choiceOfSearch)
    })
  },
  setting: function()
  {
    wx.navigateTo({
      url: '/pages/freeclass/liangxiang/class_setting/class_setting'
    })
  },
  chosen: function(e)
  {
    var custom = this.data.custom;
    var choiceOfSearch = new Array();
    if (custom[e.currentTarget.dataset.id][4]!='now')
    {
      for(var i = 0;i<6;i++)
      {
        choiceOfSearch[i] = custom[e.currentTarget.dataset.id][i+1];
      }
    }
    else
    {
      for(var i = 0; i < 3; i++)
      {
        choiceOfSearch[i] = custom[e.currentTarget.dataset.id][i + 1];
      }
      choiceOfSearch[3] = this.data.Nowweek;
      choiceOfSearch[4] = this.data.NowDay;
      choiceOfSearch[5] = 0;
    }
    this.setData({
      choiceOfSearch: choiceOfSearch
    })
    wx.navigateTo({
      url: '/pages/freeclass/liangxiang/class_search/class_search?id=' + JSON.stringify(choiceOfSearch)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取自定义查询条件
    var that = this;
    
    //获取当前周数
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    if ((month > 1 && year == 2018) || (year == 2018 && month < 7 && day < 1)) 
    {
      try {
        var dayNow = new Date().getTime();
        var dayZero = new Date().setFullYear(2018, 1, 26);
        var weekDay = new Date().getDay();
        var week = Math.ceil((dayNow - dayZero) / 1000 / 60 / 60 / 24 / 7);
      }
      catch (e) {
        console.log(e)
      }
      if (weekDay == 0)
        weekDay = 7;
      this.setData
      ({
        Nowweek: week,
        NowDay: weekDay,
        multiIndex_time: [week,weekDay,0]
      })
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
    var that = this;
    wx.getStorage({
      key: 'custom_liangxiang',
      success: function (res) {
        that.setData
          ({
            custom: res.data
          })
      }
    })
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