<template>
  <div style="position: relative; top: 15%; transform: translateY(-30%)">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('website.microStationDesign.mainHeading')" prop="mainTitle">
        <el-input v-model="ruleForm.mainTitle"></el-input>
      </el-form-item>
      <el-form-item :label="$t('website.microStationDesign.subtitle')" prop="miniTitle">
        <el-input v-model="ruleForm.miniTitle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('website.microStationDesign.save')}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{$t('website.microStationDesign.return')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  props: ['code', 'title_', 'subTitle'], //接收值
  data() {
    return {
      ruleForm: {
        mainTitle: '',
        miniTitle: ''
      },
      rules: {
        mainTitle: [
          { required: true, message: this.$t('website.microStationDesign.enterMainHeading'), trigger: 'blur' },
          { min: 2, max: 100, message: this.$t('website.microStationDesign.lengthRanges'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    title_: {
      immediate: true,
      handler(nVal, oVal) {
        this.ruleForm.mainTitle = nVal
        console.log(nVal, oVal)
      }
    },
    subTitle: {
      immediate: true,
      handler(nVal, oVal) {
        this.ruleForm.miniTitle = nVal
        console.log(nVal, oVal)
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          //
          request({
            url: '/api/biz/cmsWebpage/updateTitle',
            method: 'POST',
            data: { data: { code: this.code, title: this.ruleForm.mainTitle, subTitle: this.ruleForm.miniTitle }, funcOperation: '保存标题', funcModule: '保存标题' }
          })
            .then(data => {
              if (data) {
                this.$message(this.$t('website.microStationDesign.titleSaveSuccess'))
                this.$emit('upData_')
              } else {
                this.$message(this.$t('website.microStationDesign.titleSaveFail'))
              }
              loading.close()
            })
            .catch(() => {})
          //
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$parent.isFlag = 1
      this.$emit('isFlag_', 0)
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>