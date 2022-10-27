<template>
  <div class="content">

    <el-form ref='queryForm' @submit.native.prevent label-position="right" :rules='rules' :model="setForm" label-width="150px" class='contactForm'>
      <div v-for="element in setInfoList" :key="element.mapCode">

        <!-- 分割线 -->
        <div v-if="element.systemName == '分割线' " class="form-item-input">
          <el-divider content-position="center">{{ element.placeholder }}</el-divider>
        </div>

        <!-- 分页 -->
        <div v-else-if="element.systemName == '分页' " class="form-item-input">
          <p style="text-align:center">[ 第 {{ element.pagingIndex }} 页/共 {{ pagingCount }} 页 ]</p>
          <!-- <el-divider content-position="center">{{ element.placeholder }}</el-divider> -->
        </div>

        <!-- 说明信息 -->
        <div v-else-if="element.systemName == '说明信息' " class="form-item-input">
          <pre>{{ element.placeholder }}</pre>
        </div>

        <el-form-item v-else :label="element.title" :prop='element.mapCode'>
          <!-- 姓名 -->
          <div v-if=" element.mapCode=='name' && !element.nameSplit" class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <el-input v-model="setForm.name" style="width: 50%" size="mini" :placeholder="element.placeholder"></el-input>
          </div>
          <!-- 姓名拆分 -->
          <div v-if="element.mapCode == 'name' && element.nameSplit" class="form-item-input">
            <div>
              <span class="setInfoItemlabel"> {{element.surnameTitle}} : </span>
              <el-input v-model="setForm.surname" style="width: 50%" size="mini" :placeholder="element.surnamePlaceholder"></el-input>
            </div>
            <div>
              <span class="setInfoItemlabel"> {{element.nameTitle}} : </span>
              <el-input v-model="setForm.ming" style="width: 50%" size="mini" :placeholder="element.namePlaceholder"></el-input>
            </div>
          </div>
          <!-- 性别 -->
          <div v-if="element.mapCode == 'sex' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <el-radio v-model="setForm.sex" :label="element.sexRadioOptions[0]">{{ element.sexRadioOptions[0] }}</el-radio>
            <el-radio v-model="setForm.sex" :label="element.sexRadioOptions[1]">{{ element.sexRadioOptions[1] }}</el-radio>
          </div>

          <!-- 证件 -->
          <div v-if="element.mapCode == 'certificate' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-select style="width: 100%" v-model="setForm.certificateType" :placeholder="element.placeholder">
                <el-option v-for="item in element.options" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
              <br>
              <el-input v-model="setForm.certificate" style="margin-top:10px" size="mini" placeholder="请输入您的证件号码"></el-input>
            </div>
          </div>

          <!-- 照片 -->
          <div v-if="element.mapCode == 'photo' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <!-- 地址 -->
          <div v-if="element.mapCode == 'addres' " class="form-item-input">
            <!-- 国家 -->
            <div v-if="element.nationIsShow" class="addresItem" style="margin-top: 20px">
              <span class="setInfoItemlabel"> {{element.nationTitle}} : </span>
              <el-select style="width: 50%" v-model="setForm.nation" :placeholder="element.nationPlaceholder">
                <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <!-- 省份 -->
            <div v-if="element.provinceIsShow" class="addresItem">
              <span class="setInfoItemlabel"> {{element.provinceTitle}} : </span>
              <el-select style="width: 50%" v-model="setForm.province" :placeholder="element.provincePlaceholder">
                <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <!-- 城市 -->
            <div v-if="element.cityIsShow" class="addresItem">
              <span class="setInfoItemlabel"> {{element.cityTitle}} : </span>
              <el-select style="width: 50%" v-model="setForm.city" :placeholder="element.cityPlaceholder">
                <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <!-- 区县 -->
            <div v-if="element.countyIsShow" class="addresItem">
              <span class="setInfoItemlabel"> {{element.countyTitle}} : </span>
              <el-select style="width: 50%" v-model="setForm.county" :placeholder="element.countyPlaceholder">
                <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <!-- 详细地址 -->
            <div v-if="element.detailedAdressISShow" class="addresItem">
              <span class="setInfoItemlabel"> {{element.detailedAdressTitle}} : </span>
              <el-input style="width: 50%" size="mini" v-model="setForm.fullAddress" :placeholder="element.detailedAdressPlaceholder"></el-input>
            </div>
            <!-- 邮编 -->
            <div v-if="element.postcodeIsShow" class="addresItem">
              <span class="setInfoItemlabel"> {{element.postcodeTitle}} : </span>
              <el-input style="width: 50%" size="mini" v-model="setForm.postcode" :placeholder="element.postcodePlaceholder"></el-input>
            </div>

          </div>

          <!-- 手机号 -->
          <div v-if="element.mapCode == 'mobile' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.mobile" :placeholder="element.placeholder" size="mini" class="input-with-select">
                <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.mobileIntCode" placeholder="请选择国际区号">
                  <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                </el-select>
              </el-input>
              <br>
              <el-input v-model="setForm.mobileVerifyCode" v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                <el-button slot="append">获取验证码</el-button>
              </el-input>
            </div>
          </div>

          <!-- 备用手机号 -->
          <div v-if="element.mapCode == 'spareMobile' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->

            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.spareMobile" :placeholder="element.placeholder" size="mini" class="input-with-select">
                <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.spareMobileIntCode" placeholder="请选择国际区号">
                  <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                </el-select>
              </el-input>
              <br>
              <el-input v-model="setForm.spareMobileVerifyCode" v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                <el-button slot="append">获取验证码</el-button>
              </el-input>
            </div>
          </div>

          <!-- 固定电话 -->
          <div v-if="element.mapCode == 'phone' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->

            <div style="width: 80%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.phoneAreaCode" style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.phoneIntCode" placeholder="请选择国际区号">
                  <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                </el-select>
              </el-input>
              <span>
                - <el-input v-model="setForm.phone" style="width: 120px" :placeholder="element.placeholder" size="mini"></el-input>
              </span>
              <span v-if="element.extensionNumbeIsShow">
                - <el-input v-model="setForm.phoneRunNumber" style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
              </span>
            </div>
          </div>

          <!-- 传真 -->
          <div v-if="element.mapCode == 'fax' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 80%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.faxAreaCode" style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.faxIntCode" placeholder="请选择国际区号">
                  <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                </el-select>
              </el-input>
              <span>
                - <el-input v-model="setForm.fax" style="width: 120px" :placeholder="element.placeholder" size="mini"></el-input>
              </span>
              <span v-if="element.extensionNumbeIsShow">
                - <el-input v-model="setForm.faxRunNumber" style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
              </span>
            </div>
          </div>

          <!-- 邮箱 -->
          <div v-if="element.mapCode == 'email' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.email" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              <br>
              <el-input v-model="setForm.emailVerifyCode" v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                <el-button slot="append">获取验证码</el-button>
              </el-input>
            </div>
          </div>

          <!-- 备用邮箱 -->
          <div v-if="element.mapCode == 'spareEmail' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.spareEmail" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              <br>
              <el-input v-model="setForm.spareEmailVerifyCode" v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                <el-button slot="append">获取验证码</el-button>
              </el-input>
            </div>
          </div>

          <!-- 微信号 -->
          <div v-if="element.mapCode == 'wechat' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.wechat" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
            </div>
          </div>

          <!-- qq -->
          <div v-if="element.mapCode == 'qq' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.qq" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
            </div>
          </div>

          <!-- 公司 -->
          <div v-if="element.mapCode == 'company' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.company" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
            </div>
          </div>

          <!-- 部门 -->
          <div v-if="element.mapCode == 'department' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.department" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
            </div>
          </div>

          <!-- 职位 -->
          <div v-if="element.mapCode == 'position' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm.position" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
            </div>
          </div>

          <!-- 短文本 -->
          <div v-if="element.systemName == '短文本' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm[element.mapCode]" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
            </div>
          </div>

          <!-- 长文本 -->
          <div v-if="element.systemName == '长文本' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm[element.mapCode]" type="textarea" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
            </div>
          </div>

          <!-- 数字 -->
          <div v-if="element.systemName == '数字' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-input v-model="setForm[element.mapCode]" :placeholder="element.placeholder" size="mini"></el-input>
            </div>
          </div>

          <!-- 单选框 -->
          <div v-if="element.systemName == '单选框' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-radio-group v-model="setForm[element.mapCode]" :style="{width:'100%',display:'flex',flexDirection:element.orientation=='横向'?'row':'column'}">
                <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
              </el-radio-group>
            </div>
          </div>

          <!-- 复选框 -->
          <div v-if="element.systemName == '复选框' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-checkbox-group v-model="setForm[element.mapCode]" :style="{width:'100%',display:'flex',flexDirection:element.orientation=='横向'?'row':'column'}" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length">
                <el-checkbox v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <!-- 下拉列表 -->
          <div v-if="element.systemName == '下拉列表' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-select v-model="setForm[element.mapCode]" style="margin-left: 10px;width:70%" :placeholder="element.placeholder">
                <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>

          <!-- 下拉复选框 -->
          <div v-if="element.systemName == '下拉复选框' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-select v-model="setForm[element.mapCode]" style="margin-left: 10px;width:70%" :placeholder="element.placeholder" :multiple="true" @change="selectMultipleChange">
                <el-option v-for="item in element.options" :key="item" :label="item" :value="item || '待输入'" :disabled="(element.maxCheckedCount != '' && setForm.selectMultipleCheckedOptions.length >= element.maxCheckedCount) && !setForm.selectMultipleCheckedOptions.includes(item)"></el-option>
              </el-select>
            </div>
          </div>

          <!-- 附件 -->
          <div v-if="element.systemName == '附件' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <p> {{element.placeholder}} </p>
            </el-upload>
          </div>

          <!-- 日期 -->
          <div v-if="element.systemName == '日期' " class="form-item-input">
            <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
            <div style="width: 50%;display:inline-block;vertical-align: top;">
              <el-date-picker v-model="setForm[element.mapCode]" align="right" type="date" size="mini" :placeholder="element.placeholder" :picker-options="pickerOptions"></el-date-picker>
            </div>
          </div>

          <!-- 分割线 -->
          <div v-if="element.systemName == '分割线' " class="form-item-input">
            <el-divider content-position="center">{{ element.placeholder }}</el-divider>
          </div>

          <!-- 分页 -->
          <div v-if="element.systemName == '分页' " class="form-item-input">
            <p style="text-align:center">[ 第 {{ element.pagingIndex }} 页/共 {{ pagingCount }} 页 ]</p>
            <!-- <el-divider content-position="center">{{ element.placeholder }}</el-divider> -->
          </div>

          <!-- 说明信息 -->
          <div v-if="element.systemName == '说明信息' " class="form-item-input">
            <pre>{{ element.placeholder }}</pre>
          </div>
        </el-form-item>

      </div>
    </el-form>

  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: "contactEdit",
  data() {
    return {
      setInfoList: [], // 选中的配置信息列表
      baseInfoList: [], // 基础信息
      customInfoList: [], // 自定义信息列表
      countryCodeOptions: [], // 国际区号下拉选项  dictItemName - dictItemVal
      setForm: {
        name: '', // 姓名
        surname: '', // 姓
        ming: '', //名
        sex: '', // 性别
        certificateType: '', // 证件类型
        certificate: '', // 证件号
        photo: '', // 照片
        nations: '', // 国家
        province: '', // 省份
        city: '', //城市
        county: '', // 区/县
        fullAddress: '', // 详细地址
        postcode: '', // 邮编
        mobileIntCode: '', // 手机国际区号
        mobile: '', // 手机号
        mobileVerifyCode: '', // 手机验证码
        spareMobileIntCode: '', // 备用手机号国际区号
        spareMobile: '', // 备用手机号
        spareMobileVerifyCode: '', // 备用手机验证码
        phoneIntCode: '', // 电话国际区号
        phoneAreaCode: '', // 电话区号
        phone: '', // 固定电话
        phoneRunNumber: '', // 电话分机号
        faxIntCode: '', // 传真国际区号
        faxAreaCode: '', // 传真区号
        fax: '', // 传真
        faxRunNumber: '', // 传真分机号
        email: '', // 邮箱
        emailVerifyCode: '', //邮箱验证码
        spareEmail: '', // 备用邮箱
        spareEmailVerifyCode: '', // 备用邮箱验证码
        wechat: '', // 微信号
        qq: '', // qq
        company: '', // 公司
        department: '', // 部门
        position: '', // 职位
      },
      pagingCount: 1, // f分页数量
      rules:{
        // name: [
        //   { required: true, message: "请输入姓名", trigger: "blur" },
        // ],
        // surname: [
        //   { required: true, message: "请输入姓", trigger: "blur" },
        // ],
        // ming: [
        //   { required: true, message: "请输入名", trigger: "blur" },
        // ],
        // sex: [
        //   { required: true, message: "请选择性别", trigger: "blur" },
        // ],
        // certificateType: [
        //   { required: true, message: "请选择证件类型", trigger: "blur" },
        // ],
        // certificate: [
        //   { required: true, message: "请输入证件号码", trigger: "blur" },
        // ],
        // photo: [
        //   { required: true, message: "请上传照片", trigger: "blur" },
        // ],
        // addres: [
        //   { required: true, message: "请输入地址", trigger: "blur" },
        // ],
        // mobile: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        // ],
        // spareMobile: [
        //   { required: true, message: "请输入备用手机号", trigger: "blur" },
        // ],
        // phone: [
        //   { required: true, message: "请输入固定电话", trigger: "blur" },
        // ],
        // fax: [
        //   { required: true, message: "请输入传真", trigger: "blur" },
        // ],
        // email: [
        //   { required: true, message: "请输入邮箱", trigger: "blur" },
        // ],
        // spareEmail: [
        //   { required: true, message: "请输入备用邮箱", trigger: "blur" },
        // ],
        // wechat: [
        //   { required: true, message: "请输入微信号", trigger: "blur" },
        // ],
        // qq: [
        //   { required: true, message: "请输入QQ号", trigger: "blur" },
        // ],
        // company: [
        //   { required: true, message: "请输入公司名称", trigger: "blur" },
        // ],
        // department: [
        //   { required: true, message: "请输入部门,名称", trigger: "blur" },
        // ],
        // position: [
        //   { required: true, message: "请输入职位", trigger: "blur" },
        // ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  mounted(){
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'COUNTRY_CODE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      // debugger
      // dictItemName \ dictItemVal
      this.countryCodeOptions = res.data
    })
    this.getEventInfo()
  },
  methods:{
    getEventInfo() {
      request({
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: this.$route.params.data,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then(response => {
        
        if(response.data.json){
          this.setInfoList = JSON.parse(response.data.json)
        }else{
          this.setInfoList = [];
        }
        debugger
        this.setInfoList.forEach(item => {
          // 1：自定义属性
          if(item.mapBase == 1){
            if(['复选框','下拉复选框'].includes(item.systemName)) {
              this.setForm[item.mapCode] = []
            }else{
              this.setForm[item.mapCode] = ''
            }
          }
          
          this.rules[item.mapCode] = [{require: item.isRequire, message: item.title + "是必填项", trigger: "blur" }]

          if(item.systemName == '分割线'){
            this.pagingCount++
          }

          // 国际区号设置默认值
          if(item.mapCode == 'mobile'){
            this.setForm.mobileIntCode = item.defaultCountryCode
          }
          if(item.mapCode == 'spareMobile'){
            this.setForm.spareMobileIntCode = item.defaultCountryCode
          }
          if(item.mapCode == 'phone'){
            this.setForm.phoneIntCode = item.defaultCountryCode
          }
          if(item.mapCode == 'fax'){
            this.setForm.faxIntCode = item.defaultCountryCode
          }

        })
      })
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    selectMultipleChange(val){
      // debugger
    },
    // 返回上级
    back(){
      this.$store.dispatch('delVisitedViews', this.$route).then(() => {
        this.$router.push({
          name: 'signupContact'
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  min-width: 1250px;
  .contactForm {
    width: 50%;
    background: #fff;
    padding: 20px;
    margin: 0 auto;
  }
  .form-item-input {
    width: 100%;
    .addresItem {
      margin-top: 15px;
    }
    .avatar-uploader {
      // width: 100px;
      display: inline-block;
      vertical-align: top;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409eff;
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>