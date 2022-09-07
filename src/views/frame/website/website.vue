<template>
  <div>
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane label="模块设置">
        <div style="display: flex; justify-content: space-between">
          <div class="contents">
            <ul class="lookUl">
              <li v-for="(item, index) in Functionality" :key="index">
                <div style="display: flex; justify-content: space-between">
                  <span>{{ item.name }}</span>
                  <span style="margin-right: 10px">
                    <!-- 上移 -->
                    <el-button
                      type="text"
                      @click="handelClick(item, Functionality, 0)"
                      ><i class="el-icon-caret-top"></i
                    ></el-button>
                    <!-- 下移 -->
                    <el-button
                      type="text"
                      @click="handelClick(item, Functionality, 1)"
                      ><i class="el-icon-caret-bottom"></i
                    ></el-button>
                    <!-- 删除 -->
                    <el-button
                      type="text"
                      @click="handelClick(item, Functionality, 2)"
                      ><i class="el-icon-delete"></i
                    ></el-button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="contents">
            <station ref="station" />
          </div>
          <div class="contents">3</div>
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
import station from '@/components/MicroStation/station'
export default {
  name: 'microStationManagement',
  components: {
    station
  },
  data() {
    return {
      Functionality: [{ name: '项目介绍' }, { name: '行程规划' }, { name: '出行指南' }, { name: '意见建议' }, { name: '服务反馈' }, { name: '资费一览' }, { name: '天气' }, { name: '活动时间' }, { name: '参会人员' }]
    }
  },
  methods: {
    handelClick(item, data, type) {
      console.log(item, data, type)
    }
  },
  mounted() {
//     debugger
    this.$refs.station.isPc = false
  },
  created() {}
}
</script>

<style scoped lang="scss">
.contents {
  width: 30%;
  min-height: 600px;
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
</style>
