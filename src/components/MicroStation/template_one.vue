<template>
  <div class="contents">
    <div class="block">
    <el-carousel trigger="click" height="200px" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>
    <p class="p_big">{{bigTitle}}</p>
    <p class="p_small">{{smallTitle}}</p>
    <div>
          <ul class="feature">
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能一</p>
          </div>
          </li>
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能二</p>
          </div>
          </li>
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能三</p>
          </div>
          </li>
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能四</p>
          </div>
          </li>
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能五</p>
          </div>
          </li>
          <li>
          <div class="conDiv">
          <i class="el-icon-goods classRgb"></i>
          <p class="classTxt">功能六</p>
          </div>
          </li>
          <!--  -->
          <!-- <li>功能二</li>
          <li>功能三</li>
          <li>功能四</li>
          <li>功能五</li>
          <li>功能六</li> -->
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
      bigTitle: '大标题xxxxx会议',
      smallTitle: '小标题xxxx地点'
    }
  },
  methods: {}
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
  background-image: url('./images/demo.jpeg');
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
    width: 30%;
    height: 12vh;
    background-color: rgba(198, 75, 34, 0.2);
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
