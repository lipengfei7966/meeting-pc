<template>
  <div>
    <div class="applySet" :style="{ height: $parent.formSetHeight + 57 + 'px' }">
      <div class="formSet" style="width:80%;position:relative">
        <div style="position:absolute;right:50px;top:10px;padding:6px;background-color: #00699d;color:#fff;border-radius: 5px;cursor: pointer">设置其他语言</div>
        <h2 style="textAlign:center">{{ eventName }}</h2>
        <el-form ref="contactForm" label-position="right" :model="setForm" label-width="100px" class="contactForm" style="width: 95%; margin: 0 auto">
          <div v-for="element in setInfoList" :key="element.mapCode">
            <!-- 分割线 -->
            <div v-if="element.systemName == '分割线'" class="form-item-input">
              <el-divider content-position="center">{{ element.placeholder }}</el-divider>
            </div>

            <!-- 分页 -->
            <div v-else-if="element.systemName == '分页'" class="form-item-input">
              <p style="text-align: center">[ {{$t('applySet.di')}} {{ element.pagingIndex }} {{$t('applySet.total')}} {{ pagingCount }} {{$t('applySet.page')}} ]</p>
            </div>

            <!-- 说明信息 -->
            <div v-else-if="element.systemName == '说明信息'" class="form-item-input">
              <pre style="padding-left: 150px">{{ element.placeholder }}</pre>
            </div>

            <div v-else>
              <!-- 自定义信息 -->
              <div v-if="element.isCoustomInfo">
                <el-form-item :label="element.title">
                  <!-- 短文本 -->
                  <div v-if="element.systemName == '短文本'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" :placeholder="element.placeholder" :disabled="element.notAllowEdit && isUpdate" :show-word-limit="true" :maxlength="element.wordCountLimit" size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 长文本 -->
                  <div v-if="element.systemName == '长文本'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" type="textarea" :disabled="element.notAllowEdit && isUpdate" :rows="5" :show-word-limit="true" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 数字 -->
                  <div v-if="element.systemName == '数字'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" @input="setForm.signupContactDtlDto[element.mapCode] = limitInput(element, setForm.signupContactDtlDto[element.mapCode])" size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 单选框 -->
                  <div v-if="element.systemName == '单选框'" class="form-item-input">
                    <div style="min-width: 300px; display: inline-block; vertical-align: top">
                      <el-radio-group v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }">
                        <div v-for="item in element.options" :key="item">
                          <el-radio v-if="item != '其他'" :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
                          <el-radio v-else :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
                          <el-input v-if="item == '其他' && setForm.signupContactDtlDto[element.mapCode] == '其他'" :placeholder="$t('applySet.pleaseenteradifferentoption')" size="mini" style="width: 200px"></el-input>
                        </div>
                      </el-radio-group>
                    </div>
                  </div>

                  <!-- 复选框 -->
                  <div v-if="element.systemName == '复选框'" class="form-item-input">
                    <div style="width: 100%; min-width: 300px; display: inline-block; vertical-align: top">
                      <el-checkbox-group v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length || 0">
                        <div v-for="item in element.options" :key="item">
                          <el-checkbox v-if="item != '其他'" :label="item" style="margin: 5px 15px"> {{ item }}
                          </el-checkbox>
                          <el-checkbox v-else :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                          <el-input v-if="false" v-model="setformOther[element.mapCode]" :placeholder="$t('applySet.pleaseenteradifferentoption')" size="mini" style="width: 200px; margin-top: 5px"></el-input>
                        </div>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <!-- 下拉列表 -->
                  <div v-if="element.systemName == '下拉列表'" class="form-item-input">
                    <div>
                      <el-select v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" style="margin-left: 10px" :placeholder="element.placeholder">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <!-- 下拉复选框 -->
                  <div v-if="element.systemName == '下拉复选框'" class="form-item-input">
                    <div>
                      <el-select v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" style="margin-left: 10px" :placeholder="element.placeholder" :multiple="true" :multiple-limit="element.maxCheckedCount || 0">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <!-- 附件 -->
                  <div v-if="element.systemName == '附件'" class="form-item-input">
                    <el-upload :ref="element.mapCode" class="avatar-uploader" action>
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>{{ element.placeholder }}</p>
                    </el-upload>
                  </div>

                  <!-- 日期 -->
                  <div v-if="element.systemName == '日期'" class="form-item-input">
                    <div>
                      <el-date-picker v-model="setForm.signupContactDtlDto[element.mapCode]" :disabled="element.notAllowEdit && isUpdate" align="right" type="date" size="mini" :placeholder="element.placeholder" :picker-options="pickerOptions"></el-date-picker>
                    </div>
                  </div>
                </el-form-item>
              </div>

              <!-- 固定信息 -->
              <div v-else>
                <!-- 姓名 -->
                <el-form-item v-if="element.mapCode == 'name'" :label="element.nameSplit ? '' : element.title" :label-width="element.nameSplit ? '0' : '100px'">
                  <!-- 姓名 -->
                  <div v-if="element.mapCode == 'name' && !element.nameSplit" class="form-item-input">
                    <el-input v-model="setForm.name" :disabled="element.notAllowEdit && isUpdate" size="mini" :placeholder="element.placeholder"></el-input>
                  </div>
                  <!-- 姓名拆分 -->
                  <div v-if="element.mapCode == 'name' && element.nameSplit" class="form-item-input">
                    <div>
                      <el-form-item :label="$t('applySet.surname')">
                        <el-input v-model="setForm.surname" :disabled="element.notAllowEdit && isUpdate" size="mini" :placeholder="element.surnamePlaceholder"></el-input>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item :label="$t('applySet.name')">
                        <el-input v-model="setForm.ming" :disabled="element.notAllowEdit && isUpdate" size="mini" :placeholder="element.namePlaceholder"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>

                <!-- 地址 -->
                <el-form-item v-else-if="element.mapCode == 'addres'" label-width="0">
                  <div class="form-item-input">
                    <!-- 国家 -->
                    <div v-if="element.nationIsShow" class="addresItem">
                      <el-form-item :label="element.nationTitle">
                        <el-select :disabled="element.notAllowEdit && isUpdate" v-model="setForm.nations" :placeholder="element.nationPlaceholder"> </el-select>
                      </el-form-item>
                    </div>
                    <!-- 省份 -->
                    <div v-if="element.provinceIsShow" class="addresItem">
                      <el-form-item :label="element.provinceTitle">
                        <el-select :disabled="element.notAllowEdit && isUpdate" v-model="setForm.province" :placeholder="element.provincePlaceholder"> </el-select>
                      </el-form-item>
                    </div>
                    <!-- 城市 -->
                    <div v-if="element.cityIsShow" class="addresItem">
                      <el-form-item :label="element.cityTitle">
                        <el-select :disabled="element.notAllowEdit && isUpdate" v-model="setForm.city" :placeholder="element.cityPlaceholder"> </el-select>
                      </el-form-item>
                    </div>
                    <!-- 区县 -->
                    <div v-if="element.countyIsShow" class="addresItem">
                      <el-form-item :label="element.countyTitle">
                        <el-select :disabled="element.notAllowEdit && isUpdate" v-model="setForm.county" :placeholder="element.countyPlaceholder"> </el-select>
                      </el-form-item>
                    </div>
                    <!-- 详细地址 -->
                    <div v-if="element.detailedAdressISShow" class="addresItem">
                      <el-form-item :label="element.detailedAdressTitle">
                        <el-input :disabled="element.notAllowEdit && isUpdate" size="mini" v-model="setForm.fullAddress" :placeholder="element.detailedAdressPlaceholder"></el-input>
                      </el-form-item>
                    </div>
                    <!-- 邮编 -->
                    <div v-if="element.postcodeIsShow" class="addresItem">
                      <el-form-item :label="element.postcodeTitle">
                        <el-input :disabled="element.notAllowEdit && isUpdate" size="mini" v-model="setForm.postcode" :placeholder="element.postcodePlaceholder"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item v-else :label="element.title">
                  <!-- 性别 -->
                  <div v-if="element.mapCode == 'sex'" class="form-item-input">
                    <el-radio v-model="setForm.sex" :label="element.options[0]" :disabled="element.notAllowEdit && isUpdate">{{ element.options[0] }}</el-radio>
                    <el-radio v-model="setForm.sex" :label="element.options[1]" :disabled="element.notAllowEdit && isUpdate">{{ element.options[1] }}</el-radio>
                  </div>

                  <!-- 证件 -->
                  <div v-if="element.mapCode == 'certificate'" class="form-item-input">
                    <div>
                      <el-select style="width: 100%" v-model="setForm.certificateType" :placeholder="element.placeholder" :disabled="element.notAllowEdit && isUpdate" @change="certificateTypeChange">
                        <el-option v-for="item in theCertificateType" :key="item.key" :label="item.label" :value="item.value"> </el-option>
                      </el-select>
                      <br />
                      <el-input v-model="setForm.certificate" :disabled="element.notAllowEdit && isUpdate" clearable style="margin-top: 10px" size="mini" :placeholder="$t('applySet.pleaseenteryourIDnumber')"></el-input>
                    </div>
                  </div>

                  <!-- 照片 -->
                  <div v-if="element.mapCode == 'photo'" class="form-item-input">
                    <div v-if="setForm.photo" style="width: 100px; height: 100px" class="picture">
                      <img class="avatar el-upload-list__item-thumbnail" :src="setForm.photo" alt="" />
                      <span class="el-upload-list__item-actions" style="width: 100px">
                        <span class="el-upload-list__item-preview">
                          <i class="el-icon-zoom-in" @click="previewImg(setForm.photo)"></i>
                        </span>
                        <span class="el-upload-list__item-preview">
                          <i class="el-icon-delete" v-if="!(element.notAllowEdit && (isUpdate || isView))" @click="deleteImg(setForm.photo)"></i>
                        </span>
                      </span>
                    </div>
                    <el-upload v-else class="avatar-uploader" :disabled="element.photeTailor == '手动裁剪'" action>
                      <i class="el-icon-plus avatar-uploader-icon" @click="showCropperModel(element)"></i>
                    </el-upload>
                  </div>

                  <!-- 手机号 -->
                  <div v-if="element.mapCode == 'mobile'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.mobile" :placeholder="element.placeholder" :disabled="element.notAllowEdit && isUpdate" size="mini" class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" :disabled="element.notAllowEdit && isUpdate" slot="prepend" style="width: 80px" v-model="setForm.mobileIntCode" @change="mobileIntCodeChange(setForm.mobileIntCode, element)" :placeholder="$t('form.selectInternationalCode')">
                          <el-option> </el-option>
                        </el-select>
                      </el-input>
                    </div>
                  </div>

                  <!-- 备用手机号 -->
                  <div v-if="element.mapCode == 'spareMobile'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.spareMobile" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" :disabled="element.notAllowEdit && isUpdate" slot="prepend" style="width: 80px" v-model="setForm.spareMobileIntCode" @change="spareMobileIntCodeChange(setForm.spareMobileIntCode, element)" :placeholder="$t('form.selectInternationalCode')">
                          <el-option> </el-option>
                        </el-select>
                      </el-input>
                    </div>
                  </div>

                  <!-- 固定电话 -->
                  <div v-if="element.mapCode == 'phone'" class="form-item-input">
                    <div style="width: 80%; display: inline-block; vertical-align: top">
                      <span style="display: inline-block">
                        <el-form-item label-width="0">
                          <el-input v-model="setForm.phoneAreaCode" :disabled="element.notAllowEdit && isUpdate" style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                            <el-select v-if="element.countryCodeIsShow" :disabled="element.notAllowEdit && isUpdate" slot="prepend" style="width: 90px" v-model="setForm.phoneIntCode" :placeholder="$t('form.selectInternationalCode')">
                              <el-option> </el-option>
                            </el-select>
                          </el-input>
                        </el-form-item>
                      </span>
                      <span> - <el-input v-model="setForm.phone" :disabled="element.notAllowEdit && isUpdate" style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input> </span>
                      <span v-if="element.extensionNumbeIsShow"> - <el-input v-model="setForm.phoneRunNumber" :disabled="element.notAllowEdit && isUpdate" style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                    </div>
                  </div>

                  <!-- 传真 -->
                  <div v-if="element.mapCode == 'fax'" class="form-item-input">
                    <div style="width: 80%; display: inline-block; vertical-align: top">
                      <span style="display: inline-block">
                        <el-form-item label-width="0">
                          <el-input v-model="setForm.faxAreaCode" :disabled="element.notAllowEdit && isUpdate" style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                            <el-select v-if="element.countryCodeIsShow" :disabled="element.notAllowEdit && isUpdate" slot="prepend" style="width: 90px" v-model="setForm.faxIntCode" :placeholder="$t('form.selectInternationalCode')">
                              <el-option> </el-option>
                            </el-select>
                          </el-input>
                        </el-form-item>
                      </span>
                      <span> - <el-input v-model="setForm.fax" :disabled="element.notAllowEdit && isUpdate" style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input> </span>
                      <span v-if="element.extensionNumbeIsShow"> - <el-input v-model="setForm.faxRunNumber" :disabled="element.notAllowEdit && isUpdate" style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                    </div>
                  </div>

                  <!-- 邮箱 -->
                  <div v-if="element.mapCode == 'email'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.email" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 备用邮箱 -->
                  <div v-if="element.mapCode == 'spareEmail'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.spareEmail" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 微信号 -->
                  <div v-if="element.mapCode == 'wechat'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.wechat" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- qq -->
                  <div v-if="element.mapCode == 'qq'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.qq" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 公司 -->
                  <div v-if="element.mapCode == 'company'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.company" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 部门 -->
                  <div v-if="element.mapCode == 'department'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.department" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 职位 -->
                  <div v-if="element.mapCode == 'position'" class="form-item-input">
                    <div>
                      <el-input v-model="setForm.position" :disabled="element.notAllowEdit && isUpdate" :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>

      <div class="applySetForm">
        <el-form ref="applySetForm" :validate-on-rule-change="false" :rules="rulesApply" @submit.native.prevent label-position="right" label-width="180px" :model="applySetForm">
          <div class="setItemTitle">
            <h3>{{$t('applySet.registerAndLogin')}}</h3>
            <span>
              <span style="margin-right: 20px">{{ isRegisterSetShow ? $t('applySet.fewer') : $t('applySet.expand') }}</span>
              <el-button type="text" @click="isRegisterSetShow = !isRegisterSetShow" style="vertical-align: middle; padding: 0">
                <i v-if="isRegisterSetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
              </el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div v-show="isRegisterSetShow">
            <el-form-item :label="$t('applySet.authenticationMethods')" prop="isVerification">
              <el-radio v-model="applySetForm.isVerification" label="0">{{$t('applySet.noverification')}}</el-radio>
              <el-radio v-model="applySetForm.isVerification" label="1">{{$t('applySet.verification')}}</el-radio>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification == '1'" :label="$t('applySet.registrationVerification')" prop="registerVerification">
              <el-checkbox-group v-model="applySetForm.registerVerification">
                <el-checkbox v-for="item in registerVerificationOptions" :key="item.dictItemVal" :label="item.dictItemVal">{{ item.dictItemName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification == '1'" :label="$t('applySet.loginVerification')" prop="loginVerification">
              <el-checkbox-group v-model="applySetForm.loginVerification">
                <el-checkbox v-for="item in loginVerificationOptions" :key="item.dictItemVal" :label="item.dictItemVal">{{ item.dictItemName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="applySetForm.isVerification == '1' && applySetForm.loginVerification.length && applySetForm.loginVerification.includes('custom')" :label="$t('applySet.customValidationEntries')" prop="coustomVerification">
              <el-checkbox-group v-model="applySetForm.coustomVerification">
                <el-checkbox v-for="item in customizeOptions" :key="item.dictItemVal" :label="item.dictItemVal">{{ item.dictItemName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="$t('applySet.completeRequiredInformation')" prop="isNeedCompleteMustInfo">
              <el-switch v-model="applySetForm.isNeedCompleteMustInfo" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('applySet.privacyAgreement')" prop="IsIintimateAgreement">
              <el-switch v-model="applySetForm.IsIintimateAgreement" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              <el-button type="text" @click="editPrivacyHandle">{{$t('applySet.editorialPrivacyAgreement')}}</el-button>
            </el-form-item>
          </div>

          <div class="setItemTitle">
            <h3>{{$t('applySet.registrationBasicInformation')}}</h3>
            <span>
              <span style="margin-right: 20px">{{ isApplyBaseInfoShow ? $t('applySet.fewer') : $t('applySet.expand') }}</span>
              <el-button type="text" @click="isApplyBaseInfoShow = !isApplyBaseInfoShow" style="vertical-align: middle; padding: 0">
                <i v-if="isApplyBaseInfoShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
              </el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div v-show="isApplyBaseInfoShow">
            <el-form-item :label="$t('applySet.dateofRegistration')" prop="applyDate">
              <el-date-picker v-model="applySetForm.applyDate" type="datetimerange" :range-separator="$t('applySet.to')" :start-placeholder="$t('applySet.startDate')" :end-placeholder="$t('applySet.dateClosed')">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('applySet.applyCheck')" prop="applyCheck">
              <el-radio-group v-model="applySetForm.applyCheck">
                <el-radio label="0">{{$t('applySet.noneedtoaudit')}}</el-radio>
                <el-radio label="1">{{$t('applySet.needtoaudit')}}</el-radio>
              </el-radio-group>
              <el-form-item v-if="applySetForm.applyCheck == '1'" :label="$t('applySet.addtheauditresultspage')" label-width="110px">
                <el-button type="text" @click="setResult">{{$t('applySet.auditresultspage')}}</el-button>
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('applySet.assistin')" prop="assistApply">
              <el-switch v-model="applySetForm.assistApply" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item v-if="applySetForm.assistApply" :label="$t('applySet.assistinregistration')" prop="assistApplyPermission">
              <el-radio v-model="applySetForm.assistApplyPermission" label="2">{{$t('applySet.permissiontoassistRegistration')}}</el-radio>
              <el-radio v-model="applySetForm.assistApplyPermission" label="1">{{$t('applySet.editingOnly')}}</el-radio>
            </el-form-item>
            <el-form-item v-if="applySetForm.assistApply" label="同行人数限制" prop="assistApplyPermission">
              <el-radio v-model="applySetForm.assistApplyPermission" label="0">不限制</el-radio>
              <el-radio v-model="applySetForm.assistApplyPermission" label="1">最多添加 <el-input-number v-model="applySetForm.number" controls-position="right" :min="0" size="small"></el-input-number>位</el-radio>
            </el-form-item>

            <el-form-item v-if="applySetForm.assistApply" :label="$t('applySet.supportNewAdditions')" prop="assistApplyOpenField">
              <el-checkbox-group v-model="applySetForm.assistApplyOpenField">
                <el-checkbox v-for="item in signupFieldOptions" :key="item" :label="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="applySetForm.assistApply" label="协助报名表单位置及必填项" prop="assistApplyOpenField">
              <el-button type="text" @click="FellowEditorFn">编辑</el-button>
              <p style="color:#aaaaaa">协助报名位置默认位于报名表单最后，协助报名开放字段必填性默认与报名表单内保持一致</p>
            </el-form-item>
          </div>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="saveHrefHandle('applySetForm')">{{$t('applySet.assistRegistrationOpenField')}}</el-button>
        </div>
        <div class="copyHref" @click="copyTxt" v-if="isSaveHref">
          <span> {{$t('applySet.saveandgeneratetheregistrationlink')}}:</span>
          <h2>{{ imgUrl }}</h2>
        </div>
      </div>
    </div>
    <!--  -->
    <el-dialog title="协助报名表单位置" :visible.sync="dialogFollowVisible">
      <el-form :model="followForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="followForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="followForm.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFollowVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFollowVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 隐私协议 -->
    <el-dialog :title="$t('applySet.clickonthecopyregistrationlink')" v-el-drag-dialog :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('applySet.protocolName')" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('applySet.agreementContent')" prop="privacyContent">
          <iframe name="myframe_" ref="bsEditorFrame" src="static/qmeditor/index.html" style="width: 100%; height: 30rem; border-width: 1px"></iframe>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="privacySubmitForm('ruleForm')">{{$t('applySet.confrim')}}</el-button>
          <el-button @click="resetForm()">{{$t('applySet.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import moment from 'moment'
export default {
  name: 'applySet',
  data() {
    return {
      dialogFollowVisible: false,
      followForm: {
        name: '',
        companyName: ''
      },
      formLabelWidth: '120px',
      pageTotal:0,
      isSaveHref:false,
      theCertificateType:[],//证件类型回显
      url: '',//当前环境
      imgUrl: '',//报名链接
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
        signupContactDtlDto: {}
      },
      pagingCount: 0,//分页数量
      registerVerificationOptions: [], // 获取注册验证
      loginVerificationOptions: [], // 获取登录验证
      customizeOptions: [], // 获取自定义验证
      typeOptions: [], // 获取生成类型
      signupFieldOptions: [], // 获取协助报名开放字段

      setInfoList: [], // 表单配置列表
      isRegisterSetShow: true, // 注册登录是否显示
      isApplyBaseInfoShow: true, // 报名基础信息是否展示
      checkUseroptions: [], // 审核权限用户列表
      isUpdate: true,
      setformOther: {},
      etFormFile: {},
      applySetForm: {
        isVerification: '', // 验证方式
        registerVerification: [], // 注册验证
        loginVerification: [], // 登录验证
        coustomVerification: [], // 自定义验证项
        isNeedCompleteMustInfo: false, // 是否需要完善必填信息
        IsIintimateAgreement: true, // 隐私协议
        applyDate: '', // 报名日期
        applyCheck: '0', // 报名审核
        checkUser: '', // 审核权限用户
        assistApply: true, // 协助报名
        assistApplyPermission: '', // 协助报名权限
        assistApplyOpenField: [], // 协助报名开放字段
        id: '',
        number:0
      },
      setFormFile: [],//附件列表
      dialogFormVisible: false,//隐私协议显隐
      ruleForm: {//隐私协议
        name: '',//协议名称
        privacyContent: ''//协议内容
      },
      rules: {//隐私协议规则
        name: [{ required: true, message: this.$t('applySet.pleaseenteraprotocolname'), trigger: 'blur' }],
        privacyContent: [{ required: true, message: this.$t('applySet.pleasefillintheagreement'), trigger: 'blur' }]
      },
      rulesApply: {//注册报名规则
        isVerification: [{ required: true, message: this.$t('applySet.pleaseselectthevalidationmethod'), trigger: 'blur' }],
        registerVerification: [{ required: true, message: this.$t('applySet.pleaseselecttheregistrationverificationmethod'), trigger: 'blur' }],
        loginVerification: [{ required: true, message: this.$t('applySet.pleaseselecttheloginverificationmethod'), trigger: 'blur' }],
        coustomVerification: [{ required: true, message: this.$t('applySet.selectcustomvalidation'), trigger: 'blur' }],
        createType: [{ required: true, message: this.$t('applySet.selectthebuildtype'), trigger: 'blur' }],
        attendanceCodeStartNum: [{ required: true, message: this.$t('applySet.pleaseenterthestartcode'), trigger: 'blur' }]
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
    },
    formUpdateStatus:{
      type:Boolean,
      default:()=>[]
    },
    isNeedApprove:{
      type:String,
      default:'0'
    },
  },
  watch: {
    eventCode(newVal, oldVal) {
      if (newVal) {
        this.getEventInfo()
      }
    },
    isNeedApprove(newVal, oldVal) {
      if (newVal) {
        this.applySetForm.applyCheck=this.isNeedApprove
        this.$emit('update:isNeedApprove',this.applySetForm.applyCheck)
      }
    },
    'applySetForm.applyCheck'(newVal, oldVal) {
      console.log(newVal,'newValnewVal')
      if (newVal) {
        this.$emit('update:isNeedApprove',this.applySetForm.applyCheck)
      }
    },
    formUpdateStatus(newVal, oldVal) {
      if (newVal==true) {
        this.getEventInfo()
        this.$emit('update:formUpdateStatus',false)
      }
    },
  },
  created() {},
  mounted() {
    if (this.eventCode) {
      this.getEventInfo()
      this.signupContactCodeRuleFn()
    }
    // 获取注册验证数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'REGISTER_VERIFICATION', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.registerVerificationOptions = res.data
    })
    // 获取登录验证数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'LOGIN_VERIFICATION', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.loginVerificationOptions = res.data
    })
    // 获取自定义验证数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'CUSTOMIZE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.customizeOptions = res.data
    })
    // 获取生成类型数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'contact_code_rule_type', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      this.typeOptions = res.data
    })
    // // 获取协助报名开放字段数据字典
    // request({
    //   url: '/api/sys/dict/listItem',
    //   method: 'POST',
    //   data: { data: 'SIGNUP_FIELD', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    // }).then(res => {
    //   this.signupFieldOptions = res.data
    // })
  },
  methods: {
    FellowEditorFn(){
      this.dialogFollowVisible=true
    },
    // 取消关闭隐私协议对话框
    resetForm() {
      this.dialogFormVisible = false
    },
    // 确定关闭隐私协议对话框
    privacySubmitForm(formName) {
      const req = window.frames['myframe_'].getContent()
      this.ruleForm.privacyContent = req.trim()
      if (req.trim() === '') {
        this.$message.error(this.$t('applySet.pleaseenterthecontentoftheagreement'))
      } else {
        this.dialogFormVisible = false
      }
    },
    // 打开隐私协议对话框
    editPrivacyHandle() {
      this.dialogFormVisible = true
      setTimeout(() => {
        if (window.frames['myframe_']){
          window.frames['myframe_'].setContentProfile(this.ruleForm.privacyContent)
        }
      }, 1000)
    },
    // 生成规则
    signupContactCodeRuleFn(evevtCodeByIndex) {
      var evCode = evevtCodeByIndex ? evevtCodeByIndex : this.eventCode
      request({
        url: '/api/register/signupContactCodeRule/get',
        method: 'POST',
        data: {
          data: evCode,
          funcModule: '规则设置',
          funcOperation: '规则设置查询'
        }
      }).then(res => {
        console.log(res, ' 生成规则')
        if (JSON.stringify(res.data) === '{}' || res.data == undefined) {
          this.applySetForm.isVerification = ''
          this.applySetForm.registerVerification = []
          this.applySetForm.loginVerification = []
          this.applySetForm.coustomVerification = []
          this.applySetForm.isNeedCompleteMustInfo = false
          this.applySetForm.IsIintimateAgreement = true
          this.ruleForm.privacyName = ''
          this.ruleForm.privacyContent = ''
          setTimeout(() => {
            if (window.frames['myframe_']){
              window.frames['myframe_'].setContents('')
            }
          },1000)
          this.applySetForm.applyDate = ''
          this.applySetForm.applyCheck = ''
          this.applySetForm.assistApply = true
          this.applySetForm.assistApplyPermission = ''
          this.applySetForm.assistApplyOpenField = ''
          this.applySetForm.id = ''
          this.isSaveHref=false
        } else {
          this.isSaveHref=true
          this.applySetForm.isVerification = res.data.isVerification
          this.applySetForm.registerVerification = [...new Set(res.data.registerVerification.split(','))]
          this.applySetForm.loginVerification = [...new Set(res.data.loginVerification.split(','))]
          this.applySetForm.coustomVerification = [...new Set(res.data.customize.split(','))]
          this.applySetForm.isNeedCompleteMustInfo = res.data.isRequired === '1' ? true : false
          this.applySetForm.IsIintimateAgreement = res.data.isPrivacy === '1' ? true : false
          this.ruleForm.name = res.data.privacyName
          this.ruleForm.privacyContent = res.data.privacyContent
          setTimeout(() => {
            if (window.frames['myframe_']){
              window.frames['myframe_'].setContents(this.ruleForm.privacyContent)
            }
          },1000)
          this.applySetForm.applyDate = [res.data.beginTime, res.data.endTime]
          this.applySetForm.applyCheck = res.data.isApproval
          this.applySetForm.assistApply = res.data.isAssistSignup == '1' ? true : false
          this.applySetForm.approvalUser = res.data.approvalUser
          this.applySetForm.assistApplyPermission = res.data.assistSignupPower
          this.applySetForm.assistApplyOpenField = [...new Set(res.data.signupField.split(','))]
          this.applySetForm.id = res.data.id
        }
      })
    },
    // 表单配置查询
    getEventInfo() {
      this.pageTotal=0
      this.pagingCount=0
      request({
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: this.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then(response => {
        if (response.data.json) {
          this.setInfoList = JSON.parse(response.data.json)
          // this.signupFieldOptions = res.data
          this.setInfoList.forEach(v=>{//systemName
            if (v.systemName!=='分页') {
              this.signupFieldOptions.push(v.systemName)
            }
          })
          this.signupFieldOptions=[...new Set(this.signupFieldOptions)]
        } else {
          this.setInfoList = []
        }
        this.setInfoList.forEach(item => {
          // 1：自定义属性
          if (item.mapBase == 1) {
            if (['复选框', '下拉复选框'].includes(item.systemName)) {
              // this.setForm[item.mapCode] = []
              this.$set(this.setForm.signupContactDtlDto, item.mapCode, [])
            } else {
              this.$set(this.setForm.signupContactDtlDto, item.mapCode, '')
              // this.setForm[item.mapCode] = ''
            }
            if (['附件'].includes(item.systemName)) {
              // debugger
              this.$set(this.setForm.signupContactDtlDto, item.mapCode, '')
              this.$set(this.setFormFile, item.mapCode, [])
            }
            this.$set(this.setformOther, item.mapCode, '')
          } else {
            // 国际区号设置默认值
            if (item.mapCode == 'mobile') {
              this.setForm.mobileIntCode = item.defaultCountryCode
              // 国际区号不显示,后台默认86
              if (!item.countryCodeIsShow) {
                this.setForm.mobileIntCode = '86'
              }
            }
            if (item.mapCode == 'spareMobile') {
              this.setForm.spareMobileIntCode = item.defaultCountryCode
              // 国际区号不显示,后台默认86
              if (!item.countryCodeIsShow) {
                this.setForm.mobileIntCode = '86'
              }
            }
            if (item.mapCode == 'phone') {
              this.setForm.phoneIntCode = item.defaultCountryCode
              // 国际区号不显示,后台默认86
              if (!item.countryCodeIsShow) {
                this.setForm.mobileIntCode = '86'
              }
            }
            if (item.mapCode == 'fax') {
              this.setForm.faxIntCode = item.defaultCountryCode
              // 国际区号不显示,后台默认86
              if (!item.countryCodeIsShow) {
                this.setForm.mobileIntCode = '86'
              }
            }
          }

          if (item.systemName == '分页') {
            this.pagingCount++
          }
          if (item.systemName == '证件') {
            let cardCode = this.$t('datadict.certificateType')
            this.theCertificateType=[]
            item.options.forEach(v=>{
              cardCode.forEach(i=>{
                if(i.value == v){
                  this.theCertificateType.push(i)
                }
              })
            })
          }
        })
        if (window.location.host == 'cmms-test.ctgbs.com' || window.location.host == 'localhost:9527') {
          this.url = 'https://cmms-h5-test.ctgbs.com'
        } else if (window.location.host == 'cmms.ctgbs.com') {
          this.url = 'https://cmms-h5.ctgbs.com'
        } else if (window.location.host == 'cmms-dev.ctgbs.com' || window.location.host == 'localhost:9527') {
          this.url = 'https://cmms-h5-dev.ctgbs.com'
        }
        this.imgUrl = `${this.url}/guest/#/login?ehc=${response.data.eventHashCode}&ec=${response.data.code}`
      })
    },
    // 编辑结果页
    setResult() {
      this.$emit('setResult')
    },
    // 保存并生成报名链接
    saveHrefHandle(formName) {
      this.$emit('applySetForm', this.applySetForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          let date1 = moment(this.applySetForm.applyDate[0]).valueOf()
          let date2 = moment(this.applySetForm.applyDate[1]).valueOf()
          let querySaveHref = {
            isVerification: this.applySetForm.isVerification,
            registerVerification: this.applySetForm.registerVerification.join(','),
            loginVerification: this.applySetForm.loginVerification.join(','),
            customize: this.applySetForm.coustomVerification.join(','),
            isRequired: this.applySetForm.isNeedCompleteMustInfo ? '1' : '0',
            isPrivacy: this.applySetForm.IsIintimateAgreement ? '1' : '0',
            privacyName: this.ruleForm.name,
            privacyContent: this.ruleForm.privacyContent,
            beginTime: moment(date1).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(date2).format('YYYY-MM-DD HH:mm:ss'),

            isApproval: this.applySetForm.applyCheck,
            approvalUser: this.applySetForm.approvalUser,
            assistSignupPower: this.applySetForm.assistApplyPermission,
            signupField: this.applySetForm.assistApplyOpenField ? this.applySetForm.assistApplyOpenField.join(',') : [],
            eventCode: this.eventCode,
            id: this.applySetForm.id
          }
          request({
            url: '/api/register/signupContactCodeRule/update',
            method: 'POST',
            data: {
              data: querySaveHref,
              funcModule: '表单设置',
              funcOperation: '保存并生成报名链接'
            }
          }).then(res => {
            console.log(res, '保存并生成报名链接')
            if (res.status) {
              this.isSaveHref=true
              this.$message({ message: this.$t('applySet.SignUpAndGenerateLinkSuccessfully'), type: 'success' })
              this.signupContactCodeRuleFn()
              this.$emit('stepIndex', step)
              this.$emit('isFormSetComplete', false)
            } else {
              this.$message({ message: this.$t('applySet.alreadyRegistered'), type: 'success' })
            }
          })
        } else {
          this.$message({ showClose: true, message: this.$t('applySet.fillAll'), type: 'warning' })
          return false
        }
      })
    },
    // 复制报名链接
    copyTxt() {
      if (this.imgUrl == '') {
        this.$message({ showClose: true, message: this.$t('applySet.failedtolink'), type: 'error' })
        return false
      } else {
        var copyTest = this.imgUrl
        var inputTest = document.createElement('input')
        inputTest.value = copyTest
        document.body.appendChild(inputTest)
        inputTest.select()
        document.execCommand('Copy')
        inputTest.className = 'oInput'
        inputTest.style.display = 'none'
        this.$message.success(this.$t('applySet.copySuccess'))
      }
    },

    certificateTypeChange() {}
  }
}
</script>

<style scoped lang="scss">
.applySet {
  min-width: 1250px;
  display: flex;
  justify-content: center;

  .formSet {
    overflow: auto;
    width: 48% !important;
    background: #fff;
    // text-align: center;
    min-width: 50px;
    padding: 20px;
    position: relative;

    .back {
      position: absolute;
      top: 20px;
      right: 20px;

      .shengluehao {
        width: 20px;
        height: 16px;
        line-height: 10px;
        background-color: #4b9cf2;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
      }
    }
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
    width: 55%;
    background: #fff;
    padding: 20px;
    overflow: auto;

    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }
  .copyHref {
    cursor: pointer;
    margin-top: 30px;
    // width: 100%;
    height: 60px;
    border-radius: 6px;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    color: #00699d;

    span {
      padding: 0 20px;
      font-weight: bold;
      font-size: 18px;
      margin-right: 2 0px;
    }

    h2 {
      font-weight: bold;
      font-size: 12px;
      // width: 500px;
    }
    &:hover {
      border: 2px solid rgb(119, 189, 119);
      color: rgb(119, 189, 119);
    }
  }
}
</style>