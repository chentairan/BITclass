//app.js

//初始化 LeanCloud
const AV = require('utils/av-weapp-min.js');
AV.init({
  appId: 'VI5l0PVPmAUi8oMiGnrO2WvJ-gzGzoHsz',
  appKey: 'hUakKfi4U1kctDhXNiQ2iSO7',
});

App({
  onLaunch: function () {
    try {
      var value = wx.getStorageSync('init')
      if (value) {
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