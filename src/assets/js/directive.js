import Vue from 'vue'

function onInput(el, ele, binding, vnode) {
    function handle() {
        
        let val = ele.value
        
        // modifiers为修饰符对象，传入了float，则其float属性为true
        if (binding.modifiers.float) {
            // 清除"数字"和"."以外的字符
            val = val.replace(/[^\d.]/g, '')
            // 清除"数字"和"."以外的字符
            val = val.replace(/[^\d.]/g, '')
            // 只保留第一个, 清除多余的
            val = val.replace(/\.{2,}/g, '.')
            // 第一个字符如果是.号，则补充前缀0
            val = val.replace(/^\./g, '0.')
            if (typeof binding.value !== 'undefined') {
                // 期望保留的最大小数位数
                let pointKeep = 0
                if (typeof binding.value === 'string'|| typeof binding.value === 'number') {
                    pointKeep = parseInt(binding.value)
                }
                if (!isNaN(pointKeep)) {
                    if (!Number.isInteger(pointKeep) || pointKeep < 0) {
                        pointKeep = 0
                    }
                    const str='^(\\d+)\\.(\\d\{' + pointKeep + '}).*$'
                    const reg=new RegExp(str)
                    if (pointKeep === 0) {
                        // 不需要小数点
                        val = val.replace(reg, '$1')
                    } 
                    else {
                        // 通过正则保留小数点后指定的位数
                        val = val.replace(reg, '$1.$2')
                    }
                }
            } 
        }
        else {
            //val = ele.value.replace(/^\.+|[^\d.]/g,'')
            val = val.replace(/[^\d]/g,'')
        }
        
        //多个小数点判断
        if(val.split(".").length -1 > 1)
            val =val.substring(0,val.length -1);
        ele.value = val;
    }
    return handle
   }
   const numberInput= {
    bind(el, binding, vnode) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.addEventListener('input', onInput(el, ele, binding, vnode), false)
    },
   }
Vue.directive('number-input', numberInput)
// 使用方法
//<el-input v-model="model" v-number-input />纯数字
//<el-input v-model="model" v-number-input.float />支持浮点数
//<el-input v-model="model" v-number-input.float="2" />最多支持保留2位小数

