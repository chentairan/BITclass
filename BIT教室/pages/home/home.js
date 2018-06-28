// pages/home/home.js
const AV = require('../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: '/image/init.png',
    name: '游客',
    login: '登录',
    dist:'',
    content: [],
    reg: '',
    res: []
  },
  frec: function()
  {
    wx.navigateTo({
      url: '/pages/freeclass/search/search',
    })
  },
  proj: function () {
    wx.navigateTo({
      url: '/pages/course/search/search',
    })
  },
  coop: function () {
    wx.navigateTo({
      url: '/pages/cooperation/list/list',
    })
  },
  musi: function () {
    wx.navigateTo({
      url: '/pages/next/next',
    })
  },
  subs: function() {
    let temp = this.data.reg;
    let that = this;
    wx.showActionSheet({
      itemList: [temp],
      success: function (res) {
        that.register()
      },
      fail: function (res) {
      }
    })
  },
  add: function() {
    wx.showActionSheet({
      itemList: ['创建日程'],
      success: function (res) {
        wx.navigateTo({
          url: '/pages/schedule/add/add',
        })
      },
      fail: function (res) {
      }
    })
  },
  jwc: function() {
    wx.navigateTo({
      url: '/pages/infoflow/list/list',
    })
  },
  skip: function(e) {
    var content = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo
      ({
        url: '/pages/infoflow/infoc/infoc?content=' + encodeURIComponent(content),
      })
  },
  tim: function() {
    wx.navigateTo({
      url: '/pages/schedule/list/list',
    })
  },
  dist: function() {
    let that = this;
    let itemList = ['良乡校区', '中关村校区'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        wx.setStorage({
          key: "dist",
          data: itemList[res.tapIndex]
        })
        that.setData({
          dist: itemList[res.tapIndex]
        })
      },
      fail: function (res) {
      }
    })
  },
  display: function () {
    let that = this;
    let info = new AV.Query('jwcInfo');
    info.equalTo('source', '教务处');
    info.descending('createdAt');
    info.limit(3);
    info.find().then(function (results) {
      var content = new Array();
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var temp1 = object.get('content').replace(/[\r\t]/g, "");
        temp1 = temp1.replace(/[ ]/g, "");
        var temp2 = temp1.split("\n");
        for (var j = 0, len = temp2.length; j < len; j++) {
          temp2[j] = temp2[j].replace(/\s/g, "");
        }
        content[i] = new Object();
        content[i].day = object.get('time');
        content[i].source = object.get('source');
        content[i].article = temp2;
        content[i].title = object.get('title');
        var pd = object.get('title') + " ";
        if (pd.length > 100) {
          content[i].view = content[i].title.slice(0, 21) + ' ...';
        }
        else {
          content[i].view = content[i].title
        }
      }
      that.setData
        ({
          content: content
        })
    }, function (error) {
      console.log('查询失败')
    });
  },
  register: function () {
    if (this.data.reg == '订阅通知自动推送') {
      wx.setStorage({
        key: 'reg',
        data: '退订',
      })
      try {
        var value = wx.getStorageSync('objectid')
        if (value) {}
        else {
          AV.User.loginWithWeapp().then(user => {
            value = user.toJSON()['objectId'];
            wx.setStorage({
              key: "objectid",
              data: value
            })
          }).catch(console.error);
        }
        var query = new AV.Query('_User');
        query.get(value).then(function (todo) {
          todo.set('state', true);
          todo.save();
        }, function (error) {
        });
      } catch (e) {
      }
      this.setData({
        reg: '退订'
      })
    }
    else {
      wx.setStorage({
        key: 'reg',
        data: '订阅通知自动推送',
      })
      try {
        var value = wx.getStorageSync('objectid')
        var query = new AV.Query('_User');
        query.get(value).then(function (todo) {
          todo.set('state', false);
          todo.save();
        }, function (error) {
        });
      }
      catch (e) {
      }
      this.setData({
        reg: '订阅通知自动推送'
      })
    }
  },
  schedule: function() {
    let that = this;
    wx.getStorage({
      key: 'schedule',
      success: function(res) {
        if(res.data[0])
        {
          that.setData({
            last: res.data[0][0]
          })
        }
        else
        {
          that.setData({
            last: '无临近日程'
          })
        }
      },
    })
  },
  login: function () {
    wx.getStorage({
      key: 'user',
      success: function(res) {
        if(!res.data[2])
        {
          wx.navigateTo({
            url: '/pages/user/login/login',
          })
        }
      },
    })
    
  },
  dtl: function() {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        if (res.data[2]) {
          wx.navigateTo({
            url: '/pages/user/userinfo/userinfo',
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.display();
    wx.getStorage({
      key: 'reg',
      success: function(res) {
        that.setData({
          reg: res.data
        })
      },
    })
    this.schedule()
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
    let that = this;
    wx.getStorage({
      key: 'dist',
      success: function (res) {
        that.setData({
          dist: res.data
        })
      }
    })
    try {
      var res = wx.getStorageSync('user')
      if (res) {
        if (res[2]) {
          that.setData({
            login: '已登录'
          })
        }
        that.setData({
          name: res[0],
          head: res[1]
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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