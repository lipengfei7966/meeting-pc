<template>
  <div class="demo-ruleForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="模块标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入模块标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="模块副标题" prop="subHeading">
        <el-input v-model="ruleForm.subHeading" placeholder="请输入模块副标题"></el-input>
      </el-form-item> -->
      <el-form-item label="模块类型" prop="type">
        <el-select @change="select_" v-model="ruleForm.type" placeholder="请选择模块类型" style="width: 100%">
          <el-option v-for="(item, index) in classify" :key="index" :label="item.dictItemName" :value="item.dictItemVal"></el-option>
          <!-- <el-option label="站外链接" value="站外链接"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type == 'article'" label="选择页面" prop="page">
        <el-select v-model="ruleForm.page" placeholder="请选择页面" style="width: 100%">
          <el-option v-for="(item, index) in pageLists" :key="index" :label="item.name" :value="item.code"></el-option>
          <!-- <el-option label="页面二" value="页面二"></el-option> -->
        </el-select>
        <!-- <span style="margin-left: 10px; color: #409eff; cursor: pointer">新增</span> -->
      </el-form-item>
      <!--  -->
      <el-form-item v-if="ruleForm.type == 'url'" label="站外链接" prop="link">
        <el-input v-model="ruleForm.link" placeholder="请输入站外链接"></el-input>
      </el-form-item>
      <!--  -->
      <el-form-item label="背景设置" prop="back">
        <el-radio-group @change="selectChange" v-model="ruleForm.backgroundSetting">
          <el-radio :label="'1'">默认</el-radio>
          <el-radio :label="'2'">隐藏</el-radio>
          <el-radio :label="'3'">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="ruleForm.backgroundSetting == '3'" style="position: relative; left: 10%">
        <colorPicker defaultColor="rgba(198, 75, 34, 0.2)" v-model="colorValue" @change="handleChangeColor" size="5"></colorPicker>
      </div>
      <el-form-item label="图标" prop="fileList">
        <el-upload class="upload-demo" :headers="httpHeaders" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :on-success="uploadFile" :file-list="ruleForm.fileList">
          <el-button size="small" type="text">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button @click="handelClick(1)">返回</el-button>
          <el-button v-if="!isFlag_one" @click="submitForm('ruleForm')" type="primary">保存</el-button>
          <el-button v-if="isFlag_one" @click="add('ruleForm')" type="primary">新增</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- <div v-if="ruleForm.radio == 3" style="height: 400px;overflow-y: auto;"><color-picker size="mini" :draggable="false" @receiveColor="receiveColor"></color-picker></div> -->
    <!-- <div>
<el-button>返回</el-button>
  <el-button type="primary">保存</el-button>
