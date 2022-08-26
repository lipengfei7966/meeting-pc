<template>
  <bs-edit-tab ref="tab" :tab="tab"></bs-edit-tab>
</template>

<script>
export default {
  data() {
    return {
      tab: {
        type: this.type,
        param: this.$route.params,
        api: {
          search: '/api/log/sql/page'
        },
        apiData: {
          search(param) {
            return {
              logId: param.id,
              sqlType: 'log'
            }
          }
        },
        topBar: [
          {
            name: 'add',
            iconName: 'addLine',
            i18n: 'biz.btn.addRow',
            isShow: ['add', 'update', 'detailSet']
          }
        ],
        table: {
          height: 450,
          cols: [
            {
              prop: 'createUser',
              width: '120',
              label: '创建者'
            },
            {
              prop: 'createDate',
              width: '150',
              label: '创建日期'
            },
            {
              prop: 'method',
              width: '400',
              label: '方法信息'
            }
          ]
        }
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'update'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  }
}
</script>
