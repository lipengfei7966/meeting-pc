<template>
<!--  <el-tooltip placement="top">-->
<!--    <div slot="content"><span>{{value}}</span></div>-->
<!--    {{ value | ellipsis(length) }}-->
<!--  </el-tooltip>-->
  <el-tooltip placement="top">
    <div slot="content"><span>{{value}}</span></div>
    <div> {{ value | ellipsis(length) }}</div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'JEllipsis',
  props: {
    value: {
      type: String,
      required: false,
    },
    length: {
      type: Number,
      required: false,
      default: 25,
    }
  },
  created(){
    console.log(this.value)
  }
}
</script>

<style scoped>

</style>
