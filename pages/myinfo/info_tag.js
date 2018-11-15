// client/pages/myinfo/info_tag.js
var UserService = require('../../service/userservice.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentUserInfo()
    this.getTechArea()
    this.getInterestArea()
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

  },

  getCurrentUserInfo() {
    let userService = new UserService();
    userService.getMyInfo((res) => {
      this.setData({ user: res })
    })
  },

  getTechArea() {
    var that = this;
    var userService = new UserService()
    userService.getCfgList('system', 'preference_cn', res => {
      that.setData({
        techArea: res
      });
      if (undefined != this.data.interest && this.data.interest.length > 0 && undefined != this.data.user){
        this.initialTags()
      }
    })
  },

  getInterestArea() {
    var that = this;
    var userService = new UserService()
    userService.getCfgList('system', 'interest_tag_cn', res => {
      that.setData({
        interest: res
      });
      if (undefined != this.data.techArea && this.data.techArea.length > 0 && undefined != this.data.user){
        this.initialTags()
      }
    })
  },

  initialTags(){
    let userTech = this.data.user.subscribe_list;
    let userInterest = this.data.user.interest_list;
    this.data.techArea.forEach((v, i) => {
      v.selected = userTech.includes(v.valu)
    })
    this.data.interest.forEach((v, i) => {
      v.selected = userInterest.includes(v.valu)
    })
    this.setData({ techArea: this.data.techArea, interest: this.data.interest})
  },

  triggerTechTag(e) {
    var tag = e.currentTarget.dataset.id;
    var userService = new UserService();
    let preTag = null;
    this.data.techArea.forEach((v, i)=>{
      if(v.id == tag){
        preTag = v;
        return;
      }
    })
    let toastTitle = ''
    if(preTag.selected){
      this.data.user.subscribe_list.splice(this.data.user.subscribe_list.indexOf(preTag.valu), 1);
      toastTitle = 'delete success'
    } else {
      this.data.user.subscribe_list = this.data.user.subscribe_list.concat([preTag.valu])
      toastTitle = 'add success'
    }
    userService.changeUserInfo({ id: this.data.user.id, subscribe_list: this.data.user.subscribe_list }, res => {
      this.setData({ user: res })
      this.initialTags()
      wx.showToast({
        title: toastTitle,
      })
    })
  },

  triggerInterestTag(e) {
    var tag = e.currentTarget.dataset.id;
    var userService = new UserService();
    let preTag = null;
    this.data.interest.forEach((v, i) => {
      if (v.id == tag) {
        preTag = v;
        return;
      }
    })
    let toastTitle = ''
    if (preTag.selected) {
      this.data.user.interest_list.splice(this.data.user.interest_list.indexOf(preTag.valu), 1);
      toastTitle = 'delete success'
    } else {
      this.data.user.interest_list = this.data.user.interest_list.concat([preTag.valu])
      toastTitle = 'add success'
    }
    userService.changeUserInfo({ id: this.data.user.id, interest_list: this.data.user.interest_list}, res => {
      this.setData({ user: res })
      this.initialTags()
      wx.showToast({
        title: toastTitle,
      })
    })
  }
})