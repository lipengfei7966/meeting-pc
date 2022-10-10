<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
import { getToken } from '@/utils/frame/base/auth'
export default {
  name: 'generateMulechart',
  data() {
    return {
      form: {
        listQuery: {
          isPage: true,
          current: 1,
          size: 20,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: { codeType: 'mulchart' },
          defaultSortString: 'createDate.desc'
        },
        formData: [
          {
            prop: 'codeName',
            label: '功能名称',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/code/report/page',
          doDelete: '/api/code/report/remove'
        },

        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',

            component: () => import('./edit.vue'),
            getParam: currentRow => {
              return currentRow.id
            }
          },
          {
            name: 'update',
            type: 'dialog',
            opType: 'copy',
            iconName: 'copy',
            i18n: '复制',
            component: () => import('./edit.vue'),
            getParam: currentRow => {
              return currentRow.id
            }
          },

          {
            name: 'remove',
            getParam: currentRow => {
              return currentRow.id
            }
          },
          {
            name: 'refresh'
          },
          {
            name: 'view',
            i18n: '预览',
            event: this.goPreview,
            getParam: currentRow => {
              return currentRow.id
            }
          },
          {
            name: 'update',
            i18n: '菜单权限设置',
            type: 'dialog',
            msg: '当前模板已经设置菜单',
            validate: currentRow => {
              if (currentRow.moduleCode) {
                return false
              } else {
                return true
              }
            },
            getParam: currentRow => {
              return {
                id: currentRow.id,
                menuName: currentRow.codeName,
                menuType: 'ECHART'
              }
            },
            component: () => import('./menu.vue')
          }
        ],
        initSearch: true,
        showTable: true,
        table: {
          id: '',
          cols: [
            {
              prop: 'id',
              width: '220',
              label: 'id'
            },
            {
              prop: 'reservedStr1',
              width: '120',
              label: '系统'
            },
            {
              prop: 'codeName',
              width: '220',
              label: '功能名称'
            },
            {
              prop: 'moduleCode',
              width: '120',
              label: '菜单标识'
            },
            {
              prop: 'createDate',
              width: '220',
              label: '添加时间'
            },
            {
              prop: 'remark',
              label: '功能说明'
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
  methods: {
    goPreview() {
      const currentRow = this.$refs.bsTable.currentRow
      if (!currentRow || currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }

      let { href } = this.$router.resolve({
        path: '/preview/echart/' + currentRow.id
      })
      if (href && getToken()) {
        const token = href.indexOf('?') > -1 ? '&' : '?'
        href = href + token + 'token=' + getToken()
      }
      window.open(href, '_blank')
    }
  }
}
</script>
