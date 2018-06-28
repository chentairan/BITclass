// pages/infoflow/list/list.js
const AV = require('../../../utils/av-weapp-min.js');
Page({
  data: {
    type:'',
    content: [],
    submit: '',
    reg: '',
    text: ''
  },
  display: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var info = new AV.Query('jwcInfo');
    info.equalTo('source', '教务处');
    info.descending('createdAt');
    info.limit(20);
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
        //  content[i].kind = object.get('kind');
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
      wx.hideLoading()
    }, function (error) {
      console.log('查询失败')
    });
  },
  tap: function (e) {
    var content = JSON.stringify(e.currentTarget.dataset.id);
    wx.navigateTo
      ({
        url: '/pages/infoflow/infoc/infoc?content=' + encodeURIComponent(content),
      })
  },
  register: function () {
    if (this.data.reg == '订阅通知自动推送') {
      wx.setStorage({
        key: 'reg',
        data: '退订',
      })
      try {
        var value = wx.getStorageSync('objectid')
        if (value) { }
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
          wx.showToast({
            title: '订阅成功',
            icon: 'success',
            duration: 1000
          })
        }, function (error) {
        });
      } catch (e) {
      }
      this.setData({
        text: '取消订阅',
        reg: '退订',
        submit: '/image/success.png'
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
          wx.showToast({
            title: '退订成功',
            icon: 'success',
            duration: 1000
          })
        }, function (error) {
        });
      }
      catch (e) {
      }
      this.setData({
        text: '订阅通知',
        reg: '订阅通知自动推送',
        submit: '/image/info_add.png'
      })
    }
  },
  hide: function() {
    console.log('test')
    let temp = '';
    let that = this;
    wx.getStorage({
      key: 'hide',
      success: function(res) {
        let these = that;
        temp = res.data?'隐藏话题摘要':'显示话题摘要';
        wx.showActionSheet({
          itemList: [temp],
          success: function (res2) {
            wx.setStorage({
              key: 'hide',
              data: res.data ? false : true,
            })
            that.setData({
              type: !res.data
            })
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
        
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
      success: function (res) {
        if (res.data =='订阅通知自动推送')
          that.setData({
            text: '订阅通知',
            submit: '/image/info_add.png'
          })
        else
          that.setData({
            text:'取消订阅',
            submit: '/image/success.png'
          })
        that.setData({
          reg: res.data
        })
      },
    })
    wx.getStorage({
      key: 'hide',
      success: function(res) {
        that.setData({
          type: res.data
        })
      },
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