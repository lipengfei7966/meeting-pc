/*
 * @Description: 公共函数
 * @Author: Gongjinwei
 * @Date: 2020-03-20 15:36
 * @LastEditors: Gongjinwei
 * @LastEditTime: 2020-03-20 15:36
 */
/* eslint-disable */
import Cookies from "js-cookie";
// import { cookieExpires } from "../config"; // cookie保存的天数
import { Decimal } from 'decimal.js'
import {limitsEffect} from "@/utils/uploadRestrictions.js"
/**
 * @Author: asheng
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY = "token";
export const USER_NUMBER = "userNumber";
export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token, {
		expires: cookieExpires || 1
	});
};

export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY);
	if (token) {
		return token;
	} else {
		return false;
	}
};
export const getUser = () => {
	const userNumber = Cookies.get(USER_NUMBER);
	if (userNumber) {
		return userNumber;
	} else {
		return false;
	}
};
// 删除 token
export const deleteToken = () => {
	Cookies.remove(TOKEN_KEY);
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url) => {
	const keyValueArr = url.split("?")[1].split("&");
	let paramObj = {};
	keyValueArr.forEach((item) => {
		const keyValue = item.split("=");
		paramObj[keyValue[0]] = keyValue[1];
	});
	return paramObj;
};

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
	if (key) {
		return key in obj;
	} else {
		const keysArr = Object.keys(obj);
		return keysArr.length;
	}
};

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt) => {
	let time = "";
	const date = new Date();
	const o = {
		"M+": date.getMonth() + 1, // 月份
		"d+": date.getDate(), // 日
		"H+": date.getHours(), // 小时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		time = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	for (const k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			time = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
		}
	}
	return time;
};

/**
 * @msg: 格式化时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (fmt, date) => {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

export const getNextDate = (date, day) => {
	let dd = new Date(date);
	let now = new Date();
	dd.setDate(dd.getDate() + day);
	let nowDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
	let y = dd.getFullYear();
	let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
	let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
	let aimDate = y + "-" + m + "-" + d;
	let a = new Date(nowDate).getTime(); // 当前时间
	let b = new Date(aimDate).getTime(); // 目的时间
	// return b >= a ? aimDate : ''
	return y + "-" + m + "-" + d;
};

export const getNextDateFormat = (date, day) => { //年月日时分秒
	let dd=new Date(date);
	let now = new Date();
	dd.setDate(dd.getDate() + day);
	let nowDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
	let y = dd.getFullYear();
	let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
	let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
	let h = dd.getHours();
	let mi = dd.getMinutes();
	let s = dd.getSeconds();
	let aimDate = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
	return aimDate 
	// return y + "-" + m + "-" + d;
};

export const getFormatDate = (timestamp) => { 
	var date = new Date(parseInt(timestamp.replace("/Date(", "").replace(")/", ""),10));
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()    + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	var NewDtime = Y + M + D + h + m + s;
	return NewDtime 
	// return y + "-" + m + "-" + d;
};

//获取两个时间之间的日期 并格式化
export const getBetweenDate = (day1, day2) => {
	if (day1 == day2) {
		return [day1]
	} else {
		var dateArr = new Array();
		var getDate = function(str) {
			var tempDate = new Date();
			var list = str.split("-");
			// 为解决setMonth的顺延问题，同时设置年月日
			tempDate.setFullYear(list[0], list[1] - 1,list[2] );
			// 分开设置年月日会出现setMonth的顺延问题
			// tempDate.setMonth(list[1] - 1);
			// tempDate.setDate(list[2]);
			return tempDate;
		}
		var date1 = getDate(day1);
		var date2 = getDate(day2);
		if (date1 > date2) {
			var tempDate = date1;
			date1 = date2;
			date2 = tempDate;
		}
		date1.setDate(date1.getDate() + 1);
		var dateArr = [];
		var i = 0;
		while (!(date1.getFullYear() == date2.getFullYear() &&
				date1.getMonth() == date2.getMonth() && date1.getDate() == date2
				.getDate())) {
			var dayStr = date1.getDate().toString();
			if (dayStr.length == 1) {
				dayStr = "0" + dayStr;
			}
			var monthStr = (date1.getMonth() + 1).toString();
			if (monthStr.length == 1) {
				monthStr = "0" + monthStr;
			}
			dateArr[i] = date1.getFullYear() + '-' + monthStr + "-" + dayStr;
			i++;
			date1.setDate(date1.getDate() + 1);
		}
		let currentDate = formatDate('YY-mm-dd', new Date(day2));
		dateArr.push(currentDate);
		dateArr = [day1, ...dateArr];
		return dateArr;
	}
};

//获取两个时间之间的日期 并格式化
export const getBetween = (day1, day2) => {
	var dateArr = new Array();
	var getDate = function(str) {
		var tempDate = new Date();
		var list = str.split("-");
		tempDate.setFullYear(list[0]);
		tempDate.setMonth(list[1] - 1);
		tempDate.setDate(list[2]);
		return tempDate;
	}
	var date1 = getDate(day1);
	var date2 = getDate(day2);
	if (date1 > date2) {
		var tempDate = date1;
		date1 = date2;
		date2 = tempDate;
	}
	date1.setDate(date1.getDate() + 1);
	var dateArr = [];
	var i = 0;
	while (!(date1.getFullYear() == date2.getFullYear() &&
			date1.getMonth() == date2.getMonth() && date1.getDate() == date2
			.getDate())) {
		var dayStr = date1.getDate().toString();
		if (dayStr.length == 1) {
			dayStr = "0" + dayStr;
		}
		dateArr[i] = (date1.getMonth() + 1) + "-" + dayStr;
		i++;
		date1.setDate(date1.getDate() + 1);
	}
	let currentDate = formatDate('mm-dd', new Date(day1));
	dateArr.push(currentDate)
	return dateArr;
}
export const CompareDate=(d1,d2)=>{//前者大于或等于后者为true，比较日期大小 日期格式YYYY-mm-dd HH:MM:SS
  return ((new Date(d1.replace(/-/g,"\/"))) >= (new Date(d2.replace(/-/g,"\/"))));
}
// 时间计算
export const dateCalculation = (date, day, type) => {
	let dataCur = date;
	dataCur = dataCur.getFullYear() + '-' + (dataCur.getMonth() + 1) + '-' + dataCur.getDate() + " 00:00:00";
	let dataCurPar = Date.parse(new Date(dataCur)) / 1000; //转换为时间戳
	type == 'add' ? dataCurPar += 86400 * day : dataCurPar -= 86400 * day; //加5天后的时间戳
	let dataDefPar = new Date(parseInt(dataCurPar) * 1000); //转换为时间
	return dataDefPar
}

// 截取字符串
export const sliceStr = (str, sliceLen) => {
	if (!str) {
		return "";
	}
	let realLength = 0;
	const len = str.length;
	let charCode = -1;
	for (let i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) {
			realLength += 1;
		} else {
			realLength += 2;
		}
		if (realLength > sliceLen) {
			return `${str.slice(0, i)}...`;
		}
	}

	return str;
};

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj) {
	let buf;
	if (jsonObj instanceof Array) {
		buf = [];
		let i = jsonObj.length;
		while (i--) {
			buf[i] = objClone(jsonObj[i]);
		}
		return buf;
	} else if (jsonObj instanceof Object) {
		buf = {};
		for (let k in jsonObj) {
			buf[k] = objClone(jsonObj[k]);
		}
		return buf;
	} else {
		return jsonObj;
	}
}


export const formatNum = (item, type) => { //数量、金额
	let temp;
	temp = item.toString();
	if (type == 1) { //type=1 整数
		temp = temp.replace(/\D/g, '');
	} else if(type == 2) { //非法金额限制
		temp = temp.replace(/([^0-9.])|((?<=\d+\.\d{6})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g, '');
	}else if(type == 3) {
		// 正整数 负数 0
		// temp = temp.replace(/[^\-?\d]/g, '');
		temp = temp.replace(/([^\-?\0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g, '');
	} else { //非法金额限制
		temp = temp.replace(/([^0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g, '');
	}
	return temp;
}


// 截取字符串
export const positiveInteger = (val) => {
	let integer = 0;
	if (val === "") {
		return integer;
	}
	let valstr = val + "";
	valstr = valstr.replace(/[^\d]/g, '');

	integer = Number(valstr);
	return integer;
};

// 保留两位小数，四舍五入
export const keepDecimals = (val) => {
	let num = (Math.round((val + Number.EPSILON) * 1000) / 1000).toString();

	let last = parseInt(num.charAt(num.length -1));
	let lastbefore = parseInt(num.charAt(num.length -2));
	if(last >= 5) {
		lastbefore = lastbefore + 1;
		return  num.slice(0,num.length-2) + lastbefore;
	}else {
		return parseFloat(num).toFixed(2);
	}
}

// 截取字符串四舍五入
export const positiveFloat = (val, fix2) => {
	let float = 0.00;
	if (val == "" || val == 0 || val == undefined || isNaN(val)) return float;
	// let valstr =  (val + "");
	let valstr = new Decimal(val);
	
	// valstr = valstr.replace(/^\.+|[^\d.{2,}]|$/g, '');
	// //多个小数点判断
	// if (valstr.split(".").length - 1 > 1) {
	//  valstr = valstr.substring(0, val.length - 1);
	// }
	// const str = '^(\\d+)\\.(\\d\{2}).*$'
	// const reg = new RegExp(str)
	// valstr = valstr.replace(reg, '$1.$2')
	// float = Number.parseFloat(valstr);
	
	valstr = Math.round(valstr.mul(new Decimal(100))) / 100
	if(fix2) {
	 return Number(valstr.toFixed(2));
	}else {
	 return Number(valstr.toFixed(2));
	}
	
 };

 // 截取字符串四舍五入 -- 保留一位小数
export const positiveFloatOne = (val) => {
	let float = 0.0;
	if (val === "") return float;
	let str = (val + "");
	// let str = new Decimal(val);
	var len1 = str.substr(0, 1);
      var len2 = str.substr(1, 1);
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1);
      }
      //第一位不能是.
      if (len1 == ".") {
        str = "";
      }
      //限制只能输入一个小数点
			if (str.indexOf(".") != -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") != -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换，保留数字和小数点
      str = str.match(/^\d*(\.?\d{0,1})/g)[0] || null;
      // this.dataForm[prop] = str;
	// valstr = Math.round(valstr.mul(10)) / 10
	return str;
};

// 截取字符串四舍五入
export const positiveFloatSix = (val) => {
	let float = 0.000000;
	if (val === "") return float;
	let valstr = (val + "");
	
	// valstr = valstr.replace(/^\.+|[^\d.{2,}]|$/g, '');
	// //多个小数点判断
	// if (valstr.split(".").length - 1 > 1) {
	// 	valstr = valstr.substring(0, val.length - 1);
	// }
	// const str = '^(\\d+)\\.(\\d\{2}).*$'
	// const reg = new RegExp(str)
	// valstr = valstr.replace(reg, '$1.$2')
	// float = Number.parseFloat(valstr);
	
	valstr = Math.round(valstr * 1000000) / 1000000
	return valstr;
};

// 截取字符串 
export const positiveFloatZero = (val) => {
	let float = 0.00;
	if (val === "") return float;
	let valstr = (val + "");
	return parseFloat(valstr);
};

const S4 = function() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
export function guid() {
	return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
// 上传文件限制文件大小
export const fileLimit = (file) => {
	const isLt30M = file.size / 1024 / 1024 < 30;
	if (!isLt30M) {
		this.$message.error('上传附件大小不能超过 30MB!');
		return false;
	}
		return limitsEffect(file) 
}