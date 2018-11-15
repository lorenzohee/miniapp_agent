import { showSuccess, showModel } from '../utils/util.js'
import { service } from '../config.js'
class Comment{
  constructor() {
    this.app = getApp()
    this.host = service.host
  }

  createComment(obj, callback){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/comments',
      method: 'POST',
      data: obj,
      success: (result) => {
        if (result.statusCode == 200 || result.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

  getCommentsByArticleId(articleId, callback){
    var result = [
      {
        id: 4,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论内容'
      },
      {
        id: 1,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: 'We need to find a method to predict the internal temperature of food based on its inherent properties'
      },
      {
        id: 2,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论内容We need to find a method to predict the internal temperature of food based on its inherent properties'
      },
      {
        id: 3,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论We need to find a method to predict the internal temperature of food based on its inherent properties内容'
      }]
    if('function'===typeof(callback)){
      callback(result)
    }
  }
}

module.exports = Comment