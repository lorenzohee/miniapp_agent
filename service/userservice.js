import { showSuccess, showModel } from '../utils/util.js'
import { service } from '../config.js'
class UserService {
  constructor(){
    this.app = getApp()
    this.host = service.host
  }

  getMyInfo(callback) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/users/current_user',
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

  changeUserInfo(obj, callback) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/users/'+obj.id,
      method: 'PUT',
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

  getUserTags(id, callback){
    var res = ["pink", "good", "bad", "black"];
    if ("function"==typeof(callback)){
      callback(res)
    }
  }

  deleteUserTag(text, callback){
    var res=text
    if("function"==typeof(callback)){
      callback(res)
    }
  }

  addUserTag(text, callback){
    var res=text
    if('function'==typeof(callback)){
      callback(res)
    }
  }

  // get all tech area
  getCfgList(section, key, callback){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: `${this.host}/api/v1/cfgs?section=${section}&key=${key}`,
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
}

module.exports = UserService