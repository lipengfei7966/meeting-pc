<template>
  <bs-route-edit ref="bsEdit" :edit="edit" @closeDialog="handleCloseDialog" @initCallback="initCallback"></bs-route-edit>
</template>
<script>
import { notifyInfo } from '@/utils/frame/base/notifyParams'
import request from '@/utils/frame/base/request'
import toolUtil from '@/utils/frame/base/toolUtil.js'
export default {
  name: 'cfgFleImpExpEdit',
  data() {
    return {
      edit: {
        type: this.$route.params.type || this.$route.params.opType || this.opType,
        mode: this.opMode,
        param: Object.assign({}, this.param, this.$route.params),
        api: {
          view: '/api/file/cfgFleImpExp/get',
          save: '/api/file/cfgFleImpExp/save',
          update: '/api/file/cfgFleImpExp/update'
        },
        apiData: {
          view: param => param.data.expImpCode,
          save: param => param,
          update: param => param
        },
        topButtons: [
          {
            iconName: 'close',
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['view'],
            attrs: {
              type: 'primary'
            }
          },
          {
            iconName: 'cancel',
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add', 'update']
          },
          {
            name: 'biz.btn.save',
            iconName: 'save',
            event: 'save',
            showLoading: true,
            showAttachment: true,
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            },
            extraEvent: this.beforeSaveCheck
          },
          {
            name: 'file.impexp.resetColumn',
            iconName: 'update',
            $refs: this.$refs,
            isShow: ['add', 'update'],
            event: this.resetColumn
          }
        ],
        formData: [
          {
            // 导入导出区分
            label: 'file.impexp.expImpType',
            prop: 'expImpType',
            element: 'base-select',
            list: [
              { value: 'EXP', label: '导出' },
              { value: 'IMP', label: '导入' }
            ],
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            default: 'EXP',
            attrs: {
              disabled: true,
              clearable: true
            }
          },
          {
            // 模板代码
            label: 'file.impexp.moduleCode',
            prop: 'moduleCode',
            element: 'input-validate',
            attrs: {
              disabled: true
            }
          },
          {
            // 模块名称
            label: 'file.impexp.moduleName',
            prop: 'moduleName',
            element: 'input-validate',
            attrs: {
              disabled: true
            }
          },
          {},
          {
            // 导入导出代码
            label: 'file.impexp.expImpCode',
            prop: 'expImpCode',
            element: 'input-validate',
            attrs: {
              disabled: true
            }
          },
          {
            // 导入导出名称
            label: 'file.impexp.expImpName',
            prop: 'expImpName',
            element: 'input-validate',
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            attrs: {
              clearable: true
            }
          },
          {
            // 导出数据类型
            label: 'file.impexp.usingFlag',
            prop: 'usingFlag',
            element: 'base-select',
            list: this.$t('datadict.usingFlag'),
            default: '1',
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            attrs: {
              clearable: false
            }
          },
          {},
          {
            // 导出数据类型
            label: 'file.impexp.expSrcType',
            prop: 'expSrcType',
            element: 'base-select',
            list: [
              { value: 'API', label: 'api' },
              { value: 'SQL', label: 'sql' }
            ],
            default: 'API',
            event: this.changeExpSrcType,
            attrs: {
              clearable: false
            }
          },
          {
            //  导出数据Service名称
            label: 'file.impexp.serviceName',
            prop: 'serviceName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            // 方法名称
            label: 'file.impexp.methodName',
            prop: 'methodName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            // 导出SQL
            label: 'file.impexp.expSrcSql',
            prop: 'expSql',
            element: 'el-input',
            isShow: false,
            attrs: {
              type: 'textarea',
              cols: 4,
              clearable: true
            }
          },
          {
            // 备注
            label: 'file.impexp.remark',
            prop: 'remark',
            element: 'el-input',
            attrs: {
              type: 'textarea',
              cols: 4,
              clearable: true
            }
          }
        ],
        tables: [
          {
            isShow: false,
            name: 'colList',
            label: 'file.impexp.colList',
            extraParam: {
              tabType: null
            },
            component: () => import('./colListTab.vue')
          },
          {
            isShow: false,
            name: 'expSumListDemo',
            label: 'file.impexp.sumrowSetting',
            component: () => import('./sumListTab.vue')
          },
          {
            isShow: false,
            name: 'expQryListDemo',
            label: 'file.impexp.querySetting',
            component: () => import('./qryListTab.vue')
          }
        ],
        tabs: []
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'view'
    },
    opMode: {
      type: String,
      default: 'router'
    },
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  mounted() {
    if (this.$route.params.type === 'add') {
      const editForm = this.$refs.bsEdit.editForm
      const module = this.$route.params.module
      editForm.moduleCode = module.code
      editForm.moduleName = module.cname
      editForm.expImpType = this.$route.params.expImpType
      this.changeExpImpType(editForm.expImpType)
    }
  },
  methods: {
    handleCloseDialog(param) {
      const backName = this.$route.params.back ? this.$route.params.back : 'cfgFleImpExp'
      this.$store.dispatch('delVisitedViews', this.$route).then(() => {
        this.$router.push({
          name: backName,
          params: Object.assign({}, this.$route.params.backParam, { refresh: !!param })
        })
      })
    },
    initCallback(param) {
      this.changeExpImpType(param.expImpType)
      this.changeExpSrcType(param.expSrcType)
      this.loadTabs()
    },
    loadTabs() {
      const editForm = this.$refs.bsEdit.editForm
      const baseTab = this.edit.tables[0]
      this.edit.tabs.splice(0)
      if (Array.isArray(editForm.paramList) && editForm.paramList.length > 0) {
        for (let i = 0; i < editForm.paramList.length; i++) {
          const impParam = editForm.paramList[i]
          const impTab = Object.assign({}, baseTab)
          impTab.extraParam = Object.assign({}, baseTab.extraParam)
          impTab.extraParam.tabType = impParam.inOutType
          impTab.extraParam.paramIdx = impParam.paramIdx
          impTab.extraParam.tabIndex = i
          impTab.isShow = true
          impTab.name = 'paramTab' + impParam.paramIdx
          if (impParam.inOutType === 'IN') {
            impTab.label = this.$t('file.impexp.impParam') + impParam.paramIdx
          } else {
            impTab.label = this.$t('file.impexp.expParam')
          }
          this.edit.tabs.push(impTab)
          const colList = toolUtil.getRefTabFromEdit(this, impTab.name)
          if (colList) {
            colList.loadDataFromEdit()
          }
        }
        this.$refs.bsEdit.activeName = this.edit.tabs[0].name
      }
      if (editForm.expImpType === 'EXP') {
        const subRowTab = Object.assign({}, this.edit.tables[1])
        subRowTab.isShow = true
        subRowTab.name = 'expSumList'
        this.edit.tabs.push(subRowTab)

        const queryTab = Object.assign({}, this.edit.tables[2])
        queryTab.isShow = true
        queryTab.name = 'expQryList'
        this.edit.tabs.push(queryTab)
      }
    },
    changeExpSrcType(val) {
      if (val === 'SQL') {
        toolUtil.getDefFormItemByProp(this, 'expSql').isShow = true
        toolUtil.getDefFormItemByProp(this, 'serviceName').isShow = false
        toolUtil.getDefFormItemByProp(this, 'methodName').isShow = false
      } else {
        toolUtil.getDefFormItemByProp(this, 'expSql').isShow = false
        toolUtil.getDefFormItemByProp(this, 'serviceName').isShow = true
        toolUtil.getDefFormItemByProp(this, 'methodName').isShow = true
      }
    },
    changeExpImpType(val) {
      this.edit.tabs.splice(0)
      const editForm = this.$refs.bsEdit.editForm
      if (val === 'IMP') {
        toolUtil.getDefFormItemByProp(this, 'expSql').isShow = false
        toolUtil.getDefFormItemByProp(this, 'serviceName').isShow = true
        toolUtil.getDefFormItemByProp(this, 'methodName').isShow = true
        toolUtil.getDefFormItemByProp(this, 'expSrcType').attrs.disabled = true
        editForm.expSrcType = 'API'

        if (this.$route.params.type === 'add') {
          editForm.paramList = [{ tabType: 'IMP', paramIdx: 1 }]
          const impTab = Object.assign({}, this.edit.tables[0])
          impTab.extraParam = Object.assign({}, this.edit.tables[0].extraParam)
          impTab.extraParam.tabType = 'IMP'
          impTab.extraParam.paramIdx = 1
          impTab.extraParam.tabIndex = 0
          impTab.isShow = true
          impTab.name = 'paramTab' + 1
          impTab.label = this.$t('file.impexp.impParam') + 1
          this.edit.tabs.push(impTab)
          this.$refs.bsEdit.activeName = this.edit.tabs[0].name
        }
      } else {
        if (this.$route.params.type === 'add') {
          editForm.paramList = [{ tabType: 'EXP', paramIdx: 1 }]
          const impTab = Object.assign({}, this.edit.tables[0])
          impTab.extraParam = Object.assign({}, this.edit.tables[0].extraParam)
          impTab.extraParam.tabType = 'EXP'
          impTab.extraParam.paramIdx = 1
          impTab.extraParam.tabIndex = 0
          impTab.isShow = true
          impTab.name = 'paramTab' + 1
          impTab.label = this.$t('file.impexp.expParam')
          this.edit.tabs.push(impTab)

          const subRowTab = Object.assign({}, this.edit.tables[1])
          subRowTab.isShow = true
          subRowTab.name = 'expSumList'
          this.edit.tabs.push(subRowTab)

          const queryTab = Object.assign({}, this.edit.tables[2])
          queryTab.isShow = true
          queryTab.name = 'expQryList'
          this.edit.tabs.push(queryTab)
          this.$refs.bsEdit.activeName = this.edit.tabs[0].name
        }
      }
    },
    beforeSaveCheck() {
      const editForm = this.$refs.bsEdit.editForm
      if (editForm.expImpType === 'EXP') {
        if (editForm.expSrcType !== 'SQL') {
          if (toolUtil.isEmpty(editForm.serviceName) || toolUtil.isEmpty(editForm.methodName)) {
            this.$notify(notifyInfo({ msg: this.$t('导出数据类型为API时请输入service名称及方法名称') }))
            return false
          }
        } else {
          if (toolUtil.isEmpty(editForm.expSql)) {
            this.$notify(notifyInfo({ msg: this.$t('导出数据类型为sql时请输入SQL') }))
            return false
          }
        }
      } else {
        if (toolUtil.isEmpty(editForm.serviceName) || toolUtil.isEmpty(editForm.methodName)) {
          this.$notify(notifyInfo({ msg: this.$t('请输入service名称及方法名称') }))
          return false
        }
      }
      if (editForm) {
        const paramList = editForm.paramList
        for (const param of paramList) {
          const paramTab = toolUtil.getRefTabFromEdit(this, 'paramTab' + param.paramIdx)
          if (paramTab) {
            const paramInfo = paramTab.getTabData()
            param.paramName = paramInfo.paramName
            param.colList = paramInfo.colList
          }
        }
        if (editForm.expImpType === 'EXP') {
          editForm.expSumList = toolUtil.getRefTabFromEdit(this, 'expSumList').getTabData()
          editForm.expQryList = toolUtil.getRefTabFromEdit(this, 'expQryList').getTabData()
        }
      }
      return true
    },
    resetColumn() {
      const editForm = this.$refs.bsEdit.editForm
      if (editForm.expSrcType !== 'SQL') {
        if (toolUtil.isEmpty(editForm.serviceName) || toolUtil.isEmpty(editForm.methodName)) {
          this.$notify(notifyInfo({ msg: this.$t('导出数据类型为API时请输入service名称及方法名称') }))
          return
        }
      } else {
        if (toolUtil.isEmpty(editForm.expSql)) {
          this.$notify(notifyInfo({ msg: this.$t('导出数据类型为sql时请输入SQL') }))
          return
        }
      }
      request({
        url: '/api/file/cfgFleImpExp/readDtoProperties',
        method: 'post',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: editForm
        }
      }).then(response => {
        if (response.status) {
          editForm.paramList = response.data.paramList
          this.loadTabs()
        }
      })
    }
  }
}
</script>