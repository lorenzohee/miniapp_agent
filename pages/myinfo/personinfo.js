// pages/myinfo/personinfo.js
import { service } from '../../config.js'
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
    this.host = service.host
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
    this.getCurrentUserInfo()
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

  getCurrentUserInfo(){
    let userService = new UserService();
    userService.getMyInfo((res)=>{
      this.setData({user: res})
    })
  },

  changeAvatar(){
    let userService = new UserService();
    wx.chooseImage({
      count: 1,
      success: (res)=>{
        const tempFilePaths = res.tempFilePaths[0];
        wx.showLoading({
          title: 'uploading',
        })
        wx.uploadFile({
          url: this.host + '/api/v1/users/' + this.data.user.id +'/update_avater',
          filePath: tempFilePaths,
          name: 'avatar',
          header: {
            'Authorization': app.globalData.access_token
          },
          success: (res)=>{
            wx.hideLoading()
            this.getCurrentUserInfo()
            wx.showToast({
              title: 'upload success',
            })
          },
          fail: ()=>{
            wx.hideLoading();
            wx.showToast({
              title: 'upload fail, please retry.',
            })
          }
        })
      },
      fail: (e)=>{ }
    })
  }

})