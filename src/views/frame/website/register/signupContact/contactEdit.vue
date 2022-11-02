<template>
  <div class="content">

    <el-form ref='contactForm' :validate-on-rule-change="false" @submit.native.prevent label-position="right" :disabled="isView" :rules='rules' :model="setForm" label-width="150px" class='contactForm'>
      <el-form-item label="人员编码" prop='personnelCode'>
        <el-input v-model="setForm.personnelCode" style="width: 50%" size="mini" placeholder="请输入人员编码"></el-input>
      </el-form-item>
      <el-form-item label="参会人类型" prop='contactType'>
        <el-select v-model="setForm.contactType" style="width:50%" placeholder="请选择参会人类型">
          <el-option v-for="item in contactTypeOptions" :key="item.dictItemVal" :label="item.dictItemName" :value="item.dictItemVal"></el-option>
        </el-select>
      </el-form-item>

      <div v-for="element in setInfoList" :key="element.mapCode">
        <!-- 分割线 -->
        <div v-if="element.systemName == '分割线' " class="form-item-input">
          <el-divider content-position="center">{{ element.placeholder }}</el-divider>
        </div>

        <!-- 分页 -->
        <div v-else-if="element.systemName == '分页' " class="form-item-input">
          <p style="text-align:center">[ 第 {{ element.pagingIndex }} 页/共 {{ pagingCount }} 页 ]</p>
        </div>

        <!-- 说明信息 -->
        <div v-else-if="element.systemName == '说明信息' " class="form-item-input">
          <pre style="padding-left: 150px;">{{ element.placeholder }}</pre>
        </div>

        <div v-else>
          <!-- 自定义信息 -->
          <el-form-item v-if="element.isCoustomInfo" :label="element.title" :prop="'signupContactDtlDto.'+element.mapCode">
            <!-- 短文本 -->
            <div v-if="element.systemName == '短文本' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" :placeholder="element.placeholder" :show-word-limit="true" :maxlength="element.wordCountLimit" size="mini"></el-input>
              </div>
            </div>

            <!-- 长文本 -->
            <div v-if="element.systemName == '长文本' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" type="textarea" :rows="5" :show-word-limit="true" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
              </div>
            </div>

            <!-- 数字 -->
            <div v-if="element.systemName == '数字' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" :placeholder="element.placeholder" @input="setForm[element.mapCode] = limitInput(element,setForm[element.mapCode])" size="mini"></el-input>
              </div>
            </div>

            <!-- 单选框 -->
            <div v-if="element.systemName == '单选框' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-radio-group v-model="setForm.signupContactDtlDto[element.mapCode]" :style="{width:'100%',display:'flex',flexWrap:'wrap',flexDirection:element.orientation=='横向'?'row':'column'}">
                  <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
                  <el-input v-if="setForm.signupContactDtlDto[element.mapCode]=='其他'" v-model="setformOther[element.mapCode]" placeholder="请输入其他选项" size="mini" style="width:200px"></el-input>
                </el-radio-group>
              </div>
            </div>

            <!-- 复选框 -->
            <div v-if="element.systemName == '复选框' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-checkbox-group v-model="setForm.signupContactDtlDto[element.mapCode]" :style="{width:'100%',display:'flex',flexWrap:'wrap',flexDirection:element.orientation=='横向'?'row':'column'}" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length || 0">
                  <el-checkbox v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                  <el-input v-if="setForm.signupContactDtlDto[element.mapCode].includes('其他')" v-model="setformOther[element.mapCode]" placeholder="请输入其他选项" size="mini" style="width:200px;margin-top: 5px;"></el-input>
                </el-checkbox-group>
              </div>
            </div>

            <!-- 下拉列表 -->
            <div v-if="element.systemName == '下拉列表' " class="form-item-input">
              <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-select v-model="setForm.signupContactDtlDto[element.mapCode]" style="margin-left: 10px;width:70%" :placeholder="element.placeholder">
                  <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </div>

            <!-- 下拉复选框 -->
            <div v-if="element.systemName == '下拉复选框' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-select v-model="setForm.signupContactDtlDto[element.mapCode]" style="margin-left: 10px;width:70%" :placeholder="element.placeholder" :multiple="true" @change="selectMultipleChange" :multiple-limit="element.maxCheckedCount || 0">
                  <el-option v-for="item in element.options" :key="item" :label="item" :value="item" :disabled="(element.minCheckedCount != '' && (setForm.signupContactDtlDto[element.mapCode].length || 0) <= element.minCheckedCount) && setForm.signupContactDtlDto[element.mapCode].includes(item)"></el-option>
                </el-select>
              </div>
            </div>

            <!-- 附件 -->
            <div v-if="element.systemName == '附件' " class="form-item-input">
              <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
              <el-upload class="avatar-uploader" action :limit="1" :on-exceed="fileLimitCount" :show-file-list="true" :file-list="setFormFile[element.mapCode]" :before-upload="(file)=>beforeAvatarUpload(file,element)" :on-success="handleAvatarSuccess" :http-request="handleUploadForm">
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
          </el-form-item>
          <!-- 固定信息 -->
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
                <el-input v-model="setForm.certificate" clearable style="margin-top:10px" size="mini" placeholder="请输入您的证件号码"></el-input>
              </div>
            </div>

            <!-- 照片 -->
            <div v-if="element.mapCode == 'photo' " class="form-item-input">
              <div v-if="setForm.photo" style="width:100px;height: 100px;" class="picture">
                <!-- <img v-if="setForm.photo" :src="setForm.photo" class="avatar"> -->
                <img class="avatar el-upload-list__item-thumbnail" :src="setForm.photo" alt="">
                <span class="el-upload-list__item-actions" style="width:100px;">
                  <span class="el-upload-list__item-preview">
                    <i class="el-icon-zoom-in" @click="previewImg(setForm.photo)"></i>
                  </span>
                  <span class="el-upload-list__item-preview">
                    <i class="el-icon-delete" @click="deleteImg(setForm.photo)"></i>
                  </span>
                </span>
              </div>
              <el-upload v-else class="avatar-uploader" action :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="(file)=>beforeAvatarUpload(file,element)" :http-request="(file)=>handleUploadForm(file,element)">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <!-- 地址 -->
            <div v-if="element.mapCode == 'addres' " class="form-item-input">
              <!-- 国家 -->
              <div v-if="element.nationIsShow" class="">
                <span class="setInfoItemlabel"> {{element.nationTitle}} : </span>
                <el-select style="width: 50%" v-model="setForm.nations" :placeholder="element.nationPlaceholder">
                  <el-option v-for="item in nationsList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </div>
              <!-- 省份 -->
              <div v-if="element.provinceIsShow" class="addresItem">
                <span class="setInfoItemlabel"> {{element.provinceTitle}} : </span>
                <el-select style="width: 50%" v-model="setForm.province" :placeholder="element.provincePlaceholder" @change="provinceChange">
                  <el-option v-for="item in chinaProvinceList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </div>
              <!-- 城市 -->
              <div v-if="element.cityIsShow" class="addresItem">
                <span class="setInfoItemlabel"> {{element.cityTitle}} : </span>
                <el-select style="width: 50%" v-model="setForm.city" :placeholder="element.cityPlaceholder" @change="cityChange">
                  <el-option v-for="item in provinceCityList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
                </el-select>
              </div>
              <!-- 区县 -->
              <div v-if="element.countyIsShow" class="addresItem">
                <span class="setInfoItemlabel"> {{element.countyTitle}} : </span>
                <el-select style="width: 50%" v-model="setForm.county" :placeholder="element.countyPlaceholder">
                  <el-option v-for="item in cityCountyList" :key="item.code" :label="item.name" :value="item.code"> </el-option>
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
              </div>
            </div>

            <!-- 备用手机号 -->
            <div v-if="element.mapCode == 'spareMobile' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.spareMobile" :placeholder="element.placeholder" size="mini" class="input-with-select">
                  <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.spareMobileIntCode" placeholder="请选择国际区号">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </el-input>
              </div>
            </div>

            <!-- 固定电话 -->
            <div v-if="element.mapCode == 'phone' " class="form-item-input">
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
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.email" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 备用邮箱 -->
            <div v-if="element.mapCode == 'spareEmail' " class="form-item-input">
              <!-- <span class="setInfoItemlabel"> {{element.title}} : </span> -->
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.spareEmail" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 微信号 -->
            <div v-if="element.mapCode == 'wechat' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.wechat" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- qq -->
            <div v-if="element.mapCode == 'qq' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.qq" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 公司 -->
            <div v-if="element.mapCode == 'company' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.company" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 部门 -->
            <div v-if="element.mapCode == 'department' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.department" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 职位 -->
            <div v-if="element.mapCode == 'position' " class="form-item-input">
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model="setForm.position" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

          </el-form-item>
        </div>
      </div>

      <div v-if="!isView" style="width:100%;text-align:center">
        <el-button type="primary" @click="submit">
          <span class="el-icon-upload2"></span>
          提交
        </el-button>
      </div>
    </el-form>

    <el-dialog :visible.sync="previewDialogVisible">
      <img width="100%" :src="previewImgUrl" alt="">
    </el-dialog>

    <!-- 剪裁组件弹窗 -->
    <el-dialog title="裁切照片" :visible.sync="cropperModel" :close-on-click-modal="false" width="950px" center>
      <cropper-image :fileName="photoName" :filePath="photoPath" :limitWidth="photoLimitWidth" :limitHeight="photoLimitHeight" @uploadImgSuccess="handleUploadSuccess" ref="child"> </cropper-image>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import CropperImage from "@/components/frame/CropperImage";
