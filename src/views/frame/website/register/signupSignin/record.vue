<template>
  <div class="bs-new-container app-container">
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
            label: 'website.signupSignin.query.code',
            prop: 'eventCode',
            element: 'el-input',
            default: this.$route.params.data,
            isShow: false
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
              prop: 'code',
              label: 'website.signupSignin.list.code'
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
              prop: 'signupData',
              label: 'website.signupSignin.list.signupData'
            },
            {
              prop: 'signinWay',
              label: 'website.signupSignin.list.signinWay'
            },
            {
              prop: 'createDate',
              label: 'website.signupSignin.list.createDate'
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
  },
  methods: {
  }
}
</script>
