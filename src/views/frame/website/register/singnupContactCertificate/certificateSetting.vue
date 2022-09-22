<template>
  <div class="content">
    <div>
      <h2>证件设置</h2>

      <el-card class="box-card">
        <div>
          <el-form ref="printSetform" :model="printSetform" label-width="100px" label-position="left">
            <el-form-item label="证件类型">
              <div style="display:flex; justify-content: space-between;">
                <el-select v-model="printSetform.certificateType" style="width: 150px" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in certificateTypeList" :key="index" :label="item.name" :value="item.code"></el-option>

                </el-select>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新增证件类型</el-button>
              </div>
            </el-form-item>

            <el-form-item label="应用于">
              <el-checkbox-group v-model="printSetform.contactTypeArray" @change="contactTypeArrayChange">
                <el-checkbox :label="item.dictItemVal" v-for="(item,index) in contactTypeArrayList" :key="index"> {{ item.dictItemName }} </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="打印区域(mm)">
              <div style="display: flex">
                <p style="display: flex">
                  <span>宽</span>
                  <el-input style="max-width: 80px;margin-left:15px" v-model="printSetform.printWight"></el-input>
                </p>

                <p style="display: flex;margin-left:30px">
                  <span>长</span>
                  <el-input style="max-width: 80px;margin-left:15px" v-model="printSetform.printHeight"></el-input>
                </p>
              </div>
            </el-form-item>
            <el-form-item label="背景图">
              <el-checkbox v-model="printSetform.printBackgroundFlg" :true-label="1" :false-label="0">打印背景图</el-checkbox>
              <el-upload style="float: right; padding: 3px 0" :limit="1" :on-exceed="fileLimitCount" ref="upload" action :http-request="handleUploadForm" :on-success="uploadSuccess" :file-list="fileList" :show-file-list="false" :auto-upload="true">
                <el-button type="text">上传背景图</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item label="最多打印次数">
              <el-input v-model="printSetform.maxPrintNumber"></el-input>
            </el-form-item>

            <el-form-item label="">
              <div style="margin-left: -100px">
                <p>证件内容</p>
                <div style="border: 1px solid;padding: 10px">
                  <el-checkbox-group v-model="printSetform.certificateContent" @change="certificateContentChange">
                    <el-checkbox :label="item.dictItemVal" v-for="(item,index) in certificateContentList" :key="index"> {{ item.dictItemName }}</el-checkbox>
                  </el-checkbox-group>
                </div>

              </div>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="create">立即创建</el-button>
              <el-button @click="back">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="printPreview">
      <h2>证件预览</h2>
      <el-card class="box-card" style="background:rgba(242, 242, 242, 1);" ref="printTest" id="printTest">
        <!-- <div>
          <p class="printItem" v-for="(dictItemVal,index) in printSetform.certificateContent" :key="index">
            {{ certificateContentList.find(item => {return dictItemVal == item.dictItemVal}).dictItemName }}
          </p>
          <vue-qr v-if="false" text="test" :size="200"> </vue-qr>
        </div> -->

        <div class="p-event" id="print" :style="`background-image:url(${bgiUrl})`">
          <template v-for="(item,index) in list">
            <vue-draggable-resizable parent=".p-event" :grid="[10,10]" :x="item.x" :y="item.y" :left="form.paddingLeft" :key="item+index" :parent="true" w="auto" h="auto" @dragging="onDrag" @resizing="onResize">
              <p class="printItem" :style="{ fontSize: item.fontSize, color: item.color, lineHeight: item.lineHeight,textAlign: item.textAlign }" @click="checkItem(item)">
                {{ item.name }}
                <!-- {{ certificateContentList.find(item => {return dictItemVal == item.dictItemVal}).dictItemName }} -->
              </p>
            </vue-draggable-resizable>
          </template>
        </div>

      </el-card>
      <p style="margin-top: 15px;margin-right:40px">
        <span>尺寸：{{printSetform.printWight/10}}cm * {{printSetform.printHeight/10}}cm</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="doPrint">打印测试页</el-button>
      </p>
    </div>

    <div class="">
      <h2>内容设置</h2>
      <el-card class="box-card">
        <el-form :model="form" label-width="100px" label-position="left">
          <el-form-item label="修改内容">
            <el-select v-model="form.name" @change="changeName();changeVal()">
              <el-option v-for="(item,index) in list" :label="item.label" :key="index+item.label" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="修改类型">
            <el-select v-model="form.selectVal" @change="changeHeight">
              <el-option label="字体大小" value="fontSize"></el-option>
              <el-option label="行高设置" key="index+item.value" value="lineHeight"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="大小">
            <el-select v-model="form.fontSize" @change="changeVal">
              <el-option v-for="(item,index) in sizeList" :key="index+item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对齐方式">
            <el-select v-model="form.textAlign" @change="changeVal">
              <el-option label="靠左对齐" value="left"></el-option>
              <el-option label="居中对齐" value="center"></el-option>
              <el-option label="靠右对齐" value="right"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker class="setColor" v-model="form.color" @change="changeVal"></el-color-picker>
            <!-- <el-color-picker v-model="form.color"></el-color-picker> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-dialog title="新增证件类型" :visible.sync="dialogFormVisible" width="300px" label-position="left" :close-on-click-modal="false">
      <el-form :model="certificateTypeform">
        <el-form-item label="证件类型" label-width="100px">
          <el-input v-model="certificateTypeform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="certificateTypeSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import VueQr from 'vue-qr'
