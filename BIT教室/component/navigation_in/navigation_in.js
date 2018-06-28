// component/navigation_in/navigation_in.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: 'white'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:function()
    {
      wx.navigateBack({
      
      })
    }
  }
})
