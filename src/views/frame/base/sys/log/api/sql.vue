<template>
  <bs-dialog-table ref='bsDialogTable' :dialog='dialog' @closeDialog='handleCloseDialog'>
    <!-- isException 此列特殊处理-->
    <template slot='operator' slot-scope='scope'>
      <el-button @click="handleCopy(scope.row)" type="text" size="small">复制sql</el-button>
    </template>
  </bs-dialog-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        titleName: '执行SQL',
        moreShowFlg: false,
        allowDblClick: false, // 弹窗是否允许双击列表行关闭
        formData: [
          {
            label: 'logId',
            prop: 'logId',
            element: 'input-validate',
            attrs: {
              clearable: true
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            isShow: true,
            default: this.param.id
          },
          {
            prop: 'sqlType',
            default: 'log'
          }
        ],

        mainData: {
          initSearch: true,
          api: {
            search: '/api/log/sql/page'
          },
          apiData: {
            search(listQuery) {
              return listQuery
            }
          },
          table: {
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
              },
              {
                prop: 'execSql',
                width: '300',
                label: '执行Sql'
              },
              {
                isSlot: true,
                prop: 'operator',
                width: '100',
                label: '操作'
              }
            ]
          }
        },

        bottomButtons: [
          {
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['view'],
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  props: {
    editForm: {
      type: Object,
      default() {
        return {}
      }
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {},
  methods: {
    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    },
    handleCopy(row) {
      console.log(row)
      this.copyToClipboard(row.execSql)
    },
    copyToClipboard(execSql) {
      var oInput = document.createElement('input') //创建一个隐藏input（重要！）
      oInput.value = execSql //赋值
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message.success('复制成功')
    }
  }
}
</script>
