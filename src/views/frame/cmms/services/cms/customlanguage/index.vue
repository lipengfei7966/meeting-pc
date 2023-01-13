<template>
  <div class="containerBox">
    <div class="bs-new-container app-container">
      <!-- 上边查询 -->
      <bs-form ref="bsForm" :form="form"></bs-form>
      <!-- 模块Tabs -->
      <template v-if="mainData.tabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
        <el-tabs v-model="activeName" type="border-card" style="margin-top: 3px" @tab-click="handleTabClick">
          <el-tab-pane v-for="tab in mainData.tabs" :key="tab.id" :label="tab.label" :name="tab.name">
            <!--  -->
            <!-- 简单文本---=---富文本 -->
            <template v-if="mainData.sonTabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
              <el-tabs v-model="sonActiveName" type="border-card" style="margin-top: 3px" @tab-click="texHandleTabClick">
                <el-tab-pane v-for="tab in mainData.sonTabs" :key="tab.id" :label="tab.label" :name="tab.name">
                </el-tab-pane>
              </el-tabs>
            </template>
            <!--  -->
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 表格数据 -->
      <bs-table ref='bsTable' :mainData='mainData' :mainDataTabs="mainData.tabs" @initCallback='initCallback'>
        <template slot="operation" slot-scope="scope">
          <el-button type="text" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleSetClick(scope.row)">功能设置</el-button>
        </template>
        <!-- ddd -->
        <template slot="ddd" slot-scope="scope">
          <el-input placeholder="请输入"></el-input>
        </template>
      </bs-table>
      <!-- end -->
    </div>
  </div>

</template>

<script>
export default {
  name:'customlanguage',
  data(){
    return {
      // 
      form: {
        moreShowFlg: true,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'createDate.desc',
          data: {}
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO',
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
          // {
          //   label: 'website.customlanguage.query.dictionariesId', //字典ID
          //   prop: 'dictionariesId',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // },
          {
            label: 'website.customlanguage.query.dataFunction',//功能
            prop: 'orderStatus',
            element: 'base-select',
            list: this.$t('datadict.basicOrderStatus'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          // {
          //   label: 'website.customlanguage.query.superiorSettingId',//上级设置项ID
          //   prop: 'orderNumber',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // },
          {
            label: 'website.customlanguage.query.settingItem',//设置项
            prop: 'orderNumber',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: true
            }
          },
          // {
          //   label: 'website.customlanguage.query.dictionaryContent',//字典内容
          //   prop: 'orderNumber',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // }
        ]
      },
      // 
      mainData: {
        initSearch: false,
        isTopBar: false,
        isColset: true,
        tabs: [
          {
            id:'1',
            label:'会议管理',
            name:'会议管理'
          },
          {
            id:'2',
            label:'分活动管理',
            name:'分活动管理'
          },
          {
            id:'3',
            label:'文章管理',
            name:'文章管理'
          },
          {
            id:'4',
            label:'微站设计',
            name:'微站设计'
          }
        ],
        api: {
          search: '/api/pay/basicOrderInfo/page'
        },
        sonTabs: [
          {
            id:'5',
            label:'简单文本设置',
            name:'简单文本设置'
          },
          {
            id:'6',
            label:'富文本设置',
            name:'富文本设置'
          },
        ],
        table: {
          // showCheckbox: true,
          cols: [
            {
              label: this.$t('order.orderManagement.orderStatus'),
              prop: 'orderStatus',
              sortProp: 'funcUser.name',
              width: '100',
              format: {
                dict: this.$t('datadict.basicOrderStatus')
              }
            },
            {
              label: '模块',
              prop: 'aaa',
              width: '120'
            },
            {
              label: '功能',
              prop: 'bbb',
              width: '120'
            },
            {
              label: '设置项',
              prop: 'ccc',
              width: '120'
            },
            {
              label: '中文简体（主语言）',
              prop: 'ddd',
              width: '150',
              isSlot: true,
            },
            {
              label: '英文',
              prop: 'eee',
              width: '150'
            },
            {
              label: '中文繁体',
              prop: 'fff',
              width: '150'
            },
            {
              label: '操作',
              prop: 'operation',
              width: '120',
              isSlot: true,
              align: 'center',
              fixed: 'right'
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
      },
      activeName:'会议管理',
      sonActiveName:'简单文本设置'
    }
  },
  mounted() {
    // 初始化数据
    this.$refs.bsTable.getList()
  },
  methods:{
    // 外层tabs（模块类型）
    handleTabClick(tab) {
    },
    // 内层tabs（文本类型）
    texHandleTabClick(tab){
    },
    // 初始化
    initCallback(){

    },
    handleEditClick(){

    },
    handleSetClick(){

    },
  }
}
</script>

<style scoped lang="scss">
::deep .bs-new-container .el-pagination {
  margin: 50px 0;
  line-height: 100px;
}
</style>