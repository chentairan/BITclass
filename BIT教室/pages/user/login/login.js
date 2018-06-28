// pages/user/login/login.js
var AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '登录'
  },
  username: function (e) {
    var that = this;
    var temp = e.detail.value;
    this.setData
    ({
      username: e.detail.value
    })
    var Login = AV.Object.extend("login");
    var login = new AV.Query(Login);
    login.equalTo("username", temp);
    // 查询所有数据
    login.find().then(function (results) {
      if (results.length == 0) {
        that.setData
          ({
            text: '注册',
            state: false
          })
      }
      else {
        that.setData
          ({
            text: '登录',
            state: true
          })
      }
    },
      function (error) {
        console.log("查询失败!");
      });
  },
  password: function (e) {
    this.setData
    ({
      password: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    var Login = AV.Object.extend("login");
    if (that.data.password == '' || that.data.username == '') {
      wx.showModal({
        title: '提示',
        content: '请输入用户名或密码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    if (that.data.state == false) {
      wx.navigateTo({
        url: '/pages/user/login_dtl/login_dtl?username=' + encodeURIComponent(JSON.stringify(this.data.username)) + '&password=' + encodeURIComponent(JSON.stringify(this.data.password))
      })
    }
    else {
      var check = new AV.Query(Login);
      check.equalTo("username", that.data.username);
      check.equalTo("password", that.data.password);
      // 查询所有数据
      check.find().then(function (results) {
        var user = results;
        if (results.length == 0) {
          wx.showToast({
            title: '密码错误',
            image: '/image/warning.png',
            duration: 1000
          })
        }
        else {
          wx.getStorage({
            key: 'user',
            success: function (res) {
              var temp = res.data;
              temp[0] = user[0].get('nickname');
              temp[1] = user[0].get('icon');
              temp[2] = 1;
              temp[3] = user[0].get('banhao');
              temp[4] = user[0].get('xuehao');
              temp[5] = user[0].get('xueyuan');
              temp[6] = user[0].get('password');
              temp[7] = user[0].get('username');
              wx.setStorage({
                key: "user",
                data: temp
              })
            }
          })
          wx.reLaunch({
            url: '/pages/home/home'
          })
        }
      },
        function (error) {
          console.log("查询失败!");
        });
    }
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