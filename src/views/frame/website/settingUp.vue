<template>
  <div class="demo-ruleForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="模块标题" prop="mainHeading">
        <el-input v-model="ruleForm.mainHeading" placeholder="请输入模块标题"></el-input>
      </el-form-item>
      <el-form-item label="模块副标题" prop="subHeading">
        <el-input v-model="ruleForm.subHeading" placeholder="请输入模块副标题"></el-input>
      </el-form-item>
      <el-form-item label="模块类型" prop="moduleType">
        <el-select v-model="ruleForm.moduleType" placeholder="请选择模块类型" style="width: 100%">
          <el-option label="站内页面" value="站内页面"></el-option>
          <el-option label="站外链接" value="站外链接"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择页面" prop="page">
        <el-select v-model="ruleForm.page" placeholder="请选择页面" style="width: 80%">
          <el-option label="页面一" value="页面一"></el-option>
          <el-option label="页面二" value="页面二"></el-option>
        </el-select>
        <span style="margin-left: 10px; color: #409eff; cursor: pointer">新增</span>
      </el-form-item>
      <el-form-item label="背景设置" prop="back">
        <el-radio-group @change="selectChange" v-model="ruleForm.radio">
          <el-radio :label="1">默认</el-radio>
          <el-radio :label="2">隐藏</el-radio>
          <el-radio :label="3">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="ruleForm.radio == 3" style="position: relative; left: 10%">
        <colorPicker defaultColor="rgba(198, 75, 34, 0.2)" v-model="colorValue" @change="handleChangeColor" size="5"></colorPicker>
      </div>
      <el-form-item label="图标" prop="icon">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
          <el-button size="small" type="text">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button @click="handelClick(1)">返回</el-button>
          <el-button @click="handelClick(2)" type="primary">保存</el-button>
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
// import ColorPicker from 'el-color-picker-sheldon'
export default {
  //   components: {
  //     ColorPicker
  //   },
  data() {
    return {
      colorValue: '#ff0000',
      ruleForm: {
        mainHeading: '',
        subHeading: '',
        moduleType: '',
        page: '',
        radio: 1
      },
      rules: {
        mainHeading: [
          { required: true, message: '请输入模块标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //         subHeading: [{ required: true, message: '请输入模块副标题', trigger: 'blur' }],
        moduleType: [{ required: true, message: '请选择模块类型', trigger: 'change' }],
        page: [{ required: true, message: '请选择页面', trigger: 'change' }]
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
      console.log(val)
      if (val == 1) {
        this.$emit('newVal', val)
      } else if (val == 2) {
        this.$emit('newVal', val)
      } else if (val == 3) {
        this.$emit('newVal', val)
      }
    },
    handleChangeColor(val) {
      this.colorValue = val
      this.$emit('colorVal', this.colorValue)
      console.log('输出颜色值', val) // 颜色 #6c8198
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个图片，本次选择了 ${files.length} 个图片，共选择了 ${files.length + fileList.length} 个图片`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handelClick(val) {
      console.log(val)
      if (val == 1) {
        this.$emit('onClick')
      } else {
      }
    }
  }
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
  height: 100%;
  margin-top: 15px;
}
/deep/.el-radio {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  margin-right: 15px;
}
</style>
