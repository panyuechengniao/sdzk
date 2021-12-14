Page({
    data: {
        shcoolId:'2001',
        schoolimg:['../../images/school1.jpg','../../images/school1.jpg','../../images/school1.jpg'],
        schoolname:"广西师范大学学院",
        schoolintroduce:"广西师范大学，简称“广西师大”，坐落于世界著名山水旅游名城桂林市，由教育部和广西壮族自治区人民政府“省部共建”，  是一所教师教育特色鲜明、具有悠久历史的综合性师范大学。为国家中西部高校基础能力建设工程、卓越教师培养计划、国培计划、广西一流学科、国家级人才培养模式创新实验区和国家级特色专业点建设高校， 是教育部来华留学示范基地、中国-东盟教育研究中心和中国政府奖学金来华留学生接受院校、全国深化创新创业教育改革示范高校。"
    },
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        this.setData({
         shcoolId:options.shcoolId
        });
    },
    getArticleDetail(shcoolId, cb) {
        // TODO: 获取内容详情所需要的数据，请修改为相关的请求地址参数
        console.log('回调函数：传递值为shcoolId='+shcoolId);
        let params = {
            url: '',
            method: 'GET',
            data: {
                shcoolId
            },
            res: schoolintroduce,
            success: res => {
            console.log("回调成功");
                if (res.errno === 0) {
                    this.setData({
                        ...res.data
                    }, () => {
                        this.setData({
                            loading: false,
                            showPageStatus: false
                        });
                        swan.reportAnalytics('articleshow', {
                            shcoolId: this.data.shcoolId,
                            userId: this.data.authorId
                        });
                        cb && cb();
                    });
                } else {
                    this.setData({
                        loading: false,
                        loadingBtn: false,
                        loadingIcon: 'content',
                        loadingTitle: '服务器开小差，请稍后重试'
                    });
                }
            },
            fail: err => {
                this.setData({
                    loading: false,
                    loadingBtn: true,
                    loadingIcon: 'wifi',
                    loadingTitle: '网络不给力，请稍后重试'
                });
            }
        };
        swan.request.mock ? swan.request.mock(params) : swan.request(params);
    },
     
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
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