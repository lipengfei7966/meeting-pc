<template>
  <bs-dialog-table ref='bsDialogTable' :dialog='dialog' @closeDialog='handleCloseDialog' @initCallback='handleInitCallback'></bs-dialog-table>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      dialog: {
        titleName: this.$t('platform.cfgComponent.list'),
        moreShowFlg: false,
        initChooseParam: this.initChooseParam,
        formData: [
          {
            label: 'platform.cfgComponent.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'platform.cfgComponent.systemFlag',
            prop: 'systemFlag',
            element: 'base-select',
            list: this.$t('datadict.systemFlag'),
            attrs: {
              clearable: true
            }
          },
          {
            label: 'platform.cfgComponent.blockType',
            prop: 'blockType',
            element: 'base-select',
            list: this.$t('datadict.blockType'),
            attrs: {
              clearable: true
            }
          }
        ],
        mainData: {
          api: {
            search: '/api/platform/cfgComponent/list'
          },
          apiData: {
            search(listQuery) {
              const newListQuery = Object.assign(listQuery, {
                defaultSortString: 'code.asc',
                size: 9999
              })
              return newListQuery
            }
          },
          initSearch: this.getInitSearch(),
          table: {
            showCheckbox: this.getMultiple(),
            cols: [
              {
                prop: 'code',
                width: '200',
                label: 'platform.cfgComponent.code'
              },
              {
                prop: 'name',
                width: '200',
                label: 'platform.cfgComponent.name'
              },
              {
                prop: 'systemFlag',
                label: 'platform.cfgComponent.systemFlag',
                width: '130',
                align: 'center',
                format: {
                  dict: this.$t('datadict.systemFlag')
                }
              },
              {
                prop: 'blockType',
                label: 'platform.cfgComponent.blockType',
                width: '150',
                align: 'center',
                format: {
                  dict: this.$t('datadict.blockType')
                }
              },
              {
                prop: 'routerName',
                label: 'platform.cfgComponent.routerName'
              }
            ]
          }
        },
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            event: 'cancel'
          },
          {
            name: 'biz.btn.allSelect',
            event: this.allSelect
          },
          {
            name: 'biz.btn.save',
            event: this.save,
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  props: {
    // ????????????????????????
    multiple: {
      type: Boolean,
      default: true
    },
    // ???????????????????????????
    initSearch: {
      type: Boolean,
      default: true
    },
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    },
    initChooseParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // ???????????????????????????
    getInitSearch() {
      if (typeof this.param.initSearch === 'boolean') {
        return this.param.initSearch
      }
      if (typeof this.initChooseParam.initSearch === 'boolean') {
        return this.initChooseParam.initSearch
      }
      return this.initSearch
    },
    // ????????????????????????
    getMultiple() {
      if (typeof this.param.multiple === 'boolean') {
        return this.param.multiple
      }
      if (typeof this.initChooseParam.multiple === 'boolean') {
        return this.initChooseParam.multiple
      }
      return this.multiple
    },
    // ????????????
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    // ??????????????????
    save() {
      this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      })
        .then(() => {
          const compCodeList = []
          this.$parent.$refs.singleTable.tableData.forEach(element => {
            compCodeList.push(element.code)
          })
          const listData = []
          this.$refs.bsDialogTable.multipleSelection.forEach(element => {
            if (!compCodeList.includes(element.code)) {
              listData.push({
                tenantCode: this.param,
                compCode: element.code,
                showFlag: '0',
                blockType: element.blockType
              })
            } else {
              this.$parent.$refs.singleTable.tableData.forEach(value => {
                if (value.code === element.code) {
                  listData.push(value)
                }
              })
            }
          })
          request({
            url: '/api/platform/cfgTenantComp/save',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.save'),
              data: listData
            }
          }).then(response => {
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
            // ????????????
            this.handleCloseDialog(true)
          })
        })
        .catch(() => {})
    },
    allSelect() {
      this.$refs.bsDialogTable.$refs.singleTable.toggleAllSelection()
    },
    // ?????????????????????
    handleInitCallback(param) {
      this.$nextTick(() => {
        const list = []
        param.forEach(element => {
          this.$parent.$refs.singleTable.tableData.forEach(value => {
            if (element.name === value.name) {
              list.push(element)
            }
          })
        })
        list.forEach(element => {
          this.$refs.bsDialogTable.$refs.singleTable.toggleRowSelection(element)
        })
      })
    }
  }
}
</script>
