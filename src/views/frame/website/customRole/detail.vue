<template>
  <bs-edit :edit='edit' @closeDialog='handleCloseDialog' ref='bsRouteEdit'></bs-edit>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'customRoleDetail',
  data() {
    return {
      edit: {
        type: this.$route.params.type || this.$route.params.opType,
        mode: 'route',
        param: this.$route.params,
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/base/customRole/get'
        },
        apiData: {
          code: this.$route.params.code,
          view() {
            return this.code
          }
        },
        topButtons: [
          {
            iconName: 'cancel',
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['view', 'detailSet'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        formData: {
          part1: {
            titleName: 'website.role.roleInfo',
            content: [
              {
                label: 'website.role.roleName',
                prop: 'roleName',
                element: 'input-validate',
                attrs: {
                  disable: true
                }
              },
              {
                label: 'biz.lbl.usingFlag',
                prop: 'usingFlag',
                element: 'base-select',
                list: this.$t('datadict.usingFlag'),
                attrs: {
                  disable: true
                }
              },
              {
                label: 'biz.lbl.remark',
                prop: 'remark',
                element: 'el-input',
                attrs: {
                  disable: true,
                  cols: 2
                }
              }
            ]
          }
        },
        tabs: [
          {
            name: 'userTab',
            label: 'website.role.tab.user',
            component: () => import('./userTab.vue')
          },
          {
            name: 'funcTab',
            label: 'website.role.tab.func',
            component: () => import('./funcTab.vue')
          },
          {
            name: 'org',
            label: 'website.role.tab.customer',
            component: () => import('./customerTab.vue')
          },
          {
            name: 'dept',
            label: 'website.role.tab.customerDept',
            component: () => import('./customerDeptTab.vue')
          },
          {
            name: 'employee',
            label: 'website.role.tab.employee',
            isShow: false,
            component: () => import('./employeeTab.vue')
          }
        ]
      }
    }
  },
  created() {
    request({
      url: '/api/func/dataper/listAll',
      method: 'POST',
      data: {
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search'),
        data: {}
      }
    }).then(response => {
      this.tableData = response.data
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.forEach(t => {
          if (t.usingFlag === '1') {
            this.edit.tabs.forEach(v => {
              // 重新设置isshow
              if (v.name === t.code) {
                v.isShow = true
              }
            })
          }
        })
      }
    })
  },
  methods: {
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      if (this.opMode === 'dialog') {
        this.$emit('closeHandler', param)
      } else {
        const backName = this.$route.params.back ? this.$route.params.back : 'dashboard'
        this.$store.dispatch('delVisitedViews', this.$route).then(() => {
          this.$router.push({
            name: backName,
            params: { ...(!!param && { refresh: !!param }) }
          })
        })
      }
    }
  }
}
</script>
