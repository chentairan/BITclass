// pages/note_dtl/note_dtl.js
var AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit:false,
    title:'',
    text:'',
    old:true,
    state:true
  },
  edit:function()
  {
    this.setData({
      edit:!this.data.edit,
      state: false
    })
  },
  done:function()
  {
    this.setData({
      edit: !this.data.edit,
     
    })
    if(this.data.old)
    {
      var content = this.data.content
      var note = AV.Object.createWithoutData('note', content.id);
      note.set('content', this.data.text);
      note.set('title', this.data.title);
      note.save();
    }
    else
    {
      var date = new Date();
      console.log(date.toLocaleString())
      var Note = AV.Object.extend('note');
      var note = new Note();
      note.set('content', this.data.text);
      note.set('title', this.data.title);
      note.set('oname',this.data.oname);
      note.set('org', this.data.organization);
      note.set('time', date.toLocaleString());
      if (this.data.oname=='班级便签')
      note.set('type',true)
      else note.set('type', false)
      note.save().then(function (todo) {
        wx.showToast({
          title: '新建成功',
          icon: 'success',
          duration: 1500
        })
        wx.navigateBack({
          delta: 1
        })
      }, function (error) {
        
      });
    }
  },
  title:function(e)
  {
    this.setData({
      title: e.detail.value
    })
  },
  text: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  state:function()
  {
    this.setData({
      state:!this.data.state
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.content)
    {
      var content = JSON.parse(decodeURIComponent(options.content));
      this.setData({
        title : content.title,
        tit: content.title,
        text : content.content,
        tex: content.content,
        type : content.type,
        content:content
      })
    }
    else
    {
      this.setData({
        old:false,
        organization:options.id,
        oname:options.oname
      })
    }
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