<template>
  <div class="contents">
    <templateOne ref="templateOne" v-if="isState == 0" :title_="title_" :subTitle_="subTitle" :webpagePicDtoList="webpagePicDtoList" :listData="listData" />
  </div>
</template>        
<script>
import request from '@/utils/frame/base/request'
import templateOne from '@/components/MicroStation/template_one'
export default {
  name: 'stencilManagement',
  components: {
    templateOne
  },
  data() {
    return {
      isState: 0,
      title_: '',
      subTitle: '',
      listData: [],
      webpagePicDtoList: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // debugger
      request({
        url: '/api/biz/cmsWebpage/getByEventCode',
        method: 'POST',
        data: { data: this.$route.query.ids || '0001', funcModule: '获取网页列表', funcOperation: '获取网页列表' }
      })
        .then((res) => {
          debugger
          if (res.data) {
            this.title_ = res.data.title
            this.subTitle = res.data.subTitle
            this.listData = res.data.webpageButtonDtoList
            this.webpagePicDtoList = res.data.webpagePicDtoList
          } else {
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.contents {
  width: 100%;
  height: 100%;
  // min-height: 600px;
  // padding: 10px;
  // border: 1px solid red;
}
</style>
