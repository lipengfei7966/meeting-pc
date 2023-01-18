<template>
  <div class="bs-new-container app-container atlas">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData">
      <template slot='operation' slot-scope='scope'>
        <div class="operationButton">
<!--          <el-link type="primary" :underline="false" @click="viewDetail(scope)">详情</el-link>-->
          <el-link type="primary" :underline="false" @click="editAtlas(scope)">{{ $t('website.atlas.details') }}</el-link>
          <el-link type="primary" :underline="false" @click="delAtlas(scope)">{{ $t('website.atlas.delete') }}</el-link>
        </div>
      </template>
    </bs-table>
    <atlas  v-if="dialogDetailVisible"  @closeDialogAtlas='closeDialogAtlas' @reload="reload" :eventCode="form.listQuery.data.eventCode"></atlas>
  </div>
</template>

<script>
import atlas from "./components/atlas"
import func from '../../../../base/msg/components/func'
import request from '@/utils/frame/base/request'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'atlasManagement',
  components:{
    atlas
  },
  data(){
    return{
      dialogDetailVisible:false,
      isDisabled:false,//查看时传值 禁止编辑
      form:{
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          funcModule: "图册管理",
          funcOperation: "查询",
          data: {
            name:'',//图册名称
            description:"" ,// 图册介绍
            eventCode:""
          }
        },
        moreShowFlg:false,
        formData:[
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
          label:'website.atlas.atlasTitle',
          prop:"name",
          element:"input-validate",
          attrs: {
            clearable: true
          }
        },{
          label:"website.atlas.atlasIntroduction",
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
          event:this.addAtlas

        }],
        initSearch: false,
        isColset: true,
        table:{
          cols:[{
              prop:"name",
              label:"website.atlas.atlasTitle",
              sortable: false
          }, {
              prop:"description",
              label:"website.atlas.atlasIntroduction",
              sortable: false
          },{
              prop: 'num',
              label: "website.atlas.numberOfPictures",
              sortable: false
          },
            {
              prop: 'operation',
              label:"website.atlas.operation",
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
    // this.$refs.bsTable.getList({name:"search"})
  },
  methods:{
    onChangeAll(params) {
      this.$refs.bsTable.doRefresh()
    },
    //刷新数据
    reload(){
      this.$refs.bsTable.getList({name:"search"})
    },
    //新增图册
    addAtlas(){
      this.dialogDetailVisible = true
    },
    //关闭新增接口
    closeDialogAtlas() {
      this.dialogDetailVisible = false
    },
    //编辑
    editAtlas(item){
       this.$router.push({
         name:"atlasAndPicture",
         params:{
           code: item.row.code
         }
       })
    },
    //删除
    delAtlas(item){
      const h = this.$createElement;
      let that = this;
      this.$msgbox({
        title: this.$t('website.atlas.deletionConfirmation'),
        closeOnClickModal:false,
        message: h('p', null, [
          h('div', null, this.$t('website.atlas.deleteInformation')),
          h('div', { style: 'marginTop:10px' }, this.$t('website.atlas.ConfirmDelete'))
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t('website.atlas.determine'),
        cancelButtonText: this.$t('website.atlas.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = this.$t('website.atlas.deleting')+'...';
            let delId = item.row.code
            that.delRequest(instance,done,delId)
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: that.$t('website.atlas.cancelDelete')
        });
      });
    },
    //删除请求
    delRequest(instance,done,delId){
      let that = this;
      request({
        url: '/api/cms/atlas/remove',
        method: 'POST',
        data: {
          data:delId,
          funcModule:"删除图册",
          funcOperation:"删除"
        }
      }).then((res) => {
        done()
        that.$notify(notifySuccess({ msg:  this.$t('website.atlas.deletSuccess') }))
        that.$refs.bsTable.getList({name:"search"})
      }).catch(() => {

      }).finally(() => {
        instance.confirmButtonLoading=false
      })
    }
  }
}
</script>

<style scoped>
.atlas .operationButton{
  display: flex!important;
  justify-content: flex-start;
  gap: 12px!important;
}
/*label显示省略号*/
>>>.el-form-item__label{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
