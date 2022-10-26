import Vue from 'vue'
import { Decimal } from 'decimal.js'
import moment from 'moment'

const toolUtil = {
  isEmptyObject(obj) {
    var name
    for (name in obj) {
      return false
    }
    return true
  },
  toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
  },
  toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase()
    })
  },
  // 设置日期选项
  getPickerOptions() {
    return {
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: '当天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '上一周',
          onClick(picker) {
            const millisecond = 1000 * 60 * 60 * 24 // 一天的毫秒数
            const currentDate = new Date()

            // 返回date是一周中的某一天
            var week = currentDate.getDay()
            // 减去的天数
            var minusDay = week !== 0 ? week - 1 : 6
            // 获得当前周的第一天
            var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay))
            // 上周最后一天即本周开始的前一天
            var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
            // 上周的第一天
            var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6))

            picker.$emit('pick', [priorWeekFirstDay, priorWeekLastDay])
          }
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '上一个月',
          onClick(picker) {
            const millisecond = 1000 * 60 * 60 * 24 // 一天的毫秒数
            const currentDate = new Date()
            // 获得当前月份0-11
            var currentMonth = currentDate.getMonth()
            // 获得当前年份4位年
            var currentYear = currentDate.getFullYear()
            var currentDay = new Date(currentYear, currentMonth, 1)
            // 上个月的第一天
            // 年份为0代表,是本年的第一月,所以不能减
            if (currentMonth === 0) {
              currentMonth = 11 // 月份为上年的最后月份
              currentYear-- // 年份减1
            } else {
              currentMonth--
            }
            var firstDay = new Date(currentYear, currentMonth, 1)
            // 求出上月的最后一天
            var lastDay = new Date(currentDay.getTime() - millisecond)

            picker.$emit('pick', [firstDay, lastDay])
          }
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
      ]
    }
  },
  getDefaultPickerOptions() {
    return {
      shortcuts: [
        {
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        },
        {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        },
        {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }
      ]
    }
  },

  getDefaultMonthPickerOptions() {
    return {
      shortcuts: [{
        text: '本月',
        onClick(picker) {
          picker.$emit('pick', [new Date(), new Date()])
        }
      }, {
        text: '今年至今',
        onClick(picker) {
          const end = new Date()
          const start = new Date(new Date().getFullYear(), 0)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近六个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setMonth(start.getMonth() - 6)
          picker.$emit('pick', [start, end])
        }
      }]
    }
  },
  dataFormat(func = 'dataDictFormat', value, list) {
    return Vue.filter(func)(value, list)
  },
  // 最近一周
  getLatestWeektime() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    return [moment(start).format('YYYY-MM-DD HH:mm:ss'), moment(end).format('YYYY-MM-DD HH:mm:ss')]
  },
  // 最近一周
  getLatestWeektimeForBegin() {
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    return [moment(start).format('YYYY-MM-DD HH:mm:ss')]
  },
  // 最近一周
  getLatestWeek() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    return [this.dateFormateToYYYYMMDD(start), this.dateFormateToYYYYMMDD(end)]
  },

  // 最近一个月
  getLatestMonth() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    return [this.dateFormateToYYYYMMDD(start), this.dateFormateToYYYYMMDD(end)]
  },
  // 最近三个月（日期）
  getLatestThreeMonth() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    return [this.dateFormateToYYYYMMDD(start), this.dateFormateToYYYYMMDD(end)]
  },

  // 最近三个月(月分)
  getLatestThreeMonthForMonth() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    return [this.dateFormateToYYYYMM(start), this.dateFormateToYYYYMM(end)]
  },
  getScopeThreeMonth() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 45)
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 45)
    return [this.dateFormateToYYYYMMDD(start), this.dateFormateToYYYYMMDD(end)]
  },
  getDayAfter(addDayCount) {
    var dd = new Date()
    dd.setDate(dd.getDate() + addDayCount) // 获取AddDayCount天后的日期
    var y = dd.getFullYear()
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return y + '' + m + '' + d
  },
  formatDate(value) {
    if (value === null || value === undefined) {
      return ''
    }
    if (value.length === 8) {
      return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
    }
    return value
  },
  // 时间格式化
  dateFormateToYYYYMMDD(value) {
    return value.getFullYear() + '' + (value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1 + '') + (value.getDate() < 10 ? '0' + value.getDate() : value.getDate() + '')
  },
  dateFormateToYYYYMM(value) {
    return value.getFullYear() + '' + (value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1 + '') + '01'
  },
  /**
   * 取得当前日期(yyyyMMdd)
   */
  todayYYYYMMDD() {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    return (y * 10000 + m * 100 + d).toString()
  },
  /**
   * 取得当前日期(yyyy-MM-dd)
   */
  todayStr() {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    return y + (m < 10 ? '-0' : '-') + m + (d < 10 ? '-0' : '-') + d
  },

  /**
   * 取得当前时间
   */
  timeStr() {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    const h = now.getHours()
    const n = now.getMinutes()
    const s = now.getSeconds()
    return y + (m < 10 ? '-0' : '-') + m + (d < 10 ? '-0' : '-') + d + (h < 10 ? ' 0' : ' ') + h + (n < 10 ? ':0' : ':') + n + (s < 10 ? ':0' : ':') + s
  },
  /**
   * 取得当前时间（hhnnss）
   */
  currentTimeStr() {
    const now = new Date()
    const h = now.getHours()
    const n = now.getMinutes()
    const s = now.getSeconds()
    return h + (n < 10 ? '0' : '') + n + (s < 10 ? '0' : '') + s
  },

  /**
   * 取得当前时间（HHnnss）
   */
  currentTimeHHNNSS() {
    const now = new Date()
    const h = now.getHours()
    const n = now.getMinutes()
    const s = now.getSeconds()
    return (h < 10 ? '0' : '') + h + (n < 10 ? '0' : '') + n + (s < 10 ? '0' : '') + s
  },

  isEmpty(obj) {
    return obj === undefined || obj === null || obj === ''
  },
  isNotEmpty(obj) {
    return !this.isEmpty(obj)
  },
  /**
 * 取得当前生产年度(yyyy)
 */
  getProductYear() {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    if (m < 6) {
      return (y - 1).toString()
    }
    return y.toString()
  },
  /**
   * 计算两个日期之间的天数
   * @param dateFromStr  开始日期 yyyy-MM-dd
   * @param dateToStr  结束日期 yyyy-MM-dd
   * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
   */
  getDaysBetween(dateFromStr, dateToStr) {
    const startDate = Date.parse(this.formatDate(dateFromStr))
    const endDate = Date.parse(this.formatDate(dateToStr))
    if (startDate > endDate) {
      return 0
    }
    const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000) + 1
    return isNaN(days) ? null : days
  },
  /**
   * 默认值
   *
   * @param {*} obj 当前值
   * @param {*} defaultVal 默认值
   */
  defaultVal(obj, defaultVal) {
    if (this.isNotEmpty(obj)) {
      return obj
    }
    if (this.isNotEmpty(defaultVal)) {
      return defaultVal
    }
    return obj
  },
  /**
   * 格式化
   *
   * @param {String} text 文本
   * @param {Array} array 占位值数值
   */
  format(text, array) {
    if (this.isEmpty(text)) {
      return ''
    }
    if (array && Array.isArray(array)) {
      if (array.length < 1) {
        return text
      }
      for (const index in array) {
        text = text.replace('{' + index + '}', array[index])
      }
    }
    return text
  },
  /**
   * 数字转换
   * @param  字符串 str
   */
  toNum(str) {
    if (typeof str === 'string') {
      str = str.trim()
      str = str.replace(/([^(\d|\.|\-)])/g, '')
    }
    const num = parseFloat(str)
    return isNaN(num) ? null : num
  },
  toString(obj) {
    if (obj === null || obj === undefined) {
      return ''
    } else {
      return obj.toString()
    }
  },
  /**
   * 取得EditFrom自身的数据
   * @param {Object} self 自身this
   * @returns EditFrom数据
   */
  getDataEditFromSelf(self) {
    if (self.$children[0].editForm) {
      return self.$children[0].editForm
    }
    if (self.$children[0].$children[0].editForm) {
      return self.$children[0].$children[0].editForm
    }
    let refForm = self.$children[0].$children[0].$refs['refForm']
    if (Array.isArray(refForm)) {
      refForm = refForm[0]
    }
    return refForm.model
  },
  /**
   * 取得Tab自身的数据
   * @param {Object} self 自身this
   * @returns Tab表格数据
   */
  getDataTabFromSelf(self) {
    return self.$children[0].tableData
  },
  /**
   * 从编辑页中取得Tab表格数据
   * @param {Object} self  自身this
   * @param {String} tabName  标签名
   * @returns Tab表格数据
   */
  getDataTabFromEdit(self, tabName) {
    const tabRef = this.getRefTabFromEdit(self, tabName)
    if (tabRef == null) {
      return null
    }
    return tabRef.$children[0].tableData
  },
  /**
   * 从Tab页中取得EditFrom数据
   * @param {Object} self 自身this
   * @returns EditFrom数据
   */
  getDataEditFromTab(self) {
    if (self.$parent.componentName === 'BsRouteEdit') {
      return self.$parent.editForm
    } else if (self.$parent.$parent.$parent.editForm) {
      return self.$parent.$parent.$parent.editForm
    } else if (self.editForm) {
      return self.editForm
    }
    return null
  },
  /**
   * 从Tab页中取得Tab表格数据
   * @param {Object} self  自身this
   * @param {String} tabName  标签名
   * @returns Tab表格数据
   */
  getDataTabFromTab(self, tabName) {
    if (Array.isArray(self.$parent.$refs[tabName])) {
      return self.$parent.$refs[tabName][0].$children[0].tableData
    } else if (Array.isArray(self.$parent.$parent.$parent.$refs[tabName])) {
      return self.$parent.$parent.$parent.$refs[tabName][0].$children[0].tableData
    } else {
      return null
    }
  },
  /**
   * 从编辑页中取得Tab的引用
   * @param {Object} self 自身this
   * @param {String} tabName  标签名
   * @returns Tab的引用，可以执行其中的方法
   */
  getRefTabFromEdit(self, tabName) {
    if (self.$children[0].componentName === 'BsRouteEdit') {
      if (Array.isArray(self.$children[0].$refs[tabName])) {
        return self.$children[0].$refs[tabName][0]
      } else {
        return null
      }
    }
    if (Array.isArray(self.$children[0].$refs.bsRouteEdit.$refs[tabName])) {
      return self.$children[0].$refs.bsRouteEdit.$refs[tabName][0]
    } else {
      return null
    }
  },
  /**
   * 从Tab页中取得EditFrom的引用
   * @param {Object} self 自身this
   * @returns EditFrom的引用，可以执行其中的方法
   */
  getRefEditFromTab(self) {
    if (self.$parent.$parent.$parent.componentName === 'BsRouteEdit') {
      return self.$parent.$parent.$parent.$parent
    }
    if (self.$parent.$parent.$children[0].componentName === 'BsRouteEdit') {
      return self.$parent.$parent
    }
    return self.$parent.$parent.$parent.$parent.$parent
  },
  /**
   * 从Tab页中取得Tab的引用
   * @param {Object} self  自身this
   * @param {String} tabName  标签名
   * @returns Tab的引用，可以执行其中的方法
   */
  getRefTabFromTab(self, tabName) {
    if (Array.isArray(self.$parent.$refs[tabName])) {
      return self.$parent.$refs[tabName][0]
    } else if (Array.isArray(self.$parent.$parent.$parent.$refs[tabName])) {
      return self.$parent.$parent.$parent.$refs[tabName][0]
    } else {
      return null
    }
  },

  /**
   * 取得表单项目定义
   * @param {Object} self  自身this
   * @param {String} itemName 项目名称
   * @returns 表单项目定义
   */
  getDefDialogItemByProp(self, itemName) {
    const formData = self.dialog.formData
    if (Array.isArray(formData)) {
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].prop) {
          if (formData[i].prop === itemName) {
            return formData[i]
          }
        } else if (Array.isArray(formData[i].props)) {
          for (let j = 0; j < formData[i].props.length; j++) {
            if (formData[i].props[j] === itemName) {
              return formData[i]
            }
          }
        }
      }
    }
  },
  /**
   * 取得表单项目定义
   * @param {Object} self  自身this
   * @param {String} itemName 项目名称
   * @returns 表单项目定义
   */
  getDefFormItemByProp(self, itemName) {
    const formData = self.edit.formData
    if (Array.isArray(formData)) {
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].prop) {
          if (formData[i].prop === itemName) {
            return formData[i]
          }
        } else if (Array.isArray(formData[i].props)) {
          for (let j = 0; j < formData[i].props.length; j++) {
            if (formData[i].props[j] === itemName) {
              return formData[i]
            }
          }
        }
      }
    } else {
      for (const partName in formData) {
        const part = formData[partName].content
        for (let i = 0; i < part.length; i++) {
          if (part[i].prop) {
            if (part[i].prop === itemName) {
              return part[i]
            }
          } else if (Array.isArray(part[i].props)) {
            for (let j = 0; j < part[i].props.length; j++) {
              if (part[i].props[j] === itemName) {
                return part[i]
              }
            }
          }
        }
      }
    }
    return null
  },
  /**
   * 取得表格列的定义
   * @param {Object} self  自身this
   * @param {String} tabName 标签名
   * @param {String} colName 列名称
   * @returns 表格列的定义
   */
  getDefTableColByProp(self, tabName, colName) {
    const tblRef = this.getRefTabFromEdit(self, tabName)
    if (tblRef == null) {
      return null
    }
    const tbl = tblRef.tab.table
    const cols = tbl.cols
    for (let i = 0; i < cols.length; i++) {
      if (cols[i].prop === colName) {
        return cols[i]
      }
    }
  },
  /**
   * 通过prop获取定义项
   * @param {Array} defItems 定义项集合
   * @param {String} prop prop
   */
  getDefItemByProp(defItems, prop) {
    defItems = defItems || []
    for (const defItem of defItems) {
      if (defItem.prop === prop) {
        return defItem
      }
    }
    return {}
  },
  /**
   * 通过label获取定义项
   * @param {Object} self this对象
   * @param {Array} defItems 定义项集合
   * @param {String} label label值
   */
  getDefItemByLabel(self, defItems, label) {
    defItems = defItems || []
    for (const defItem of defItems) {
      if (self.$t(defItem.label) === label) {
        return defItem
      }
    }
    return {}
  },
  uuid() {
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    let str = new Date().getTime().toString(16)
    for (let i = 0; i < 16; i++) {
      if (array[i] < 16) {
        str += '0'
      }
      str += array[i].toString(16)
    }
    return str.substr(0, 32)
  },
  arraySort(array, comparator) {
    if (!Array.isArray(array)) {
      return
    }
    if (array.length <= 1) {
      return
    }
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        const cp = comparator(array[i], array[j])
        if (cp > 0) {
          const tmp = array[j]
          array[j] = array[i]
          array[i] = tmp
        }
      }
    }
  },
  arraySortByProps(array, props) {
    if (!Array.isArray(array)) {
      return
    }
    if (array.length <= 1) {
      return
    }
    if (arguments.length < 2) {
      return
    }
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        const e1 = array[i]
        const e2 = array[j]
        var c = 0
        for (let k = 1; k < arguments.length; k++) {
          const prop = arguments[k]
          const v1 = e1[prop]
          const v2 = e2[prop]
          if (v1 === v2) {
            continue
          }
          if (v1 === undefined) {
            c = -1
            break
          } else if (v2 === undefined) {
            c = 1
            break
          } else if (v1 === null) {
            c = -1
            break
          } else if (v2 === null) {
            c = 1
            break
          } else if (v1 === false) {
            c = -1
            break
          } else if (v2 === false) {
            c = 1
            break
          }
        }
        if (c > 0) {
          array[i] = e2
          array[j] = e1
        }
      }
    }
  },
  toDecimal(param) {
    if (param === null || param === undefined || param === '') {
      return null
    }
    if (typeof param === 'number') {
      return new Decimal(param)
    }
    const str = param.toString().replace(/([^(\d|\.|\-)])/g, '')
    return new Decimal(str)
  },
  /**
   * 为空时 默认为0
   * @param param
   * @returns {Decimal}
   */
  toDecimal2(param) {
    if (param === null || param === undefined || param === '') {
      return new Decimal(0)
    }
    if (typeof param === 'number') {
      return new Decimal(param)
    }
    const str = param.toString().replace(/([^(\d|\.|\-)])/g, '')
    return new Decimal(str)
  },
  getConversionRate() {
    return 22.0462
  },
  /**
   * 单位换算 美分/磅 => 美元/吨
   */
  convertCentsPound2UsdTon(val) {
    if (this.isEmpty(val)) {
      return null
    }
    const pri = this.toNum(val)
    if (pri === null) {
      return null
    }
    // 22.046226218
    return pri * this.getConversionRate()
  },
  /**
   * 单位换算 美元/吨 => 美分/磅
   */
  convertUsdTon2CentsPound(val) {
    if (this.isEmpty(val)) {
      return null
    }
    const pri = this.toNum(val)
    if (pri === null) {
      return null
    }
    // 0.045359237
    return pri * 0.0453592
  },
  /**
   * 计算金额保留小数
   */
  toFixedMoney(val) {
    return this.toFixedCommon(val, 2)
  },

  thousands(value, digit) {
    if (value === '' || value === undefined || value === null || isNaN(value)) return
    if (!digit) {
      value = value.toString()
    } else {
      value = Number(value).toFixed(digit)
    }
    if (/\./.test(value)) {
      return value.replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/\d{3}(?![.]|$)/g, '$&')
    } else {
      return value.replace(/\d(?=(\d{3})+$)/g, '$&,')
    }
  },

  /**
   * 计算价格保留小数
   */
  toFixedPrice(val) {
    return this.toFixedCommon(val, 8)
  },
  /**
   * 计算无税单价保留小数
   */
  toFixedExPrice(val) {
    return this.toFixedCommon(val, 6)
  },
  /**
   * 计算数量保留小数
   */
  toFixedWeight(val) {
    return this.toFixedCommon(val, 6)
  },
  // 共通保留小数位
  toFixedCommon(val, digit) {
    const calculateParam = Math.pow(10, digit)
    let value = Number(val) * calculateParam
    const arr = (value + '').split('.')
    if (arr.length === 2) {
      const fraction = arr[1]
      if (fraction.startsWith('49999')) {
        value = Number(value) + 0.1
      }
    }
    value = value.toFixed()
    value = Number(value) / calculateParam
    return value.toFixed(digit)
  }
}

window.dateFormateToYYYYMMDD = value => {
  return value.getFullYear() + '' + (value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1 + '') + (value.getDate() < 10 ? '0' + value.getDate() : value.getDate() + '')
}

window.dateFormateToYYYYMM = value => {
  return value.getFullYear() + '' + (value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1 + '') + '01'
}

export default toolUtil