</div> -->
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
// import ColorPicker from 'el-color-picker-sheldon'
export default {
  props: ['dataNum', 'newData', 'isFlag_one', 'code', 'dataLength'], //接收值
  //   components: {
  //     ColorPicker
  //   },
  data() {
    return {
      colorValue: 'rgba(198, 75, 34, 0.2)',
      ruleForm: {
        id: '',
        sort: '',
        versionNum: '',
        webpageCode: '',
        title: '', //标题
        subHeading: '',
        type: '',
        page: '',
        link: '',
        backgroundSetting: '1',
        content: '',
        icon: '',
        fileList: [{ name: '', url: '' }],
        backgroundColor: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入模块标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //         subHeading: [{ required: true, message: '请输入模块副标题', trigger: 'blur' }],
        type: [{ required: true, message: '请选择模块类型', trigger: 'change' }],
        page: [{ required: true, message: '请选择页面', trigger: 'change' }],
        link: [{ required: true, message: '请输入站外链接', trigger: 'blur' }]
      },
      pageLists: [],
      classify: [],
      // process.env.BASE_API +
      uploadUrl: process.env.BASE_API + '/api/obs/file/uploadImg'
    }
  },
  computed: {
    httpHeaders() {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  },
  created() {
    this.getCode()
  },
  watch: {
    newData: {
      immediate: true,
      handler(newValue, oldValue) {
        debugger
        // 标注
        console.log(newValue, oldValue)
        if (newValue) {
          let submitVal = newValue
          if (submitVal.id) {
            this.ruleForm.id = submitVal.id
          } else {
            this.ruleForm.id = ''
          }
          // debugger
          if (submitVal.sort || submitVal.sort == 0) {
            if (submitVal.sort == 0) {
              this.ruleForm.sort = 0
            } else {
              this.ruleForm.sort = submitVal.sort
            }
          } else {
            this.ruleForm.sort = ''
          }
          if (submitVal.title) {
            this.ruleForm.title = submitVal.title
            if (submitVal.icon) {
              this.ruleForm.fileList[0].name = submitVal.title + '图标'
            }
          }
          // debugger
          if (submitVal.type) {
            this.ruleForm.type = submitVal.type
            if (submitVal.type == 'article') {
              this.ruleForm.page = submitVal.content
            } else if (submitVal.type == 'url') {
              this.ruleForm.link = submitVal.content
            }
          } else {
            this.ruleForm.type = ''
            this.ruleForm.page = ''
            this.ruleForm.link = ''
          }
          if (submitVal.backgroundSetting) {
            this.ruleForm.backgroundSetting = submitVal.backgroundSetting
          } else {
            this.ruleForm.backgroundSetting = '1'
          }
          if (submitVal.icon) {
            debugger
            this.ruleForm.fileList[0].url = submitVal.icon
            this.ruleForm.icon = submitVal.icon
          } else {
            if (this.ruleForm.icon) {
            } else {
              this.ruleForm.fileList = []
            }
          }
          if (submitVal.versionNum) {
            this.ruleForm.versionNum = submitVal.versionNum
          } else {
            this.ruleForm.versionNum = ''
          }
          if (submitVal.webpageCode) {
            this.ruleForm.webpageCode = submitVal.webpageCode
          } else {
            this.ruleForm.webpageCode = ''
          }
          if (submitVal.backgroundColor) {
            // debugger
            this.ruleForm.backgroundColor = submitVal.backgroundColor
          } else {
            this.ruleForm.backgroundColor = ''
          }
        }
      },
      deep: true
    },
    isFlag_one: {
      immediate: true,
      handler(nVal, oVal) {
        // debugger
        if (nVal == true) {
          this.ruleForm = {
            id: '',
            sort: '',
            versionNum: '',
            webpageCode: '',
            title: '', //标题
            subHeading: '',
            type: '',
            page: '',
            link: '',
            backgroundSetting: '1',
            content: '',
            icon: '',
            fileList: [],
            backgroundColor: ''
          }
        }
        console.log(nVal, oVal)
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          debugger
          console.log(this.ruleForm)
          // return
          if (this.ruleForm.backgroundSetting == 3) {
            this.ruleForm.backgroundColor = this.colorValue
          } else if (this.ruleForm.backgroundSetting == 2) {
            this.ruleForm.backgroundColor = ''
          } else {
            this.ruleForm.backgroundColor = 'rgba(198, 75, 34, 0.2)'
          }
          if (this.ruleForm.type == 'article') {
            this.ruleForm.content = this.ruleForm.page
          } else {
            this.ruleForm.content = this.ruleForm.link
          }
          // this.ruleForm.code = this.code
          console.log(this.ruleForm)
          delete this.ruleForm.fileList
          delete this.ruleForm.link
          delete this.ruleForm.page
          request({
            url: '/api/biz/cmsWebpageButton/update',
            method: 'POST',
            data: { data: this.ruleForm, funcModule: '获取模块类型', funcOperation: '获取模块类型' }
          })
            .then((res) => {
              // debugger
              if (res.data) {
                this.$message('保存成功')
                this.$emit('upData')
              }
              this.console.log(res)
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.backgroundSetting == 3) {
            this.ruleForm.backgroundColor = this.colorValue
          } else if (this.ruleForm.backgroundSetting == 2) {
            this.ruleForm.backgroundColor = ''
          } else {
            this.ruleForm.backgroundColor = 'rgba(198, 75, 34, 0.2)'
          }
          if (this.ruleForm.type == 'article') {
            this.ruleForm.content = this.ruleForm.page
          } else {
            this.ruleForm.content = this.ruleForm.link
          }
          this.ruleForm.sort = this.dataLength
          this.ruleForm.webpageCode = this.code
          delete this.ruleForm.fileList
          delete this.ruleForm.link
          delete this.ruleForm.page
          console.log(this.ruleForm)
          request({
            url: '/api/biz/cmsWebpageButton/save',
            method: 'POST',
            data: { data: this.ruleForm, funcModule: '新增模块', funcOperation: '新增模块' }
          })
            .then((res) => {
              // debugger
              if (res.data) {
                this.$message('新增成功')
                this.$emit('upData')
              }
              this.console.log(res)
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    selectChange(val) {
      // console.log(val)
      debugger
      if (val == 1) {
        this.$emit('newVal', val, this.dataNum)
      } else if (val == 2) {
        this.$emit('newVal', val, this.dataNum)
      } else if (val == 3) {
        this.$emit('newVal', val, this.dataNum, this.colorValue)
      }
    },
    handleChangeColor(val) {
      // debugger
      this.colorValue = val
      this.$emit('colorVal', this.colorValue, this.dataNum)
      console.log('输出颜色值', val) // 颜色 #6c8198
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.ruleForm.icon = ''
      this.ruleForm.fileList = []
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个图片，本次选择了 ${files.length} 个图片，共选择了 ${files.length + fileList.length} 个图片`)
      this.$message.warning('请删除已存在图片后再进行上传操作')
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handelClick(val) {
      console.log(val)
      this.$emit('onClick')
    },
    select_(val) {
      console.log(val)
      this.ruleForm.page = ''
      this.ruleForm.link = ''
    },
    getCode() {
      request({
        url: '/api/sys/dict/listItem',
        method: 'POST',
        data: { data: 'WEBSITE_BUTTON_TYPE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
      })
        .then((res) => {
          this.classify = res.data
          this.console.log(res)
        })
        .catch(() => {})
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: { data: { type: 'ARTICLE' }, funcModule: '获取页面', funcOperation: '获取页面' }
      })
        .then((res) => {
          // debugger
          // debugger
          this.pageLists = res.data
          this.console.log(res)
        })
        .catch(() => {})
    },
    uploadFile(response, file, filelist) {
      this.ruleForm.icon = response.data.filePath
      console.log(response.data.filePath, file, filelist)
    }
  }
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
  height: 100%;
  margin-top: 15px;
}
.el-radio {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  margin-right: 15px;
}
</style>
