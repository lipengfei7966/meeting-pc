<template>
  <div class="content">
    <div>
      <h2>证件设置</h2>

      <el-card class="box-card">
        <div>
          <el-form ref="printSetform" :model="printSetform" :rules="printSetformRules" label-width="100px" label-position="left">
            <el-form-item label="证件类型" prop="certificateType">
              <div style="display:flex; justify-content: space-between;">
                <el-select v-model="printSetform.certificateType" @change="certificateTypeChange" placeholder="请选择证件类型">
                  <el-option v-for="(item,index) in certificateTypeList" :key="index" :label="item.name" :value="item.code"></el-option>

                </el-select>

              </div>
            </el-form-item>

            <el-form-item>
              <div style="display:flex; justify-content: space-between">
                <el-button type="text" @click="dialogFormVisible = true">新增证件类型</el-button>
                <el-button v-show="printSetform.certificateType != '0001' " type="text" @click="delCertificateType">删除证件类型</el-button>
              </div>

            </el-form-item>

            <el-form-item label="应用于">
              <el-checkbox-group v-model="printSetform.contactTypeArray">
                <el-checkbox :label="item.dictItemVal" v-for="(item,index) in contactTypeArrayList" :key="index"> {{ item.dictItemName }} </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="打印区域(mm)">
              <div style="display: flex">
                <p style="display: flex">
                  <span>宽</span>
                  <el-input style="max-width: 80px;margin-left:15px" v-model="printSetform.printWight" @input="printSetform.printWight = limitInput(printSetform.printWight)" @change="WHchange"></el-input>
                </p>

                <p style="display: flex;margin-left:30px">
                  <span>高</span>
                  <el-input style="max-width: 80px;margin-left:15px" v-model="printSetform.printHeight" @input="printSetform.printHeight = limitInput(printSetform.printHeight)" @change="WHchange"></el-input>
                </p>
              </div>
            </el-form-item>
            <el-form-item label="背景图">
              <el-checkbox v-model="printSetform.printBackgroundFlg" :true-label="1" :false-label="0">打印背景图</el-checkbox>
              <el-upload style="float: right; padding: 3px 0" accept="image/*" :limit="1" :on-exceed="fileLimitCount" :before-upload="handleBeforeUpload" ref="upload" action :http-request="handleUploadForm" :on-remove="handleRemove" :on-success="uploadSuccess" :file-list="fileList" :show-file-list="true" :auto-upload="true">
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
                    <el-checkbox :label="item.code" v-for="(item,index) in certificateContentList" :key="index"> {{ item.mapName }}</el-checkbox>
                  </el-checkbox-group>

                </div>

              </div>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="create"> {{ printSetform.id ? '确定':'立即创建'}}</el-button>
              <el-button @click="back">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="printPreview">
      <h2>证件预览</h2>
      <el-card class="printPreview-box-card" style="background:rgba(242, 242, 242, 1);" ref="printTest" id="printTest">
        <!-- <div>
          <p class="printItem" v-for="(dictItemVal,index) in printSetform.certificateContent" :key="index">
            {{ certificateContentList.find(item => {return dictItemVal == item.dictItemVal}).dictItemName }}
          </p>
          <vue-qr v-if="false" text="test" :size="200"> </vue-qr>
        </div> -->

        <div class="p-event" id="print" :key="changecount" :style="{width:printSetform.printWight+'mm', height:printSetform.printHeight+'mm', margin: '0 auto',backgroundImage:`url(${printSetform.printBackground})`,backgroundSize:'100% 100%'}">
          <img v-if="printSetform.printBackground && printSetform.printBackgroundFlg" :src="printSetform.printBackground" alt="" style="position:absolute;width:100%;height:100%">
          <template v-for="(item,index) in list">
            <vue-draggable-resizable parent=".p-event" :grid="[10,10]" :x="item.x" :y="item.y" :w="item.width || 'auto'" :h="item.height || 'auto'" :key="item+index" :parent="true" @dragging="onDrag" @resizing="onResize">
              <!-- 参会人二维码 -->
              <p v-if="item.value == 'qrCode' " id="qrCode" class="printItem" @mousedown="checkItem(item)">
                <vue-qr class="qrCode" text="printSetform.certificateContent" :size="200" style="width:100%"> </vue-qr>
              </p>
              <!-- 参会人条码 -->
              <p v-else-if="item.value == 'barCode'" id="barCode" class="printItem" @mousedown="checkItem(item)">
                <vue-barcode class="barCode" value="SignupContact0000" :width="1" :height="50" style="width:100%"> </vue-barcode>
              </p>

              <!-- 人员二维码 -->
              <p v-else-if="item.value == 'personQrCode' " id="personQrCode" class="printItem" @mousedown="checkItem(item)">
                <vue-qr class="personQrCode" text="printSetform.certificateContent" :size="200" style="width:100%"> </vue-qr>
              </p>
              <!-- 人员条码 -->
              <p v-else-if="item.value == 'personBarCode'" id="personBarCode" class="printItem" @mousedown="checkItem(item)">
                <vue-barcode class="personBarCode" value="renyuantiaoma" :width="1" :height="50" style="width:100%"> </vue-barcode>
              </p>

              <p v-else class="printItem" :style="{ fontSize: item.fontSize, color: item.color, lineHeight: item.lineHeight,textAlign: item.textAlign, width:item.width+'px', height: item.height+'px' }" @mousedown="checkItem(item)">
                {{ item.name }}
              </p>

            </vue-draggable-resizable>
          </template>
        </div>

      </el-card>
      <p style="margin-top: 15px;margin-right:40px">
        <span>尺寸：{{printSetform.printWight}}mm * {{printSetform.printHeight}}mm</span>
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
import VueBarcode from 'vue-barcode';
export default {
  name: 'certificateSet',
  data() {
    return {
      summaryData: null,
      changecount: 0,
      dialogFormVisible: false, // 新增证件类型弹窗
      certificateContentList: [],
      contactTypeArrayList: [],
      certificateTypeList: [], // 证件类型下拉
      // bgiUrl: '',
      dialog: false,
      printSetform: {
        certificateContent: [],
        certificatePreview: '',
        certificateLayout: '',
        certificateType: '0001',
        contactTypeArray: [],
        maxPrintNumber: 10,
        eventCode:  this.$route.params.data,
        printBackground: '',
        printBackgroundFlg: 1,
        printHeight: 118,
        printWight: 80
      },
      printSetformRules:{
        certificateType: [{ required: true, message: '请选择证件类型', trigger: 'change' }]
      },
      certificateTypeform: {
        name: '',
        type: '1',
        eventCode:  this.$route.params.data,
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
        paddingRight: 0
      },
      sizeList: [], // 字体号数组
      apiArr: [],
      list: [] // apiArr带上所有属性的集合
    }
  },
  components:{
    VueQr,
    VueBarcode
  },
  mounted() {
    this.getCertificateType();
    this.printSetformInit();

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
      url: '/api/register/signupContactCol/page',
      method: 'POST',
      data: { data: { eventCode: this.$route.params.data}, isPage: false, funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      //
      debugger
      this.certificateContentList = res.data.filter(item => {
        return item.mapType == '1'
      })
      let newItems = [
        {mapName: '参会人二维码', code: 'qrCode'},
        {mapName: '参会人条码', code: 'barCode'},
        {mapName: '人员二维码', code: 'personQrCode'},
        {mapName: '人员条码', code: 'personBarCode'},
      ]
      this.certificateContentList = this.certificateContentList.concat(newItems)
    })

    // 字号数组获取
    for (let i = 12; i <= 48; i++) {
      this.sizeList.push({ label: `${i}px`, value: `${i}px` })

    }

  },

  methods: {
    limitInput(value) {
      let temp = value.toString();// 第一步：转成字符串
      temp = temp 
        .replace(/[^\d^\.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
        .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
        .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
        .match(/^\d*(\.?\d{0,2})/g)[0] || '' // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，	而且小数点后面只能有0到2位小数
      return temp
    },
    WHchange(){
      this.changecount ++;
    },
    certificateTypeChange(val){
      this.printSetformInit(val)
    },
    printSetformInit(code){
      request({
        url: '/api/register/signupCertificate/get',
        method: 'POST',
        data: {
          data: {
            eventCode: this.$route.params.data,
            certificateType: code || ''
          },
          funcModule: '获取模块类型',
          funcOperation: '获取模块类型'
        }
      }).then(res => {
        this.list = [];
        this.fileList = [];
        if(res.data){
          this.printSetform = res.data
          this.printSetform.contactTypeArray = this.printSetform.contactTypeArray ? this.printSetform.contactTypeArray.split(',') : []
          this.printSetform.certificateContent = this.printSetform.certificateContent ? this.printSetform.certificateContent.split(',') : []
          this.list = JSON.parse(this.printSetform.certificatePreview || '[]')
          this.WHchange();
          debugger
          if(this.printSetform.printBackground){

            let index = this.printSetform.printBackground.lastIndexOf("/");
            let filename = this.printSetform.printBackground.substr(index+1)
            this.fileList.push({
              name: filename,
              url: this.printSetform.printBackground,
            })
          }
        }else{
          this.printSetform = {
            certificateContent: [],
            certificatePreview: '',
            certificateLayout: '',
            certificateType: code || '0001',
            contactTypeArray: [],
            maxPrintNumber: 10,
            eventCode:  this.$route.params.data,
            optDeptCode: '',
            optEmployeeCode: '',
            optOrganCode: '',
            printBackground: '',
            printBackgroundFlg: 1,
            printHeight: 118,
            printWight: 80
          }
        }
      })
    },
    // 返回上级
    back(){
      this.$store.dispatch('delVisitedViews', this.$route).then(() => {
          this.$router.push({
            name: 'singnupContactCertificate'
          })
        })
    },
    // 获取证件类型下拉选项
    getCertificateType(){
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          data: {
            queryParams: {
              type: "1",
              eventCode:  this.$route.params.data,
            },
            type: 'DICTYPE'
          },
          funcModule: '会议字典',
          funcOperation: '查询列表'
        }
      }).then(response => {
        this.certificateTypeList = response.data
      })
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

          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    // 删除证件类型
    delCertificateType(){
      this.$confirm('此操作将删除已选证件类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/api/register/signupDictype/remove',
          method: 'POST',
          data: {
            data: this.printSetform.certificateType,
            funcModule: '获取模块类型',
            funcOperation: '获取模块类型'
          }
        }).then(res => {
          debugger
          if (res.data) {
            this.getCertificateType();

            this.printSetform.certificateType = '0001' // 删除后设置默认值
            this.certificateTypeChange('0001')

            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      });
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
          this.printSetform.printBackground = data.data.filePath
        } else {
          thiz.$message('上传文件失败')
        }
        loading.close()
      })
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
      // 网格上的数据获取
      // debugger
      if(certificateContent.length == 0){
        this.list = []
      }

      this.printSetform.certificateContent.forEach((dictItemVal,dictIndex) => {
        let item = this.certificateContentList.find(item => {
          return dictItemVal == item.code
        })
        // if(!item) return
        // debugger
        if(item) {
          let isIncludes = this.list.some(listItem => {
            debugger
            return listItem.value == item.code
          })
          //
          if (!isIncludes) {
            // debugger
            let pushItem = {
              name: item.mapName, // 表名对应的值
              label: item.mapName, // 表名
              value: item.code,
              fontSize: '16px', // 默认字体
              lineHeight: 'normal', // 默认行高
              color: '#000000', // 默认颜色
              width: '100',
              height: '25',
              x: 10, // x默认值
              // x: Math.floor(Math.random() * (200 - 10)) + 10, // x默认值
              y: this.list.length * 30// y 默认值
              // y: Math.floor(Math.random() * (this.printSetform.printHeight*3 - 10)) + 10 // y 默认值
            }
            if(item.code == 'qrCode' || item.code == 'personQrCode'){
              pushItem.width = '100';
              pushItem.height = '100';
            }else if(item.code == 'barCode' || item.code == 'personBarCode'){
              pushItem.width = '100';
              pushItem.height = '40';
            }
            this.list.push(pushItem)
            debugger
          }else{
            // 删除已取消值
            this.list.forEach((listItem, listIndex) => {
              // debugger
              let listIncludes = certificateContent.some(contentItem => {
                let item = this.certificateContentList.find(item => {
                  return contentItem == item.code
                })
                if(item){
                  return listItem.value == item.code
                }else{
                  return false
                }
              })
              if (!listIncludes) {
                this.list.splice(listIndex, 1)
              }
            })
          }
        }else{
          this.printSetform.certificateContent.splice(dictIndex,1);
          this.certificateContentChange(this.printSetform.certificateContent)
        }
      })
    },
    /** 打印方法 */
    doPrint() {
      const subOutputRankPrint = document.getElementById('print')
      const styleSheet = `<style>
      @media print { @page {size:210mm 230mm!important; margin: 0;padding: 0;} .noprint { display: none;}}
        body{margin: 0 0;display:flex;flex-wrap:wrap;justify-content: space-around; width:210mm;height:297mm}
        .content {margin:5mm 5mm;background-color:#e2f4d2;page-break-after:always}
        .draggable {position:absolute}
        .printItem {width: 100%;height: auto;margin:0;background-color: #fff;word-wrap: break-word;}
        .p-event { box-sizing: border-box; position: relative;width:100%;height:100% }
      </style>`

      //打印
      var newWin = window.open('') //新打开一个空窗口
      this.$nextTick(() => {

        var imageToPrint = document.getElementById('print') //获取需要打印的内容
        newWin.document.write(imageToPrint.outerHTML) //将需要打印的内容添加进新的窗口

        newWin.document.head.innerHTML = styleSheet //给打印的内容加上样式
        newWin.document.close() //在IE浏览器中使用必须添加这一句
        newWin.focus() //在IE浏览器中使用必须添加这一句

        setTimeout(function () {
          newWin.print() //打开打印窗口
          // newWin.close() //关闭打印窗口
        }, 100)
      })
      return false
    },
    onResize: function(x, y, width, height) {
      // debugger
      let changeItem = this.list.find(item => {
        return item.name == this.form.name
      })
      changeItem.x = x;
      changeItem.y = y;
      changeItem.width = width;
      changeItem.height = height;
      // this.x = x
      // this.y = y
      // this.width = width
      // this.height = height
    },
    onDrag: function(x, y) {
      let changeItem = this.list.find(item => {
        return item.name == this.form.name
      })
      // debugger
      changeItem.x = x;
      changeItem.y = y;
      // debugger
      // this.x = x
      // this.y = y
    },
    checkItem(item) {
      this.form.name = item.name
      this.changeName(item)
      this.changeVal()
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
    fileLimitCount(files, fileList) {
      this.$message.warning('背景图只能上传一张')
    },
    handleBeforeUpload(file){
      var img = file.name.substring(file.name.lastIndexOf('.') + 1)
      const suffix = img === 'jpg'
      const suffix2 = img === 'png'
      const suffix3 = img === 'jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!suffix && !suffix2 && !suffix3) {
          this.$message.error("只能上传图片！");
          return false
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.printSetform.printBackground = ''
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    uploadSuccess(response, file, fileList) {
      console.log(this.fileList)
    },
    create() {
      let printSetformvalid = false;
      this.$refs.printSetform.validate((valid) => {
        // debugger
        printSetformvalid = valid
      })

      // 必填校验未通过
      if(!printSetformvalid){
        this.$message.warning('请录入必填项')
        return
      }

      // 数组转化字符串
      this.printSetform.contactTypeArray = this.printSetform.contactTypeArray.join(',')
      this.printSetform.certificateContent = this.printSetform.certificateContent.join(',')
      this.printSetform.certificatePreview = JSON.stringify(this.list)

      this.printSetform.certificateLayout = document.getElementById('print').innerHTML
      if(this.printSetform.id){
        request({
          url: '/api/register/signupCertificate/update',
          method: 'POST',
          data: {
            data: this.printSetform,
            funcModule: '获取模块类型',
            funcOperation: '获取模块类型'
          }
        }).then(res => {
          debugger
          if (res.data) {
            this.$message.success('创建成功')
          } else {
            this.$message.error('创建失败')
          }
          this.printSetform.contactTypeArray = this.printSetform.contactTypeArray ? this.printSetform.contactTypeArray.split(',') : []
          this.printSetform.certificateContent = this.printSetform.certificateContent ? this.printSetform.certificateContent.split(',') : []
          this.list = JSON.parse(this.printSetform.certificatePreview || '[]')
        }).catch( error => {
          debugger
          this.printSetform.contactTypeArray = this.printSetform.contactTypeArray ? this.printSetform.contactTypeArray.split(',') : []
          this.printSetform.certificateContent = this.printSetform.certificateContent ? this.printSetform.certificateContent.split(',') : []
          this.list = JSON.parse(this.printSetform.certificatePreview || '[]')
        })
      }else{
        request({
          url: '/api/register/signupCertificate/save',
          method: 'POST',
          data: {
            data: this.printSetform,
            funcModule: '获取模块类型',
            funcOperation: '获取模块类型'
          }
        }).then(res => {
          debugger
          if (res.data) {
            this.$message.success('创建成功')
          } else {
            this.$message.error('创建失败')
          }
          this.printSetform.contactTypeArray = this.printSetform.contactTypeArray ? this.printSetform.contactTypeArray.split(',') : []
          this.printSetform.certificateContent = this.printSetform.certificateContent ? this.printSetform.certificateContent.split(',') : []
          this.list = JSON.parse(this.printSetform.certificatePreview || '[]')
        }).catch( error => {
          debugger
          this.printSetform.contactTypeArray = this.printSetform.contactTypeArray ? this.printSetform.contactTypeArray.split(',') : []
          this.printSetform.certificateContent = this.printSetform.certificateContent ? this.printSetform.certificateContent.split(',') : []
          this.list = JSON.parse(this.printSetform.certificatePreview || '[]')
        })
      }
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
.printPreview-box-card {
  min-width: 400px;
  min-height: 600px;
  margin-right: 40px;
  background-color: rgba(242, 242, 242, 1);
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
  word-wrap: break-word;
  /* margin: 5px auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 35px;
  text-align: center; */
}
.p-event {
  border: 1px solid red;
  box-sizing: border-box;
  /* min-height: 500px; */
  overflow: hidden;
  width: 100%;
  position: relative;
}
.barCode /deep/ .vue-barcode-element {
  width: 100%;
  max-height: 92px;
  height: auto;
}
.personBarCode /deep/ .vue-barcode-element {
  width: 100%;
  max-height: 92px;
  height: auto;
}
</style>
