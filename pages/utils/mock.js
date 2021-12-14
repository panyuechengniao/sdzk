/**
 * @file utils/common.js
 * @author jingxiangzheng(jingxiangzheng@baidu.com)
 * @desc 常量数据
 */
export const articleInfo = {
    errno: 0,
    msg: 'success',
    data: {
        articleId: 'xxxxxx',
        title: '关于2019年广西成人高考未录取考生通知',
        avator: 'https://b.bdstatic.com/miniapp/images/page_detail_4.png',
        author: '盘月',
        authorId: 'xxxxxx',
        date: '3-19 20:00',
        isFollow: false,
        content: [{
            type: 'quote',
            content: 'quote字段的内容，测试显示，测试效果'
        }, {
            type: 'title',
            content: '广西成考小标题1'
        }, {
            type: 'p',
            content: '广西成考网学习中心为宣传与普及我市成人教育，对于2019年成考未录取考生推出以下两种途径再次进行学历提升'
        }, {
            type: 'img',
            content: 'https://b.bdstatic.com/miniapp/images/page_detail_3.jpg'
        }, {
            type: 'p',
            content: '方案一、现在考生可转报考2020年广西成人高考，报名费100元，提前预报名网上开课复习，详情可咨询广西成考网学习中心老师。'
        }, {
            type: 'title',
            content: '广西成考小标题2'
        }, {
            type: 'p',
            content: '方案二、报考国家开放大学、网络教育，报考院校不同报考费用有所不同。考生现在报名即可2020年3月份入学，先入学后考试，可与本届成考生同时入学与毕业。考生毕业后可申请学士学位证。点击进入'
        }, {
            type: 'img',
            content: 'https://b.bdstatic.com/miniapp/images/page_detail_1.jpg'
        }, {
            type: 'p',
            content: '更多信息，关注公众号'
        }]
    }
};
export const followInfo = {
    errno: 0,
    msg: 'success'
};
export const feedList =  [{
    theme: 'default',
    articleId:'47001',
    content: {
        title: '关于2019年广西成人高考未录取考生通知',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo1.jpg']
    }
}, {
    theme: 'default',
    articleId:'47002',
    content: {
        title: '报考广西成人教育到底值不值?',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo2.jpg']
    },
    video: {
        isVideo: true,
        time: '05:20'
    }
}, {
    theme: 'multiple-images',
    articleId:'47003',
    content: {
        title: '2020年广西成人函授专升本报考条件有那些?',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: [
            '/images/demo3.jpg',
            '/images/demo4.jpg',
            '/images/demo2.jpg']
    }
}, {
    theme: 'large-image',
    articleId:'47004',
    content: {
        title: ' 2020年河池学院成人高考报考条件有那些?',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: ['/images/demo6.jpg']
    }
}, {
    theme: 'large-image',
    articleId:'47005',
    content: {
        title: '广西医科大学成考招生专业有那些?',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: ['/images/demo7.jpg']
    },
    video: {
        isVideo: true,
        time: '05:20'
    }
}, {
    theme: 'default',
    articleId:'47006',
    content: {
        title: '2020年广西科技大学成人高考报名进行中',
        infoSource: '广西成考',
        commentsNum: '18.3万'
    }
}, {
    theme: 'default',
    articleId:'47007',
    content: {
        title: '2020年百色学院函授招生专业有那些?',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo1.jpg']
    }
}, {
    theme: 'default',
    articleId:'47008',
    content: {
        title: '桂林旅游学院成人高考报名注意事项',
        infoSource: '广西成考',
        commentsNum: '18.3万'
    }
}, {
    theme: 'large-image',
    articleId:'47009',
    content: {
        title: '2020年广西成人高考报名时间早知道',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: ['/images/demo7.jpg']
    },
    video: {
        isVideo: true,
        time: '05:20'
    }
}, {
    theme: 'default',
    articleId:'47010',
    content: {
        title: '2020年广西函授医学类专业报考条件',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo1.jpg']
    }
}, {
    theme: 'default',
      articleId:'47011',
    content: {
        title: '2020年广西成人函授大专学费是多少?',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo1.jpg']
    }
}, {
    theme: 'default',
      articleId:'47012',
    content: {
        title: '广西成人函授专升本报名时间及网址',
        infoSource: '广西成考',
        commentsNum: 183,
        images: ['/images/demo2.jpg']
    },
    video: {
        isVideo: true,
        time: '05:20'
    }
}, {
    theme: 'large-image',
      articleId:'47013',
    content: {
        title: '2020年桂林航天工业学院函授报考条件',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: ['/images/demo6.jpg']
    }
}, {
    theme: 'large-image',
      articleId:'47014',
    content: {
        title: '右江民族医学院函授本科报名时间',
        infoSource: '广西成考',
        commentsNum: '18.3万',
        images: ['/images/demo7.jpg']
    },
    video: {
        isVideo: true,
        time: '05:20'
    }
}];