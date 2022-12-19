<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData" @fileCallback="fileCallback">
      <!-- isException 此列特殊处理-->
      <template slot='beginTime' slot-scope='scope'>
        {{scope.row.beginTime}}-{{scope.row.endTime}}
      </template>
      <template slot='endTime' slot-scope='scope'>
        <span v-if="new Date(scope.row.beginTime) > new Date()">未开始</span>
        <span v-else-if="new Date(scope.row.endTime) < new Date()">已结束</span>
        <span v-else>进行中</span>
      </template>

      <template slot='isGoLive' slot-scope='scope'>
        <el-switch v-model="scope.row.isGoLive==='1'?true:false" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
      </template>
    </bs-table>
  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
import axios from 'axios'
export default {
  name: 'activityManagement',
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
          defaultSortString: 'code.desc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
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
            label: '分活动名称',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: '多项分活动',
            prop: 'radio_',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: [
              { label: '不限制', value: '0' },
              { label: '单人最多参与', value: '1' }
            ]
          },
          {
            label: '启用状态',
            prop: 'isGoLive',
            element: 'base-select',
            list: this.$t('datadict.usingFlag'),
            attrs: {
              clearable: true
            }
          },
          {
            type: 'datetimerange',
            bind: 'activityTime',
            label: '活动时间',
            props: ['activityTimeStart', 'activityTimeEnd'],
            default: this.$toolUtil.getLatestWeek(),
            attrs: {
              cols: 2,
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/register/cmsEventInfoChildren/page',
          doDelete: '/api/register/cmsEventInfoChildren/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'route',

            component: () => import('./edit.vue'),
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                type: 'add'
              }
            }
          },

          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.code
            }
          },

          {
            name: 'export'
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'name',
              label: '分活动名称'
            },
            {
              prop: 'beginTime',
              label: '活动时间',
              isSlot: true,
              width: '320'
            },
            {
              prop: 'endTime',
              label: '活动状态',
              isSlot: true,
              width: '140'
            },

            {
              prop: 'isGoLive',
              isSlot: true,
              label: '启用'
            },
            {
              prop: 'triesLimit',
              label: '报名人数/上限'
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
  mounted() {},
  methods: {
    isGoLiveChange(val) {
      request({
        url: '/api/register/cmsEventInfoChildren/isGoLive',
        method: 'POST',
        data: { data: val, funcModule: '分活动管理', funcOperation: '启用停用' }
      }).then(res => {
        this.$refs.bsTable.getList()
      })
    }
  }
}
</script>
