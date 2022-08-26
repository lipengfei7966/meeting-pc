<template>
  <bs-dialog-edit v-el-drag-dialog ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
import { notifyInfo } from '@/utils/frame/base/notifyParams'
import { dateFormate } from '@/utils/frame/base/index'
export default {
  data() {
    return {
      edit: {
        type: this.opType,
        param: this.param,
        api: {
          view: '/api/sys/bizRelationExtend/get',
          save: '/api/sys/bizRelationExtend/save',
          update: '/api/sys/bizRelationExtend/update'
        },
        apiData: {
          view(param) {
            return param.id
          }
        },
        topButtons: [
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
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: '基本信息',
            content: [
              {
                label: 'biz.lbl.moduleCode',
                prop: 'moduleCode',
                default: this.getDefaultModuleCode(),
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                element: 'input-validate',
                attrs: {
                  disabled: true
                }
              },
              {
                prop: 'billDirection',
                label: '单据方向',
                width: 150,
                align: 'center',
                list: this.$t('datadict.bizBillDirection'),
                attrs: {
                  clearable: true
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: '扩展方向',
                prop: 'direction',
                element: 'base-select',
                list: this.$t('datadict.bizRelationDirection'),
                attrs: {
                  clearable: true
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: 'biz.lbl.remark',
                prop: 'remark',
                element: 'el-input',
                attrs: {
                  cols: 4,
                  clearable: true
                }
              },
              {
                label: 'SQL语句',
                prop: 'sqlStatement',
                element: 'el-input',
                attrs: {
                  cols: 4,
                  type: 'textarea',
                  rows: 10
                }
              },
              {
                label: 'sql注意说明1',
                prop: 'sqlStatementComment1',
                element: 'el-input',
                default: 'SQL例子 select xx from table t where t.TENANT_CODE= #TENANT_CODE# and t.bill_no in (#BILL_NO#)',
                attrs: {
                  disabled: true,
                  type: 'textarea',
                  rows: 2,
                  cols: 4
                }
              },
              {
                label: 'sql注意说明2',
                prop: 'sqlStatementComment2',
                element: 'el-input',
                default: ' 所有返回字段要AS为：BILL_NO, BILL_TYPE, REAL_BILL_TYPE,PRE_BILL_TYPE, PRE_BILL_NO, CONTRACT_NO, LOT_NO,CREATE_DATE, CUSTOMER_NAME, BIZ_ORGAN_CODE,S BIZ_DEPT_CODE,BIZ_EMPLOYEE_CODE ',
                attrs: {
                  disabled: true,
                  type: 'textarea',
                  rows: 2,
                  cols: 4
                }
              }
            ]
          }
        }
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'add'
    },
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  beforeMount() {},
  methods: {
    getDefaultModuleCode() {
      return this.param.moduleCode
    },

    // 本页面关闭
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
