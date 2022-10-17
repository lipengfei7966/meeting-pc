<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <!-- <bs-table ref="bsTable" :mainData="mainData"></bs-table> -->
    <div style="padding: 0 20px">
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="外观设置"></el-step>
          <el-step title="表单设置"></el-step>
          <el-step title="其他设置"></el-step>
        </el-steps>
      </div>
      <div class="formSet">
        <el-card class="formInfo">
          <div slot="header" class="formInfoTitle">
            <span>表单信息</span>
          </div>

          <div>
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <h2>基本信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(baseInfoItem, baseInfoIndex) in baseInfoList" :key="baseInfoIndex"> {{ baseInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>联系方式</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(contactWayItem, contactWayIndex) in contactWayList" :key="contactWayIndex"> {{ contactWayItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>工作信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(workInfoItem, workInfoIndex) in workInfoList" :key="workInfoIndex"> {{ workInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>自定义信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(customInfoItem, customInfoIndex) in customInfoList" :key="customInfoIndex"> {{ customInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>特殊信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(specialInfoItem, specialInfoIndex) in specialInfoList" :key="specialInfoIndex"> {{ specialInfoItem.label }} </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
        <el-card class="formPreview">
          <div>
            <h2 style="text-align:center">2022完美海南博鳌研讨会</h2>
            <draggable v-model="setInfoList" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
              <transition-group>
                <!-- <div class="item">
                  姓名：<el-input type="text"></el-input>
                </div> -->
                <div class="setInfoItem" v-for="element in setInfoList" :key="element.value">
                  <div>
                    {{element.label}} <el-input style="width: 50%" type="text" size="mini"></el-input>
                  </div>

                </div>
              </transition-group>
            </draggable>
          </div>
        </el-card>
        <div class="formEdit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
export default {
  name: 'signupContactCol',
  data() {
    return {
      form: {
        moreShowFlg: false,
        listQuery: {
          current: 1,
          size: 20,
          isPage: false,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'mapSort.asc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.signupContactCol.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true
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
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/register/signupContactCol/page',
          doDelete: '/api/register/signupContactCol/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'initialize',
            type: 'route',
            i18n: '初始化表单',
            event: this.initialize
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'mapCode',
              label: 'website.signupContactCol.list.mapCode'
            },
            {
              prop: 'mapName',
              label: 'website.signupContactCol.list.mapName'
            },
            {
              prop: 'mapComp',
              label: 'website.signupContactCol.list.mapComp',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapComp')
              }
            },
            {
              prop: 'mapBase',
              label: 'website.signupContactCol.list.mapBase',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapBase')
              }
            },

            {
              prop: 'mapCompAttr',
              label: 'website.signupContactCol.list.mapCompAttr',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapCompAttr')
              }
            },
            {
              prop: 'enumLable',
              label: 'website.signupContactCol.list.enumLable'
            },
            {
              prop: 'mapType',
              label: 'website.signupContactCol.list.mapType',
              align: 'center',
              format: {
                dict: this.$t('datadict.yesNo')
              }
            },
            {
              prop: 'mapSort',
              label: 'website.signupContactCol.list.mapSort'
            }
          ]
        }
      },
      baseInfoList: [
        {label: '姓名', value: 'name'},
        {label: '性别', value: 'gender'},
        {label: '证件', value: 'certificate'},
        {label: '照片', value: 'photo'},
      ],
      contactWayList:[
        {label: '地址', value: 'address'},
        {label: '手机号', value: 'phone'},
        {label: '备用手机', value: 'secondPhone'},
        {label: '固定电话', value: 'telephone'},
        {label: '传真', value: 'fax'},
        {label: '邮箱', value: 'email'},
        {label: '备用邮箱', value: 'secondEmail'},
        {label: '微信号', value: 'wechat'},
        {label: 'QQ号', value: 'QQ'},
      ],
      workInfoList:[
        {label: '公司', value: 'company'},
        {label: '部门', value: 'department'},
        {label: '职位', value: 'position'},
      ],
      customInfoList:[
        {label: '短文本', value: 'input'},
        {label: '长文本', value: 'textarea'},
        {label: '数字', value: 'number'},
        {label: '单选框', value: 'radio'},
        {label: '复选框', value: 'checkbox'},
        {label: '下拉列表', value: 'select'},
        {label: '下拉复选框', value: 'selects'},
        {label: '附件', value: 'file'},
        {label: '日期', value: 'date'},
      ],
      specialInfoList: [
        {label: '分割线', value: 'crossLine'},
        {label: '分页', value: 'paging'},
        {label: '说明信息', value: 'explainInfo'},
      ],
      drag: false,
      setInfoList: [
        {
          label: '姓名',
          type: 'input',
          isRequired: false,
          placeholder: '',
        },
        {label: '姓名', value: 'name'},
        {label: '性别', value: 'gender'},
        {label: '证件', value: 'certificate'},
        {label: '照片', value: 'photo'},
      ], // 选中的配置信息列表
      // 表格高度
      formSetHeight: 0,
    }
  },
  components: {
    draggable,
  },
  mounted() {},
  methods: {
    //开始拖拽事件
      onStart(){
        this.drag=true;
      },
      //拖拽结束事件
       onEnd() {
       this.drag=false;
    },
    onChangeAll(params) {
      // params.code
      // debugger
      // this.$refs.bsTable.doRefresh()
    },
    initialize() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      request({
        url: '/api/register/signupContactCol/initialize',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.$refs.bsTable.doRefresh()
        })
    },
    // 计算列表高度
    // tableComputed() {
    //     const elHead = document.getElementById('elHead')
    //     let getElHeadHeight = 0
    //     if (this.hasLayout) {
    //       this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 188 : this.clientHeight - getElHeadHeight - 158) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 172 : this.clientHeight - getElHeadHeight - 142
    //     } else {
    //       this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 97 : this.clientHeight - getElHeadHeight - 67) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 77 : this.clientHeight - getElHeadHeight - 47
    //     }
    //     if (this.mainData.isTabBar) {
    //       this.formSetHeight = this.formSetHeight - 30
    //     }
    // },
  }
}
</script>

<style lang="scss" scoped>
.steps {
  width: 80%;
  margin: 0 auto;
}
.formSet {
  display: flex;
  justify-content: space-between;
  min-width: 1130px;
  .formInfo {
    width: 20%;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }
    .formInfoItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .formInfoItem {
      min-width: 50px;
      margin: 10px 10px;
      text-align: center;
      cursor: pointer;
    }
  }
  .formPreview {
    width: 60%;
    margin: 0 20px;
    .setInfoItem {
      width: 100%;
      margin: 10px 0;
      padding: 10px 30px;
      background: #eee;
    }
  }
  .formEdit {
    width: 20%;
  }
}
</style>