<template>
  <div>
    <div class="applySet" :style="{height: $parent.formSetHeight+57 + 'px'}">
      <div class="formSet">
        <h2> {{ eventName }}</h2>

        <el-form ref='contactForm' label-position="right" label-width="150px" class='contactForm'>
          <div class="setInfoItem" v-for="element in setInfoList" :key="element.mapCode">
            <!-- 姓名 -->
            <div v-if=" element.mapCode=='name' && !element.nameSplit" class=" form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <el-input style="width: 50%" size="mini" :placeholder="element.placeholder"></el-input>
            </div>
            <!-- 姓名拆分 -->
            <div v-if="element.mapCode == 'name' && element.nameSplit" class="form-item-input">
              <div>
                <span class="setInfoItemlabel"> {{element.surnameTitle}} : </span>
                <el-input style="width: 50%" size="mini" :placeholder="element.surnamePlaceholder"></el-input>
              </div>
              <div>
                <span class="setInfoItemlabel"> {{element.nameTitle}} : </span>
                <el-input style="width: 50%" size="mini" :placeholder="element.namePlaceholder"></el-input>
              </div>
            </div>

            <!-- 性别 -->
            <div v-if="element.mapCode == 'sex' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <el-radio v-model="setForm.checkedSex" :label="element.options[0]">{{ element.options[0] }}</el-radio>
              <el-radio v-model="setForm.checkedSex" :label="element.options[1]">{{ element.options[1] }}</el-radio>
            </div>

            <!-- 证件 -->
            <div v-if="element.mapCode == 'certificate' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-select style="width: 100%" v-model="setForm.chenkedCertificate" :placeholder="element.placeholder">
                  <el-option v-for="item in element.options" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
                <br>
                <el-input style="margin-top:10px" size="mini" placeholder="请输入您的证件号码"></el-input>
              </div>
            </div>

            <!-- 照片 -->
            <div v-if="element.mapCode == 'photo' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <el-upload class="avatar-uploader">
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
                <el-input style="width: 50%" size="mini" v-model="setForm.detailedAdress" :placeholder="element.detailedAdressPlaceholder"></el-input>
              </div>
              <!-- 邮编 -->
              <div v-if="element.postcodeIsShow" class="addresItem">
                <span class="setInfoItemlabel"> {{element.postcodeTitle}} : </span>
                <el-input style="width: 50%" size="mini" v-model="setForm.postcode" :placeholder="element.postcodePlaceholder"></el-input>
              </div>

            </div>

            <!-- 手机号 -->
            <div v-if="element.mapCode == 'mobile' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                  <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.defaultCountryCode" placeholder="请选择国际区号">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </el-input>
                <br>
                <el-input v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </div>
            </div>

            <!-- 备用手机号 -->
            <div v-if="element.mapCode == 'spareMobile' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                  <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.secondPhonedefaultCountryCode" placeholder="请选择国际区号">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </el-input>
                <br>
                <el-input v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </div>
            </div>

            <!-- 固定电话 -->
            <div v-if="element.mapCode == 'phone' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 80%;display:inline-block;vertical-align: top;">
                <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                  <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.telephoneDefaultCountryCode" placeholder="请选择国际区号">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </el-input>
                <span>
                  - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                </span>
                <span v-if="element.extensionNumbeIsShow">
                  - <el-input style="width: 150px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
                </span>
              </div>
            </div>

            <!-- 传真 -->
            <div v-if="element.mapCode == 'fax' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 80%;display:inline-block;vertical-align: top;">
                <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                  <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.faxDefaultCountryCode" placeholder="请选择国际区号">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </el-input>
                <span>
                  - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                </span>
                <span v-if="element.extensionNumbeIsShow">
                  - <el-input style="width: 150px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
                </span>
              </div>
            </div>

            <!-- 邮箱 -->
            <div v-if="element.mapCode == 'email' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                <br>
                <el-input v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </div>
            </div>

            <!-- 备用邮箱 -->
            <div v-if="element.mapCode == 'spareEmail' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                <br>
                <el-input v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </div>
            </div>

            <!-- 微信号 -->
            <div v-if="element.mapCode == 'wechat' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- qq -->
            <div v-if="element.mapCode == 'qq' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 公司 -->
            <div v-if="element.mapCode == 'company' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 部门 -->
            <div v-if="element.mapCode == 'department' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 职位 -->
            <div v-if="element.mapCode == 'position' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
              </div>
            </div>

            <!-- 短文本 -->
            <div v-if="element.systemName == '短文本' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
              </div>
            </div>

            <!-- 长文本 -->
            <div v-if="element.systemName == '长文本' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input type="textarea" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
              </div>
            </div>

            <!-- 数字 -->
            <div v-if="element.systemName == '数字' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-input v-model.number="test" :placeholder="element.placeholder" size="mini"></el-input>
              </div>
            </div>

            <!-- 单选框 -->
            <div v-if="element.systemName == '单选框' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-radio-group :style="{width:'100%',display:'flex',flexWrap:'wrap',flexDirection:element.orientation=='横向'?'row':'column'}">
                  <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
                </el-radio-group>
              </div>
            </div>

            <!-- 复选框 -->
            <div v-if="element.systemName == '复选框' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-checkbox-group v-model="setForm.checkedOptions" :style="{width:'100%',display:'flex',flexWrap:'wrap',flexDirection:element.orientation=='横向'?'row':'column'}" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length">
                  <el-checkbox v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <!-- 下拉列表 -->
            <div v-if="element.systemName == '下拉列表' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-select style="margin-left: 10px;width:70%" :placeholder="element.placeholder">
                  <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </div>

            <!-- 下拉复选框 -->
            <div v-if="element.systemName == '下拉复选框' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>

              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-select style="margin-left: 10px;width:70%" :placeholder="element.placeholder" :multiple="true" v-model="setForm.selectMultipleCheckedOptions">
                  <el-option v-for="item in element.options" :key="item" :label="item" :value="item || '待输入'" :disabled="(element.maxCheckedCount != '' && setForm.selectMultipleCheckedOptions.length >= element.maxCheckedCount) && !setForm.selectMultipleCheckedOptions.includes(item)"></el-option>
                </el-select>
              </div>
            </div>

            <!-- 附件 -->
            <div v-if="element.systemName == '附件' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <el-upload class="avatar-uploader">
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <p> {{element.placeholder}} </p>
              </el-upload>
            </div>

            <!-- 日期 -->
            <div v-if="element.systemName == '日期' " class="form-item-input">
              <span class="setInfoItemlabel"> {{element.title}} : </span>
              <div style="width: 50%;display:inline-block;vertical-align: top;">
                <el-date-picker v-model="setForm.date" align="right" type="date" size="mini" :placeholder="element.placeholder" :picker-options="pickerOptions"></el-date-picker>
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

          </div>
        </el-form>
      </div>

      <div class="applySetForm">
        <el-form ref="applySetForm" validate-on-rule-change="false" @submit.native.prevent label-position="right" label-width="180px" :model="applySetForm">
          <div class="setItemTitle">
            <h3>注册登录</h3>
            <span>
              <span style="margin-right: 20px">{{ isRegisterSetShow ? '收起' : '展开'}}</span>
              <el-button type="text" @click="isRegisterSetShow = !isRegisterSetShow" style="vertical-align: middle;padding:0">
                <i v-if="isRegisterSetShow" class="el-icon-caret-top" style="font-size:30px"></i>
                <i v-else class="el-icon-caret-bottom" style="font-size:30px"></i>
              </el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div v-show="isRegisterSetShow">
            <el-form-item label="验证方式" prop="isVerification">
              <el-radio v-model="applySetForm.isVerification" :label="0">不验证</el-radio>
              <el-radio v-model="applySetForm.isVerification" :label="1">验证</el-radio>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification" label="注册验证" prop="registerVerification">
              <el-checkbox-group v-model="applySetForm.registerVerification">
                <el-checkbox label="短信验证"></el-checkbox>
                <el-checkbox label="邮箱验证"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification" label="登录验证" prop="loginVerification">
              <el-checkbox-group v-model="applySetForm.loginVerification">
                <el-checkbox label="短信验证"></el-checkbox>
                <el-checkbox label="邮箱验证"></el-checkbox>
                <el-checkbox label="账号密码"></el-checkbox>
                <el-checkbox label="自定义验证"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification && applySetForm.loginVerification.includes('自定义验证')" label="自定义验证项" prop="coustomVerification">
              <el-checkbox-group v-model="applySetForm.coustomVerification">
                <el-checkbox label="姓名"></el-checkbox>
                <el-checkbox label="手机号"></el-checkbox>
                <el-checkbox label="邮箱"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="登录前需完善必填信息" prop="isNeedCompleteMustInfo">
              <el-switch v-model="applySetForm.isNeedCompleteMustInfo" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="隐私协议" prop="IsIintimateAgreement">
              <el-switch v-model="applySetForm.IsIintimateAgreement" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              <el-button type="text">编辑隐私协议</el-button>
            </el-form-item>
          </div>

          <div class="setItemTitle">
            <h3>报名基础信息</h3>
            <span>
              <span style="margin-right: 20px">{{ isApplyBaseInfoShow ? '收起' : '展开'}}</span>
              <el-button type="text" @click="isApplyBaseInfoShow = !isApplyBaseInfoShow" style="vertical-align: middle;padding:0">
                <i v-if="isApplyBaseInfoShow" class="el-icon-caret-top" style="font-size:30px"></i>
                <i v-else class="el-icon-caret-bottom" style="font-size:30px"></i>
              </el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div v-show="isApplyBaseInfoShow">
            <el-form-item label="报名日期" prop="applyDate">
              <el-date-picker v-model="applySetForm.applyDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="参会码设置">
              <el-form-item label="前缀" prop="attendanceCodePrefix" label-width="50px">
                <el-input v-model="applySetForm.attendanceCodePrefix" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="长度" prop="attendanceCodeLength" label-width="50px" style="margin-bottom: 0;">
                <el-input v-model="applySetForm.attendanceCodeLength" style="width: 150px" placeholder="请输入内容"></el-input> 位
                <p>前缀位数不包含在长度内</p>
              </el-form-item>
              <el-form-item label="生成类型" prop="createType" label-width="80px" style="margin-bottom: 0;">
                <el-radio v-model="applySetForm.createType" :label="0">随机码</el-radio>
                <el-radio v-model="applySetForm.createType" :label="1">顺序码</el-radio>
              </el-form-item>
              <el-form-item v-if="applySetForm.createType == '1' " label="起始码" prop="attendanceCodeStartNum">
                <el-input v-model="applySetForm.attendanceCodeStartNum" placeholder="请输入内容"></el-input>
                <p>起始码如：001、002等</p>
              </el-form-item>
            </el-form-item>
            <el-form-item label="报名审核" prop="applyCheck">
              <el-radio v-model="applySetForm.applyCheck" :label="0">不需要审核</el-radio>
              <el-radio v-model="applySetForm.applyCheck" :label="1">需要审核</el-radio>
              <el-form-item v-if="applySetForm.applyCheck" label="添加审核结果页" label-width="110px">
                <el-button type="text">审核结果页</el-button>
              </el-form-item>
              <el-form-item v-if="applySetForm.applyCheck" label="审核权限用户" label-width="100px" prop="checkUser" style="margin-bottom: 0;">
                <el-select v-model="applySetForm.checkUser" placeholder="请选择">
                  <el-option v-for="item in checkUseroptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="协助报名" prop="assistApply">
              <el-switch v-model="applySetForm.assistApply" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item v-if="applySetForm.assistApply" label="协助报名权限" prop="assistApplyPermission">
              <el-radio v-model="applySetForm.assistApplyPermission" :label="0">仅限编辑</el-radio>
              <el-radio v-model="applySetForm.assistApplyPermission" :label="1">支持新增</el-radio>
            </el-form-item>
            <el-form-item v-if="applySetForm.assistApply" label="协助报名开放字段" prop="assistApplyOpenField">
              <el-checkbox-group v-model="applySetForm.assistApplyOpenField">
                <el-checkbox label="姓名"></el-checkbox>
                <el-checkbox label="手机号"></el-checkbox>
                <el-checkbox label="邮箱"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary">保存并生成报名链接</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'applySet',
  data(){
    return {
      setInfoList: [], // 表单配置列表
      isRegisterSetShow: true, // 注册登录是否显示
      isApplyBaseInfoShow: true, // 报名基础信息是否展示
      checkUseroptions: [], // 审核权限用户列表
      setForm:{
        checkedSex: '',
        chenkedCertificate: [],
        verifyType: '',
        nation:'',
        province:'',
        city:'',
        county: '',
        detailedAdress:'',
        defaultCountryCode: '',
        secondPhonedefaultCountryCode:'',
        mobilePhoneVerify: [],
        telephoneDefaultCountryCode:'',
        faxDefaultCountryCode: '',
        checkedOptions: [],
        selectMultipleCheckedOptions: [],
        date: '',
      },
      applySetForm:{
        isVerification: '', // 验证方式
        registerVerification: [], // 注册验证
        loginVerification: [], // 登录验证
        coustomVerification: [], // 自定义验证项
        isNeedCompleteMustInfo: true, // 是否需要完善必填信息
        IsIintimateAgreement: true, // 隐私协议
        applyDate: '', // 报名日期
        attendanceCodePrefix: '', // 参会码前缀
        attendanceCodeLength: '', // 参会码长度
        createType: '', // 生成类型
        attendanceCodeStartNum: 0, // 起始码
        applyCheck: '', // 报名审核
        checkUser: '', // 审核权限用户
        assistApply: true, // 协助报名
        assistApplyPermission: '', // 协助报名权限
        assistApplyOpenField: [], // 协助报名开放字段
      }
    }
  },
  props: {
    eventCode: {
      type: String,
      default: ''
    },
    eventName: {
      type: String,
      default: ''
    }
  },
  watch:{
    eventCode(newVal ,oldVal) {
      if (newVal) {
        this.getEventInfo()
      }
    },
  },
  mounted(){
    if (this.eventCode) {
      this.getEventInfo()
    }
  },
  methods:{
    // 表单配置查询
    getEventInfo() {
      request({
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: this.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then(response => {
        if(response.data.json){
          this.setInfoList = JSON.parse(response.data.json)
          debugger
        }else{
          this.setInfoList = [];
        }
      })
    },
  },

}
</script>

<style scoped lang="scss">
.applySet {
  min-width: 1250px;
  display: flex;

  justify-content: space-between;
  .formSet {
    overflow: auto;
    width: 58%;
    background: #fff;
    text-align: center;
    padding: 20px;
  }
  .contactForm {
    .setInfoItem {
      width: 100%;
      margin: 10px 0;
      padding: 10px 30px;
      // background: #eee;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
      .remove-button {
        cursor: pointer;
        font-size: 20px;
        line-height: 28px;
        margin-left: 10px;
      }
    }
  }
  .applySetForm {
    width: 40%;
    background: #fff;
    padding: 20px;
    overflow: auto;
    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }
}
</style>