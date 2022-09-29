<template>
  <bs-dialog-edit v-if='loadAll' v-el-drag-dialog ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      loadAll: false,
      edit: {
        type: this.opType,
        param: this.param,
        api: {
          view: '/api/register/signupContact/getByContactCode',
          save: '/api/register/signupContact/save',
          update: '/api/register/signupContact/update'
        },
        apiData: {
          view(param) {
            return param.code
          }
        },
        topButtons: [
          {
            iconName: 'cancel',
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add', 'update']
          },
          {
            name: 'biz.btn.save',
            iconName: 'save',
            event: 'save',
            showLoading: true,
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: '基本信息',
            content: []
          },
          part2: {
            titleName: '扩展字段',
            dtoKey: 'signupContactDtlDto',
            content: []
          }
        }
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'add'
    },
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  mounted(){
    this.getFormInfo(this.param.eventCode);
  },
  methods: {
    // 本页面关闭
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    getFormInfo(eventCode){
      this.loadAll = false
      this.edit.formData.part2.content = []
      this.edit.formData.part1.content = [
        {
          label: 'website.signupContact.edit.eventCode',
          prop: 'eventCode',
          element: 'base-select',
          attrs: {
            multiple: false,
            data: 'EVENT_INFO',
            clearable: true,
            disabled: true
          },
          default: eventCode,
          validate: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          event: {
            change: this.getFormInfo
          }
        },
        {
          label: 'website.signupContact.edit.contactType',
          prop: 'contactType',
          element: 'base-select',
          list: this.$t('datadict.contantType'),
          attrs: {
            clearable: true,
          },
          validate: [
            {
              required: true,
              trigger: 'blur'
            }
          ]
        }
      ]
      request({
      url: '/api/register/signupContactCol/page',
      method: 'POST',
      data: {
        data: {
          eventCode: eventCode
        },
        isPage: false,
        funcModule: '表单配置',
        funcOperation: '查询列表'
      }
      }).then(response => {
        debugger
        response.data.forEach(element => {
          debugger
          if (element.mapType === '1' && element.mapCode !== 'contactType') {
            const rs = {
              label: element.mapName,
              prop: element.mapCode,
              element: '',
              isShow: true,
              attrs: {},
              validate: [
                {
                  required: element.mapRequired==='1'?true:false,
                  trigger: 'blur'
                }
              ]
            }
            if (element.mapComp==='1') {
              rs.element = 'input-validate'
            }else if (element.mapComp==='3') {
              rs.element = 'base-select'
                rs.attrs = eval('(' + element.enumLable + ')')
            }else if (element.mapComp==='2') {
              rs.type = 'date'
              rs.attrs = {
                clearable: true,
                format: 'yyyy-MM-dd',
                'value-format': 'yyyyMMdd'
              }
            }
            if (element.mapBase === '2') {
              this.edit.formData.part1.content.push(rs)
            }else{
              this.edit.formData.part2.content.push(rs)
            }
          }
        })
        this.loadAll = true
      })
    }
  }
}
</script>
