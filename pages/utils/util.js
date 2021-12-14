//数据转化
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function formatTime(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '<br />': '<br/>' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
}

function removeHTML(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/ /ig, '');//去掉
    str = str.replace(/&nbsp;/ig, ' ');//去掉
    str = str.replace(/&ldquo;/ig, '“');//去掉
    str = str.replace(/&rdquo;/ig, '”');//去掉
    return str;
}

/*
** 获取当前栏目的子栏目或者兄弟栏目
*/
function get_catlist(typeid) {
    var istabbar = 0; //是否为tabbar
    var catlist = [];
    var CATEGORYS = swan.getStorageSync('categorys');//调用栏目缓存
    //自定义数组，格式为 {'catid':栏目id,'url':'页面（为空表示默认url）','listtype':'列表类型(单页面为空)','istabbar':'0'},
    var diylist = [
        {'catid':3,'url':'/pages/service/service','listtype':'3','istabbar':1}//列表且为tabbar页面
    ];
    for (var i in CATEGORYS) {
        if (CATEGORYS[i].parentid ==typeid  && CATEGORYS[i].ismenu == 1) {
            catlist.push(CATEGORYS[i]);
        }
    }
    if(catlist){
       for (var i in CATEGORYS) {
        var tmpcatinfo = catlist[i];
        var diy = checkCatid(catlist[i]['catid'],diylist);
        if(diy !== ''){
            tmpcatinfo.istabbar = diy.istabbar;
        }else{
            tmpcatinfo.istabbar = istabbar;
        }
        catlist[i] = tmpcatinfo;
        }
    }
    return catlist;
}
/**
 * 检测栏目是否存在数组之中，并返回对应的typeid
 */
function checkCatid(catid,array){
    if (array.constructor == Array) {
        if (array.length > 0) {
            for (var i in array) {
                if(array[i].catid == catid){
                    return array[i];
                }
            }
        }
    }
    return '';
}
function get_curtypeid(typeid, catlist) {
    var curtypeid;
    var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
    if(CATEGORYS[typeid]['parentid'] == 0){
        curtypeid = catlist[0][catid]
    }else {
        curtypeid = typeid;
    }
    return curtypeid;
}

module.exports = {
    formatTime: formatTime,
    escape2Html: escape2Html,
    removeHTML: removeHTML,
    get_catlist: get_catlist,
    get_curtypeid: get_curtypeid
}