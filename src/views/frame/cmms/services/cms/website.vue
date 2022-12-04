<template>
  <div>
    <el-tabs type="border-card" tab-position="left" :stretch="true" v-model="activeName">
      <el-tab-pane label="模块设置" name="one">
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
                    <el-button type="text" @click.stop="handelClick(item, Functionality, 0)"><i class="el-icon-caret-top"></i></el-button>
                    <!-- 下移 -->
                    <el-button type="text" @click.stop="handelClick(item, Functionality, 1)"><i class="el-icon-caret-bottom"></i></el-button>
                    <!-- 删除 -->
                    <el-button type="text" @click.stop="handelClick(item, Functionality, 2)"><i class="el-icon-delete"></i></el-button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="contents" style="width: 28%">
            <station @itemclick="itemclick" :title_="title_" :subTitle_="subTitle" :webpagePicDtoList="webpagePicDtoList" :listData="listData" @featureVal="featureVal" ref="station" />
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
            <slideshowManage @upData_="upData_" :webpagePicDtoList="webpagePicDtoList" :code="code" v-if="isFlag == 2" />
            <baseMap :code="code" @upData_="upData_" :webpagePicDtoList="webpagePicDtoList" v-if="isFlag == 3" />
            <titleManage :title_="title_" :subTitle="subTitle" :code="code" @upData_="upData_" @isFlag_="isFlag_" v-if="isFlag == 4" />
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="页面管理">页面管理</el-tab-pane>
      <el-tab-pane label="图片集">图片集</el-tab-pane>
      <el-tab-pane label="访问权限">访问权限</el-tab-pane> -->
      <el-tab-pane label="分享设置" name="two">
        <div style="width: 100%; height: 80vh">
          <!-- <div class="qrCode" style="width: 37%; padding-top: 5vh; margin: 5vh auto; height: 62vh; text-align: center; box-shadow: 0 2px 12px 0 lightgray">
            <span style="font-size: 18px; margin: 20px 0px; display: block">请使用移动设备扫描二维码</span>
            <vue-qr :text="imgUrl" :size="250" :logoScale="0.2"> </vue-qr>
          </div> -->
          <div class="qr">
            <div style="position: relative; top: 15%; right: 10px; transform: translateY(-30%)">
              <el-form style="padding-top: 120px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="微站名称" prop="mainTitle">
                  <el-input placeholder="请输入微站名称" v-model="ruleForm.mainTitle"></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                  <div>
                    <p>微站链接：</p>
                    <el-tooltip :content="imgUrl">
                      <span>{{ imgUrl | commentEllipsis(imgUrl) }}</span>
                    </el-tooltip>
                    <span @click="copyTxt" style="color: #409eff; margin-left: 10px; cursor: pointer">复制链接</span>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div>
                    <vue-qr :text="imgUrl" :size="200"> </vue-qr>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div>
                    <el-button @click="resetForm('ruleForm')">返回</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import station from './station'
