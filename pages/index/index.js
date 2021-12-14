var app = getApp()
var util = require('../utils/util.js')


Page({
    data: {
        categorys:'',
        host: app.globalData.host,
        top_list:'',
		change:1,
		change2:1,
		school:[],
		zhenti:[],
		zhuanye:[
			{name:'行政管理',src:'../../images/zy1.png'},
			{name:'汉语文学',src:'../../images/zy1.png'},
			{name:'学前教育',src:'../../images/zy1.png'},
			{name:'行政管理',src:'../../images/zy1.png'},
			{name:'汉语文学',src:'../../images/zy1.png'},
			{name:'行政管理',src:'../../images/zy1.png'},
			{name:'汉语文学',src:'../../images/zy1.png'},
			{name:'行政管理',src:'../../images/zy1.png'},
			{name:'汉语文学',src:'../../images/zy1.png'},
        ],
        rmbqDt:[//热门标签
			{typeid:1,name:'自考公告'},
			{typeid:5,name:'专升本'},
			{typeid:6,name:'高升专'},
			{typeid:8,name:'历年真题'},
			{typeid:9,name:'复习资料'},
			{typeid:12,name:'自考指南'},
			{typeid:13,name:'自考答疑'},
			{typeid:28,name:'自考资讯'},
			{typeid:4,name:'自考专业'},
        ],
        banner:[
			{articleId:'4108',typeid:'8',thumb:'https://www.govzk.com/uploadfile/2021/1130/1638263339829064.jpg'},
			{articleId:'4379',typeid:'5',thumb:'https://www.govzk.com/uploadfile/2021/1130/1638263021301966.jpg'},
			{articleId:'2695',typeid:'5',thumb:'https://www.govzk.com/uploadfile/2021/1130/1638262744599046.jpg'}
		],
        iconto: [
            { url: "/pages/item/item?typeid=4&name=考务考籍" , src: "/images/1.png", name: "考务考籍" },
            { url: "/pages/item/item?typeid=6&name=报考指南" , src: "/images/2.png", name: "报考指南" },
            { url: "/pages/item/item?typeid=10&name=自考学位", src: "/images/3.png", name: "自考学位" },
            { url: "/pages/item/item?typeid=11&name=自考论文", src: "/images/4.png", name: "自考论文" },
            { url: "/pages/item/item?typeid=12&name=历年真题", src: "/images/5.png", name: "历年真题" },
            { url: "/pages/item/item?typeid=13&name=自考策略", src: "/images/6.png", name: "自考策略" },
            { url: "/pages/item/item?typeid=14&name=自考考研", src: "/images/7.png", name: "自考考研" },
            { url: "/pages/item/item?typeid=51&name=学习方法", src: "/images/8.png", name: "学习方法" }
        ],
		zhaosheng:[],
        cjwtDt:[],
		remenDt:[],
		zkywDate:[],
		ksbmDate:[],
		cjcxDate:[],
        status: 1,
        text: '不超过18个字',
        list: [],
        count: 0,
        showPageStatus: false, // 是否显示页面状态
        loading: true, // 是否加载中
        loadingBtn: false, // 是否显示重新加载按钮
        loadingTitle: '网络不给力，请稍后重试', // 页面状态提示文案
        loadingIcon: 'content',// 页面状态图标 content/wifi
        showTopBtn:false,
         yPosition: 0,
        headerHeight: 0,
        scrollTop: 0
    },
    onLoad() {

        let that=this;
        swan.request({//栏目调取
             url: app.globalData.api + "action=category",
            data: {
                aid: app.globalData.aid
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'x-appsecret': app.globalData.appsecret
            },
            success: function (res) {
                let resDate = res.data[0];

                let CATEGORYS1=[];//top_list数据
                let school1=[];
                for(let i in resDate ){
                    CATEGORYS1.push(resDate[i])
                    if(resDate[i].parentid == '3'){
                        school1.push(resDate[i])
                    }
                }

                let school=[];
                for(let i=0;i<9;i++ ){
                    school.push(school1[i])

                }
                that.setData({
                    top_list:CATEGORYS1,//设置顶部导航列表
                    categorys:res,//异步读取栏目缓存，
                    school:school
                });

            },
            fail: function (error) {
                console.log(error)
            }
        });
        this.getList(28,6).then((res) => {//热门资讯、地市自考
            this.setData({
                remenDt:res
            })
        });
        this.getList(12,'10').then((res) => {//自考指南
            this.setData({
                zhaosheng:res
            })
        });
        this.getList(1,'6').then((res) => {//自考公告
            this.setData({
                zkywDate:res
            })
        });
        this.getList(13,6).then((res) => {//自考答疑
            this.setData({
                ksbmDate:res
            })
        });
        this.getList(9,6).then((res) => {//复习资料
            this.setData({
                cjcxDate:res
            })
        });
        this.getList(13,6).then((res) => {//常见问题
            this.setData({
                cjwtDt:res
            })


        });
        this.getList(3,10).then((res) => {//热门专业
            this.setData({
                zhuanye:res
            })
        });
        this.getList(8,9).then((res) => {//历年真题
            let zhenti=[]
            for(let i=0;i<9;i++){
                res[i].title=res[i].title.substring(0,8)
                zhenti.push(res[i])
            }
            this.setData({
                zhenti:zhenti
            })
        });

   },
   onShow(){

    },
    getList(typeid,num) {
        return new Promise((resolve, reject) => {
            let that = this;
            swan.request({
                url: app.globalData.api+"action=list",
                data: {
                    catid:typeid,
                    num:num,
                    aid: app.globalData.aid
                },
                method: 'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-appsecret': app.globalData.appsecret
                },
                success: function (res) {
                    let items=[];
                    let list = res.data.data.list;


                    if(list.length<num){//判断固有列表数量
                        num=list.length
                    }
                    if (res.data.status == 200) {
                        for (let i=0;i<num;i++) {
                            let  articleId=list[i].id;
                            let  typeids=typeid;
                            let time=util.formatTime(list[i].inputtime, 'M-D');
                            let title= list[i].title;
                            let item={
                                id:articleId,
                                catid:typeids,
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
	tabsOne(e) {
		this.setData({
			change:e.target.dataset.id
		})
	},
	tabsOne2(e) {
		this.setData({
			change2:e.target.dataset.id
		})
    },
    tocontent(e) {

        let articleId=e.currentTarget.dataset.articleId;
        let typeid = e.currentTarget.dataset.typeid;
        swan.navigateTo({
            // 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 ‘path?key=value&key2=value2’。
            url: '/pages/content/content?articleId=' + articleId+'&typeid='+typeid,
            success: res => { },
            fail: res => { },
            complete: res => { }
        });
    },
    bannertap(e){
      var id =  e.currentTarget.dataset.id;
      swan.navigateTo({
          // 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 ‘path?key=value&key2=value2’。
          url: '../content/content?articleId='+id,
      });
    },
    //跳转顶部

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
    toitem(e){
        let typeid=e.currentTarget.dataset.typeid
        let name=e.currentTarget.dataset.name

        if(typeid!=''){
            swan.navigateTo({
                url:'../item/item?typeid='+typeid+'&list_type='+typeid+'&name='+ name
            })
        }

    },
    toschool(){
        swan.switchTab({
            url: '/pages/school/school',
            success: res => {
                console.log('switchTab success');
            },
            fail: err => {
                console.log('switchTab fail', err);
            }
        })
    },
    backToTop() {
        swan.pageScrollTo({
            scrollTop: 0,
        });
        this.hideTopBtn();
    }
})
