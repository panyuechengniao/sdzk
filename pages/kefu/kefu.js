var app =getApp();
var util = require('../utils/util.js');
Page({
    data: {
        phoneNumber: '',
        title: 'openLocation',
        loading: false,
        host: app.globalData.host,
        username: app.globalData.appname,
        locationInfo: {
            longitude: '',
            latitude: '35.415393',
            scale: '',
            name: '',
            address: ''
        },
        seotitle:'',
        seokeywords:'',
        seodescription:''

    },
    openLocation () {
        let locationInfo = this.data.locationInfo;
        swan.openLocation({
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            scale: locationInfo.scale,
            name: locationInfo.name,
            address: locationInfo.address,
            success: res => {
                console.log('success', res);
            },
            fail : function (err) {
                swan.showToast({
                    title: '检查位置权限',
                    icon: 'none'
                })
                console.log('fail msg', err);
            }
        });
    },
    contactCB(e) {
        console.log(e.detail); // 输出：{errMsg: 'enterContact:ok'}
        // 进入客服会话页面成功，可进行自己的业务逻辑
        if (e.detail.errMsg === 'enterContact:ok') {
            swan.reportAnalytics('userMessage', {
                visit: 1,
                message: '进入客服页面PV'
            });
        }
        // 可进行一些进入失败的业务逻辑
        else {
            swan.reportAnalytics('userMessage', {
                visit: 0,
                message: '进入客服页面失败损失PV'
            });
        }
    },
     makePhoneCall(e){
        swan.makePhoneCall({
                phoneNumber: this.data.phoneNumber,
                success: res => {
                    console.log('makePhoneCall success');
                },
                fail: err => {
                    swan.showModal({
                        title: '拨打失败',
                        content: '请检查是否输入了正确的电话号码',
                        showCancel: false
                    });
                }
            })
    },
    onLoad: function () {
        new Promise((resolve, reject)=>{
            resolve(swan.getStorageSync('system'))
        }).then((res)=>{
            let get_system= res;
            console.log(get_system)
            this.setData({
                seotitle:get_system.seotitle,
                seokeywords: get_system.seokeywords,
                seodescription: get_system.seodescription,
                phoneNumber: get_system.phone,
                locationInfo:get_system.addr,
            })
            this.data.locationInfo.name=get_system.appname;
            this.data.locationInfo.address=get_system.address;
            swan.setPageInfo({
                title: get_system.seotitle,
                keywords: get_system.seokeywords,
                description:get_system.seodescription,
                releaseDate: util.formatTime(swan.getStorageSync('system').releasedate, 'Y-M-D h:m:s'),
                success: function () {
                    console.log('setPageInfo success');
                },
                fail: function (err) {
                    console.log('setPageInfo fail', err);
                }
            })
        })



    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});