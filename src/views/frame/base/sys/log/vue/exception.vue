<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' type='maxColumnsDialog'>
      <title-contain :titleName="this.$t('sys.log.errorMessage')" @TitleFun="$emit('closeHandler')" />
      <div class="dialog-container__content">
        <!-- 内容 -->
        <div class='dialog-content' style="height:500px;overflow:auto;">
          <code>
            {{param}}
          </code>
        </div>
      </div>
      <!-- 底部 -->
      <div class="dialog-footer">
        <el-button size='mini' @click="$emit('closeHandler')">{{ $t('biz.btn.close') }}</el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import TitleContain from '@/components/frame/TitleContain'
export default {
  props: ['param'],
  components: {
    TitleContain
  }
}
</script>
