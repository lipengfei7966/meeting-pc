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
          view: '/api/platform/cfgBizJoint/get',
          save: '/api/platform/cfgBizJoint/save',
          update: '/api/platform/cfgBizJoint/update'
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
                isShow: false,
                element: 'input-validate',
                attrs: {
                  disabled: true
                }
              },

              {
                label: '功能名称',
                prop: 'funcName',
                element: 'input-validate',
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: '业务代码',
                default: this.getDefaultBizCode(),
                prop: 'realBillType',
                element: 'base-select',
                attrs: {
                  datadict: 'bizCode',
                  disabled: true
                }
              },
              {
                label: '单据存储类型',
                prop: 'billType',
                element: 'base-select',
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  datadict: 'bizCode',
                  labelShowCode: true,
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: '购销类别',
                prop: 'reservedStr1',
                element: 'base-select',
                attrs: {
                  datadict: 'purchaseSaleType',
                  clearable: false
                }
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
                default: 'SQL例子 select xx from table t where t.TENANT_CODE= #TENANT_CODE# #INNER_SQL#',
                attrs: {
                  disabled: true,
                  cols: 4
                }
              },
              {
                label: 'sql注意说明2',
                prop: 'sqlStatementComment2',
                element: 'el-input',
                default: '多表查询时，维护的SQL字段要添加前缀, #TENANT_CODE#为租户替换标记， #INNER_SQL#为查询条件拼接替换标记',
                attrs: {
                  disabled: true,
                  cols: 4
                }
              },

              {
                label: 'sql注意说明3',
                prop: 'sqlStatementComment3',
                element: 'el-input',
                default: ' 所有返回字段要AS为：BILL_NO, BILL_TYPE, REAL_BILL_TYPE,PRE_BILL_TYPE, PRE_BILL_NO, CONTRACT_NO, LOT_NO,CREATE_DATE, CUSTOMER_NAME, BIZ_ORGAN_CODE,S BIZ_DEPT_CODE,BIZ_EMPLOYEE_CODE ',
                attrs: {
                  disabled: true,
                  cols: 4
                }
              }
            ]
          },
          // 扩展内容
          // part2: {
          //   titleName: '扩展信息',
          //   dtoKey: 'extendDataJson',
          //   content: [
          //     {
          //       label: '是否反向查询',
          //       prop: 'reverseFlag',
          //       element: 'el-checkbox',
          //       default: false
          //     }
          //   ]
          // },
          // 扩展内容
          part3: {
            titleName: 'SQL字段(多表关联查询时，维护内容要有表前缀)',
            dtoKey: 'extendDataJson',
            content: [
              {
                label: 'BILL_NO字段',
                prop: 'billNo',
                element: 'input-validate',
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'BILL_TYPE字段',
                prop: 'billType',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'REAL_BILL_TYPE字段',
                prop: 'realBillType',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'PRE_BILL_TYPE字段',
                prop: 'preBillType',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'PRE_BILL_NO字段',
                prop: 'preBillNo',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'CONTRACT_NO字段',
                prop: 'contractNo',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'LOT_NO字段',
                prop: 'lotNo',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'CUSTOMER_NAME字段',
                prop: 'customerName',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'BIZ_ORGAN_CODE字段',
                prop: 'bizOrganCode',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'S BIZ_DEPT_CODE,字段',
                prop: 'bizDeptCode',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'BIZ_EMPLOYEE_CODE字段',
                prop: 'bizEmployeeCode',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
                }
              },
              {
                label: 'CREATE_DATE字段',
                prop: 'createDate',
                element: 'input-validate',
                validate: [
                  {
                    required: false,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  disabled: false,
                  clearable: true
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
  methods: {
    getDefaultModuleCode() {
      if (this.opType === 'add') {
        return this.param.moduleCode
      } else {
        return ''
      }
    },

    getDefaultBizCode() {
      if (this.opType === 'add') {
        return this.param.bizCode
      } else {
        return ''
      }
    },

    // 本页面关闭
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
