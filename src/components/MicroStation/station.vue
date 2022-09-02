<template>
  <div>
    <div>
      <el-button class="btn" type="success" @click="handelClick">选择模板</el-button>
    </div>
    <ul :class="isPc? isPc : isMo">
      <li>模板一</li>
      <li>模板二</li>
      <li>模板三</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'station',
  components: {},
  data() {
    return {
      isPc: true
    }
  },
  methods: {
    handelClick() {}
  }
}
</script>

<style scoped lang="scss">
.isPc {
}
.isMo {
}
ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  li {
    width: 30%;
    min-height: 600px;
    box-shadow: 0 2px 12px 0 lightgray;
    padding: 5px 10px;
  }
  li:hover {
    box-shadow: 0 2px 22px 0 lightgray;
  }
}
.btn{
  float: right;
  margin-bottom: 10px;
}
</style>
