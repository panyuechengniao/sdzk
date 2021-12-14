var app=getApp();
Page({
    data: {
        host: app.globalData.host,
        selector: ['高升专', '专升本', '高达本'],
        arrIndex: '0',
        education:['小学','初中','高中','中专','大专','本科'],
        arrIndex2:'0'
    },
    selectorChange(e) {
        console.log('picker-selector changed，值为', e.detail.value);
        this.setData('arrIndex', e.detail.value);
    },
    educationChange(e) {
        console.log('picker-selector changed，值为', e.detail.value);
        this.setData('arrIndex2', e.detail.value);
    },
    onLoad: function () {

    },
    formSubmit(e) {
        let that = this;
        var mobiles = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (e.detail.value.name == "") {
            swan.showModal({
                title: '',
                content: '请输入您的姓名'
            });
             return false
        };
        if (!e.detail.value.education) {
            swan.showModal({
                title: '',
                content: '请选择当前学历'
            });
             return false
        };
         if (!e.detail.value.cengci) {
            swan.showModal({
                title: '',
                content: '请选择报考层次'
            });
             return false
        };
        if (e.detail.value.school == "") {
            swan.showModal({
                title: '',
                content: '请输入报考院校'
            });
             return false
        };
         if (e.detail.value.zhuanye == "") {
            swan.showModal({
                title: '',
                content: '请输入报考专业'
            });
             return false
        };
        if (e.detail.value.phone == "") {
            swan.showModal({
                title: '',
                content: '请输入正确的手机号码'
            });
             return false
        } else if (!mobiles.test(e.detail.value.phone)) {
            swan.showModal({
                title: '',
                content: '请输入正确的手机号码'
            });
            return false
        }
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(e.detail.value)
         swan.request({
            url: 'https://www.sd-zk.com.cn/saveDat.php',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-appsecret': app.globalData.appsecret
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            data: {
                reg_link: 'smartprogram'+e.detail.value.name,//来源
                mobile: e.detail.value.phone,//电话
                reg_from: '报考层次'+e.detail.value.cengci,//推广来源
                consult_project: '当前学历'+e.detail.value.education,
                city: '报考专业'+e.detail.value.zhuanye,
                ip: '报考院校'+e.detail.value.school,
                ip_province: '性别'+e.detail.value.sex
            },
            success: res => {
                console.log(res)
                if(res.data =='1|成功' ){
                    swan.showModal({
                        title: '',
                        content: '提交成功！稍后将有老师联系！',
                        duration: 2000
                    });

                }else if(res.data =='2|该手机号已注册' ){
                    swan.showModal({
                        title: '',
                        content: '该手机号已注册，请直接资讯在线客服老师。'
                    });
                }else{
                    swan.showModal({
                        title: '',
                        content: '提交失败！请直接咨询在线客服老师报名！'
                    });
                }
            },
            fail: err => {
             swan.showModal({
                    title: '',
                    content: '提交失败！请直接咨询在线客服老师报名！'
                });
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    formReset() {
        console.log('form表单reset');
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
        swan.showModal({
            title: '报名须知',
            content: '1.在本系统报名后:可以享受学习中心从复习、报名、考试、录取的全程指导;2、在本系统报名后:可以获得学习中心提供的复习辅导资料;\n3、在本系统报名后:可以享受学习中心提供的考前培训,录取率达98% ;\n4、在本系统报名后:符合条件可免试入学及降分录取，年满25周岁降20分录取; \n5、在本系统报名后:指导老师会联系您确认信息; \n6、若您还对成考报名还有不清楚的地方，可以先填写报名表，然后会有指导老师与您确认信息与逐一-解答。',
            showCancel: true,
            cancelText: '拒绝',
            confirmText: '同意',
            confirmColor:'red',
            success(res) {
                if (res.confirm) {
                    console.log('同意弹窗要求');
                }
                else if(res.cancel) {
                  console.log('拒绝弹窗要求');
                  swan.switchTab({
                      url: '../index/index'
                  });
                }
            }
        });
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