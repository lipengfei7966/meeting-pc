<template>
  <div class="contents" :style="{ backgroundImage: 'url(' + loginBg + ')' }">
    <div class="block">
      <el-carousel trigger="click" height="180px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in slideshow" :key="index">
          <img :src="`${item.url}`" alt="" style="width: 100%" />
          <!-- <h2>{{ index }}</h2> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <p class="p_big">{{ title }}</p>
      <p class="p_small">{{ subTitle }}</p>
      <div>
        <ul class="feature">
          <li v-for="(item, index) in moduleData" :key="index" :style="isTrue ? { backgroundColor: item.backgroundColor } : ''" @click.stop="handel(item, index)">
            <div class="conDiv">
              <!-- <i class="el-icon-goods classRgb"></i> -->
              <img :src="`${item.icon}`" alt="" style="width: 100%" />
              <!-- <p class="classTxt">{{ item.content }}</p> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['listData', 'webpagePicDtoList', 'title_', 'subTitle_'], //接收值
  name: 'station',
  components: {},
  data() {
    return {
      isTrue: true,
      // loginBg: require('./images/底图.jpg'),
      loginBg: 'static/meeting/img/baseMap/dt.jpg',
      backColor: 'rgba(198, 75, 34, 0.2)',
      backColor_: 'rgba(198, 75, 34, 0.2)',
      title: '2022中国人保寿险第十四届高峰会',
      subTitle: '中国-武汉',
      pitchOn: false,
      moduleData: [
        {
          // img: require('@/assets/templateIcon/活动日程.png'),
          icon: 'static/meeting/img/templateIcon/hdrc.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          sort: 0,
          title: '活动日程',
          content: ''
        },
        {
          // img: require('@/assets/templateIcon/荣誉殿堂.png'),
          icon: 'static/meeting/img/templateIcon/rydt.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          sort: 1,
          title: '荣誉殿堂',
          content: ''
        },
        {
          // img: require('@/assets/templateIcon/讲师介绍.png'),
          icon: 'static/meeting/img/templateIcon/jsjs.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          sort: 2,
          title: '讲师介绍',
          content: ''
        },
        {
          // img: require('@/assets/templateIcon/精彩照片.png'),
          icon: 'static/meeting/img/templateIcon/jczp.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          title: '精彩照片',
          sort: 3,
          content: ''
        },
        {
          // img: require('@/assets/templateIcon/峰会直播.png'),
          icon: 'static/meeting/img/templateIcon/fhzb.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          title: '峰会直播',
          sort: 4,
          content: ''
        },
        {
          // img: require('@/assets/templateIcon/抽奖说明.png'),
          icon: 'static/meeting/img/templateIcon/cjsm.png',
          backgroundColor: 'rgba(198, 75, 34, 0.2)',
          title: '喜从天降',
          sort: 5,
          content: ''
        }
      ],
      slideshow: [
        {
          picDictionary: 'rotation',
          // url: require('@/assets/images/banner.png')
          url: 'static/meeting/img/slideshow/banner.png'
        }
      ]
    }
  },
  watch: {
    listData: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          debugger
          // console.log(window.document.location)
          console.log(newValue, oldValue)
          // if (newValue.backColor) {
          this.moduleData = newValue
          // }
          console.log(newValue, oldValue, 'dd')
        }
      },
      deep: true
    },
    webpagePicDtoList: {
      immediate: true,
      handler(newValue, oldValue) {
        // debugger
        if (newValue) {
          let arr = []
          newValue.forEach((element, index) => {
            if (element.picDictionary == 'background') {
              // if (element.url.indexOf('http') == -1) {
              //   this.loginBg = window.document.location.origin + element.url
              // } else {
              //   this.loginBg = element.url
              // }
              this.loginBg = element.url
            } else {
              // if (element.url.indexOf('http') == -1) {
              //   element.url = window.document.location.origin + element.url
              //   arr.push(element)
              // } else {
              //   arr.push(element)
              // }
              arr.push(element)
              // debugger
            }
          })
          this.slideshow = arr
          console.log(newValue, oldValue, this.slideshow, 'dd')
        }
      },
      deep: true
    },
    title_: {
      immediate: true,
      handler(nVal, oVal) {
        if (nVal) {
          // debugger
          this.title = nVal
          console.log(nVal, oVal)
        }
      }
    },
    subTitle_: {
      immediate: true,
      handler(nVal, oVal) {
        if (nVal) {
          // debugger
          this.subTitle = nVal
          console.log(nVal, oVal)
        }
      }
    }
  },
  methods: {
    handel(item, index) {
      // debugger
      if (item.type == 'url') {
        window.location.href = item.content
      } else {
        this.$message('暂无页面资源！')
      }
      console.log(item, index)
    },
    watchVal(val, dataNum, colorValue) {
      debugger
      if (val == 1) {
        // this.isTrue = true
        this.moduleData[dataNum].backgroundColor = this.backColor_
        this.moduleData[dataNum].backgroundSetting = val
      } else if (val == 2) {
        // this.isTrue = true
        console.log(this.moduleData[dataNum])
        this.moduleData[dataNum].backgroundColor = ''
        this.moduleData[dataNum].backgroundSetting = val
      } else if (val == 3) {
        // this.isTrue = true
        this.moduleData[dataNum].backgroundColor = colorValue
        this.moduleData[dataNum].backgroundSetting = val
      }
      console.log(val)
    },
    colorVal(val, dataNum) {
      this.backColor = val
      this.moduleData[dataNum].backgroundColor = val
    }
  },
  mounted() {
    this.$emit('feature', this.moduleData)
  }
}
</script>
<style scoped lang="scss">
.p_big {
  font-size: 18px;
  color: rgb(253, 251, 196);
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
}
.p_small {
  text-align: center;
  font-size: 12px;
  color: rgb(253, 251, 196);
  margin-top: 10px;
  margin-bottom: 10px;
}
.contents {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  //   background-image: url('./images/demo.jpeg');
  background-size: 100% 100%;
}
.feature {
  margin: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //   align-items: center;
  li {
    text-align: center;
    cursor: pointer;
    width: 30%;
    height: 12vh;
    //     background-color: rgba(198, 75, 34, 0.2);
    //     border: 1px solid red;
    margin-bottom: 10px;
  }
}
.classRgb {
  font-size: 30px;
  color: white;
  //   margin-top: 15px;
}
.classTxt {
  font-size: 12px;
  //   margin-top: 3px;
  color: white;
  font-weight: 500;
}
.conDiv {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>
