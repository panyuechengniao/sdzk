var app = getApp();
/**
 * 请求API 默认post
 * @param  url         接口地址
 * @param  params      请求的参数
 * @param  sourceObj   来源对象
 * @param  successFun  接口调用成功返回的回调函数
 * @param  failFun     接口调用失败的回调函数
 * @param  completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun)
}
/**
 * GET请求API
 * @param  url         接口地址
 * @param  params      请求的参数
 * @param  sourceObj   来源对象
 * @param  successFun  接口调用成功返回的回调函数
 * @param  failFun     接口调用失败的回调函数
 * @param  completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun)
}
/**
 * 请求API
 * @param  url         接口地址
 * @param  params      请求的参数json格式
 * @param  method      请求类型
 * @param  sourceObj   来源对象
 * @param  successFun  接口调用成功返回的回调函数
 * @param  failFun     接口调用失败的回调函数
 * @param  completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, sourceObj, successFun, failFun, completeFun) {
  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }
  swan.request({
    url: url,
    method: method,
    data: params,
    header: { 'Content-Type': contentType },
    success: function (res) {
      typeof successFun == 'function' && successFun(res, sourceObj)
    },
    fail: function (res) {
      typeof failFun == 'function' && failFun(res, sourceObj)
    },
    complete: function (res) {
      typeof completeFun == 'function' && completeFun(res, sourceObj)
    }
  })
}

/*
** 获取列表
** catid num thumb moreinfo,views,order, 来源对象、成功回调、失败回调
*/
function get_infolist(catid, num, thumb,thumbsize,moreinfo,views,order,sourceObj,successFun, failFun){
    var that = this
    swan.request({
        url: app.globalData.api.api_list,
        data: {
            catid: catid,
            num: num,
            thumb:thumb,
            moreinfo: moreinfo,//调用副表
            order: order,
            views:views,
            thumbsize:thumbsize,
            wxid: app.globalData.wxid
        },
        method: 'GET',
        header: {
            'content-type': 'application/json',
            'x-appsecret': app.globalData.appsecret
        },
        success: function (res) {
            typeof successFun == 'function' && successFun(res, sourceObj)
        },
        fail: function () {
            typeof failFun == 'function' && failFun(res, sourceObj)
        }
    })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.postRequest = requestPostApi;
module.exports.getRequest = requestGetApi;
module.exports.get_infolist = get_infolist;