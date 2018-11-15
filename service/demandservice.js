// demand service
import { showSuccess, showModel} from '../utils/util.js'
import { service} from '../config.js'
class Demand{
  constructor(){
    this.app = getApp()
    this.host = service.host
  }

  getDemandList(pageNum, callback){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/demand_blogs',
      success: (result)=>{
        if(result.statusCode==200 || result.statusCode==201){
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        }else{
          showModel('get failure', 'internet error')
        }
      },
      fail: (e)=>{
        showModel('get failure', 'system error')
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  }

  getDemandFavorite(pageNum, callback) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/demand_blogs/user_favorite',
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
      complete:()=>{
        wx.hideLoading()
      }
    })
  }

  starDemand(demandid, callback) {
    let that = this;
    let postData = {
      favorable_id: demandid,
      favorable_type: 'Blog'
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: `${this.host}/api/v1/users_solution_i18ns`,
      data: postData,
      method: 'POST',
      success: (res) => {
        if (res.statusCode == 200 || res.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(res.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  }

  deleteFavorite(favorableId, callback) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: `${this.host}/api/v1/users_solution_i18ns/${favorableId}`,
      method: 'DELETE',
      success: (res) => {
        if (res.statusCode == 200 || res.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(res.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  }

  findDemandById(id, callback){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/demand_blogs/' + id,
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
      complete: ()=>{
        wx.hideLoading()
      }
    })
  }

  getFavoriteList(){
    return [
      { id: 3, title: '2018 海尔HOPE 创新方案大赛', isFavorite: true },
      { id: 4, title: '【活动】传感器产业联盟中国制造业助力论坛（徐州站）', isFavorite: true },
      { id: 6, title: '● 寻找研究化妆品存储的专家 ', isFavorite: true },
      { id: 7, title: '寻找能够测定木材防霉涂层寿命的专家', isFavorite: true }
    ]
  }
}

module.exports = Demand