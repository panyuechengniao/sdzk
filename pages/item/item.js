var util = require('../utils/util.js');
//var request = require('../utils/request.js');
const app = getApp();
// 测试
Page({ // eslint-disable-line
    data: {
        system:'',
        appname:'',
        page: 1,
        pagesize: 10,//默认10
        curtypeid:'',
        catid:'',
        status: 1,
        text: '不超过18个字',
        list: [],
        showPageStatus: false, // 是否显示页面状态
        loadingBtn: false, // 是否显示重新加载按钮
        Loading: false, //上拉加载
        LoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        loadingTitle: '该栏目下暂时无文章', // 页面状态提示文案
        loadingIcon: 'content'// 页面状态图标 content/wifi
    },
    onLoad(options) {
       let that = this
       that.setData({
        curtypeid:options.typeid,
       });
       var system = swan.getStorageSync('system')
       app.get_sys().then(function(){
           system = swan.getStorageSync('system');
            /*系统配置 */
           that.setData({
               system: system,//调用系统配置
               pagesize: system.pagesize,
               appname:system.seotitle,
           })
       });
       var stypeid =  swan.getStorageSync('stypeid');//通过缓存获取typeid
       var typeid = stypeid ? stypeid : options.typeid;

      that.getList(options);

      swan.setNavigationBarTitle({
        title: options.name + "-" + swan.getStorageSync('system').seotitle
    });

      var system = swan.getStorageSync('system')
      app.get_cat().then(function(){
        var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
        var catlist = util.get_catlist(typeid);//获取子栏目或者兄弟栏目列表
        var curtypeid = util.get_curtypeid(typeid, catlist);//获取高亮栏目

        /*判断栏目结束 */
        that.setData({
            curtypeid: curtypeid,
            list_type: options.list_type,
            catlist: catlist,
            curtypename: CATEGORYS.catname,
            catintoview:'cat_'+typeid
        })
    });
    },
    previewRefresh() {
        console.log('运行了previewRefresh:'+this.data.list.length)
        this.fetchData().then(data =>{
            const {data: list} = data;
            this.setData({
                status: 1,
                list: list || this.data.list,
                text:  '暂时没有更新，休息一下'
            });
            swan.nextTick(() => {
                this.setData({
                    showPageStatus: false,
                    loaded: true
                });
            });
        });
    },
    onShow:function(){

    },
    getList(e) {
        var that = this;
        swan.request({
            url: app.globalData.api+"action=list",
            data: {
                catid: e.typeid,
                num:10,
                aid: app.globalData.aid
            },
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-appsecret': app.globalData.appsecret
            },
            success: function (res) {
                var list = res.data.data.list;
                if (res.data.status == 200 && list!='') {
                    let items=[];
                    for (let i in list) {
                            var theme='default';
                            console.log(list[i]);
                            var articleId=list[i].id;
                            // var time=util.formatTime(list[i].inupttime, 'Y-M-D');
                            var content = {
                                title:list[i].title,
                                infoSource:"江西自考教育",
                                commentsNum:list[i].click,
                                images:[list[i].thumb]
                        }
                        if(content.images && Math.random() > 0.5){
                            theme='large-image';
                       }
                       var item={
                            theme:theme,
                            articleId:articleId,
                            content:content
                       };
                       items.push(item)
                    }

                    if (list.length < that.data.pagesize) {//说明后续已无数据
                        that.setData({
                            status: 1,
                            text:  '暂时没有更新，休息一下'
                        });
                        swan.nextTick(() => {
                            this.setData({
                                showPageStatus: false,
                                loaded: true
                            });
                        });
                    }
                    that.setData({
                        list: items,
                        // Loading: flag,
                        // LoadingComplete: !flag,
                        showPageStatus:false
                    })
                }else if(list==''){
                    console.log('暂时没有文章')
                    that.setData({
                        showPageStatus:true
                    })
                }
            },
        })
    },
    // 加载更多
    getMore() {
        console.log('调用getmore')
        var that = this;
        swan.request({
            url: app.globalData.api+"action=list",
            data: {
                catid: that.data.curtypeid,
                page: that.data.page + 1,
                aid: app.globalData.aid
            },
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-appsecret': app.globalData.appsecret
            },
            success: function (res) {
                var list_more = res.data.data.list;
                console.log('更多数据');
                console.log(res);
                if (list_more.length > 0) {//如果有数据
                    let items=[];
                    for (var i in list_more) {
                        //console.log(list_more[i])
                        let  theme='default';
                        let  articleId=list_more[i].id;
                        //let time=util.formatTime(list_more[i].pubdate, 'Y-M-D');
                        let content = {
                            title:list_more[i].title,
                            infoSource:list_more[i].writer,
                            commentsNum:list_more[i].click,
                            images:list_more[i].thumb
                        }
                        if(content.images && Math.random() > 0.5){
                            theme='large-image';
                       }
                       let item={
                            theme:theme,
                            articleId:articleId,
                            content:content
                       }
                       items.push(item)
                    }
                    if (list_more.length < that.data.pagesize) {//本次提取数据小于页面大小，后续已经没内容
                        swan.nextTick(() => {//更新dom后再执行
                            that.setData({
                                showPageStatus: false,
                                loaded: true
                            });
                        });
                        that.setData({
                            list: that.data.list.concat(items),
                            curtypeid: that.data.curtypeid,
                            page: that.data.page + 1,
                            status: 2,
                            text: '暂时没有更新，休息一下'
                        })
                    } else {//本次提取数据为页面大小，后续可能还有数据
                        that.setData({
                            list: that.data.list.concat(items),
                            curtypeid: that.data.curtypeid,
                            page: that.data.page + 1,
                            status: 1
                        })
                    }
                    swan.showLoading({
                        title: '加载中',
                    })
                    setTimeout(function () {
                        swan.hideLoading()
                    }, 500)
                } else {//已经无数据
                    swan.nextTick(() => {//更新dom后再执行
                        that.setData({
                            showPageStatus: false,
                            loaded: true
                        });
                    });
                    that.setData({
                        list: that.data.list,
                        curtypeid: that.data.curtypeid,
                        page: that.data.page,
                        status:2,
                        text:  '暂时没有更新，休息一下'
                    })
                }
            }
        })
    },
    reload() {//加载失败后点击加载
        if (this.data.status !== 0 && this.data.status !== 3) {
            return;
        }
        this.setData({
            status: 1,
        });
        swan.nextTick(() => {
            this.scrollToLower();
        });
    },
    reloadPage() {
        this.setData({
            loading: true,
            showPageStatus: true
        });
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    scrollToLower() {
        console.log('页面触底了一次')
        //console.log(this.data.loading)
        if (this.data.loading) return false;
        var that = this
        that.getMore();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this
        return {
            title: that.data.curtypename,
            path: '/pages/item/item?typeid=' + that.data.typeid
        }
    },

     tocontent(e) {
        //console.log(e);
        let articleId=e.currentTarget.dataset.articleId;
        let typeid = e.currentTarget.dataset.typeid;
        swan.navigateTo({
            // 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 ‘path?key=value&key2=value2’。
            url: '/pages/content/content?articleId=' + articleId+'&typeid='+typeid,
            // 接口调用成功的回调函数
            success: res => { },
            // 接口调用失败的回调函数
            fail: res => { },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: res => { }
        });
    },

});