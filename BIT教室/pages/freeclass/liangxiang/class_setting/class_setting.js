// pages/class_setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    build_array: ['教学楼', '理教', '综教A', '综教B'],
    custom:new Array(),  //存储自定义数组
    name: new Array(),   //存储自定义名称
    Index_build:[0,0,0], //存储自定义教学楼索引
    multiArray_classroom: [[['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']], [['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']], [['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']]],
    multiIndex_classroom: [[0, 0], [0, 0], [0, 0]],
    multiArray_time: [
      ["不选", "第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周", "第八周", "第九周", "第十周", "第十一周", "第十二周", "第十三周", "第十四周", "第十五周", "第十六周", "第十七周", "第十八周", "第十九周"],
      [" ", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      [" ", "第一大节", "第二大节", "第三大节", "第四大节", "第五大节"]
    ],
    show:[0,0,0],
    multiIndex_time : new Array()
  },
  bindKeyInput: function (e) {
    var name = this.data.name;
    name[e.currentTarget.dataset.id] = e.detail.value;
    this.setData({
      name: name
    })
  },
  //教学楼Picker
  bindPickerbuild: function (e) {
    var Index_build = this.data.Index_build;
    var multiArray_classroom = this.data.multiArray_classroom;
    Index_build[e.currentTarget.dataset.id] = parseInt(e.detail.value);
    if (e.detail.value != 0) {
      multiArray_classroom[e.currentTarget.dataset.id] = [['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']]
      this.setData({
        multiArray_classroom: multiArray_classroom
      })
    }
    else {
      multiArray_classroom[e.currentTarget.dataset.id] = [['请选择楼层'],['不选']];
      this.setData({
        multiArray_classroom: multiArray_classroom
      })
    }
    this.setData({
      Index_build: Index_build
    })
  },
  //教室Picker
  bindMultiPickerClass: function (e) {
    var multiIndex_classroom = this.data.multiIndex_classroom;
    multiIndex_classroom[e.currentTarget.dataset.id] = e.detail.value;
    this.setData({
      multiIndex_classroom: multiIndex_classroom
    })
  },
  //教室列改变
  bindMultiPickerColumnClass: function (e) {
    var data = this.data.multiArray_classroom;
    var Index_build = this.data.Index_build;
    if (e.detail.column == 0) {
      switch (Index_build[e.currentTarget.dataset.id]) { 
        //li
        case 1:
          switch (e.detail.value) {
            case 0:
              
              data[e.currentTarget.dataset.id][1] = ['不选'];
              break;
            case 1:
              data[e.currentTarget.dataset.id][1] = ['不选', '1-101', '1-102', '1-103', '1-104', '1-105', '1-106', '1-107', '1-108', '1-109'];
              break;
            case 2:
              data[e.currentTarget.dataset.id][1] = ['不选', '1-201', '1-202', '1-203', '1-204', '1-205', '1-206', '1-207', '1-208', '1-209', '1-210'];
              break;
            case 3:
              data[e.currentTarget.dataset.id][1] = ['不选', '1-301', '1-302', '1-303', '1-304', '1-305', '1-306', '1-307', '1-308', '1-309', '1-310'];
              break;
            case 4:
              data[e.currentTarget.dataset.id][1] = ['不选', '1-401', '1-402', '1-403', '1-404', '1-405', '1-406', '1-407', '1-408', '1-409'];
              break;
            case 5:
              data[e.currentTarget.dataset.id][1] = ['不选', '1-501', '1-502', '1-503', '1-504', '1-505', '1-506'];
              break;
          }
          break;
        //zongA
        case 2:
          switch (e.detail.value) {
            case 0:
              data[e.currentTarget.dataset.id][1] = ['不选'];
              break;
            case 1:
              data[e.currentTarget.dataset.id][1] = ['不选', '2A-101', '2A-102', '2A-103', '2A-104', '2A-105', '2A-106'];
              break;
            case 2:
              data[e.currentTarget.dataset.id][1] = ['不选', '2A-201', '2A-202', '2A-203', '2A-204', '2A-205', '2A-206'];
              break;
            case 3:
              data[e.currentTarget.dataset.id][1] = ['不选', '2A-301', '2A-302', '2A-303', '2A-304', '2A-305', '2A-306'];
              break;
            case 4:
              data[e.currentTarget.dataset.id][1] = ['不选', '2A-401', '2A-402', '2A-403', '2A-404', '2A-405', '2A-406'];
              break;
            case 5:
              data[e.currentTarget.dataset.id][1] = ['不选', '2A-501', '2A-502', '2A-503', '2A-504'];
              break;
          }
          break;
        //zongB
        case 3:
          switch (e.detail.value) {
            case 0:
              data[e.currentTarget.dataset.id][1] = ['不选'];
              break;
            case 1:
              data[e.currentTarget.dataset.id][1] = ['不选', '2B-101', '2B-102', '2B-103', '2B-104', '2B-105'];
              break;
            case 2:
              data[e.currentTarget.dataset.id][1] = ['不选', '2B-201', '2B-202', '2B-203', '2B-204', '2B-205', '2B-206'];
              break;
            case 3:
              data[e.currentTarget.dataset.id][1] = ['不选', '2B-301', '2B-302', '2B-303', '2B-304', '2B-305', '2B-306'];
              break;
            case 4:
              data[e.currentTarget.dataset.id][1] = ['不选', '2B-401', '2B-402', '2B-403', '2B-404', '2B-405', '2B-406'];
              break;
            case 5:
              data[e.currentTarget.dataset.id][1] = ['不选', '2B-501', '2B-502', '2B-503', '2B-504', '2B-505', '2B-506'];
              break;
          }
          break;
      }
    }
    this.setData
      ({
        multiArray_classroom: data
      })
  },
  switch1Change:function(e)
  {
    var show = this.data.show;
    var multiIndex_time = this.data.multiIndex_time;
    show[e.currentTarget.dataset.id] = e.detail.value;
    if (!e.detail.value)
    {
      multiIndex_time[e.currentTarget.dataset.id] = [0,0,0]
    }
    this.setData({
      show:show,
      multiIndex_time : multiIndex_time
    })
  },
  bindMultiPickerTime: function(e)
  {
    var multiIndex_time = this.data.multiIndex_time;
    multiIndex_time[e.currentTarget.dataset.id] = e.detail.value;
    this.setData({
      multiIndex_time: multiIndex_time
    })
  },
  done: function()
  {
    var name = this.data.name;
    var Index_build = this.data.Index_build;
    var multiIndex_time = this.data.multiIndex_time;
    var multiIndex_classroom = this.data.multiIndex_classroom;
    var show = this.data.show;
    var custom = new Array();
    for(var i = 0;i<3;i++)
    {
      custom[i] = new Array();
      custom[i][0] = name[i];
      custom[i][1] = Index_build[i];
      custom[i][2] = multiIndex_classroom[i][0];
      custom[i][3] = multiIndex_classroom[i][1];
      if (show[i]==true)
      {
        custom[i][4] = 'now';
      }
      else
      {
        custom[i][4] = multiIndex_time[i][0];
        custom[i][5] = multiIndex_time[i][1];
        custom[i][6] = multiIndex_time[i][2];
      }
    }
    wx.setStorage({
      key: "custom_liangxiang",
      data: custom
    })
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1000
    })
    wx.navigateTo({
      url: '/pages/freeclass/liangxiang/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'custom_liangxiang',
      success: function (res) {
        var name = new Array();
        var Index_build = new Array();
        var multiIndex_classroom = new Array();
        var multiArray_classroom = [[['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']], [['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']], [['不选', '一层', '二层', '三层', '四层', '五层'], ['不选']]];
        var show = new Array();
        var multiIndex_time = new Array();
        for (var i = 0; i < 3; i++) {
          multiIndex_classroom[i] = new Array();
          name[i] = res.data[i][0];
          Index_build[i] = res.data[i][1];
          multiIndex_classroom[i][0] = res.data[i][2];
          multiIndex_classroom[i][1] = res.data[i][3];
          if (res.data[i][4]=='now')
          {
            show[i] = true;
          }
          else
          {
            show[i] = false;
            multiIndex_time[i] = new Array();
            multiIndex_time[i][0]=res.data[i][4];
            multiIndex_time[i][1] = res.data[i][5];
            multiIndex_time[i][2] = res.data[i][6];
          }
          switch(res.data[i][1])
          {
            case 1:
              switch (res.data[i][2]) {
                case 0:
                  multiArray_classroom[i][1] = ['不选'];
                  break;
                case 1:
                  multiArray_classroom[i][1] = ['不选', '1-101', '1-102', '1-103', '1-104', '1-105', '1-106', '1-107', '1-108', '1-109'];
                  break;
                case 2:
                  multiArray_classroom[i][1] = ['不选', '1-201', '1-202', '1-203', '1-204', '1-205', '1-206', '1-207', '1-208', '1-209', '1-210'];
                  break;
                case 3:
                  multiArray_classroom[i][1] = ['不选', '1-301', '1-302', '1-303', '1-304', '1-305', '1-306', '1-307', '1-308', '1-309', '1-310'];
                  break;
                case 4:
                  multiArray_classroom[i][1] = ['不选', '1-401', '1-402', '1-403', '1-404', '1-405', '1-406', '1-407', '1-408', '1-409'];
                  break;
                case 5:
                  multiArray_classroom[i][1] = ['不选', '1-501', '1-502', '1-503', '1-504', '1-505', '1-506'];
                  break;
              }
              break;
            //zongA
            case 2:
              switch (res.data[i][2]) {
                case 0:
                  multiArray_classroom[i][1] = ['不选'];
                  break;
                case 1:
                  multiArray_classroom[i][1] = ['不选', '2A-101', '2A-102', '2A-103', '2A-104', '2A-105', '2A-106'];
                  break;
                case 2:
                  multiArray_classroom[i][1] = ['不选', '2A-201', '2A-202', '2A-203', '2A-204', '2A-205', '2A-206'];
                  break;
                case 3:
                  multiArray_classroom[i][1] = ['不选', '2A-301', '2A-302', '2A-303', '2A-304', '2A-305', '2A-306'];
                  break;
                case 4:
                  multiArray_classroom[i][1] = ['不选', '2A-401', '2A-402', '2A-403', '2A-404', '2A-405', '2A-406'];
                  break;
                case 5:
                  multiArray_classroom[i][1] = ['不选', '2A-501', '2A-502', '2A-503', '2A-504'];
                  break;
              }
              break;
            //zongB
            case 3:
              switch (res.data[i][2]) {
                case 0:
                  multiArray_classroom[i][1] = ['不选'];
                  break;
                case 1:
                  multiArray_classroom[i][1] = ['不选', '2B-101', '2B-102', '2B-103', '2B-104', '2B-105'];
                  break;
                case 2:
                  multiArray_classroom[i][1] = ['不选', '2B-201', '2B-202', '2B-203', '2B-204', '2B-205', '2B-206'];
                  break;
                case 3:
                  multiArray_classroom[i][1] = ['不选', '2B-301', '2B-302', '2B-303', '2B-304', '2B-305', '2B-306'];
                  break;
                case 4:
                  multiArray_classroom[i][1] = ['不选', '2B-401', '2B-402', '2B-403', '2B-404', '2B-405', '2B-406'];
                  break;
                case 5:
                  multiArray_classroom[i][1] = ['不选', '2B-501', '2B-502', '2B-503', '2B-504', '2B-505', '2B-506'];
                  break;
              }
              break;
          }
        }
        that.setData
          ({
            custom: res.data,
            name:name,
            Index_build: Index_build,
            multiIndex_classroom: multiIndex_classroom,
            multiArray_classroom: multiArray_classroom,
            show:show,
            multiIndex_time: multiIndex_time
          })
      }
    })
    wx.setNavigationBarTitle({
      title: '自定义查找'
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