<template>
  <div class="contents" :style="{ backgroundImage: 'url(' + loginBg + ')' }">
    <div class="block">
      <el-carousel trigger="click" height="180px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in slideshow" :key="index">
          <img :src="`${item.img}`" alt="" style="width: 100%" />
          <!-- <h2>{{ index }}</h2> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <p class="p_big">{{ bigTitle }}</p>
      <p class="p_small">{{ smallTitle }}</p>
      <div>
        <ul class="feature">
          <li :style="isTrue ? { backgroundColor: backColor } : ''" v-for="(item, index) in moduleData" :key="index" @click.stop="handel(item, index)">
            <div class="conDiv">
              <!-- <i class="el-icon-goods classRgb"></i> -->
              <img :src="`${item.img}`" alt="" style="width: 100%" />
              <!-- <p class="classTxt">{{ item.title }}</p> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'station',
  components: {},
  data() {
    return {
      isTrue: true,
      loginBg: require('./images/底图.jpg'),
      backColor: 'rgba(198, 75, 34, 0.2)',
      backColor_: 'rgba(198, 75, 34, 0.2)',
      bigTitle: '2022中国人保寿险第十四届高峰会',
      smallTitle: '中国-武汉',
      pitchOn: false,
      moduleData: [
        {
          img: require('@/assets/templateIcon/活动日程.png'),
          sort: 0,
          title: '活动日程'
        },
        {
          img: require('@/assets/templateIcon/荣誉殿堂.png'),
          sort: 1,
          title: '荣誉殿堂'
        },
        {
          img: require('@/assets/templateIcon/讲师介绍.png'),
          sort: 2,
          title: '讲师介绍'
        },
        {
          img: require('@/assets/templateIcon/精彩照片.png'),
          sort: 3,
          title: '精彩照片'
        },
        {
          img: require('@/assets/templateIcon/峰会直播.png'),
          sort: 4,
          title: '峰会直播'
        },
        {
          img: require('@/assets/templateIcon/抽奖说明.png'),
          sort: 5,
          title: '喜从天降'
        }
      ],
      slideshow: [
        {
          img: require('@/assets/images/banner.png')
        }
      ]
    }
  },
  methods: {
    handel(item, index) {
      console.log(item, index)
    },
    watchVal(val) {
      //       debugger
      if (val == 1) {
        this.isTrue = true
      } else if (val == 2) {
        this.isTrue = false
      } else if (val == 3) {
        this.isTrue = true
      }
      console.log(val)
    },
    colorVal(val) {
      this.backColor = val
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
