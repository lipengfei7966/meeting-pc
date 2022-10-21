<template>
  <div style="margin-top: 5px">
    <span @click="materialSelection" style="position: absolute; right: 18%; top: 40px; font-size: 12px; color: #409eff; cursor: pointer">素材库图片</span>
    <iframe ref="bsEditorFrame" src="static/qmeditor/index.html" style="width: 100%; height: 30rem; border-width: 1px"></iframe>
    <el-dialog title="素材选择" :modal-append-to-body="false" :visible.sync="dialogVisible_" :fullscreen="true" destroy-on-close>
      <!-- :labelWidth="false" :isSearch="false"  -->
      <material ref="material" :MultiSelect="true" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_ = false">取 消</el-button>
        <el-button type="primary" @click="submit_">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import material from '@/components/MicroStation/materialSelection'
import request from '@/utils/frame/base/request'
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
      bsEditorFrame.addEventListener('qmEditorInit', function (event) {
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
      // console.log(this.template.editorWin, '打点')
      console.log(this.$refs.material.checkList, this.$refs.material.treeDatas)
      // 获取富文本的内容
      let str = this.template.editorWin.getContent()
      this.$refs.material.checkList.forEach((item) => {
        str += `<p><img src="${item.picUrl}" style="width:400px";height:300px;/></p>`
      })
      debugger
      this.template.editorWin.setContent(str, true)
      this.dialogVisible_ = false
    }
  }
}
</script>
<style lang="scss">
// .bs-new-container label {
//   font-weight: 500;
// }
// .bs-new-container .el-dialog .el-dialog__header {
//   width: 100%;
//   height: 50px;
//   line-height: 50px;
//   background: #265588;
//   text-align: left;
//   color: #fff;
//   padding: 0;
//   overflow: hidden;
// }
// .bs-new-container .el-dialog .el-dialog__header .el-dialog__title {
//   user-select: none;
//   font-size: 14px !important;
//   color: #fff !important;
//   margin-left: 10px;
// }
// .bs-new-container .el-dialog .el-dialog__header .el-dialog__headerbtn {
//   right: 12px !important;
//   top: 18px !important;
//   color: #ccc !important;
//   font-size: 16px !important;
// }
// .el-dialog__headerbtn .el-dialog__close {
//   color: #fff;
// }
</style>