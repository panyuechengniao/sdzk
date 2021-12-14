App({
    globalData: {
        userInfo: null,
        appname: '江西自考网',
        aid: 1,//根据后台设置自己的小程序id
        third_session: '',
        appsecret: 'M2XjTo7u0BqZtZeoGYWylIlixOzTLn3A',
        host: "https://www.govzk.com/",
        banner:[
                {'thumb':'/images/banner1.jpg','bid':'0'},
                {'thumb':'/images/banner2.jpg','bid':'0'},
                {'thumb':'/images/banner3.jpg','bid':'0'}
            ],
        system: {},
    },
    onLaunch() {
        var that = this
        var api = that.globalData.host + "api.php?op=api&"
        that.globalData.api = api;
        that.getCategory();
        that.getSystem();
        if (swan.canIUse('showFavoriteGuide')) {
            swan.showFavoriteGuide({
                type: 'bar',
                content: '一键添加到我的小程序',
                success(res) {
                    console.log('添加成功：', res);
                },
                fail(err) {
                    console.log('添加失败：', err);
                }
            });
        }
        var result = swan.isLoginSync();
        if (result) {
            that.checkLogin();
        }
    },

    //检查是否登录
    checkLogin() {
        var that = this;
        swan.getStorage({
            key: 'Token',
            success: function (res) {
                if (res.data === '') {
                    that.login();
                } else {
                    // e.setData({
                    //     userInfo: res.data
                    // });
                }
            },
            fail: function () {
                that.login();
            }
        });
    },
    getCategory() {
        var that = this;
        swan.request({
            url: that.globalData.api + "action=category",
            data: {
                aid: that.globalData.aid
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'x-appsecret': that.globalData.appsecret
            },
            success: function (res) {
                const categorys = res.data[0];

                try {
                    swan.setStorageSync('categorys', categorys)
                }
                catch (e) {
                }
            },
            fail: function (error) {
                console.log(error)
            }
        })
    },
    /*用户配置信息 system*/
    getSystem() {
        var that = this;
        swan.request({
            url: that.globalData.api + "action=config",
            data: {
                aid: that.globalData.aid,
                type:"system"
            },
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'x-appsecret': that.globalData.appsecret
            },
            success: function (res) {
                let system = res.data.data;

                that.globalData.system = system;
                that.globalData.appname = system.seotitle
                try {
                    swan.setStorageSync('system', system)
                } catch (e) {
                }
            },
            fail: function(error) {
                console.log(error)
            }
        })
    },
    //封装栏目缓存promise对象
    get_cat() {
        var that = this;
        var CATEGORYS = swan.getStorageSync('categorys')
        return new Promise(function (resolve, reject) {
            if (CATEGORYS != '' || CATEGORYS.length != 0) {
                resolve(CATEGORYS);
            } else {
                swan.request({
                    url: that.globalData.api + "action=category",
                    data: {
                        aid: that.globalData.aid
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded', // 默认值
                        'x-appsecret': that.globalData.appsecret
                    },
                    success: function (res) {
                        const categorys = res.data[0];
                        try {
                            swan.setStorageSync('categorys', categorys)
                        }
                        catch (e) { }
                        resolve(categorys);

                    },
                    fail() {
                        console.log('获取栏目缓存失败，请重试');
                    }
                })
            }
        })
    },
    //封装获取system的promise对象
    get_sys() {
        var that = this;
        var system = swan.getStorageSync('system')
        return new Promise(function (resolve, reject) {
            if (system != '' || system.length != 0) {
                resolve(system);
            } else {
                swan.request({
                    url: that.globalData.api + "action=system",
                    data: {
                        aid: that.globalData.aid
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded', // 默认值
                        'x-appsecret': that.globalData.appsecret
                    },
                    success: function (res) {
                        let system = res.data.data;
                        that.globalData.system = system;
                        that.globalData.appname = system.seotitle
                        try {
                            swan.setStorageSync('system', system)
                        } catch (e) { };
                        resolve(system);

                    }
                })
            }
        })
    },
    /*登录授权*/
    login() {
        var that = this;
        swan.login({
            success: function (login) {
                //获取code，换取session_key
                swan.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        swan.showLoading({
                            title: '授权中...'
                        });
                        swan.getUserInfo({
                            success(userInfo) {

                                swan.request({
                                    url: that.globalData.api + "action=member",
                                    data: {
                                        aid: that.globalData.aid,
                                        code: login.code,
                                        data: userInfo.data,
                                        iv: userInfo.iv,
                                        type: 'baidu'
                                    },
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded', // 默认值
                                        'x-appsecret': that.globalData.appsecret
                                    },
                                    success: function (res) {
                                        swan.hideLoading();
                                        let data = res.data;
                                        if (res.statusCode === 200) {
                                            swan.setStorageSync('Token', data.token);
                                            swan.setStorageSync('userInfo', data.data);
                                            swan.navigateBack();
                                            swan.showToast({
                                                title: '授权成功',
                                                icon: 'success',
                                                duration: 1000,
                                            });
                                        }
                                    }
                                })
                            }
                        })
                    },
                    fail() {
                        swan.showToast({
                            title: '授权失败'
                        });
                    }
                });
            },
            fail: function (err) {
                console.log('登录失败', err);
            }
        });
    },

    onShow() {
    }
});
