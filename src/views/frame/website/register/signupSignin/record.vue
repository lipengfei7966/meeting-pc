<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
export default {
  name: 'signupSigninRecord',
  data() {
    return {
      form: {
        moreShowFlg: false,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'code.desc',
          data: {}
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分
              clearable: true,
              disabled: true
            },
            default: this.$route.params.data,
            event: {
              changeAll: this.onChangeAll
            }
          },
          {
            label: '场景',
            prop: 'sceneCode',
            element: 'base-select',
            attrs: {
              data: "DICTYPE",
              params: {
                type:"2",
                eventCode:this.$route.params.data
              },
              clearable: true
            },
            event: {
              changeAll: this.onChangeAll
            }
          },
          {
            label: 'website.signin.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.mobile',
            prop: 'mobile',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.email',
            prop: 'email',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.department',
            prop: 'department',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.contactCode',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.contactType',
            prop: 'contactType',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: this.$t('datadict.contantType')
          },
          {
            type: 'datetime',
            label: 'website.signin.query.signupData',
            prop: 'signupData',
            element: 'input-validate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          },
          {
            label: 'website.signin.query.signinWay',
            prop: 'signinWay',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list:[{label:'pc',value:'pc'},{label:'扫码签到',value:'scan'}]
          },
          {
            type: 'datetime',
            label: 'website.signin.query.createDate',
            prop: 'createDate',
            element: 'input-validate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/register/signupSignin/listSigninRecord',
          doDelete: '/api/register/signupSignin/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'name',
              label: 'website.signupSignin.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupSignin.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupSignin.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupSignin.list.department'
            },
            {
              prop: 'contactCode',
              label: 'website.signupSignin.list.contactCode'
            },
            {
              prop: 'contactType',
              label: 'website.signupSignin.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'sceneName',
              label: 'website.signupSignin.list.sceneName'
            },
            {
              prop: 'createDate',
              label: 'website.signupSignin.list.createDate'
            },
            {
              prop: 'signinWay',
              label: 'website.signupSignin.list.signinWay'
            },
            {
              prop: 'signupData',
              label: 'website.signupSignin.list.signupData'
            }
          ]
        },
        bottomBar: {
          pagination: {
            show: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      }
    }
  },
  mounted() {
    // debugger
    // 不设置表格高度
    this.$refs.bsTable.isHeight = false
    // 设置行高为38
    this.$refs.bsTable.rowHeight = 38
    console.log(this.form.listQuery.data);
  },
  methods: {
  }
}
</script>
