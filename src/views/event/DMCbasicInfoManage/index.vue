<template>
  <div class="BasicInformationManagement">
    <div class="title">基本信息管理</div>
    <div class="content">
      <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="ruleForm.company_name" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="company_address">
          <el-input v-model="ruleForm.company_address" placeholder="公司地址"></el-input>
        </el-form-item>
        <el-form-item label="关于我们" prop="about_us">
          <el-input type="textarea" :rows="5" v-model="ruleForm.about_us" placeholder="关于我们"></el-input>
        </el-form-item>
        <el-form-item label="公司介绍" prop="company_profile">
          <el-input type="textarea" :rows="5" v-model="ruleForm.company_profile" placeholder="公司介绍"></el-input>
        </el-form-item>
        <el-form-item label="上传公司LOGO" prop="company_logo">
          <el-upload ref="upload" action="" :on-change="handlePreviewLogo" :auto-upload="false" :show-file-list="false" :multiple="false">
            <el-button slot="trigger" size="small" type="primary">从电脑选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="ruleForm.company_logo">
          <img :src="ruleForm.company_logo" class="uploadImage" v-if="company_logo_if_image" />
          <div class="imageName" v-else>
            已选择: {{ ruleForm.company_logo.name }}
          </div>
        </el-form-item>
        <el-form-item label="上传图片" prop="picture">
          <el-upload ref="upload" action="" :on-change="handlePreviewImage" :auto-upload="false" :show-file-list="false" :multiple="false">
            <el-button slot="trigger" size="small" type="primary">从电脑选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="ruleForm.picture">
          <img :src="ruleForm.picture" class="uploadImage" v-if="picture_if_image" />
          <div class="imageName" v-else>
            已选择: {{ ruleForm.picture.name }}
          </div>
        </el-form-item>
        <el-form-item label="选择城市">
          <div class="typeList">
            <el-input v-model="cityName" readonly>
            </el-input>
            <div class="item" v-if="type.city != null">
              <div class="context">
                <div class="item" v-for="item in type.city[0].city_list" :key="item.code" :class="{
									current:
									  listFormData.city.findIndex((i) => i.code == item.code) != -1,
								  }" @click="selectedCity(item.code,item.AbbreviationName)">
                  {{ item.AbbreviationName }}
                </div>
                <template v-for="item in type.city">
                  <div class="more" :key="item.Key" v-if="item.Key != '热门' && statusList.cityStatus">
                    <div class="moreTitle">{{ item.Key }}</div>
                    <div class="moreItems">
                      <div class="item" v-for="item in item.city_list" :class="{
											  current:
												listFormData.city.findIndex((i) => i.code == item.code) !=
												-1,
											}" :key="item.code" @click="selectedCity(item.code,item.AbbreviationName)">
                        {{ item.AbbreviationName }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="opt">
                <el-button :type="statusList.cityStatus ? 'warning' : 'success'" size="mini" @click="statusList.cityStatus = !statusList.cityStatus">{{ statusList.cityStatus ? "收起" : "展开" }}</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="公司电话" prop="company_phone">
          <el-input v-model="ruleForm.company_phone" placeholder="公司电话"></el-input>
        </el-form-item>
        <el-form-item label="公司传真" prop="company_fax">
          <el-input v-model="ruleForm.company_fax" placeholder="公司传真"></el-input>
        </el-form-item>
        <el-form-item label="公司邮箱" prop="company_email">
          <el-input v-model="ruleForm.company_email" placeholder="公司邮箱"></el-input>
        </el-form-item>
        <el-form-item label="客服姓名">
          <el-input v-model="ruleForm.customer_service_name" placeholder="客服姓名"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="customer_service_telephone_numbers">
          <el-input v-model="ruleForm.customer_service_telephone_numbers" placeholder="客服电话"></el-input>
        </el-form-item>
        <el-form-item label="客服QQ号码" prop="customer_service_QQ_number">
          <el-input v-model="ruleForm.customer_service_QQ_number" placeholder="客服QQ号码"></el-input>
        </el-form-item>
        <el-form-item label="公司网站网址" prop="company_website">
          <el-input v-model="ruleForm.company_website" placeholder="公司网站网址"></el-input>
        </el-form-item>
        <el-form-item label="特别说明">
          <el-input type="textarea" :rows="5" v-model="ruleForm.special_note" placeholder="特别说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">立即保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * @page 基本信息管理
 */
import upload from '@/utils/upload'

import { validatePhone, validateTelphone, validatePhoneTwo, validateEMail, validateURL } from '@/assets/js/validator'
export default {
  name: 'BasicInformationManagement',
  data() {
    return {
      ruleForm: {
        company_name: '',
        company_address: '',
        about_us: '',
        company_profile: '',
        company_phone: '',
        company_fax: '',
        company_email: '',
        customer_service_name: '',
        customer_service_telephone_numbers: '',
        customer_service_QQ_number: '',
        company_website: '',
        special_note: '',
        company_logo: '',
        picture: '',
        city: ''
      },
      rules: {
        company_name: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'change'
          }
        ],
        company_address: [
          {
            required: true,
            message: '请输入公司地址',
            trigger: 'change'
          }
        ],
        about_us: [
          {
            required: true,
            message: '请填写关于我们',
            trigger: 'change'
          }
        ],
        company_profile: [
          {
            required: true,
            message: '请填写公司介绍',
            trigger: 'change'
          }
        ],
        company_phone: [
          {
            required: true,
            message: '请输入公司电话',
            trigger: 'change'
          },
          {
            validator: validatePhoneTwo,
            trigger: 'blur'
          }
        ],
        company_fax: [
          {
            required: true,
            message: '请输入公司传真',
            trigger: 'change'
          },
          {
            validator: validateTelphone,
            trigger: 'blur'
          }
        ],
        company_email: [
          {
            required: true,
            message: '请输入公司邮箱',
            trigger: 'change'
          },
          {
            validator: validateEMail,
            trigger: 'blur'
          }
        ],
        customer_service_telephone_numbers: [
          {
            required: true,
            message: '请输入客服电话',
            trigger: 'change'
          },
          {
            validator: validatePhoneTwo,
            trigger: 'blur'
          }
        ],
        customer_service_QQ_number: [
          {
            required: true,
            message: '请输入客服QQ',
            trigger: 'change'
          }
        ],
        company_website: [
          {
            validator: validateURL,
            trigger: 'change'
          }
        ],
        company_logo: [
          {
            required: true,
            message: '请上传公司LOGO',
            trigger: 'change'
          }
        ],
        picture: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'change'
          }
        ]
      },
      // 待上传 公司logo
      wait_for_logo: null,
      // 待上传 图片
      wait_for_image: null,
      type: {
        city: null,
        sitetype: null,
        brand: null,
        venuearea: null,
        venuepeoplenumber: null,
        roomprice: null
      },
      listFormData: {
        city: [],
        // sitetype: [],
        // brand: [],
        // venue_min_area: null,
        // venue_max_area: null,
        // venue_min_people_number: null,
        // venue_max_people_number: null,
        // room_min_avg_price: null,
        // room_max_avg_price: null,
        keyword: '',
        isagreement: false,
        Page: 1,
        Rows: 10
      },
      statusList: {
        cityStatus: false, //选择城市是否展开,
        brandStatus: false //酒店品牌是否展开,
      },
      cityName: ''
    }
  },
  computed: {
    picture_if_image() {
      return String(this.ruleForm.picture).IsPicture()
    },
    company_logo_if_image() {
      return String(this.ruleForm.company_logo).IsPicture()
    }
  },
  methods: {
    // 保存1
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          var city = ''
          var cityname = ''
          this.listFormData.city.forEach((val, index) => {
            if (index == this.listFormData.city.length - 1) {
              city += val.code
              cityname += val.AbbreviationName
            } else {
              city += val.code + ','
              cityname += val.AbbreviationName + ','
            }
          })
          this.ruleForm.city = city
          this.ruleForm.cityname = cityname

          //组装本次上传数据
          // 验证成功
          upload([
            {
              key: 'company_logo',
              file: this.ruleForm.company_logo
            }
          ])
            .then(res => {
              console.log(res)
              if (res[0]) this.ruleForm.company_logo = res[0].FilePath
              return upload([
                {
                  key: 'picture',
                  file: this.ruleForm.picture
                }
              ])
            })
            .then(res => {
              console.log(res)
              if (res[0]) this.ruleForm.picture = res[0].FilePath
              return this.requestApi({
                url: '/serviceprovider/save',
                method: 'POST',
                data: this.ruleForm
              })
            })
            // 提交
            .then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传LOGO
    handlePreviewLogo(file) {
      //保存消息图片
      const isJPG = file.raw.type === 'image/jpeg'
      const isPNG = file.raw.type === 'image/png'
      const isLt500K = file.size / 1024 < 500
      if ((!isJPG && !isPNG) || !isLt500K) {
        if (!isJPG || !isPNG) this.$message.error('上传公司LOGO只能是 JPG 或者 PNG 格式!')
        else this.$message.error('上传公司LOGO大小不能超过 500KB!')
        // 取消时在文件列表中删除该文件
        this.$refs.upload.handleRemove(file)
        return
      }
      // file 文件
      this.ruleForm.company_logo = file.raw
    },
    // 上传图片
    handlePreviewImage(file) {
      //保存消息图片
      const isJPG = file.raw.type === 'image/jpeg'
      const isPNG = file.raw.type === 'image/png'
      const isLt500K = file.size / 1024 < 500
      if ((!isJPG && !isPNG) || !isLt500K) {
        if (!isJPG || !isPNG) this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
        else this.$message.error('上传图片大小不能超过 500KB!')
        // 取消时在文件列表中删除该文件
        this.$refs.upload.handleRemove(file)
        return
      }
      // file 文件
      this.ruleForm.picture = file.raw
    },
    selectedCity(code, AbbreviationName) {
      //this.listFormData.city = [{ code }];
      if (code) {
        if (this.listFormData.city.findIndex(item => item.code === code) == -1) {
          if (this.listFormData.city.length < 10) {
            this.listFormData.city.push({
              code,
              AbbreviationName
            })
            var list = ''
            this.listFormData.city.forEach((val, index) => {
              if (this.listFormData.city.length - 1 == index) {
                list += val.AbbreviationName
              } else {
                list += val.AbbreviationName + ','
              }
            })
            this.cityName = list
          } else {
            this.$message({
              showClose: true,
              message: '最多可选十座城市',
              type: 'warning'
            })
          }
        } else {
          this.listFormData.city = this.listFormData.city.filter(item => item.code != code)
          this.listFormData.city = this.listFormData.city.filter(item => item.AbbreviationName != AbbreviationName)
          var list = ''
          this.listFormData.city.forEach((val, index) => {
            if (this.listFormData.city.length - 1 == index) {
              list += val.AbbreviationName
            } else {
              list += val.AbbreviationName + ','
            }
          })
          this.cityName = list
        }
      } else this.listFormData.city = []
    }
  },
  mounted() {
    this.requestApi({
      url: '/serviceprovider/info',
      method: 'POST',
      data: {}
    }).then(res => {
      this.ruleForm = res
      this.requestApi({
        url: '/serviceprovider/city',
        method: 'POST',
        data: {}
      }).then(res => {
        this.type.city = res.city
        var result = []
        if (!this.ruleForm.city.toString().includes(',')) {
          result = new Array(this.ruleForm.city)
        } else {
          result = this.ruleForm.city.split(',')
        }
        let list = JSON.parse(JSON.stringify(this.type.city))
        var name = {}
        list.splice(0, 1)
        result.forEach((val, index) => {
          list.forEach((value, i) => {
            name = value.city_list.find(e => e.code == val)
            if (name) {
              this.selectedCity(val, name.AbbreviationName)
            }
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.BasicInformationManagement {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
}

.content {
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .form {
    width: 100%;
    max-width: 800px;
    margin-left: 10%;
  }

  .uploadImage {
    max-width: 200px;
  }
}

.imageName {
  color: #457ffd;
}

.typeList {
  border: 1px solid #eaecf3;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;

  > .item {
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 32px;
    font-size: 12px;
    padding: 10px 0;
    box-sizing: border-box;

    &:last-child {
      border: 0;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }

    .name {
      color: #999999;
    }

    .context {
      flex: 1;
      margin: 0 10px;
      overflow: hidden;
      color: #666666;
      width: 0;

      > .item {
        cursor: pointer;
        float: left;
        margin-right: 5px;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 3px;

        &.current {
          background-color: #f4ad49;
          color: #fff;
        }
      }

      .more {
        clear: both;
        display: flex;
        margin-left: 20px;

        .moreTitle {
          font-weight: bold;
          margin-right: 20px;
        }

        .moreItems {
          flex: 1;
          overflow: hidden;

          > .item {
            cursor: pointer;
            float: left;
            margin-right: 5px;
            padding: 0 10px;
            box-sizing: border-box;
            border-radius: 3px;

            &.current {
              background-color: #f4ad49;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
