<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper tree-dialog'>
    <div class='dialog-container'>
      <TitleContain :titleName="dialogTitle" @TitleFun="close" />
      <div class="dialog-content" style="padding-bottom:40px">
        <div class='content-wrap' style="height: 500px;">
          <el-tree ref="tree" :data="catalogTree" node-key="id" :props="defaultProps" default-expand-all>
            <span class="custom-tree-node" slot-scope="{ node,data }">
              <i style="color:#999" :class="data.children && data.children.length > 0 ? 'el-icon-folder':'el-icon-document'"></i> {{node.label}}
            </span>
          </el-tree>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click='close()'>{{this.$t("biz.btn.close")}}</el-button>
        <el-button type='primary' @click='choose()'>{{this.$t("biz.btn.choose")}}</el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import TitleContain from '@/components/frame/TitleContain'
import { notifyError } from '@/utils/frame/base/notifyParams'

import request from '@/utils/frame/base/request'
export default {
  components: {
    TitleContain
  },
  computed: {
    dialogTitle() {
      return '目录选择'
    }
  },
  data() {
    return {
      catalogTree: [],
      defaultProps: {
        children: 'children',
        label: 'cname'
      }
    }
  },
  methods: {
    loadCatalog() {
      request({
        url: '/api/platform/cfgModule/allCatalog',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: '0'
        }
      })
        .then(response => {
          this.catalogTree = response.data
        })
        .catch(() => {})
    },
    close() {
      this.$emit('closeHandler')
    },
    choose() {
      const currentNode = this.$refs.tree.getCurrentNode()
      if (currentNode) {
        this.$emit('closeHandler', currentNode)
      } else {
        this.$notify(
          notifyError({
            msg: '请选择目录'
          })
        )
      }
    }
  },
  mounted() {
    this.loadCatalog()
  }
}
</script>
