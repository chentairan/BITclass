// pages/login_dtl/login_dtl.js
var AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
   data: {
    // 是否显示各输入框
    nickname: true,
    code: true,
    stu_num: true,
    class_num: true,
    ins: true,
    email_num: true,
    // 学院选项
    institute: ['信息与电子学院', '宇航学院','软件学院', '教育研究院', '秦皇岛分校', '机车学院','材料学院','人文学院','继续教育学院','机电学院','生命学院','马克思主义学院','远程教育学院','光电学院','数学学院','法学院','国际教育学院','物理学院','外国语学院','高职学院','自动化学院','化学与化工学院','设计与艺术学院','珠海学院','计算机学院','管理学院','体育部'],
    ins_dis: '',
    nickname_dis: '',
    code_dis: '',
    stu_num_dis: '',
    class_num_dis: '',
    email_num_dis: '',
    value_mid_nickname: '',
    value_mid_code: '',
    value_mid_stu: '',
    value_mid_class: '',
    value_mid_email: '',
    val: 0,
    tempFilePaths:'/image/init.png'
  },

  bindChange: function (e) {
    this.data.val = e.detail.value;
    this.setData({
      institute: this.data.institute,
    })
  },

  nickname_input: function (e) {
    this.data.value_mid_nickname = e.detail.value;
  },
  stu_num_input: function (e) {
    this.data.value_mid_stu = e.detail.value;
  },
  class_num_input: function (e) {
    this.data.value_mid_class = e.detail.value;
  },
  class_num_input: function (e) {
    this.data.value_mid_class = e.detail.value;
  },
// 取消
  // 昵称
  nickname1: function () {
    this.setData({
      nickname: !this.data.nickname,
    })
  },
  // 学号
  stu_num1: function () {
    this.setData({
      stu_num: !this.data.stu_num,
    })
  },
  // 班号
  class_num1: function () {
    this.setData({
      class_num: !this.data.class_num,
    })
  },

  ins1: function () {
    this.setData({
      ins: !this.data.ins,
    })
  },

// 确认
  // 昵称
  nickname: function () {
    var name = this.data.value_mid_nickname;
    var reg = /^\S{4,16}$/; // 匹配除空格外的4~16个字符
    var result = name.match(reg)
    if (result){
      this.setData({
      nickname: !this.data.nickname,
      nickname_dis: this.data.value_mid_nickname,
    })
      console.log('正确输入昵称：'+ name)
    }
    else{
      wx.showToast({
        title: '请正确填写昵称',
        image: '/image/warning.png',
        duration: 1500
      })
      console.log("错误输入昵称" + name)
    }

  },
  // 学号
  stu_num: function () {
    var stu = this.data.value_mid_stu
    var reg = /^\d{10}$/
    var result = stu.match(reg)
    if(result){
      this.setData({
        stu_num: !this.data.stu_num,
        stu_num_dis: this.data.value_mid_stu,
      })
      console.log('正确输入学号：'+ stu)

    }
    else{
      wx.showToast({
        title: '请正确填写学号',
        image: '/image/warning.png',
        duration: 1500
      })
      console.log("错误输入学号" + stu)
    }
  },
  // 班号
  class_num: function () {
    var cla = this.data.value_mid_class
    var reg = /^\d{8}$/ // 匹配八位数字
    var result = cla.match(reg)
    if(result){
       this.setData({
          class_num: !this.data.class_num,
          class_num_dis: this.data.value_mid_class,
        })
      console.log('正确输入班号：'+ cla)

    }
    else{
      wx.showToast({
        title: '请正确填写班号',
        image: '/image/warning.png',
        duration: 1500
      })
      console.log("错误输入班号" + cla)
    }

  },

  ins: function () {
    this.setData({
      ins: !this.data.ins,
      ins_dis: this.data.institute[this.data.val],
    })
  },


  finish:function()
  {
    var that = this;
    var that = this;
    var flag = 0;
    var banhao = this.data.class_num_dis;
    var xueyuan = this.data.ins_dis;
    var xuehao = this.data.stu_num_dis;
    var nickname = this.data.nickname_dis;
    var icon = this.data.tempFilePaths;
    var temp1 = this.data.temp1;

    if(banhao&&xuehao&&nickname&&xueyuan&&temp1){
      // 只有班号、学号、昵称、学院和头像同时填上才能完成注册
      var username = this.data.username;
      var password = this.data.password;
      var Login = AV.Object.extend("login");
      var login = new AV.Query(Login);
      login.equalTo('xuehao', xuehao)
      login.find().then(function (results) {
        if (results.length != 0) {
          wx.showToast({
            title: '该学号已注册,请重新输入',
            image: '/image/warning.png',
            duration: 1500
          })
        }
        else {
          var user = new (Login);
          user.set('username', username);
          user.set('password', password);
          user.set('nickname', nickname);
          user.set('xuehao', xuehao);
          user.set('banhao', banhao);
          user.set('xueyuan', xueyuan);
          user.set('icon', temp1)
          user.save().then(function (user) {
            try {
              var value = wx.getStorageSync('user')
              var temp = value;
              temp[0] = nickname;
              temp[1] = temp1;
              temp[2] = 1;
              temp[3] = banhao;
              temp[4] = xuehao;
              temp[5] = xueyuan;
              temp[6] = password;
              temp[7] = username;
              try {
                wx.setStorageSync('user', temp)
              } catch (e) {
              }
            } catch (e) {
              // Do something when catch error
            }
            var Note = AV.Object.extend("userTonote");
            var note = new (Note);
            note.set('user', username);
            note.set('organization', banhao);
            note.set('type', true);
            note.set('oname', '班级便签');
            note.save().then(function (user) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }, function (error) {
              // 失败
            });
          }, function (error) {
            // 失败
          });
        }
      },
        function (error) {
          console.log("查询失败!");
        }); 



    }
    else{
      wx.showToast({
        title: '请填写全部信息',
        image: '/image/warning.png',
        duration: 1500
      })
      console.log("未填写全部信息")

    }
    
  },

  logo:function()
  {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var these = that;
        var tempFilePaths = res.tempFilePaths
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name.png', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
        file => wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath
            that.setData({
              tempFilePaths: savedFilePath,
              temp1: file.url()
            })
          }
        })
        ).catch(console.error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    options.username = decodeURIComponent(options.username);
    options.password = decodeURIComponent(options.password);
    var username = JSON.parse(options.username);
    var password = JSON.parse(options.password);
    this.setData({
      username: username,
      password:password
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