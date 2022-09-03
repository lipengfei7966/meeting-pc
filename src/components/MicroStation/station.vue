<template>
  <div>
    <div :class="!isPc ? 'place' : ''" style="margin-right: 10%; margin-top: 10px; float: right">
      <el-button v-if="isPc" class="btn" type="success" @click="handelClick">选择模板</el-button>
      <el-button v-if="!isPc" style="margin-right: -40px" class="btn" type="success" @click="handelEdit">重新选择模板</el-button>
      <!-- <el-button v-if="!isPc" class="btn" type="success" @click="handelAdd">新增模块</el-button> -->
    </div>
    <ul :class="isPc ? 'isPc' : 'isMo'">
      <li @click="handel(1)" :class="pitchOn ? 'template_one' : ''">
        <templateOne @feature="feature" ref="templateOne"></templateOne>
      </li>
      <!-- <li>模板二</li>
      <li>模板三</li>
      <li>模板四</li> -->
      <li v-if="isPc" style="font-size: 20px; color: lightgray; text-align: center" @click="handel()">
        <span style="position: relative; top: 40%">
          <span>更多模板 敬请期待 </span>
          <i class="el-icon-more-outline"></i>
        </span>
      </li>
      <li v-if="isPc" style="font-size: 20px; color: lightgray; text-align: center" @click="handel()">
        <span style="position: relative; top: 40%">
          <span>更多模板 敬请期待 </span>
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
      isPc: true,
      pitchOn: false,
      templateVal: '',
      sonVal: []
    }
  },
  methods: {
    handelClick() {
      // debugger
      if (this.templateVal) {
        this.$router.push({
          name: 'microStationManagement',
          query: {
            //   event_num: this.menus.event_num,
            //   id: this.$route.query.id,
            //   name: this.$route.query.name,
            //   eventSearchType: this.$route.query.eventSearchType,
            //   type: 'edit'
          }
        })
      } else {
        this.$message('请选择一个模板！')
      }
    },
    handelAdd() {},
    handelEdit() {
      this.$message('暂无更多模板！')
    },
    handel(val) {
      if (val == 1) {
        this.pitchOn = !this.pitchOn
        //       debugger
        this.templateVal = val
      }
      console.log(val)
    },
    feature(val) {
      //       debugger
      this.sonVal = val
      this.$emit('featureVal', this.sonVal)
      console.log(val)
    },
    watchVal(val) {
      //       debugger
      if (val == 1) {
        this.$refs.templateOne.watchVal(val)
      } else if (val == 2) {
        this.$refs.templateOne.watchVal(val)
      } else if (val == 3) {
        this.$refs.templateOne.watchVal(val)
      }
      console.log(val)
    },
    colorVal(val) {
      this.$refs.templateOne.colorVal(val)
    }
  }
}
</script>

<style scoped lang="scss">
.isPc {
  li {
    width: 22%;
  }
}
.isMo {
  li {
    width: 100%;
  }
}
ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  li {
    width: 22%;
    height: 85vh;
    box-shadow: 0 2px 12px 0 lightgray;
    // padding: 10px 10px;
    margin-bottom: 20px;
  }
  li:hover {
    box-shadow: 0 2px 22px 0 lightgray;
  }
}
.btn {
  //   float: right;
  margin-bottom: 15px;
}
.place {
  margin-right: 2%;
}
.template_one {
  border: 3px solid lightblue;
  box-shadow: 0 2px 22px 0 lightgrey;
}
</style>
