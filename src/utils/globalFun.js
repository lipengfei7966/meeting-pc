import Vue from 'vue'
// request asxios
import api from "@/assets/js/request";
import router from '@/router'
import {
    formatDate
} from '@/utils/common'

window.$router = router;

window.$api = api;

Vue.prototype.$api = api;

// 全局LOADING 方法
window.$loading = (type) => {
    if (type) {
        document.querySelector(".loading").style.display = "flex"
    } else {
        document.querySelector(".loading").style.display = "none"
    }
}

// 全局消息弹框
window.$MessageBox = (msg, type, key, title, callback) => {
    if (key == undefined) {
        window.$message[type](msg);
    } else {}
}

Vue.filter("date", value => {
    return formatDate("YYYY年mm月dd日 HH:MM:SS", new Date(value * 1000));
})
Vue.filter("date_ex", value => {
    return formatDate("YYYY年mm月dd日 HH:MM:SS", new Date(value));
})
Vue.filter("date_day", value => {
    return formatDate("YYYY-mm-dd", new Date(value));
})
Vue.filter("date_day_ex", value => {
    return formatDate("YYYY年mm月dd日", new Date(value));
})
Vue.filter("date_time", value => {
    var temp = formatDate("YYYY-mm-dd", new Date());
    return formatDate("HH:mm", new Date(temp +' '+ value));
})
Vue.filter("state", value => {
    let state = ''
    switch (value) {
        case -1:
            state = '禁用'
            break;
        case 0:
            state = '待审批'
            break;
        case 1:
            state = '通过'
            break;
        case 2:
            state = '未通过'
    }
    return state
})

//判断是否是图片 - strFilter必须是小写列举
String.prototype.IsPicture = function () {
    var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|"
    if (this.indexOf(".") > -1) {
        var p = this.lastIndexOf(".");
        var strPostfix = this.substring(p, this.length) + '|';
        strPostfix = strPostfix.toLowerCase();
        if (strFilter.indexOf(strPostfix) > -1) {
            return true;
        }
    }
    return false;
}