<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>

    <bs-table ref="bsTable" :mainData="mainData" @initCallback='initCallback'></bs-table>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'articleManage',
  data() {
    return {
      getNum:0,
      dataList:[],//表格数据
      mainLanguage:'',
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
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.article.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true,
              clearable: false
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.article.query.articleName',
            prop: 'articleName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/biz/cmsArticle/page',
          doDelete: '/api/biz/cmsArticle/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            $refs: this.$refs,
            component: () => import('@/views/frame/cmms/services/cms/article/editForm.vue'),
            getParam: () => {
              this.getLanguage()
              return {
                eventCode: this.form.listQuery.data.eventCode,
                languageType:'zh'
              }
            }
          },
          {
            name: 'update',
            type: 'dialog',
            $refs: this.$refs,
            getParam() {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/cmms/services/cms/article/editForm.vue')
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.code
            }
          },
          {
            name: 'view',
            type: 'dialog',
            $refs: this.$refs,
            getParam() {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/cmms/services/cms/article/editForm.vue')
          },
          {
            name: 'export',
            $refs: this.$refs
          },
          {
            name: 'refresh',
            $refs: this.$refs
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title + 'ff',
          cols: [
            {
              prop: 'articleName',
              label: 'website.article.list.articleName'
            },
            {
              label: 'website.article.list.articleTitle',
              prop: 'articleTitle'
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
  },
  created(){
    this.getNum = 3
  },
  methods: {
    onChangeAll(params) {
      if(this.$route.params.data){
      this.form.listQuery.data.eventCode = this.$route.params.data
    }
      this.getLanguage()
      this.$refs.bsTable.doRefresh()
    },
    getLanguage(){
      request({
          url: '/api/biz/cmsEventInfo/get',
          method: 'POST',
          data: { data: this.form.listQuery.data.eventCode, funcModule: '获取语言表信息', funcOperation: '获取语言表信息' }
        })
          .then(res => {
            if(res){
              if(res.data.mainLanguage){
                this.mainLanguage = res.data.mainLanguage
              }else{
                this.mainLanguage = ''
              }
            }
          })
          .catch(() => {})
    },
    initCallback(data){
      console.log(this.$route.params.code);
      console.log(data);
      this.dataList = data
      // 调取弹窗
      if(this.$route.params.data){
        this.dataList.data.forEach(item=>{
          if(item.id == this.$route.params.code){
            if(this.getNum == 3){
              this.$refs.bsTable.currentRow = item
            this.$refs.bsTable.triggerEvent(this.mainData.topBar[1])
            this.getNum++
            }
          }
        })
    }
    },
  }
}
</script>

