<template>
  <div style="margin-top: 5px">
    <span @click="materialSelection" style="position: relative; left: 90%; top: 50px; font-size: 12px; color: rgb(64, 158, 255); cursor: pointer">插入素材库图片</span>
    <iframe name="myframe" ref="bsEditorFrame" src="static/qmeditor/index.html" style="width: 100%; height: 30rem; border-width: 1px"></iframe>
    <el-dialog title="素材选择" append-to-body :modal-append-to-body="false" :visible.sync="dialogVisible_" :fullscreen="true" destroy-on-close>
      <!-- :labelWidth="false" :isSearch="false"  -->
      <div>
        <material ref="material" :MultiSelect="true" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_ = false">取 消</el-button>
        <el-button type="primary" @click="submit_">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import material from '@/components/MicroStation/materialSelection'
export default {
  components: {
    material
  },
  data() {
    return {
      template: {
        freemarker: null,
        editorWin: null,
        wordFileData: {
          filePath: null,
          fileName: null
        }
      },
      dialogVisible_: false
    }
  },
  inject: ['BsDialogEdit'],
  props: {
    type: String,
    editForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.initDialog()
  },
  methods: {
    initDialog() {
      const bsEditorFrame = this.$refs.bsEditorFrame
      const selfThis = this
      bsEditorFrame.addEventListener('qmEditorInit', function(event) {
        selfThis.template.editorWin = event.detail.editorWin
        selfThis.template.editorWin.setMode('design')
        if (selfThis.type === 'view') {
          selfThis.template.editorWin.setDisabled()
        }
        // 防止加载速度慢于数据返回
        if (selfThis.type === 'view' || selfThis.type === 'update') {
          selfThis.BsDialogEdit.getEditData()
        }
      })
    },
    materialSelection() {
      this.dialogVisible_ = true
    },
    submit_() {
      let str = ''
      this.$refs.material.checkList.forEach(item => {
        str += `<p><img src="${JSON.parse(item).picUrl}" style="width:400px";height:300px;/></p>`
      })
      window.frames['myframe'].execCommand(str)
      this.dialogVisible_ = false
    },
  }
}
</script>
<style lang="scss">
</style>