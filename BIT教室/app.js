//app.js

//初始化 LeanCloud
const AV = require('utils/av-weapp-min.js');
AV.init({
  appId: 'VI5l0PVPmAUi8oMiGnrO2WvJ-gzGzoHsz',
  appKey: 'hUakKfi4U1kctDhXNiQ2iSO7',
});

App({
  judge: function (now, time) {
    if (now.getFullYear() == time[1] && now.getMonth() == time[2] - 1 && now.getDate() == time[3])
      return 0;
    else if (now.getMonth() < time[2] - 1)
      return 1;
    else if (now.getMonth() > time[2] - 1)
      return -1;
    else if (now.getDate() < time[3])
      return 1;
    else if (now.getDate() > time[3])
      return -1;
  },
  onLaunch: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        console.log(res.model)
        var model = res.model
        if (model.search('iPhone X') != -1) {
          _this.globalData.isIpx = true;
        } else {
          _this.globalData.isIpx = false;
        }
      }
    })




    try {
      var that =this;
      var schedule = new Array();
      var now = new Array();
      let time = new Date();
      var value = wx.getStorageSync('init')
      if (value) {
        wx.getStorage({
          key: 'schedule',
          success: function (res) {
            schedule = res.data
            for (var i = 0; i < schedule.length; i++) {
              switch (that.judge(time, schedule[i])) {
                case -1:
                console.log('test')
                  break;
                case 0:
                console.log('done')
                  now.push(schedule[i]);
                  break;
                case 1:
                  now.push(schedule[i]);
                  break;
              }
            }
            wx.setStorage({
              key: "schedule",
              data: now
            })
          }
        })
      }
      else {
        wx.setStorage({
          key: "init",
          data: 1
        })
        wx.setStorage({
          key: 'reg',
          data: '订阅通知自动推送',
        })
        wx.setStorage({
          key: "custom_liangxiang",
          data: [['今日理教', 1, 0, 0, 'now'], ['今日综A', 2, 0, 0, 'now'], ['今日综B', 3, 0, 0, 'now']]
        })
        wx.setStorage({
          key: "custom_zhongguancun",
          data: [['今日信教', 1, 0, 0, 'now'], ['今日研教', 2, 0, 0, 'now']]
        })
        wx.setStorage({
          key: 'dist',
          data: '良乡校区',
        })
        wx.setStorage({
          key: "schedule",
          data: []
        })
        wx.setStorage({
          key: "hide",
          data: true
        })
        wx.setStorage({
          key: "user",
          data: ['游客', '/image/init.png', 0, '', '', 0] //nickname,头像，是否注册，班号，学号，学院
        })
      }
    } catch (e) {
      console.log('获取错误')
    }
  },
  
  globalData: {
  }
})