export default {
  name: 'certificateSet',
  data() {
    return {
      summaryData: null,
      dialogFormVisible: false, // 新增证件类型弹窗
      certificateContentList: [],
      contactTypeArrayList: [],
      certificateTypeList: [], // 证件类型下拉
      bgiUrl: '',
      dialog: false,
      printSetform: {
        certificateContent: [],
        certificateLayout: '1232132',
        certificateType: '0009',
        contactTypeArray: [],
        maxPrintNumber: 10,
        meetCode: '1231',
        optDeptCode: '3123132',
        optEmployeeCode: '3123132',
        optOrganCode: '31231',
        printBackground: '13132132',
        printBackgroundFlg: 0,
        printHeight: 118,
        printWight: 80
      },
      certificateTypeform: {
        name: ''
      },
      printInfo: [],
      fileList: [],

      width: 0,
      height: 0,
      x: 0,
      y: 0,
      form: {
        name: '',
        fontSize: '',
        selectVal: '',
        textAlign: '',
        color: '#000',
        paddingTop: 20,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      },
      sizeList: [], // 字体号数组
      apiArr: [
        // 后期从接口中获取name集合
        { name: '公司名称' },
        { name: '抬头' },
        { name: '公司简介' }
      ],
      list: [] // apiArr带上所有属性的集合
    }
  },
  async mounted() {
    this.getCertificateType();
    // 获取参会人类型数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'CONTANT_TYPE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.contactTypeArrayList = res.data
    })

    // 获取打印类型数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'CERTIFICATE_CONTENT', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      //
      this.certificateContentList = res.data
    })

    // 字号数组获取
    for (let i = 12; i <= 48; i++) {
      this.sizeList.push({ label: `${i}px`, value: `${i}px` })
    }
  },
  methods: {
    // 返回上级
    back(){
      this.$router.replace({
        name: 'singnupContactCertificate',
      })
    },
    // 获取证件类型下拉选项
    getCertificateType(){
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          data: {
            queryParams: {type: "1"},
            type: 'DICTYPE'
          },
          funcModule: '会议字典',
          funcOperation: '查询列表'
        }
      }).then(response => {
        this.certificateTypeList = response.data
      })
    },
    handleUploadForm(param) {
      //
      let thiz = this
      let formData = new FormData()
      // formData.append('webpageCode', '') // 额外参数
      formData.append('file', param.file)
      let loading = thiz.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      request({
        url: '/api/obs/file/uploadImg',
        method: 'POST',
        data: formData
      }).then(data => {
        if (data) {
          thiz.$message('上传文件成功')
          this.bgiUrl = data.data.filePath
        } else {
          thiz.$message('上传文件失败')
        }
        loading.close()
      })
    },
    checkItem(item) {
      this.form.name = item.name
      //
      this.changeName(item)
      this.changeVal()
    },
    openMenu(e) {
      this.closeTarget = e.target.id.split('-')[1]
      // 首页不允许关闭
      if (this.closeTarget === '/dashboard' || e.target.className === 'el-tabs__nav-scroll') {
        this.visible = false
        return
      }
      this.visible = true
      this.left = e.clientX + 'px'
      this.top = e.clientY + 'px'
    },

    certificateContentChange(certificateContent) {
      // this.list = []
      // 网格上的数据获取
      this.printSetform.certificateContent.forEach(dictItemVal => {
        let item = this.certificateContentList.find(item => {
          return dictItemVal == item.dictItemVal
        })

        let isIncludes = this.list.some(listItem => {
          return listItem.name == item.dictItemName
        })
        //
        if (!isIncludes) {
          this.list.push({
            name: item.dictItemName, // 表名对应的值
            label: item.dictItemName, // 表名
            fontSize: '16px', // 默认字体
            lineHeight: 'normal', // 默认行高
            color: '#000000', // 默认颜色
            x: Math.floor(Math.random() * (200 - 10)) + 10, // x默认值
            y: Math.floor(Math.random() * (250 - 10)) + 10 // y 默认值
          })
        }

        // 删除已取消值
        this.list.forEach((listItem, listIndex) => {
          let listIncludes = certificateContent.some(contentItem => {
            let item = this.certificateContentList.find(item => {
              return contentItem == item.dictItemVal
            })

            return listItem.name == item.dictItemName
          })
          if (!listIncludes) {
            this.list.splice(listIndex, 1)
          }
        })
      })
    },
    /** 打印方法 */
    doPrint() {
      const subOutputRankPrint = document.getElementById('print')
      const newContent = subOutputRankPrint.innerHTML
      const oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    onResize: function(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function(x, y) {
      this.x = x
      this.y = y
    },
    /** 选择列下拉框 */
    changeName(item) {
      this.form.fontSize = item.fontSize || '16px'
      this.form.color = item.color || '#000'
      this.form.textAlign = item.textAlign || ''
    },
    changeHeight() {
      this.form.fontSize = ''
    },
    /** 下拉框改变的时候进行动态设置样式 */
    changeVal() {
      if (this.form.name && this.form.fontSize && this.form.selectVal === 'fontSize') {
        this.commonMethod('fontSize')
      }
      if (this.form.name && this.form.fontSize && this.form.selectVal === 'lineHeight') {
        this.commonMethod('lineHeight')
      }
      if (this.form.name && this.form.textAlign) {
        this.commonMethod('textAlign')
      }
      if (this.form.name && this.form.color) {
        this.commonMethod('color')
      }
    },
    /** 公共的设置样式方法 */
    commonMethod(val) {
      for (const it of this.list) {
        if (it.label === this.form.name) {
          if (val === 'lineHeight') {
            it[val] = this.form.fontSize
          } else if (val === 'textAlign') {
            // 对齐方式
            it[val] = this.form.textAlign
          } else {
            it[val] = this.form[val]
          }
        }
      }
    },
    // 新增证件类型提交
    certificateTypeSubmit() {
      request({
        url: '/api/register/signupDictype/save',
        method: 'POST',
        data: {
          data: this.certificateTypeform,
          funcModule: '获取模块类型',
          funcOperation: '获取模块类型'
        }
      }).then(res => {
        if (res.data) {
          this.getCertificateType();
          this.dialogFormVisible = false;

          this.$message('新增成功')
        } else {
          this.$message('新增失败')
        }
      })
    },
    fileLimitCount(files, fileList) {
      this.$message.warning('背景图只能上传一张')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    uploadSuccess(response, file, fileList) {
      console.log(this.fileList)
    },
    create() {
      // 数组转化字符串
      this.printSetform.contactTypeArray = this.printSetform.contactTypeArray.join(',')
      this.printSetform.certificateContent = this.printSetform.certificateContent.join(',')
      request({
        url: '/api/register/signupCertificate/save',
        method: 'POST',
        data: {
          data: this.printSetform,
          funcModule: '获取模块类型',
          funcOperation: '获取模块类型'
        }
      }).then(res => {
        if (res.data) {
          this.$message('创建成功')
        } else {
          this.$message('创建失败')
        }
      })
    },
    // 打印预览页
    printPage() {
      window.print()
    }
  }
}
</script>

<style media="print" scoped>
/** 去掉页头和页尾 */
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>

<style scoped>
.content {
  padding: 20px;
  display: flex;
}
.content .printPreview {
  background-size: cover;
}
.content .box-card {
  width: 400px;
  min-height: 600px;
  margin-right: 40px;
  background-color: rgba(242, 242, 242, 1);
}
.printItem {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* margin: 5px auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 35px;
  text-align: center; */
}
.p-event {
  border: 1px solid red;
  box-sizing: border-box;
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
