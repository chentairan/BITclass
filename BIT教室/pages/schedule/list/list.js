// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg_path: ['/image/morni.png', '/image/after.png', '/image/eveni.png'],
  },
  add:function()
  {
    wx.navigateTo({
      url: '/pages/schedule/add/add',
    })
  },
  judge:function(now,time)
  {
    if (now.getFullYear() == time[1] && now.getMonth() == time[2] - 1 && now.getDate() == time[3])
      return 0;
    else if (now.getMonth() < time[2]-1)
      return 1;
    else if (now.getMonth() > time[2] - 1)
      return -1;
    else if (now.getDate() < time[3])
      return 1;
    else if (now.getDate() > time[3])
      return -1;
  },
  content_now:function(e)
  {
    var now = this.data.now;
    wx.navigateTo({
      url: '/pages/schedule/edit/edit?id=修改日程&content=' + encodeURIComponent(JSON.stringify(now[e.currentTarget.dataset.id])),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  content_after:function(e)
  {
    var after = this.data.after;
    wx.navigateTo({
      url: '/pages/schedule/edit/edit?id=修改日程&content=' + encodeURIComponent(JSON.stringify(after[e.currentTarget.dataset.id])),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  del_now:function(e)
  {
    var that = this;
    let now = this.data.now;
    var schedule = new Array();
    wx.showModal({
      title: '提示',
      content: '是否要删除该日程',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'schedule',
            success: function (res) {
              schedule = res.data;
              for (let i = 0; i < schedule.length; i++) {
                if (schedule[i][8] == now[e.currentTarget.dataset.id][8]) {
                  schedule.splice(i, 1);
                  now.splice(e.currentTarget.dataset.id, 1);
                  wx.setStorage({
                    key: "schedule",
                    data: schedule
                  })
                  break;
                }
              }
              that.setData({
                now: now
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  del_after: function (e) {
    var that = this;
    let after = this.data.after;
    var schedule = new Array();
    wx.showModal({
      title: '提示',
      content: '是否要删除该日程',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'schedule',
            success: function (res) {
              schedule = res.data
              for (let i = 0; i < schedule.length; i++) {
                if (schedule[i][8] == after[e.currentTarget.dataset.id][8]) {
                  schedule.splice(i, 1);
                  after.splice(e.currentTarget.dataset.id, 1);
                  wx.setStorage({
                    key: "schedule",
                    data: schedule
                  })
                  break;
                }
              }
              that.setData({
                after: after
              })
            }
          })
        } else if (res.cancel) {
          
        }
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
    var that = this;
    var time = new Date();
    var schedule = new Array();
    var now = new Array();
    var after = new Array();
    var before = new Array();

    wx.getStorage({
      key: 'schedule',
      success: function (res) {
        schedule = res.data
        for (var i = 0; i < schedule.length; i++) {
          schedule[i].push(i);
          switch (that.judge(time, schedule[i])) {
            case -1:
              before.push(schedule[i]);
              break;
            case 0:
              now.push(schedule[i]);
              break;
            case 1:
              after.push(schedule[i]);
              break;
          }
        }
        that.setData({
          schedule: schedule,
          now: now,
          before: before,
          after: after
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