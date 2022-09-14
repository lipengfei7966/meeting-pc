<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
export default {
  name: 'articleManage',
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
          data: {
            usingFlag: ''
          }
        },
        formData: [
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
            component: () => import('@/views/frame/website/article/editForm.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            $refs: this.$refs,
            getParam() {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/website/article/editForm.vue')
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
            component: () => import('@/views/frame/website/article/editForm.vue')
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
  }
}
</script>

