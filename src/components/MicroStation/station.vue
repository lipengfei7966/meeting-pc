<template>
  <div>
    <div style="margin-right:80px; margin-top: 10px;">
      <el-button class="btn" type="success" @click="handelClick">选择模板</el-button>
    </div>
    <ul :class="isPc? isPc : isMo">
      <li @click="handel(0)">
        <templateOne></templateOne>
      </li>
      <!-- <li>模板二</li> -->
      <li style="font-size: 20px;
    color: lightgray;
    text-align: center;" @click="handel(2)" >
    <span style="position: relative;
    top: 40%;">
      <span>更多模板 尽情期待 </span>
        <i class="el-icon-more-outline"></i>
    </span>
        
        </li>
    </ul>
  </div>
</template>

<script>
import templateOne from '@/components/MicroStation/template_one'
export default {
  name: 'station',
  components: {
    templateOne
  },
  data() {
    return {
      isPc: true
    }
  },
  methods: {
    handelClick() {},
    handel(val) {
      console.log(val);
    }
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  li {
    width: 25%;
    height: 600px;
    box-shadow: 0 2px 12px 0 lightgray;
    padding: 10px 10px;
    margin-bottom: 20px;
  }
  li:hover {
    box-shadow: 0 2px 22px 0 lightgray;
  }
}
.btn {
  float: right;
  margin-bottom: 20px;
}
</style>
