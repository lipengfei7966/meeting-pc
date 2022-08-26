<template>
  <bs-dialog ref='dialog' :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
import request from '@/utils/frame/base/request'
import toolUtil from '@/utils/frame/base/toolUtil.js'
import collectionUtil from '@/utils/frame/base/collectionUtil.js'
export default {
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'mini',
        initType: 'param',
        titleName: this.$t('sys.bpmSet.branch.conditionList'),
        formData: [
          {
            label: 'sys.bpmSet.branch.conditionDimension',
            prop: 'conditionDimension',
            element: 'base-select',
            event: {
              changeAll: this.onChangeOfConditionDimension
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              data: 'DOC_FORM',
              params: {
                docKey: this.$route.params.moduleCode,
                formBelongType: '1'
              }
            }
          },
          {
            label: 'sys.bpmSet.branch.conditionOperator',
            prop: 'conditionOperator',
            element: 'base-select',
            list: this.$t('datadict.relationOperator'),
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            event: this.onChangeOfRelOperator
          },
          {
            label: 'sys.bpmSet.branch.conditionValue',
            prop: 'conditionValue',
            element: 'input-validate',
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 2,
              clearable: true
            }
          },
          {
            label: 'sys.bpmSet.branch.remark',
            prop: 'remark',
            element: 'input-validate',
            attrs: {
              cols: 2,
              clearable: true
            }
          }
        ],
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            isShow: ['add', 'update'],
            event: this.handleCloseDialog
          },
          {
            name: 'biz.btn.confirm',
            isShow: ['add', 'update'],
            event: this.doComfirm,
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'add'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {
    if (this.opType !== 'add') {
      this.handleConditionValueForm(this.param.conditionDimension)
    }
  },
  methods: {
    handleCloseDialog(params) {
      this.$emit('closeAndRefreshHandler')
    },
    getDocKey() {
      return this.param.docKey
    },
    doComfirm() {
      this.$refs.dialog.$refs.refForm.validate().then(() => {
        const formData = this.$refs.dialog.formData
        const tableData = this.$parent.tableData
        if (this.opType === 'add') {
          tableData.push(formData)
        } else {
          Object.assign(this.param, formData)
          tableData.push({})
          tableData.pop()
        }
        this.handleCloseDialog()
      })
    },
    onChangeOfRelOperator() {
      const conditionValueItem = this.getFormItemByProp('conditionValue')
      if (conditionValueItem.element === 'base-select') {
        if (conditionValueItem.attrs) {
          if (conditionValueItem.attrs.params === null || conditionValueItem.attrs.params === undefined) {
            conditionValueItem.attrs.params = {}
          }
        } else {
          conditionValueItem.attrs = {
            params: {}
          }
        }
      }

      const formDataRef = this.$refs.dialog.formData
      if (formDataRef.conditionOperator === 'in') {
        if (conditionValueItem.element === 'base-select') {
          formDataRef.conditionValue = []
          formDataRef.conditionValueDisp = ''
          conditionValueItem.attrs.multiple = true
        }
      } else {
        if (Array.isArray(formDataRef.conditionValue)) {
          formDataRef.conditionValue = ''
          formDataRef.conditionValueDisp = ''
        }
        if (conditionValueItem.attrs) {
          if (conditionValueItem.attrs.multiple) {
            delete conditionValueItem.attrs.multiple
          }
        }
      }
    },
    /**
     * 监听数据项改变
     * @param {Object} item 选中项
     */
    onChangeOfConditionDimension(item) {
      const formDataRef = this.$refs.dialog.formData
      // 清空数据值
      formDataRef.conditionValue = ''
      formDataRef.conditionValueDisp = ''

      // 若数据为空，则终止
      if (!(item && item.data)) {
        return
      }
      // 处理数据值项
      this.handleContionValueItem(item.data)
    },
    /**
     * 监听[下拉框]数据值改变
     */
    onSelectChangeOfConditionValue(item) {
      if (Array.isArray(item)) {
        let conditionValueDisp = ''
        for (let i = 0; i < item.length; i++) {
          if (i > 0) {
            conditionValueDisp = conditionValueDisp + ', '
          }
          conditionValueDisp = conditionValueDisp + (item[i].name ? item[i].name : item[i].label)
        }
        const formDataRef = this.$refs.dialog.formData
        formDataRef.conditionValueDisp = conditionValueDisp
      } else {
        const formDataRef = this.$refs.dialog.formData
        formDataRef.conditionValueDisp = item.name ? item.name : item.label
      }
    },
    /**
     * 监听[日期]数据值改变
     */
    onDateChangeOfConditionValue() {
      const formDataRef = this.$refs.dialog.formData
      formDataRef.conditionValueDisp = toolUtil.formatDate(formDataRef.conditionValue)
    },
    /**
     * 监听[输入框]数据值改变
     */
    onInputChangeOfConditionValue(val) {
      const formDataRef = this.$refs.dialog.formData
      formDataRef.conditionValueDisp = val
    },
    /**
     * 处理数据值表单
     * @param {string} formCode 表单code
     */
    handleConditionValueForm(formCode) {
      // 若val为空，则终止
      if (toolUtil.isEmpty(formCode)) {
        return
      }

      let conditionValueItem = toolUtil.getDefDialogItemByProp(this, 'conditionValue')
      // 获取数据项的信息
      request({
        url: '/api/dingtalk/bpmDocFormInfo/list',
        method: 'POST',
        data: {
          data: {
            docKey: this.$route.params.moduleCode,
            formCode: formCode,
            deleteFlag: '0'
          },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search')
        }
      })
        .then(response => {
          const formInfoList = response.data
          if (collectionUtil.isEmpty(formInfoList)) {
            this.initConditionValueItem(conditionValueItem)
            return
          }
          // 处理数据值项
          this.handleContionValueItem(formInfoList[0])
        })
        .catch(error => {
          this.initConditionValueItem(conditionValueItem)
        })
    },
    /**
     * 处理数据值项
     * @param {Object} formInfo 表单信息
     */
    handleContionValueItem(formInfo) {
      const dataType = formInfo.dataType
      const fieldInputType = formInfo.fieldInputType
      const fieldAttrJson = formInfo.fieldAttrJson
      let conditionValueItem = toolUtil.getDefDialogItemByProp(this, 'conditionValue')
      // 若字段输入类型为数据字典或基础档案，则展示下拉框
      if (toolUtil.isNotEmpty(fieldAttrJson) && (fieldInputType === '2' || fieldInputType === '3')) {
        this.retainCmnProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.element = 'base-select'
        conditionValueItem.attrs = JSON.parse(fieldAttrJson)
        const formData = this.$refs.dialog.formData
        if (formData.conditionOperator === 'in') {
          conditionValueItem.attrs.multiple = true

          if (formData.conditionValue === null || formData.conditionValue === undefined || formData.conditionValue === '') {
            formData.conditionValue = []
          } else {
            try {
              const conditionArray = JSON.parse(formData.conditionValue)
              if (Array.isArray(conditionArray)) {
                formData.conditionValue = JSON.parse(formData.conditionValue)
              }
            } catch (ex) {}
          }
        }
        this.appendCmnAttrsProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.event = {}
        conditionValueItem.event.changeAll = this.onSelectChangeOfConditionValue
        return
      }
      // 数值类型
      if (dataType === '2') {
        this.retainCmnProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.element = 'input-formatter'
        if (toolUtil.isNotEmpty(fieldAttrJson)) {
          conditionValueItem.attrs = JSON.parse(fieldAttrJson)
        } else {
          conditionValueItem.attrs = {}
          conditionValueItem.attrs.min = -9999999999999
          conditionValueItem.attrs.max = 9999999999999
        }
        this.appendCmnAttrsProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.event = {}
        conditionValueItem.event.change = this.onInputChangeOfConditionValue
        return
      }
      // 日期类型
      if (dataType === '3') {
        this.retainCmnProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.type = 'date'
        conditionValueItem.attrs = toolUtil.isNotEmpty(fieldAttrJson) ? JSON.parse(fieldAttrJson) : {}
        conditionValueItem.attrs.format = 'yyyy-MM-dd'
        conditionValueItem.attrs.valueFormat = 'yyyyMMdd'
        this.appendCmnAttrsProptiesOfConditionValueItem(conditionValueItem)
        conditionValueItem.event = this.onDateChangeOfConditionValue
        return
      }
      this.initConditionValueItem(conditionValueItem)
    },
    /**
     * 保留公共属性
     * @param {Object} item 数据值项
     */
    retainCmnProptiesOfConditionValueItem(item) {
      // 保留prop、label、validate
      item.type = ''
      item.element = ''
      item.attrs = {}
      item.event = {}
    },
    /**
     * 追加attrs公共属性
     * @param {Object} item 数据值项
     */
    appendCmnAttrsProptiesOfConditionValueItem(item) {
      // 保留cols、clearable
      item.attrs = item.attrs || {}
      item.attrs.cols = 2
      item.attrs.clearable = true
    },
    /**
     * 初始化数据值属性
     * @param {Object} item 数据值项
     */
    initConditionValueItem(item) {
      this.retainCmnProptiesOfConditionValueItem(item)
      item.element = 'input-validate'
      this.appendCmnAttrsProptiesOfConditionValueItem(item)
      item.event = {}
      item.event.change = this.onInputChangeOfConditionValue
    },
    getFormItemByProp(prop) {
      for (let i = 0; i < this.dialog.formData.length; i++) {
        const item = this.dialog.formData[i]
        if (item.prop === prop) {
          return item
        }
      }
      return null
    }
  }
}
</script>
