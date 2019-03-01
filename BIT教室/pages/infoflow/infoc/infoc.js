// pages/infoc/infoc.js
const AV = require('../../../utils/av-weapp-min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spilt:true,
    copy:[],
    choose:true
  },
  bigbang:function()
  {
    wx.setNavigationBarTitle({
      title: '大爆炸'
    })
    var lens=0;
    var State=[];
    this.setData({
      spilt: false
    })
    var that=this;
    var paramsJson = {
      s: this.data.content.article
    };
    wx.showLoading({
      title: '分词中',
    })
    AV.Cloud.run('bigbang', paramsJson).then(function (data) 
    {
      for (var i = 0; i < data.length; i++) 
      {
         lens = lens + data[i].length
      }
      State=new Array()
      for(var j=0;j<lens;j++)
      {
        State[j]=1
      }
      wx.hideLoading();
       that.setData({
         bang: data,
         spilt: false,
         State:State
       })
    }, function (err) {
      // 处理调用失败
    });
  },


  chosen:function(e)
  {
    var State=this.data.State;
    var copy=this.data.copy;
    if (State[e.currentTarget.dataset.id]==1)
    {
      copy[copy.length] = new Object();
      copy[copy.length-1].index = e.currentTarget.dataset.id;
      copy[copy.length-1].str = this.data.bang[e.currentTarget.dataset.id];
      State[e.currentTarget.dataset.id] = !State[e.currentTarget.dataset.id];
      this.setData({
        copy: copy,
        State: State
      })
    }
    else
    {
      for(var i=0;i<copy.length;i++)
      {
        if (copy[i].index == e.currentTarget.dataset.id)
        {
          copy[i].index=-1;
        }
      }
      State[e.currentTarget.dataset.id] = !State[e.currentTarget.dataset.id];
      this.setData({
        copy: copy,
        State: State
      })
    }
    
  },
  copy:function()
  {
    var temp = this.data.copy;
    var str='';
    for(var i=0;i<temp.length;i++)
    {
      if(temp[i].index!=-1)
      {
        str = str+temp[i].str;
      }
    }
    this.setData
    ({
        spilt: true
    })
    wx.setNavigationBarTitle({
      title: '教务处通知'
    })
    wx.setClipboardData({
      data: str,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let isPhone = app.globalData.isIpx;
    this.setData({
      isIpx: isPhone
    })
    wx.setNavigationBarTitle({
      title: '教务处通知'
    })
    options.content = decodeURIComponent(options.content)
    var content = JSON.parse(options.content);
    if (content) {
      this.setData
        ({
          content: content
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