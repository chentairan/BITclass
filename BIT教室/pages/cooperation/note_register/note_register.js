// login.js
var AV = require('../../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input2: '输入密码',
    find: '添加',
    organization: '',
    password: '',
    state: true
  },
  number: function (e) {
    var that = this;
    var temp = e.detail.value;
    that.setData
      ({
        organization: e.detail.value
      })
    e.detail.value;
    var Org = AV.Object.extend("userTonote");
    var org = new AV.Query(Org);
    org.equalTo("organization", temp);
    org.notEqualTo("type", true);
    // 查询所有数据
    org.find().then(function (results) 
    {
        if (results.length == 0) {
          that.setData
            ({
              input2: '未注册，设置组织密码',
              find: '注册',
              state: false
            })
        }
        else {
          that.setData
            ({
              input2: '输入密码',
              find: '添加',
              state: true
            })
        }
    },
      function (error) {
        console.log("查询失败!");
      });
  },
  password: function (e) {
    var that = this;
    var temp = e.detail.value;
    that.setData
      ({
        password: e.detail.value
      })
  },
  submit: function () {
    var that = this;
    var Org = AV.Object.extend("userTonote");
    if (that.data.password == '' || that.data.organization == '') {
      wx.showModal({
        title: '提示',
        content: '请输入用户名或密码',
        success: function (res) {
          if (res.confirm) {
           
          } else if (res.cancel) {
           
          }
        }
      })
      return;
    }
    var chong = that.data.org;
    for(let i = 0;i<chong.length;i++)
    {
      if (that.data.organization == chong[i])
      {
        wx.showToast({
          title: '不能重复添加',
          image:'/image/warning.png',
          duration: 2000
        })
        return;
      }
    }
    if (that.data.state == false) {
          wx.navigateTo({
            url: '/pages/cooperation/note_register_dtl/note_register_dtl?organization=' + encodeURIComponent(JSON.stringify(this.data.organization)) + '&password=' + encodeURIComponent(JSON.stringify(this.data.password))
          })
    }
    else {
      var check = new AV.Query(Org);
      check.equalTo("organization", that.data.organization);
      check.equalTo("password", that.data.password);
      // 查询所有数据
      var these = that;
      check.find().then(function (results) 
      {
       
        var user = results[0];
            if (results.length == 0) {
              wx.showToast({
                title: '密码错误',
                image: '/image/warning.png',
                duration: 1500
              })
              
            }
            else {
              
              var Rel = AV.Object.extend('userTonote');
              var rel = new Rel();
              var username = ''
              try {
                
                var value = wx.getStorageSync('user')
                if (value) {
                  username = value[7]
                  rel.set('user', username);
                  rel.set('password', these.data.password);
                  rel.set('organization', these.data.organization);
                  rel.set('type', false);
                  rel.set('oname', user.get('oname'))
                  
                  rel.save().then(function (todo) {
                    wx.navigateTo({
                      url: '/pages/cooperation/note/note',
                    })
                  }, function (error) {
                    console.error(error);
                  });
                }
              } catch (e) {
                // Do something when catch error
              }
              
              
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
    this.setData({
      org: JSON.parse(decodeURIComponent(options.org))
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