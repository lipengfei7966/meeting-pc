<template>
  <bs-dialog :dialog="dialog" @closeDialog="handleCloseDialog"></bs-dialog>
</template>

<script>
export default {
  name: 'dictypeAdd',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        initType: 'param',
        styleType: 'medium',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          save: '/api/register/signupDictype/save',
        },

        formData: [
          {
            label: '场景名称',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: '',
            prop: 'type',
            element: 'input-validate',
            default:2,
            isShow:false
          },
          {
            label: '',
            prop: 'eventCode',
            element: 'input-validate',
            default:this.param,
            isShow:false
          }
        ],
        bottomButtons: [
          {
            name: 'biz.btn.save',
            event: 'save',
            showLoading: true,
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'add'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  methods: {
    handleCloseDialog(param) {
      this.$parent.$parent.sceneList();
      this.$emit('closeHandler', param);
    }
  }
}
</script>
