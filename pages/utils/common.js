var app = getApp();
/*
** 列出栏目
** catid为0表示调用全部一级栏目
** catid默认为0
*/
function getmenu(catid) {
    var topcat = swan.getStorageSync('topcat')//调用栏目缓存
    var menulist = [];
    var catid = catid || 0;
    for (var i in topcat) {
        if (topcat[i].parentid == catid && topcat[i].ismenu == 1) {
            menulist.push(topcat[i]);
        }
    }

    return menulist.sort(sortAsc);
}

function sortAsc(a, b) {
    return (a.listorder > b.listorder) ? 1 : -1
}

function sortDesc(a, b) {
    return (a.listorder < b.listorder) ? 1 : -1
}

function callphone(e) {
    swan.makePhoneCall({
        phoneNumber: app.globalData.system.phone
    })
}

function openmap(e) {
    var i = this;
    swan.openLocation({
        longitude: 113.631449,
        latitude: 34.761739,
        scale: 18,
        name: app.globalData.appname,
        address: app.globalData.system.address
    });
}
/*
** 获取当前栏目的子栏目或者兄弟栏目
** isself 是否显示自身 默认不显示
*/
function get_catlist(catid,isself=0) {
    var catlist = [];
    var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
    if (CATEGORYS[catid]['parentid'] == 0) {
        if (CATEGORYS[catid]['child'] == 1) {
            var arrchildid = CATEGORYS[catid]['arrchildid'].split(',');
            var j = 0;
            for (var i = 0; i < arrchildid.length; i++) {
				if(isself){
					if (parseInt(CATEGORYS[arrchildid[i]]['ismenu']) && parseInt(CATEGORYS[arrchildid[i]]['type']) != 2 && (CATEGORYS[arrchildid[i]]['parentid'] == catid || CATEGORYS[arrchildid[i]]['catid'] == catid)) {
						catlist[j] = CATEGORYS[arrchildid[i]];
						j++;
					}
				}else{
					if (catid != arrchildid[i] && parseInt(CATEGORYS[arrchildid[i]]['ismenu']) && parseInt(CATEGORYS[arrchildid[i]]['type']) != 2 && CATEGORYS[arrchildid[i]]['parentid'] == catid) {
						catlist[j] = CATEGORYS[arrchildid[i]];
						j++;
					}
				}
            }
        } else {
            catlist[0] = CATEGORYS[catid];//既无父栏目也无子栏目
        }
        // curcatid = catlist['0']['catid'];//当前栏目
    } else {
        var parentid = CATEGORYS[catid]['parentid'];
        var catlistid = CATEGORYS[parentid]['arrchildid'].split(',');
        //curcatid = catid;//当前栏目
        var j = 0;
        for (var i = 0; i < catlistid.length; i++) {
			let tmpid = catlistid[i];
			if(isself){
				if (parseInt(CATEGORYS[tmpid]['ismenu']) && parseInt(CATEGORYS[tmpid]['type']) != 2 && CATEGORYS[tmpid]['parentid'] == parentid) {
					catlist[j] = CATEGORYS[catlistid[i]];
					j++;
				}
			}else{
				if (parseInt(CATEGORYS[tmpid]['ismenu']) && parseInt(CATEGORYS[tmpid]['type']) != 2 && (parentid != tmpid || CATEGORYS[tmpid]['parentid'] == parentid)) {
					catlist[j] = CATEGORYS[catlistid[i]];
					j++;
				}
			}
        }
    }
    return catlist;
}

function get_curcatid(catid, catlist) {
    var curcatid;
    var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
    if (CATEGORYS[catid]['parentid'] == 0) {
        curcatid = catlist['0']['catid']
    } else {
        curcatid = catid;
    }
    return curcatid;
}
/*
** 获取栏目的子栏目
** isself 是否显示自身 默认不显示
** 是否显示全部子栏目默认只显示一级子栏目
*/
function get_childid(catid, isself = 0,isall = 0){
	var catlist = [];
    var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
	var catlistid = CATEGORYS[catid]['arrchildid'].split(',');
	var j = 0;
	for (var i = 0; i < catlistid.length; i++) {
		let tmpid = catlistid[i];
		if(isself){
			if (parseInt(CATEGORYS[tmpid]['ismenu']) && parseInt(CATEGORYS[tmpid]['type']) != 2 && CATEGORYS[tmpid]['parentid'] == catid) {
				catlist[j] = CATEGORYS[catlistid[i]];
				j++;
			}
		}else{
			if (parseInt(CATEGORYS[tmpid]['ismenu']) && parseInt(CATEGORYS[tmpid]['type']) != 2 && (catid != tmpid || CATEGORYS[tmpid]['parentid'] == catid)) {
				catlist[j] = CATEGORYS[catlistid[i]];
				j++;
			}
		}
	}
	return catlist;
}
/*
** 获取栏目的兄弟栏目
** isself 是否显示自身 默认不显示
*/
function get_bortherid(catid, isself = 0){
	var catlist = [];
    var CATEGORYS = swan.getStorageSync('categorys')//调用栏目缓存
	var parentid = CATEGORYS[catid]['parentid'];
	var catlistid = CATEGORYS[parentid]['arrchildid'].split(',');
	var j = 0;
	for (var i = 0; i < catlistid.length; i++) {
		let tmpid = catlistid[i];
		if(isself){
			if(CATEGORYS[tmpid]['parentid'] == parentid){
				catlist[j] = CATEGORYS[tmpid];
				j++;
			}
		}else{
			if(CATEGORYS[tmpid]['parentid'] == parentid && CATEGORYS[tmpid]['catid'] != catid){
				catlist[j] = CATEGORYS[tmpid];
				j++;
			}
		}
	}
	return catlist;
}

module.exports = {
    getmenu: getmenu,
    callphone: callphone,
    openmap: openmap,
    get_catlist: get_catlist,
    get_curcatid: get_curcatid,
	get_childid:get_childid,
	get_bortherid:get_bortherid
} 