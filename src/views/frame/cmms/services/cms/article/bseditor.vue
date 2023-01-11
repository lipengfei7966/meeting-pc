<template>
  <div style="margin-top: 5px">
    <!--    <span @click="materialSelection" style="position: relative; left: 90%; top: 50px; font-size: 12px; color: rgb(64, 158, 255); cursor: pointer">插入素材库图片</span>-->
    <div class="addMaterialWrap" v-if="!dialogVisible_">
      <div class="wrap" @mouseover.stop="addActive($event)" @mouseout.stop="removeActive($event)"
           @mouseleave.stop="removeActive($event)">
        <div class="titleInfo" :style="{display:displayFlag}" style="display: flex;justify-content: center">
          插入素材库图片
        </div>
        <div class="addMaterial" @click="materialSelection"
             style="background-image: url('./static/qmeditor/themes/default/images/icons.png')">
        </div>

      </div>
    </div>
    <iframe name="myframe" ref="bsEditorFrame" src="static/qmeditor/index.html"
            style="width: 100%; height: 30rem; border-width: 1px"></iframe>
    <el-dialog title="素材选择" append-to-body :modal-append-to-body="false" :visible.sync="dialogVisible_"
               :fullscreen="true" destroy-on-close>
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
      displayFlag: 'none',
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
    addActive($event) {
      $event.currentTarget.className = 'wrap wrapActive'
      setTimeout(() => {
        this.displayFlag = 'block'
      }, 2000)
    },
    removeActive($event) {
      $event.currentTarget.className = 'wrap'
      this.displayFlag = 'none'
    },
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
      this.displayFlag = true
    },
    submit_() {
      console.log('测试1', this.$refs.material.checkList)
      let str = ''
      this.$refs.material.checkList.forEach((item) => {
        str += `<p><img src="${JSON.parse(item).picUrl}" style="width:400px";height:300px;/></p>`
      })
      window.frames['myframe'].execCommand(str)
      this.dialogVisible_ = false
    }
  }
}
</script>
<style lang="css">
.addMaterialWrap {
  position: absolute;
  height: 24.5px;
  top: 39.5px;
  left: 408px;
}

.addMaterial {
  height: 20px;
  width: 20px;
  background-position: -380px 0px;
  position: relative;
}

.wrap {
  height: 24.5px;
  width: 22px;
  position: absolute;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid transparent;

}

.wrapActive {
  position: absolute;
  background-color: #fff5d4;
  border: 1px solid #dcac6c;
  padding: 0;
}

.titleInfo {
  position: absolute;
  top: 33px;
  left: 10px;
  width: 94px;
  padding: 2px 0;
  transform: scale(0.95);
  font-weight: 500;
  text-align: center;
  background-color: #373739;
  border-radius: 2px;
  font-size: 12px;
  color: #FFFFFF;
}
</style>
