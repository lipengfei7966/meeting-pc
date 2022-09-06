<template>
  <div>
    <el-tabs type="border-card" tab-position="left" :stretch="true">
      <el-tab-pane label="模块设置">
        <div style="display: flex; justify-content: space-between">
          <div class="contents" style="width: 28%">
            <el-button class="btn" type="success" @click="handelAdd">新增模块</el-button>
            <ul class="lookUl">
              <!--  -->
              <li>
                <div @click="management(2)" style="display: flex; justify-content: space-between; cursor: pointer">
                  <span>轮播图管理</span>
                </div>
              </li>
              <li>
                <div @click="management(3)" style="display: flex; justify-content: space-between; cursor: pointer">
                  <span>底图管理</span>
                </div>
              </li>
              <li>
                <div @click="management(4)" style="display: flex; justify-content: space-between; cursor: pointer">
                  <span>标题管理</span>
                </div>
              </li>
              <!--  -->
              <li v-for="(item, index) in Functionality" :key="index" style="cursor: pointer" @click="addEdit(item, index)">
                <div style="display: flex; justify-content: space-between">
                  <span>{{ item.title }}</span>
                  <span style="margin-right: 10px">
                    <!-- 上移 -->
                    <el-button type="text" @click="handelClick(item, Functionality, 0)"><i class="el-icon-caret-top"></i></el-button>
                    <!-- 下移 -->
                    <el-button type="text" @click="handelClick(item, Functionality, 1)"><i class="el-icon-caret-bottom"></i></el-button>
                    <!-- 删除 -->
                    <el-button type="text" @click="handelClick(item, Functionality, 2)"><i class="el-icon-delete"></i></el-button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="contents" style="width: 28%">
            <station :listData="listData" @featureVal="featureVal" ref="station" />
          </div>
          <div class="contents" style="width: 32%">
            <!-- 设置模块、默认不展示 -->
            <!-- <div v-show="isFlag == 0">
                    </div> -->
            <div v-if="isFlag == 0" style="font-size: 20px; color: lightgray; text-align: center; position: relative; top: 45%" @click="handel()">
              <span>
                <span>请选择模块进行新增/编辑 </span>
                <i class="el-icon-more-outline"></i>
              </span>
            </div>
            <settingUp :code="code" :dataLength="listData.length" @upData="upData" :isFlag_one="isFlag_one" :newData="newData" :dataNum="dataNum" ref="settingUp_" v-if="isFlag == 1" @newVal="newVal" @colorVal="colorVal" @onClick="onClick" />
            <slideshowManage v-if="isFlag == 2" />
            <baseMap v-if="isFlag == 3" />
            <titleManage @isFlag_="isFlag_" v-if="isFlag == 4" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="页面管理">页面管理</el-tab-pane>
      <el-tab-pane label="图片集">图片集</el-tab-pane>
      <el-tab-pane label="访问权限">访问权限</el-tab-pane>
      <el-tab-pane label="分享设置">分享设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import station from '@/components/MicroStation/station'
import settingUp from '@/components/MicroStation/settingUp'
import baseMap from '@/components/MicroStation/baseMap'
import slideshowManage from '@/components/MicroStation/slideshowManage'
import titleManage from '@/components/MicroStation/titleManage'
export default {
  name: 'microStationManagement',
  components: {
    station,
    settingUp,
    baseMap,
    slideshowManage,
    titleManage
  },
  data() {
    return {
      isFlag: 0,
      Functionality: [],
      dataCode: '',
      dataNum: '',
      newData: {},
      listData: [],
      isFlag_one: false
    }
  },
  methods: {
    handelClick(item, data, type) {
      console.log(item, data, type)
    },
    management(val) {
      this.isFlag = val
      console.log(val)
    },
    featureVal(val) {
      //       debugger
      this.Functionality = val
      console.log(val)
    },
    handelAdd() {
      this.isFlag_one = true
      this.isFlag = 1
    },
    newVal(val, dataNum, colorValue) {
      // debugger
      if (val == 1) {
        this.$refs.station.watchVal(val, dataNum)
      } else if (val == 2) {
        this.$refs.station.watchVal(val, dataNum)
      } else if (val == 3) {
        this.$refs.station.watchVal(val, dataNum, colorValue)
      }
      console.log(val)
    },
    colorVal(val, dataNum) {
      // debugger
      this.$refs.station.colorVal(val, dataNum)
    },
    onClick() {
      this.isFlag = 0
    },
    isFlag_(val) {
      this.isFlag = val
    },
    addEdit(val, index) {
      // debugger
      console.log(val, index, this.Functionality)
      this.isFlag = 1
      this.isFlag_one = false
      this.dataNum = index
      this.newData = val
    },
    loadData() {
      if (this.$route.query.ids || true) {
        request({
          url: '/api/biz/cmsWebpage/getByEventCode',
          method: 'POST',
          data: { data: this.$route.query.ids || '0001', funcModule: '获取网页列表', funcOperation: '获取网页列表' }
        })
          .then((res) => {
            // debugger
            if (res.data) {
              debugger
              this.Functionality = res.data.webpageButtonDtoList
              this.listData = res.data.webpageButtonDtoList
              this.code = res.data.code
              console.log(res)
              this.code = res.data.code
            } else {
              this.$router.push({
                name: '/optionalModule',
                query: {
                  data: this.$route.query.ids || '0001'
                }
              })
              console.log(res)
            }
          })
          .catch(() => {})
      } else {
        this.$router.push({
          name: '/optionalModule',
          query: {}
        })
      }
    },
    upData() {
      debugger
      this.isFlag = 0
      this.loadData()
    }
  },
  mounted() {
    //     debugger
    this.$refs.station.isPc = false
  },
  created() {
    // debugger
    this.loadData()
    console.log(this.$route)
  }
}
</script>

<style scoped lang="scss">
.contents {
  width: 30%;
  //   min-height: 600px;
  //   border: 1px solid olive;
  box-shadow: 0 2px 12px 0 lightgray;
  padding: 5px 10px;
  float: left;
}
.lookUl li {
  height: 40px;
  line-height: 40px;
  background-color: GhostWhite;
  margin-bottom: 5px;
}
.lookUl li:hover {
  background-color: lightyellow;
}
.lookUl {
  clear: both;
}
.btn {
  float: right;
  margin: 15px 0px;
}
</style>
