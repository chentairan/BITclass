// first.js
var AV = require('../../../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openinfor1: false,
    openinfor2: false,
    inforlist: new Array(),
    state: true,
   
    Nowweek: 0,
    single: true,
    lessonflag: false,
    lessonnumber: 0,
    floornum: '',
    classnum: '',
    startnum: '',
    endnum: '',
    singleweek: '',
    weeknum: '',
    time: '',
    ra1: 'circle',
    ra2: 'circle',
    ra3: 'circle',
   
    lessonarray: ['', '一', '二', '三', '四', '五'],
    lesson: '',
  },
  /*后端查找*/
  Search: function (e) {
    var that = this;
    //映射
    var rep1 = ["li", "zonga", "zongb"];
    var rep2 = ["building","floor", "class", "Nweek", "week", "time"];
    var rep3 = ["1-", "2A-", "2B-"];
    var rep4 = ["一", "二", "三", "四", "五", "六", "日"];
    var rep5 = ["多媒体教室", "外语语音室", "普通教室", "多媒体网络教室", "教室备课室", "模拟法庭","外语专业语音室"];
    //数据库声明
    var info = this.data.choiceOfSearch;
    var build = new AV.Query('Classroom');

    //数组声明
    var content = new Array();
    content.Nweek = new Array();
    content.Nweek.week = new Array();
    content.Nweek.week.time = new Array();
    //中间变量
    var storage = new Array();
    //筛选条件
    for (var i = 0; i < 6; i++) {
      if (info[i] != 0) {
        build.equalTo(rep2[i], info[i]);
      }
    }
    build.limit(1000);
    
    wx.showLoading({
      title: '请稍候',
    })
    // 查询所有数据
    build.find().then(function (results)
    {
        wx.hideLoading();
        if (results.length >= 30) {
          that.setData({
            openinfor1: true,
            openinfor2: true
          })
        }
        else {
          that.setData({
            openinfor1: false,
            openinfor2: false
          })
        }

        for (var i = 0; i < results.length; i++) 
        {
          var object = results[i];
          var temp;
          var temp1;
          var temp2;
          //翻译成1-101、2A-102、2B-203形式,8周，星期一
          if (object.get('class') < 10) {
            temp = '0' + object.get('class');
          }
          else {
            temp = object.get('class');
          }

          temp = rep3[object.get('building') - 1] + object.get('floor').toString() + temp.toString();
          temp1 = object.get('Nweek') + '周';
          temp2 = '星期' + rep4[object.get('week') - 1];


          for (var j = 0; j < storage.length; j++) {
            if (temp == storage[j]) {
              if (!content[j].Nweek[object.get('Nweek') - 1]) {
                content[j].Nweek[object.get('Nweek') - 1] = new Object();
                content[j].Nweek[object.get('Nweek') - 1].week = new Array();
              }
              content[j].Nweek[object.get('Nweek') - 1].nname = temp1;
              if (!content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1]) {
                content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1] = new Object();
                content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].time = [false, false, false, false, false];
              }
              content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].wname = temp2;
              content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].time[object.get('time') - 1] = !object.get('state');
              break;
            }
          }
          if (j == storage.length) {
            content[j] = new Object();
            storage[storage.length] = temp;
            content[j].cname = temp;
            content[j].number = object.get('number');
            content[j].type = rep5[object.get('type')-1];
            content[j].Nweek = new Array();
            content[j].Nweek[object.get('Nweek') - 1] = new Object();
            content[j].Nweek[object.get('Nweek') - 1].nname = temp1;
            content[j].Nweek[object.get('Nweek') - 1].week = new Array();
            content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1] = new Object();
            content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].wname = temp2;
            content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].time = new Array;
            content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].time = [false, false, false, false, false];
            content[j].Nweek[object.get('Nweek') - 1].week[object.get('week') - 1].time[object.get('time') - 1] = object.get('state');
          }
        }
        that.setData({
          inforlist:content
        })
      },
      function (error) { 
        console.log("查询失败!");
      
    });
  },
  /*button转化 */
  Switch1: function () {
    this.setData
      ({
        openinfor1: false,
        openinfor2: false
      });
  },
  Switch2: function () {
    this.setData
      ({
        openinfor1: true,
        openinfor2: true
      });
  },
  onLoad: function (options) {
    this.setData({
      choiceOfSearch: JSON.parse(options.id)
    }) 
    wx.setNavigationBarTitle({
      title: '教室查询'
    })
    this.Search();
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