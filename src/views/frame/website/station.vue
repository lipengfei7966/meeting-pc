<template>
  <div>
    <div :class="!isPc ? 'place' : ''" style="margin-right: 10%; margin-top: 10px; float: right">
      <el-button v-if="isPc" class="btn" type="success" @click="handelClick">选择模板</el-button>
      <el-button v-if="!isPc" style="margin-right: -30px" class="btn" type="success" @click="handelEdit">重新选择模板</el-button>
      <!-- <el-button v-if="!isPc" class="btn" type="success" @click="handelAdd">新增模块</el-button> -->
    </div>
    <ul :class="isPc ? 'isPc' : 'isMo'">
      <li @click="handel(1)" :class="pitchOn ? 'template_one' : ''">
        <templateOne :title_="title_" :subTitle_="subTitle_" :webpagePicDtoList="webpagePicDtoList" :listData="listData" @feature="feature" @itemclick="itemclick" ref="templateOne"></templateOne>
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
import request from '@/utils/frame/base/request'
import templateOne from '@/components/MicroStation/template_one'
export default {
  props: ['listData', 'webpagePicDtoList', 'title_', 'subTitle_'], //接收值
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
  watch: {
    // webpagePicDtoList: {
    //   immediate: true,
    //   handler(newValue, oldValue) {
    //     debugger
    //     console.log(newValue, oldValue)
    //   },
    //   deep: true
    // }
  },
  created() {
    console.log(window.document.location.origin)
  },
  methods: {
    handelClick() {
      // debugger
      if (this.templateVal && this.pitchOn) {
        // debugger
        let webpagePicDtoList = [
          {
            picDictionary: 'background',
            url: this.$refs.templateOne.loginBg
          }
        ]
        if (this.$refs.templateOne.slideshow.length > 0) {
          for (let i = 0; i < this.$refs.templateOne.slideshow.length; i++) {
            // window.document.location.origin + '/' +
            this.$refs.templateOne.slideshow[i].url = this.$refs.templateOne.slideshow[i].url
            webpagePicDtoList.push(this.$refs.templateOne.slideshow[i])
          }
        }
        //
        let webpageButtonDtoList = this.$refs.templateOne.moduleData
        debugger
        console.log(window.document.location.origin)
        for (let j = 0; j < webpageButtonDtoList.length; j++) {
          webpageButtonDtoList[j].icon = webpageButtonDtoList[j].icon
        }
        // debugger
        let data = {
          data: {
            webpagePicDtoList: webpagePicDtoList,
            eventCode: this.$route.params.data,
            templateCode: this.templateVal,
            title: this.$refs.templateOne.title,
            subTitle: this.$refs.templateOne.subTitle,
            webpageButtonDtoList: webpageButtonDtoList
          },
          funcOperation: '首次保存数据',
          funcModule: '首次保存数据'
        }
        request({
          url: '/api/biz/cmsWebpage/save',
          method: 'POST',
          data: data
        })
          .then((res) => {
            // debugger
            // debugger
            console.log(this.$route.params)
            let ids = this.$route.params.data
            if (res.data) {
              console.log(res)
              // 跳转到编辑界面
              this.$router.push({
                name: 'microStationManagement',
                params: {
                  ids: ids
                  // ids: this.$route.params.ids
                }
              })
            } else {
              // 保持当前选模板界面
              this.$router.push({
                name: 'station',
                params: {}
              })
              console.log(res)
            }
          })
          .catch(() => {})
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
        this.templateVal = 'Sudoku_1'
      }
      console.log(val)
    },
    feature(val) {
      //       debugger
      this.sonVal = val
      this.$emit('featureVal', this.sonVal)
      console.log(val)
    },
    watchVal(val, dataNum, colorValue) {
      //       debugger
      if (val == 1) {
        this.$refs.templateOne.watchVal(val, dataNum)
      } else if (val == 2) {
        this.$refs.templateOne.watchVal(val, dataNum)
      } else if (val == 3) {
        this.$refs.templateOne.watchVal(val, dataNum, colorValue)
      }
      console.log(val)
    },
    colorVal(val, dataNum) {
      // debugger
      this.$refs.templateOne.colorVal(val, dataNum)
    },
    itemclick(item, index) {
      // debugger
      this.$emit('itemclick', item, index)
      console.log(item, index)
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
