<template>
  <div v-el-drag-dialog class='bs-container dialog-wrapper'>
    <div class='dialog-container' type='formTableDialog'>
      <title-contain titleName='报表预览' @TitleFun="$emit('closeHandler')" />
      <el-alert title="页面初始化错误,请联系技术人员" v-if="showError" type="error" show-icon></el-alert>
      <template v-if="showTemplate">
        <bs-form ref='bsForm' :form='form' style='border-radius:5px;'></bs-form>
        <bs-table v-if="isPage" ref='bsTable' :mainData='mainData'></bs-table>
        <bs-lazy-table v-else ref="bsTable" :mainData="mainData"></bs-lazy-table>
      </template>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import session from '@/utils/frame/base/sessionStorage'
// 注册组件
const registerComponent = data => {
  if (data && data.length > 0) {
    data.forEach(item => {
      if (item.component) {
        const { component } = item
        item.component = resolve => require.ensure([], () => resolve(require(`@/views/frame/base/generator/${component.split('views/frame/base/generator/')[1]}.vue`)))
      }
    })
  }
}
export default {
  name: 'reportPreview',
  data() {
    return {
      showTemplate: false,
      isPage: true,
      showError: false,
      form: {
        listQuery: {
          code: this.param,
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '',
          data: {}
        },
        formData: []
      },
      mainData: {
        table: {
          cols: []
        },
        bottomBar: {
          pagination: {}
        }
      }
    }
  },
  props: {
    opType: {
      type: String
    },
    param: {
      type: String
    }
  },
  async created() {
    const response = await request({
      url: '/api/code/codeReport/get',
      method: 'post',
      data: {
        data: this.param,
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.preview')
      }
    })
    if (response.data) {
      const resData = response.data.codeDataJson
      this.form.moreShowFlg = resData.form.moreShowFlg
      this.form.listQuery = Object.assign({}, this.form.listQuery, resData.form.listQuery, {
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search'),
        data: {}
      })
      this.form.formData = resData.form.formData
      this.mainData = Object.assign({}, resData.mainData, { api: { search: '/api/code/codeReport/reportSearch' } })
      // this.mainData.table = resData.mainData.table
      // this.mainData.bottomBar = resData.mainData.bottomBar
      // 组件注册
      registerComponent(this.mainData.topBar)
      this.showTemplate = true
      this.isPage = this.form.listQuery.isPage
    } else {
      this.showError = true
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-container {
  overflow: hidden;
  height: 682px; // 因为页面内容请求返回，高度不确定导致无法定位居中，默认加高
  main {
    margin-bottom: 3px !important;
  }
}
</style>
