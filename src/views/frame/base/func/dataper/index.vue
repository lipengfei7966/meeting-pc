<template>
  <div class="bs-new-container app-container">
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'funcDataper',
  data() {
    return {
      dialogVisible: false,
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: false,
          defaultSortString: 'createDate.desc',
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {}
        }
      },

      mainData: {
        api: {
          search: '/api/func/dataper/listAll'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'update',
            opType: 'update',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/func/dataper/edit.vue')
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        initSearch: true,
        table: {
          id: this.$route.meta.title,
          sortable: true,
          cols: [
            {
              prop: 'name',
              width: '100',
              label: 'platform.dataper.name'
            },
            {
              prop: 'code',
              width: '100',
              label: 'platform.dataper.code'
            },
            {
              prop: 'usingFlag',
              align: 'center',
              width: '100',
              label: 'platform.dataper.usingFlag',
              format: {
                dict: this.$t('datadict.usingFlag')
              }
            }
          ]
        },
        bottomBar: {
          pagination: {
            show: false,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      }
    }
  }
}
</script>

