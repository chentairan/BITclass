// pages/userinfo/userinfo.js
var AV = require('../../../utils/av-weapp-min.js');

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    nickname: true,
    code: true,
    stu_num: true,
    class_num: true,
    ins: true,
    institute: ['信息与电子学院', '宇航学院','软件学院', '教育研究院', '秦皇岛分校', '机车学院','材料学院','人文学院','继续教育学院','机电学院','生命学院','马克思主义学院','远程教育学院','光电学院','数学学院','法学院','国际教育学院','物理学院','外国语学院','高职学院','自动化学院','化学与化工学院','设计与艺术学院','珠海学院','计算机学院','管理学院','体育部'],
    ins_dis: '',
    nickname_dis: '',
    code_dis: '',
    stu_num_dis: '',
    class_num_dis: '',
    value_mid_nickname: '',
    value_mid_code1:'',
    value_mid_code: '',
    value_mid_stu: '',
    value_mid_class: '',
    val: 0,
    iconflag:0,
  },

  bindChange: function (e) {
    this.data.val = e.detail.value
    this.setData({
      institute: this.data.institute,
    })
  },

  nickname_input: function (e) {
    this.data.value_mid_nickname = e.detail.value;
  },
  code_input: function (e) {
    this.data.value_mid_code = e.detail.value;
  },
  code_input1: function (e) {
    this.data.value_mid_code1 = e.detail.value;
  },
  stu_num_input: function (e) {
    this.data.value_mid_stu = e.detail.value;
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

  code1: function () {
      this.setData({
        code: !this.data.code,
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

  code: function () {
    if (this.data.value_mid_code1 == this.data.password){
    this.setData({
      code: !this.data.code,
      password: this.data.value_mid_code,
    })
    var str = '';
    var num = this.data.value_mid_code.length;
    for (var i = 0; i < num; i++) {
      str = str + '*';
    }
    this.setData({
      code_dis: str
    })
    }
    else{
      wx.showToast({
        title: '原密码错误',
        image: '/image/warning.png',
        duration: 2000
      })
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
      console.log("错误输入班号：" + cla)
    }
  },

  ins: function () {
    this.setData({
      ins: !this.data.ins,
      ins_dis: this.data.institute[this.data.val],
    })
  },

  icon:function()
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
                console.log(res.savedFilePath)
                that.setData({
                  icon: savedFilePath,
                  temp1: file.url(),
                  iconflag:1,
                })
              }
            })
            ).catch(console.error);
        }
      })
  },
  finish: function () {
    var that = this;
    var flag = 0;
    var banhao = this.data.class_num_dis;
    var xueyuan = this.data.ins_dis;
    var xuehao = this.data.stu_num_dis;
    var nickname = this.data.nickname_dis;
    var username = this.data.username;
    var password = this.data.password;
    var temp1 = this.data.temp1;
    var icon = this.data.icon
    var Login = AV.Object.extend("login");
    var user = new AV.Query(Login);
    user.equalTo('username',username);
   user.find().then(function (results) {
    var userinfo  =results[0];
    
    if(banhao!=userinfo.get('banhao'))
    {
      var Note = AV.Object.extend("userTonote");
      var note = new AV.Query(Note);
      note.equalTo('user', username);
      note.equalTo('organization', userinfo.get('banhao'))
      note.equalTo('type',true);
      note.find().then(function (results) {
        var newnote = results[0];
        newnote.set('organization', banhao);
        newnote.save()
      }, function (error) {
      });
    }
    userinfo.set('username', username);
    userinfo.set('password', password);
    userinfo.set('nickname', nickname);
    userinfo.set('xuehao', xuehao);
    userinfo.set('banhao', banhao);
    userinfo.set('xueyuan', xueyuan);
    if(that.data.iconflag==1&&temp1)
    {
      userinfo.set('icon', temp1)
      console.log(temp1)
    }
    wx.getStorage({
      key: 'user',
      success: function (res) {
        var temp = res.data;
        temp[0] = nickname;
        if(temp1)
        {
          temp[1] = temp1;
        }
        temp[2] = 1;
        temp[3] = banhao;
        temp[4] = xuehao;
        temp[5] = xueyuan;
        temp[6] = password;
        temp[7] = username;
        wx.setStorage({
          key: "user",
          data: temp
        })
      }
    })
    userinfo.save().then(function (user) {
      if (!flag) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        flag = 1
      }
      if (flag) {
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    }, function (error) {
      console.log('保存失败')
    });
   }, function (error) {
     console.log('查询失败')
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
    wx.getStorage({
      key: 'user',
      success: function (res) {
        if (res.data[2]) {
          that.setData({
            nickname_dis: res.data[0],
            icon: res.data[1],
            stu_num_dis: res.data[4],
            class_num_dis:res.data[3],
            ins_dis:res.data[5],
            password:res.data[6],
            username: res.data[7],      
          })
          var str='';
          var num = that.data.password.length;
          for(var i=0;i<num;i++)
          {
            str=str+'*';
          }
          that.setData({
            code_dis: str
          })
        }
      }
    })
                /*对应缓存数据
    temp[0] = results[0].nickname;
    temp[1] = results[0].icon;
    temp[2] = 1;
    temp[3] = results[0].banhao;
    temp[4] = results[0].xuehao;
    temp[5] = results[0].xueyuan;
    temp[6] = password;
    ins_dis: '',
    nickname_dis: '',
    code_dis: '',
    stu_num_dis: '',
    class_num_dis: '',
    email_num_dis: '',*/
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
