var app = getApp()
var util = require('../utils/util.js')
Page({
    data: {
        host: app.globalData.host,
        categorys:'',
        schoolitem:[]
    },
    shcoolthing(e){
    var schoolId=e.currentTarget.dataset.shcoolId;
        swan.navigateTo({
            url: "/pages/schooldt/schooldt?shcoolId="+schoolId,
        });

    },
    getList(typeid,num) {
        return new Promise((resolve, reject) => {
            let that = this;
            swan.request({
                url: app.globalData.api+"action=list",
                data: {
                    typeid:typeid,
                    page: 1,
                    aid: app.globalData.aid
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-appsecret': app.globalData.appsecret
                },
                success: function (res) {
                    let items=[];
                    let list = res.data.data;
                    console.log(list)
                    if(list.length<num){//判断固有列表数量
                        num=list.length
                    }
                    if (res.data.status == 200) {
                        for (let i=0;i<num;i++) {
                            let  articleId=list[i].id;
                            let  typeid=typeid;
                            let time=util.formatTime(list[i].pubdate, 'M-D');
                            let title= list[i].title;
                            let item={
                                articleId:articleId,
                                typeid:typeid,
                                time:time,
                                title:title
                            };
                           items.push(item)
                        }
                        resolve(items)
                    }else{
                        reject(res)
                    };

                },
                fail: function (err) {reject(err)}
            })
        }).catch((err) => {console.log(err)});
    },
    toitem(e){
        let typeid=e.currentTarget.dataset.typeid
        let name=e.currentTarget.dataset.name
        console.log(typeid+'+'+name)
        if(typeid!=''){
            swan.navigateTo({
                url:'../item/item?typeid='+typeid+'&list_type='+typeid+'&name='+ name
            })
        }

    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        new Promise((resolve,reject)=>{
            let  categorys=swan.getStorageSync('categorys');//加载缓存
            resolve(categorys)
        }).then((res)=>{//异步读取栏目缓存，
            console.log(res)
            console.log('res')
            let school1=[];
            for(let i in res ){
                if(res[i].topid == '78'&&res[i].reid=='78' ){
                    res[i].description=res[i].description.substring(0,36)
                    school1.push(res[i])
                }
            }
            this.setData({
                categorys:res,//异步读取栏目缓存，
                schoolitem:school1
            });
            console.log(this.data.schoolitem)
        });
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