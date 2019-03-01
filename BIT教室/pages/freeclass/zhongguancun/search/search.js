// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    build_array:['选择教学楼','信教'],
    Index_build:0,
    multiArray_classroom: [
      ['请选择楼层'],
      ['不选']
    ],
    multiIndex_classroom:[0,0],
    multiArray_time: [
      ["日期", "第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周", "第八周", "第九周", "第十周", "第十一周", "第十二周", "第十三周", "第十四周", "第十五周", "第十六周", "第十七周", "第十八周", "第十九周","第二十周","第二十一周"],
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
        multiArray_classroom: [['不选', '一层', '二层', '三层', '四层', '五层','六层'],['不选']]
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
      { //xin
        case '1':
          
          switch (e.detail.value)
          {
            case 0:
              data[1] = ['不选'];
              break;
            case 1:
              data[1] = ['不选', '信1002', '信1004', '信1006', '信1008', '信1010'];
              break;
            case 2:
              data[1] = ['不选', '信2002', '信2004', '信2006', '信2008', '信2010', '信2025'];
              break;
            case 3:
              data[1] = ['不选', '信3002', '信3004', '信3006', '信3008', '信3010', '信3013', '信3019', '信3026'];
              break;
            case 4:
              data[1] = ['不选', '信4002', '信4004', '信4006', '信4008', '信4010', '信4016', '信4018', '信4019', '信4023'];
              break;
            case 5:
              data[1] = ['不选', '信5002', '信5004', '信5006', '信5008', '信5010', '信5022'];
            case 6:
              data[1] = ['不选', '信6002', '信6004', '信6006', '信6008', '信6010'];
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
      url: '/pages/freeclass/zhongguancun/class_search/class_search?id=' + JSON.stringify(choiceOfSearch)
    })
  },
  setting: function()
  {
    wx.navigateTo({
      url: '/pages/freeclass/zhongguancun/class_setting/class_setting'
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
      url: '/pages/freeclass/zhongguancun/class_search/class_search?id=' + JSON.stringify(choiceOfSearch)
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
    if ((month > 7 && year == 2018) || (year == 2018 && month < 7 && day < 1)) 
    {
      try {
        var dayNow = new Date().getTime();
        var dayZero = new Date().setFullYear(2018, 7, 27);
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
      key: 'custom_zhongguancun',
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