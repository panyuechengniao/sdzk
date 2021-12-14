var app = getApp();
var util = require('../utils/util.js');
var bdParse = require('../../bdParse/bdParse.js');
Page({
/* eslint-enable */
// 测试
    data: {
        description:'',
        articleId: '', // 文章唯一标志
        typeid:'',//栏目id
        title: '', // 文章标题
        avator: 'https://b.bdstatic.com/miniapp/images/page_detail_4.png', // 作者头像地址
        author: '', // 作者名
        authorId: '', // 作者的用户唯一标志
        date: '', // 发表日期
        btnLoading: false, // 按钮加载态
        showFollowBtn: false, // 是否显示关注按钮
        isFollow: false, // 是否关注
        content: [], // 文章正文
        imgList: [], // 文章内图片列表
        showTopBtn: false, // 是否显示回到顶部按钮
        showPageStatus: true, // 是否显示页面状态
        loading: true, // 是否加载中
        loadingBtn: false, // 是否显示重新加载按钮
        loadingTitle: '网络不给力，请稍后重试', // 页面状态提示文案
        loadingIcon: 'content', // 页面状态图标 content/wifi
        yPosition: 0,
        headerHeight: 0,
        scrollTop: 0,
        isrelations: '',
        relations: '',
        pictureurls: '',
        pre: '',
        next: '',
    },
    onLoad(options) {

        this.setData({
            articleId:options.articleId,
            typeid:options.typeid
        });
        this.getInfo()
    },
     /**
     * 加载数据
     */
    getInfo() {
        var that = this;
        var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存

        swan.request({
            url: app.globalData.api + "action=show",
            data: {
                catid: that.data.typeid,
                id: that.data.articleId,
                relation: 1,//开启调用相关推荐
                aid: app.globalData.aid
            },
            method: 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-appsecret': app.globalData.appsecret
            },
            success: function (res) {

                let content = res.data.data;

                let isrelations = 0;
                if (content.relations != '') {
                    isrelations = 1;
                    for (var i in content.relations) {
                        content.relations[i].inputtime = util.formatTime(content.relations[i].inputtime, 'Y-M-D');
                    }
                }
                //判断是否有组图自动判断
                if (content.thumb) {
                    content.pictureurls = content.thumb
                }
                content: bdParse.bdParse('article', 'html', content.body, that, 10);

                // let bodys=content.body.replace(/&ldquo;/g,"\"").replace(/&rdquo;/g,"\"");
                that.setData({
                    showFollowBtn: true,
                    loading: false,
                    showPageStatus: false,
                    author:content.writer,
                    content:content.content,
                    keywords: content.keywords,
                    description: content.description,
                    date: util.formatTime(content.inputtime, 'Y-M-D h:m:s'),
                    title: content.title,
                    isrelations: isrelations,
                    relations: content.relations,
                    pictureurls: content.thumb,
                    pre: content.previous,
                    next: content.next,
                })
                swan.setPageInfo({
                    title: content.arctitle,
                    keywords:content.keywords,
                    description: content.description,
                    releaseDate: util.formatTime(content.inputtime, 'Y-M-D h:m:s'),
                    articleTitle: content.arctitle,
                    image:content.pictureurls,
                    success: function () {
                        console.log('setPageInfo success');
                    },
                    fail: function (err) {
                        console.log('setPageInfo fail', err);
                    }
                });
                swan.setNavigationBarTitle({//设置顶部名称
                    title: content.arctitle
                })
            },
            fail: err => {
                this.setData({
                    loading: false,
                    loadingBtn: true,
                    loadingIcon: 'wifi',
                    loadingTitle: '网络不给力，请稍后重试'
                    });
                    console.log(err)
            }
        })
    },
    reloadPage() {
        this.setData({
            loading: true,
            showPageStatus: true
        });
        this.onLoad({articleId: this.data.articleId});
    },
    showTopBtn() {
        this.setData({
            showTopBtn: true
        });
    },
    hideTopBtn() {
        this.setData({
            showTopBtn: false
        });
    },
    tapimg(e) {
        this.previewImage(e);
    },
    longtapimg(e) {
        swan.showActionSheet({
            itemList: ['查看图片', '保存到相册'],
            itemColor: '#000',
            success: res => {
                switch (res.tapIndex + 1) {
                    case 1:
                        this.previewImage(e);
                        break;
                    case 2:
                        this.saveImage(e);
                        break;
                }
            }
        });
    },
    previewImage(e) {
        swan.reportAnalytics('tapimg', {
            articleId: this.data.articleId,
            userId: this.data.authorId,
            img: e.target.dataset.src
        });
        swan.previewImage({
            current: e.target.dataset.src,
            urls: this.data.imgList
        });
    },
    saveImage(e) {
        swan.showLoading({
            title: '正在加载...'
        });
        swan.downloadFile({
            url: e.target.dataset.src,
            success: res => {
                let filePath = res.tempFilePath;
                swan.saveImageToPhotosAlbum({
                    filePath,
                    success: res => {
                        swan.reportAnalytics('saveimg', {
                            articleId: this.data.articleId,
                            userId: this.data.authorId,
                            img: e.target.dataset.src
                        });
                        swan.hideLoading();
                    },
                    fail: err => {
                        swan.hideLoading();
                    }
                });
            },
            fail: err => {
                swan.hideLoading();
            }
        });
    },
    touchstart(e) {
        this.setData({
            yPosition: e.touches[0].clientY
        });

    },
    onPageScroll() {
        const query = swan.createSelectorQuery().in(this);
        query.select('.content-container').boundingClientRect();
        query.exec(info => {
            if (this.data.headerHeight - info[0].top < 10) {
                this.hideTopBtn();
            }
        });
    },
    scrollPage(e) {
            const yPosition = this.data.yPosition;
            const currentPosition = e.changedTouches[0].clientY;
            this.setData({
                yPosition: currentPosition
            });
            const query = swan.createSelectorQuery().in(this);
            query.select('.content-container').boundingClientRect();
            query.exec(info => {
                if (currentPosition > yPosition && info[0].top < this.data.headerHeight) {
                    this.showTopBtn();
                    debounce(() => {
                        this.hideTopBtn();
                    }, 2000)();
                } else if (yPosition - currentPosition > 10) {
                    this.hideTopBtn();
                }
            });
        },
    backToTop() {
        swan.pageScrollTo({
            scrollTop: 0,
        });
        this.hideTopBtn();
    },
    openShare() {
        let that = this;
        swan.openShare({
            title: that.data.title,
            desc: that.data.desc,
            path: '/pages/content/content?articleId=' + that.data.articleId + '&typeid=' + that.data.typeid,
            success: res => {
                swan.showToast({
                    title: '分享成功',
                    icon: 'none'
                });
                console.log('openShare success', res);
            },
            fail: err => {
                console.log('openShare fail', err);
            }
        });
    },
    // tarbar跳转
    switchTab() {
        swan.switchTab({
            url: '/pages/index/index',
            success: res => {
                console.log('switchTab success');
            },
            fail: err => {
                console.log('switchTab fail', err);
            }
        })
    },
    switchTab() {
        swan.switchTab({
            url: '/pages/baokao/baokao',
            success: res => {
                console.log('switchTab success');
            },
            fail: err => {
                console.log('switchTab fail', err);
            }
        })
    },
    //右上角转发
    onShareAppMessage: function () {
        var that = this
        return {
            title: that.data.title,
            desc: that.data.desc,
            path: '/pages/show/show?id=' + that.data.id + '&typeid=' + that.data.typeid
        }
    },
    //关注小程序
    tapfollow(){
        swan.showFavoriteGuide({
            type: 'tip',
            content: '关注小程序，下次使用更便捷。'
        })
    },
    //下一页
    nextpage(e){

        let articleId = e.currentTarget.dataset.articleId;
        let typeid = e.currentTarget.dataset.typeid;
        if (articleId != 0) {
            swan.navigateTo({
                url: '/pages/content/content?typeid=' + typeid+'&articleId='+articleId,
            })
        }
    }
});