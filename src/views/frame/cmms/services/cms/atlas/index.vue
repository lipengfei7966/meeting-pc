<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData">
      <template slot='operation' slot-scope='scope'>
        <div class="operation">
          <el-link type="primary">详情</el-link>
          <el-link type="primary">编辑</el-link>
          <el-link type="primary">删除</el-link>
        </div>
      </template>
    </bs-table>
  </div>
</template>

<script>
import func from '../../../../base/msg/components/func'

export default {
  name: 'atlasManagement',
  data(){
    return{
      form:{
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          funcModule: "图册管理",
          funcOperation: "查询",
          data: {
            name:'',//图册名称
            description:"" // 图册描述
          }
        },
        moreShowFlg:false,
        formData:[{
          label:"图册名称",
          prop:"name",
          element:"input-validate",
          attrs: {
            clearable: true
          }
        },{
          label:"图册描述",
          prop:"description",
          element:"input-validate",
          attrs: {
            clearable: true
          }
        }]
      },
      mainData:{
        api:{
          search:"/api/cms/atlas/page"
        },
        isTopBar: true,
        topBar: [{
          name: 'add',
          type: 'route',
          routeInfo() {
            return {
              name: 'addAtlas'
            }
          }
        }],
        initSearch: false,
        isColset: true,
        table:{
          cols:[{
              prop:"name",
              label:"图册名称",
             sortable: false
          }, {
              prop:"description",
              label:"图册描述",
              sortable: false
          },{
              prop: 'num',
              label: '图片数量',
              sortable: false
          },
            {
              prop: 'operation',
              label: '操作',
              sortable: false,
              isSlot: true //是否开启自定义列设置
            }
          ]
        },
        bottomBar:{
          pagination: {
            show: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      }
    }
  },
  mounted(){
    //初始化数据
    this.$refs.bsTable.getList({name:"search"})
  }
}
</script>

<style scoped>
.operation{
  display: flex!important;
  gap: 12px!important;
}
</style>
