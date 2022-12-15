<template>
  <bs-dialog-edit v-if='loadAll' v-el-drag-dialog ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
import request from '@/utils/frame/base/request'
import { validateEmail, validateMobile } from '@/utils/frame/base/validate.js'
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
  mounted() {
    this.getFormInfo(this.param.eventCode)
  },
  methods: {
    // 本页面关闭
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    validateInfo(rule, value, callback, prop) {
      if (value.length === 0) {
        this.edit.formData.part1.content.forEach(ele => {
          if (ele.prop === prop && ele.validate[0].required) {
            $('.el-col[data-key=' + prop + '] .is-required .el-form-item__content').attr('data-content', i18n.t('biz.placeholder.require'))
            callback(new Error())
            return
          }
        })
        callback()
      } else {
        if (prop === 'email' && !validateEmail(value)) {
          $('.el-col[data-key=' + prop + '] .is-required .el-form-item__content').attr('data-content', i18n.t('biz.placeholder.email'))
          callback(new Error())
        } else if (prop === 'mobile' && !validateMobile(value)) {
          $('.el-col[data-key=' + prop + '] .is-required .el-form-item__content').attr('data-content', i18n.t('biz.placeholder.mobile'))
          callback(new Error())
        } else {
          callback()
        }
      }
    },
    getFormInfo(eventCode) {
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
            clearable: true
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
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: eventCode,
          isPage: false,
          funcModule: '表单配置',
          funcOperation: '查询列表'
        }
      }).then(response => {
        if (response.data.json) {
          this.edit.formData = JSON.parse(response.data.json)
        } else {
          this.setInfoList = []
        }

        this.loadAll = true
      })
    }
  }
}
</script>