import settingUp from '@/components/MicroStation/settingUp'
import baseMap from '@/components/MicroStation/baseMap'
import slideshowManage from '@/components/MicroStation/slideshowManage'
import titleManage from '@/components/MicroStation/titleManage'
import VueQr from 'vue-qr'
export default {
  name: 'microStationManagement',
  components: {
    station,
    settingUp,
    baseMap,
    slideshowManage,
    titleManage,
    VueQr
  },
  data() {
    return {
      isFlag: 0,
      Functionality: [],
      dataCode: '',
      dataCode_: '',
      dataNum: '',
      code: '',
      newData: {},
      listData: [],
      isFlag_one: false,
      webpagePicDtoList: [],
      title_: '',
      subTitle: '',
      imgUrl: 'https://baidu.com',
      // logo: require('@/assets/tea_128.png')
      userData: {},
      ruleForm: {
        mainTitle: ''
      },
      rules: {
        mainTitle: [
          { required: true, message: '请输入微站名称', trigger: 'blur' }
          // { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      activeName: 'one'
    }
  },
  methods: {
    handelClick(item, data, type) {
      if (type == 0) {
        if (item.sort == 0) {
          this.$message.warning('无法上移')
        } else {
          request({
            url: '/api/biz/cmsWebpageButton/move',
            method: 'POST',
            data: { data: { id: item.id, moveType: 1, webpageCode: item.webpageCode }, funcModule: '按钮上移', funcOperation: '按钮上移' }
          })
            .then(res => {
              if (res.data) {
                this.$message('上移成功')
                this.loadData()
              } else {
                this.$message('上移失败')
              }
            })
            .catch(() => {})
        }
        console.log(item, data, type)
      } else if (type == 1) {
        if (item.sort == data.length - 1) {
          this.$message.warning('无法下移')
        } else {
          request({
            url: '/api/biz/cmsWebpageButton/move',
            method: 'POST',
            data: { data: { id: item.id, moveType: -1, webpageCode: item.webpageCode }, funcModule: '按钮下移', funcOperation: '按钮下移' }
          })
            .then(res => {
              if (res.data) {
                this.$message('下移成功')
                this.loadData()
              } else {
                this.$message('下移失败')
              }
            })
            .catch(() => {})
        }
        console.log(item, data, type)
      } else if (type == 2) {
        request({
          url: '/api/biz/cmsWebpageButton/remove',
          method: 'POST',
          data: { data: item.id, funcModule: '按钮删除', funcOperation: '按钮删除' }
        })
          .then(res => {
            if (res.data) {
              this.$message('删除成功')
              //
              this.loadData()
              this.isFlag = 0
            } else {
              this.$message('删除失败')
            }
          })
          .catch(() => {})
      }
    },
    management(val) {
      this.isFlag = val
      console.log(val)
    },
    featureVal(val) {
      this.Functionality = val
      console.log(val)
    },
    handelAdd() {
      this.isFlag_one = true
      this.isFlag = 1
    },
    newVal(val, dataNum, colorValue) {
      //hkz
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
      this.$refs.station.colorVal(val, dataNum)
    },
    onClick() {
      this.isFlag = 0
    },
    isFlag_(val) {
      this.isFlag = val
    },
    addEdit(val, index) {
      // console.log(val, index, this.Functionality)
      this.isFlag = 1
      this.isFlag_one = false
      this.dataNum = index
      this.newData = val
    },
    loadData() {
      if (this.$route.params.ids) {
        request({
          url: '/api/biz/cmsWebpage/getByEventCode',
          method: 'POST',
          data: { data: this.$route.params.ids, funcModule: '获取网页列表', funcOperation: '获取网页列表' }
        })
          .then(res => {
            if (res.data) {
              this.userData = res.data
              this.Functionality = res.data.webpageButtonDtoList

              this.listData = res.data.webpageButtonDtoList
              this.webpagePicDtoList = res.data.webpagePicDtoList
              this.title_ = res.data.title
              this.subTitle = res.data.subTitle
              this.code = res.data.code
              console.log(res)
              this.code = res.data.code

              if (res.data.name) {
                this.ruleForm.mainTitle = res.data.name
              }
              //
              // 处理地址问题
              let url = ''
              if (window.location.host == 'cmms-test.ctgbs.com' || window.location.host == 'localhost:9527') {
                url = 'https://cmms-h5-test.ctgbs.com'
              } else if (window.location.host == 'cmms.ctgbs.com') {
                url = 'https://cmms-h5.ctgbs.com'
              }
              //
              this.imgUrl = `${url}/#/pages/${this.userData.templateCode}/index?tenantCode=${this.userData.tenantCode}&code=${this.code}`
              console.log(this.imgUrl, window.location.host)
            } else {
              this.$router.push({
                name: 'station',
                params: {
                  data: this.$route.params.ids
                }
              })
              console.log(res)
            }
          })
          .catch(() => {})
      } else {
        this.$router.push({
          name: 'station',
          params: {}
        })
      }
    },
    upData() {
      this.isFlag = 0
      this.loadData()
    },
    upData_() {
      this.loadData()
    },
    //
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid, formName)
          request({
            url: '/api/biz/cmsWebpage/updateName',
            method: 'POST',
            data: { data: { name: this.ruleForm.mainTitle, code: this.code }, funcModule: '修改名称', funcOperation: '修改名称' }
          })
            .then(res => {
              if (res.data) {
                this.$message('修改成功')
                this.loadData()
              } else {
                this.$message('修改失败')
              }
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.activeName = 'one'
    },
    copyTxt() {
      var copyTest = this.imgUrl
      var inputTest = document.createElement('input')
      inputTest.value = copyTest
      document.body.appendChild(inputTest)
      inputTest.select()
      document.execCommand('Copy')
      inputTest.className = 'oInput'
      inputTest.style.display = 'none'
      this.$message.success('复制成功')
    },
    itemclick(item, index) {
      console.log(item, index, 'website标注')
      this.addEdit(item, index)
    }
  },
  mounted() {
    //
    this.$refs.station.isPc = false
  },
  filters: {
    commentEllipsis(value) {
      if (value.length != undefined) {
        if (value.length > 25) {
          return value.slice(0, 24) + '...'
        } else {
          return value
        }
      }
    }
  },
  created() {
    this.loadData()
    // console.log(this.userData)
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
.qrCode:hover {
  background-color: rgb(38, 97, 172);
}
.qrCode {
  transition: all 1000ms ease, top 1s ease;
}
.qr {
  width: 35%;
  height: 80vh;
  // border: 1px solid red;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 lightgray;
}
.qr:hover {
  box-shadow: 0 2px 22px 0 lightgray;
}
</style>
