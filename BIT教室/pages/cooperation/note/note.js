// pages/note/note.js
var AV = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  sort:true,
  type:'全部便签',
  clip: new Array(),
  move_flag:0,
  move_init: 0,
  move: new Array(),
  note: new Array(),
  del: new Array(),
  org:[],
  selected:[],
  edit:true,
  edit_text:'编辑',
  done_text:'添加',
  circle: ["/image/circle.png","/image/circle_up.png"],
  tap:[]
  },
  sort:function()
  {
    this.setData({
      sort:!this.data.sort
    })
    if(!this.data.sort)
    {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#B2B2B2',
        animation: {
          duration: 0,
          timingFunc: 'linear'
        }
      })
    }
    else
    {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#FDFDFD',
        animation: {
          duration: 0,
          timingFunc: 'easeIn'
        }
      })
    }
  },
  edit:function()
  {
    if(this.data.edit)
    {
      this.setData({
        edit_text:'完成',
        done_text:'删除',
        edit: !this.data.edit
      })
    }
    else
    {
      this.setData({
        edit_text: '编辑',
        done_text:'添加',
        edit: !this.data.edit
      })
    }
  },
  edit_start: function (event)
  {
    var clip = this.data.clip;
    var del = this.data.del;
    var init_del = [];
    var init_clip = [];
    var init_move = [];
    var move = this.data.move;
    var temp = [];
    var two = [-36,190-36];
    var useless;
    clip[event.currentTarget.dataset.id] = 1;
    for(let i = 0;i<del.length;i++)
    {
      init_del.push(0);
      init_clip.push(0);
      init_move.push(-36);
    }
    if (!this.data.move_flag)
    {
      if (move[event.currentTarget.dataset.id] == 190 - 36) {
        temp = init_move;
        temp[event.currentTarget.dataset.id] = 190 - 36;
        move = temp;
        useless = 1;
      }
      else {
        move = init_move;
        useless = 0;
      }
      this.setData({
        move_flag: 1,
        move_init: event.changedTouches[0].clientX,
        move: move,
        useless: useless
      })
    }
    else
    {
      var move_temp = 2*(event.changedTouches[0].clientX - this.data.move_init) + two[this.data.useless];
      if(move_temp<-36)
      {
        move_temp = -36;
      }
      if(move_temp>190-36)
      {
        move_temp = 190-36;
      }
      move[event.currentTarget.dataset.id] = move_temp;
      this.setData({
        move: move,
        clip: clip
      })
    }
  },
  edit_end:function()
  {
    var del = this.data.del;
    var move = this.data.move;
    var clip = this.data.clip;
    for(var i = 0;i<del.length;i++)
    {
      if(move[i]!=-36)
      {
        if(move[i]<100-36)
        {
          move[i] = -36;
          clip[i] = 0
          this.setData({
            move: move
          })
        }
        else
        {
          move[i] = 190 - 36;
          this.setData({
            move: move
          })
        }
      }
      else
      {
        clip[i] = 0
      }
    }
    this.setData({
      move_init: 0,
      move_flag: 0,
      clip: clip
    })
  },
  tap:function(e)
  {
    var tap = this.data.tap;
    tap[e.currentTarget.dataset.id] = tap[e.currentTarget.dataset.id]==1?0:1;
    this.setData({
      tap:tap
    })
  },
  remove:function()
  {
    var that = this;
    var org_name = this.data.org_name;
    var org = this.data.org;
    var username = this.data.username;
    var tap = this.data.tap;
    for (var i = 0; i < tap.length;i++)
    {
        if(tap[i]&&org[i]!='班级便签')
      {
        var del = new AV.Query('userTonote');
        del.equalTo('organization', org_name[i]);
        del.equalTo('user', username);
        del.find().then(function (results) {
          var these = that;
          var delt = results[0];
          var todo = AV.Object.createWithoutData('userTonote', delt.id);
          todo.destroy().then(function (success) {
            these.onShow()
          }, function (error) {
            // 删除失败
          });

        }, function (error) {
        });
      }
    }
  },
  all:function()
  {
    this.onShow();
  },
  div:function(e)
  {
    var selected = [1];
    var del = [];
    var move = [];
    var content = [];
    var org_name = this.data.org_name;
    var note = new AV.Query('note');
    var that = this;
    var flag = 0;
    for (var j = 0; j < org_name.length;j++)
    {
      selected.push(j == e.currentTarget.dataset.id?0:1);
    }
    this.setData({
      selected:selected
    })
    note.equalTo('org', org_name[e.currentTarget.dataset.id]);
    note.find().then(list => {
      for (let i = 0; i < list.length; i++) {
        flag = 1;
        del.push(0);
        move.push(-36);
        let notebook = list[i];
        var temp = new Object();
        temp.type = notebook.get('type');
        temp.time = notebook.get('time');
        temp.title = notebook.get('title');
        temp.content = notebook.get('content');
        temp.oname = notebook.get('oname');
        temp.id = notebook.id;
        content.push(temp)
        content.sort(that.by("time"));
        that.setData({
          note: content,
          clip: del,
          del: del,
          init_del: del,
          init_move: move,
          move: move,
          type: temp.oname
        })
        if (flag == 0) {
          that.setData({
            note: []
          })
        }
      }
    });
  },
  dtl:function(e)
  {
    var note = this.data.note;
    var temp = note[e.currentTarget.dataset.id];
    wx.navigateTo({
      url: '/pages/cooperation/note_dtl/note_dtl?content='+encodeURIComponent(JSON.stringify(temp)),
    })
  },
  del:function(e)
  {
    var these = this;
    wx.showModal({
      title: '删除',
      content: '是否要删除该标签',
      success: function (res) {
        if (res.confirm) {
          var that = these;
          var temp = that.data.note;
          var note = AV.Object.createWithoutData('note', temp[e.currentTarget.dataset.id].id);
          note.destroy().then(function (success) {
            that.onShow()
          }, function (error) {
            // 删除失败
          });
        } else if (res.cancel) {
        }
      }
    })
    
    
  },
  register:function()
  {
    wx.navigateTo({
      url: '/pages/cooperation/note_register/note_register?org=' + encodeURIComponent(JSON.stringify(this.data.org_name)),
    })
  },
  add:function()
  {
    var that = this
    wx.showActionSheet({
      itemList: this.data.org,
      success: function (res) {
        wx.navigateTo({
          url: '/pages/cooperation/note_dtl/note_dtl?id=' + (that.data.org_name)[res.tapIndex] + '&oname=' + (that.data.org)[res.tapIndex],
        })
      },
      fail: function (res) {
      }
    })
  },
   by : function (name) {
    return function (o, p) {
      var a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a > b ? -1 : 1;
        }
        return typeof a > typeof b ? -1 : 1;
      }
      else {
        throw ("error");
      }
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
    var that = this;
    var content = new Array();
    var flag = 0;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        var these = that;
        var username = res.data[7];
        that.setData({
          username: res.data[7],
          banhao: res.data[3]
        })
        var temp = new AV.Query('userTonote');
        var org = new Array();
        var org_name = new Array();
        var tap = new Array();
        temp.equalTo('user', res.data[7]);
        temp.find().then(ori => {
          var del = new Array();
          var init_clip = new Array();
          var selected =[0]
          var move = new Array();
          for (let j = 0; j < ori.length; j++) {
            var note = new AV.Query('note');
            org.push(ori[j].get('oname'));
            org_name.push(ori[j].get('organization'));
            tap.push(0);
            these.setData({
              org:org,
              org_name:org_name,
              tap:tap
            })
            note.equalTo('org', ori[j].get('organization'));
            var those = these;
            note.find().then(list => {

              for (let i = 0; i < list.length; i++) {
                flag = 1;
                del.push(0);
                init_clip.push(0);
                selected.push(1);
                move.push(-38);
                let notebook = list[i];
                var temp = new Object();
                temp.type = notebook.get('type');
                temp.time = notebook.get('time');
                temp.title = notebook.get('title');
                temp.content = notebook.get('content');
                temp.oname = notebook.get('oname');
                temp.id = notebook.id;
                content.push(temp)
                content.sort(those.by("time"));
                those.setData({
                  note: content,
                  clip: del,
                  del: del,
                  selected:selected,
                  init_del:del,
                  init_clip: init_clip,
                  init_move:move,
                  move: move
                })
                if(flag==0)
                {
                  those.setData({
                    note:[]
                  })
                }
              }
            });
          }
        });

      },
    })
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