export default {
  name: "contactEdit",
  data() {
    return {
      setInfoList: [], // 选中的配置信息列表
      baseInfoList: [], // 基础信息
      customInfoList: [], // 自定义信息列表
      uploadUrl: process.env.BASE_API + '/api/obs/file/uploadImg',
      nationsList: [{name: '中国', code: '86'}],
      chinaProvinceList: [],
      provinceCityList: [],
      cityCountyList: [],
      isView: false,
      photoName: '', // 照片文件名
      photoPath: '', // 照片地址
      photoLimitWidth: '',
      photoLimitHeight: '',
      previewDialogVisible: false, // 预览图片弹窗
      previewImgUrl:'', // 预览图片地址
      cropperModel: false, // 图片裁剪弹窗
      countryCodeOptions: [], // 国际区号下拉选项  dictItemName - dictItemVal
      contactTypeOptions: [], // 参会人类型列表
      setForm: {
        personnelCode: '', // 人员编码
        contactType: '', // 参会人类型
        name: '', // 姓名
        surname: '', // 姓
        ming: '', //名
        sex: '', // 性别
        certificateType: '', // 证件类型
        certificate: '', // 证件号
        photo: '', // 照片
        nations: '86', // 国家
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
        signupContactDtlDto:{

        }
      },
      setformOther:{

      },
      setFormFile:{

      },
      pagingCount: 0, // f分页数量
      rules:{
        signupContactDtlDto:{

        },
        personnelCode: [
          { required: true, message: "请输入人员编码", trigger: "blur" },
        ],
        contactType: [
          { required: true, message: "请选择参会人类型", trigger: "change" },
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() > Date.now();
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
  components: {CropperImage},
  props: {
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  computed:{
    addOther(){
      return
    }
  },
  mounted(){
    // this.$route.params.type   add--新增  update--修改  view--查看
    // 获取地址级联选项
    this.getComCityTreeList();

    // 表单配置查询
    this.getEventInfo();

    // 获取参会人类型数据字典
    this.getcontactTypeList();

    // 国际编码字典项查询
    this.getCountryCode()
  },
  methods:{
    // 表单配置查询
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
        this.setInfoList.forEach(item => {
          // 1：自定义属性
          if(item.mapBase == 1){
            if(['复选框','下拉复选框'].includes(item.systemName)) {
              // this.setForm[item.mapCode] = []
              this.$set(this.setForm.signupContactDtlDto,item.mapCode,[]);
              if(item.minCheckedCount > 0){
                this.setForm.signupContactDtlDto[item.mapCode] = item.options.slice(0, item.minCheckedCount)
              }
            }else{
              this.$set(this.setForm.signupContactDtlDto,item.mapCode,'');
              // this.setForm[item.mapCode] = ''
            }
            if(['附件'].includes(item.systemName)) {
              this.$set(this.setFormFile,item.mapCode,[]);
              console.log(this.setFormFile)
            }
            this.$set(this.setformOther,item.mapCode,'');
            // 添加必填校验
            this.$set(this.rules.signupContactDtlDto, item.mapCode, [{required: item.isRequire, message: item.title + "是必填项", trigger: "blur" }])
          }else{
            // 添加必填校验
            this.$set(this.rules, item.mapCode, [{required: item.isRequire, message: item.title + "是必填项", trigger: "blur" }])
          }

          if(item.systemName == '分页'){
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

        console.log(this.setForm)
        if(this.$route.params.type == 'view'){
          this.isView = true;
          this.getContactInfo();
        }
        // 参会人信息查询
        if(this.$route.params.type == 'update'){
          this.getContactInfo();
        }
      })
    },
    // 参会人信息查询
    getContactInfo(){
      request({
      url: '/api/register/signupContact/getByContactCode',
      method: 'POST',
      data: { data: this.$route.params.contactCode, funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.setForm = res.data
      for (const key in this.setForm.signupContactDtlDto) {
        // console.log(key)
        if( typeof this.setForm.signupContactDtlDto[key] =='string' && this.setForm.signupContactDtlDto[key].indexOf('卍') == 0){
          this.setForm.signupContactDtlDto[key] = this.setForm.signupContactDtlDto[key].split(',')
          this.setForm.signupContactDtlDto[key].shift('卍')

          this.setForm.signupContactDtlDto[key].forEach((checkItem,checkIndex) => {
            // debugger
            if(checkItem.indexOf('其他&') == 0){
              this.setformOther[key] = checkItem.split('&')[1]
              this.setForm.signupContactDtlDto[key][checkIndex] = checkItem.split('&')[0]
            }
          })
        }
        if(typeof this.setForm.signupContactDtlDto[key] =='string' && this.setForm.signupContactDtlDto[key].indexOf('其他&')==0){
          debugger
            this.setformOther[key] = this.setForm.signupContactDtlDto[key].split('&')[1]
            this.setForm.signupContactDtlDto[key] = this.setForm.signupContactDtlDto[key].split('&')[0]
          }
      }
      console.log(this.setForm)
    })
    },
    submit(){
      let queryUrl = "";
      if(this.$route.params.type == 'add'){
        queryUrl = '/api/register/signupContact/save'
      }else if(this.$route.params.type == 'update'){
        queryUrl = '/api/register/signupContact/update'
      }
      this.setForm.eventCode = this.$route.params.data;

      this.$refs["contactForm"].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '保存中，请稍候...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          for (const key in this.setForm.signupContactDtlDto) {
            // console.log(key)
            if( Array.isArray(this.setForm.signupContactDtlDto[key]) ){
              this.setForm.signupContactDtlDto[key].forEach( (checkItem, checkIndex) => {
                if(checkItem == '其他'){
                  this.setForm.signupContactDtlDto[key][checkIndex] = this.setForm.signupContactDtlDto[key][checkIndex] + "&" + this.setformOther[key]
                }
              })
              this.setForm.signupContactDtlDto[key].unshift('卍')
              this.setForm.signupContactDtlDto[key] = this.setForm.signupContactDtlDto[key].join(',')
            }else{
              if(this.setForm.signupContactDtlDto[key] == '其他'){
                this.setForm.signupContactDtlDto[key] = this.setForm.signupContactDtlDto[key] + "&" + this.setformOther[key]
              }
            }
          }
          request({
            url: queryUrl,
            method: 'POST',
            data: {
              data: this.setForm,
              funcModule: '获取模块类型',
              funcOperation: '获取模块类型'
            }
          }).then(res => {
            if(res.status){
              this.$message.success('保存成功')
            }else{
              this.$message.error('保存失败')
            }
            loading.close()
          })
        }
      })
    },
    // 预览照片
    previewImg(imageUrl){
      debugger
      this.previewDialogVisible = true;
      this.previewImgUrl = imageUrl;
    },
    // 删除照片
    deleteImg(){
      this.setForm.photo = '';
    },
    limitInput(element,value) {
      // element.numberDigitLimit 整数位数限制
      // element.decimalPlacesLimit 小数位数限制
      // var re = new RegExp(title,"g");
      var re = eval("/^\d*(\.?\d{0,"+element.decimalPlacesLimit+"})/g");
      let temp = value.toString() // 第一步：转成字符串
      temp = temp.replace(/[^\d^\.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
          .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
          .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
          // .match(/^\d*(\.?\d{0,2})/g)[0] || '' // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，	而且小数点后面只能有0到2位小数

      let intNumber = temp.split('.')[0]
      let decimalNumber = temp.split('.')[1] || ''
      // 小数点位数超出限制 截取
      if(decimalNumber.length > element.decimalPlacesLimit){
        decimalNumber = decimalNumber.slice(0, element.decimalPlacesLimit)
      }

      if(decimalNumber.length > 0 || temp.indexOf('.') >= 0){
        temp = intNumber + "." + decimalNumber
      }else{
        temp = intNumber
      }
      // 整数部分超出限制 取最大值
      const maxNumber = Math.pow(10,element.numberDigitLimit-1)
      if(Number(temp) >= maxNumber){
         temp = maxNumber
      }
      return temp
    },
    // 裁剪照片上传成功回调
    handleUploadSuccess(data){
      debugger
      this.setForm.photo = data.url
    },
    handleAvatarSuccess(res, file){
      debugger
      this.photoName = res.fileName
      this.cropperModel = true;
    },
    async beforeAvatarUpload(file,element) {
      // fileTypeLimit // 是否限制文件类型
      // pictureSizeLimit: false, // 是否限制图片尺寸
      // imageCheckedTypes:[], // 图片文件选中类型
      // documentCheckedTypes: [], // 文档选中类型
      // compressedFileCheckedTypes: [], // 压缩文件选中类型
      // videoFileCheckedTypes: [], // 视频文件选中类型
      // audioFileCheckedTypes: [],// 音频文件选中类型
      // allFileTypes:[], // 允许上传文件类型合集
      // fileSizeLimit: 50, // 文件大小限制
      const fileName = file.name;
      const extension = fileName.substr(fileName.lastIndexOf('.'));
      let isAllowUpload = true;
      if(element.fileTypeLimit){
        // 判断后缀名是否允许上传
        isAllowUpload = element.allFileTypes.includes(extension);
        if(!isAllowUpload){
          const errMsg ='注意: 只允许上传以下文件类型：' + element.allFileTypes.join('、');
          this.$message.error(errMsg);
        }
      }

      const sizeLimit = file.size / 1024 / 1024 < element.fileSizeLimit;
      if (!sizeLimit) {
        this.$message.error(`上传附件大小不能超过 ${element.fileSizeLimit}MB!`);
        return false;
      }

      if(element.imageTypes.includes(extension) && element.pictureSizeLimit){
       isAllowUpload = await this.imageSizeLimit(file, element)
      }
      return isAllowUpload
    },
    async imageSizeLimit(file, element){
      const _this = this
      let imgWidth = ''
      let imgHight = ''
      const isSize = new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
            imgWidth = img.width
            imgHight = img.height
            // const valid = img.width <= 1700 && img.height <= 2500
            debugger
            const valid = img.width <= element.photoLimitWidth && img.height <= element.photoLimitHeight
            valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
          return file
      }, () => {
          this.cropperModel = true;
          this.photoLimitWidth = element.photoLimitWidth;
          this.photoLimitHeight = element.photoLimitHeight;
          _this.$message.warning({ message: `上传的图片尺寸超出图片限制,宽不超过${element.photoLimitWidth}px，高不超过${element.photoLimitHeight}px。当前上传图片的宽高分别为：${imgWidth}px和${imgHight}px` })
          return Promise.reject()
      })
      return await isSize
    },
    // 自定义上传文件
    handleUploadForm(param,element) {
      let thiz = this
      let formData = new FormData()
      // formData.append('webpageCode', '') // 额外参数
      formData.append('file', param.file)
      let loading = this.$loading({
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
          this.$message('上传文件成功')
          // if(element.mapCode = 'photo'){
            this.setForm[element.mapCode] = data.data.filePath
            console.log( this.setForm.photo)
          // }
          param.onSuccess(data,element)
          // this.printSetform.printBackground = data.data.filePath
        } else {
          thiz.$message('上传文件失败')
        }
        loading.close()
      })
    },
    fileLimitCount(files, fileList) {
      this.$message.warning('只允许上传一个文件')
    },
    getComCityTreeList(){
      request({
        url: '/api/base/comCitys/treeList',
        method: 'POST',
        data: {
          // data: this.$route.params.data,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then(res => {
        this.chinaProvinceList = res.data
      })
    },
    provinceChange(provinceCode){
      let selectProvince = this.chinaProvinceList.find(province => {
        return province.code == provinceCode
      })

      this.provinceCityList = selectProvince.chirldren // 接口返回字段为 chirldren 非 children
    },
    cityChange(cityCode){
      let selectCity = this.provinceCityList.find(city => {
        return city.code == cityCode
      })
      this.cityCountyList = selectCity.chirldren // 接口返回字段为 chirldren 非 children
    },
    selectMultipleChange(val){
    },
    // 国际编码字典项查询
    getCountryCode(){
      request({
        url: '/api/sys/dict/listItem',
        method: 'POST',
        data: { data: 'COUNTRY_CODE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
      }).then(res => {
        // dictItemName \ dictItemVal
        this.countryCodeOptions = res.data
      })
    },
    // 获取参会人类型数据字典
    getcontactTypeList(){
      request({
        url: '/api/sys/dict/listItem',
        method: 'POST',
        data: { data: 'CONTANT_TYPE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
      }).then(res => {
        this.contactTypeOptions = res.data
      })
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

<style lang="scss">
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
    .picture:hover {
    }
    .el-upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
    }
    .el-upload-list__item-actions:after {
      display: inline-block;
      content: '';
      height: 100%;
      vertical-align: middle;
    }
    .el-upload-list__item-actions span {
      display: none;
      cursor: pointer;
    }
    .el-upload-list__item-actions:hover {
      opacity: 1;
    }
    .el-upload-list__item-actions:hover span {
      display: inline-block;
    }
    .el-upload-list__item-actions span + span {
      margin-left: 15px;
    }
  }
}
</style>