<template>
  <div class="contents">
    <templateOne ref="templateOne" v-if="isState == 0" />
  </div>
</template>        
<script>
import templateOne from '@/components/MicroStation/template_one'
export default {
  name: 'stencilManagement',
  components: {
    templateOne
  },
  data() {
    return {
      isState: 0
    }
  },
  methods: {
    handelEdit() {},
    handelAdd() {}
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
