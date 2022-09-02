<template>
  <div class="contents">
     <station ref="station" />
  </div>
</template>        
<script>
import station from '@/components/MicroStation/station'
export default {
  name: 'stencilManagement',
  components: {
    station
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .contents{
    width: 100%;
    height: 100%;
    // min-height: 600px;
    // padding: 10px;
    // border: 1px solid red;
  }
</style>
