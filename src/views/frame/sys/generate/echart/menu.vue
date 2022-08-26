<template>
  <bs-edit ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog'></bs-edit>
</template>
<script>
import toolUtil from '@/utils/frame/base/toolUtil.js'

export default {
  name: 'warnMenuEdit',
  data() {
    return {
      edit: {
        type: 'add',
        mode: this.opMode,
        param: this.param,
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          save: '/api/sys/codeReport/menu/add'
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
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: 'biz.title.basicInfo',
            content: [
              {
                label: '类型',
                prop: 'leafFlag',
                default: '1',
                isShow: false
              },
              {
                label: 'biz.lbl.usingFlag',
                prop: 'usingFlag',
                type: 'radio',
                list: this.$t('datadict.usingFlag'),
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                default: '1'
              },
              {
                label: 'platform.menu.catalog',
                prop: 'parentCode',
                element: 'base-select',
                attrs: {
                  data: 'ROOT_MENU',
                  params: {
                    type: 'catalog'
                  },
                  clearable: true
                }
              },

              {
                label: '名称',
                prop: 'menuName',
                element: 'input-validate',
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  clearable: true
                },
                default: this.param.menuName
              },
              {
                label: '英语名称',
                prop: 'menuEname',
                element: 'input-validate',
                attrs: {
                  clearable: true
                }
              },
              {
                label: '排序号',
                prop: 'sortNo',
                default: '0',
                element: 'input-validate',
                attrs: {
                  clearable: true
                }
              },
              {
                label: 'biz.lbl.remark',
                prop: 'menuDesp',
                element: 'el-input',
                attrs: {
                  cols: 3,
                  clearable: true
                }
              },
              {
                label: '菜单标识',
                prop: 'menuCode',
                element: 'input-validate',
                attrs: {
                  clearable: false,
                  disabled: true
                },
                default: 'm' + this.param.id
              },
              {
                label: '图表id',
                prop: 'id',
                default: this.param.id,
                element: 'input-validate',
                attrs: {
                  clearable: false,
                  disabled: true
                },
                isShow: true
              }
            ]
          },
          part2: {
            titleName: 'biz.title.menuInfo',
            hidden: false,
            content: [
              {
                label: '是否为iframe',
                prop: 'iframeFlag',
                default: '0',
                isShow: false
              },
              {
                label: '菜单URL',
                prop: 'menuUrl',
                element: 'input-validate',
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  clearable: false,
                  disabled: true,
                  cols: 2,
                  placeholder: '浏览器显示URL,以/开始路径'
                },
                default: '/chart/layout/' + toolUtil.uuid()
              },
              {
                label: 'component',
                prop: 'component',
                element: 'input-validate',
                attrs: {
                  clearable: false,
                  disabled: true,
                  placeholder: 'views/**'
                },
                default: 'views/frame/sys/generate/formwork/echart'
              },
              {
                label: '组件名称',
                prop: 'componentName',
                element: 'input-validate',
                attrs: {
                  clearable: false,
                  disabled: true
                },
                default: 'formworkChart'
              },
              {
                label: '菜单类型',
                prop: 'moduleType',
                isShow: false,
                default: '2'
              },
              {
                label: '授权方式',
                prop: 'authFlag',
                list: this.$t('datadict.authFlag'),
                default: '4',
                attrs: {
                  disabled: true
                }
              },
              {
                label: '是否隐藏',
                prop: 'hiddenFlag',
                type: 'radio',
                list: this.$t('datadict.yesNo'),
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                default: '0'
              },
              {
                label: '是否无缓存',
                prop: 'noCacheFlag',
                type: 'radio',
                list: this.$t('datadict.yesNo'),
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                default: '0'
              },
              {
                label: '组件复用',
                prop: 'reuseFlag',
                type: 'radio',
                list: this.$t('datadict.yesNo'),
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                attrs: {
                  disabled: true
                },
                default: '1'
              },
              {
                label: '操作代码',
                prop: 'operateCode',
                element: 'input-validate',
                attrs: {
                  disabled: true
                },
                default: 'all'
              },
              {
                label: '操作名称',
                prop: 'operateName',
                element: 'input-validate',
                attrs: {
                  disabled: true
                },
                default: '全部'
              },
              {
                label: '操作英文名称',
                prop: 'operateEname',
                element: 'input-validate',
                attrs: {
                  disabled: true
                },
                default: 'all'
              }
            ]
          }
        },
        tabs: []
      }
    }
  },

  props: {
    opType: {
      type: String,
      default: 'add'
    },
    opMode: {
      type: String,
      default: 'dialog'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },

  methods: {
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
