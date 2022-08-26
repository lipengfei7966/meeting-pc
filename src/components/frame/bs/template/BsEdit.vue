<template>
  <div>
    <bs-dialog-edit v-el-drag-dialog v-if='edit.mode === "dialog"' :edit='edit' @initCallback='handleInitCallback' @preCallback='handlePreCallback' @closeDialog='handleCloseDialog' @closeLv2Dialog='handleCloseLv2Dialog' ref='bsDialogEdit'></bs-dialog-edit>
    <bs-route-edit v-else :edit='edit' @initCallback='handleInitCallback' @closeDialog='handleCloseDialog' @preCallback='handlePreCallback' @closeLv2Dialog='handleCloseLv2Dialog' ref='bsRouteEdit'></bs-route-edit>
  </div>
</template>

<script>
export default {
  props: {
    edit: {
      type: Object,
      default() {
        return {}
      }
    },
    componentName: {
      type: String,
      default() {
        return 'BsEdit'
      }
    }
  },
  components: {
    bsDialogEdit: () => import('@/components/frame/bs/template/dialog/BsDialogEdit'),
    bsRouteEdit: () => import('@/components/frame/bs/template/BsRouteEdit')
  },
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeDialog', param)
    },
    handleCloseLv2Dialog(param) {
      this.$emit('closeLv2Dialog', param)
    },
    handleInitCallback(param) {
      this.$emit('initCallback', param)
    },
    handlePreCallback(param) {
      this.$emit('preCallback', param)
    }
  }
}
</script>
