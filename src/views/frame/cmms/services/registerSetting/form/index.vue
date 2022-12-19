<template>
  <div class="app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>

    <!-- <bs-table ref="bsTable" :mainData="mainData"></bs-table> -->
    <!-- 已完成表单设置 -->
    <apply-set v-if="isFormSetComplete" :eventCode="form.listQuery.data.eventCode" :eventName="eventName"
      @setResult="setResult" @stepIndex="stepIndexFn" @isFormSetComplete="isFormSetCompleteFn"
      @applySetForm="applySetForm"></apply-set>
    <!-- 未完成表单设置 -->
    <div v-else style="padding: 0 20px">
      <div class="steps">
        <el-steps :active="stepIndex" align-center>
          <el-step style="cursor: pointer">
            <span slot="icon" @click="stepIndexChange(1)" style="cursor: pointer"> 1 </span>
            <span slot="title" @click="stepIndexChange(1)" style="cursor: pointer"> 外观设置 </span>
          </el-step>
          <el-step title="表单设置">
            <span slot="icon" @click="stepIndexChange(2)" style="cursor: pointer"> 2 </span>
            <span slot="title" @click="stepIndexChange(2)" style="cursor: pointer"> 表单设置 </span>
          </el-step>
          <el-step title="结果设置">
            <span slot="icon" @click="stepIndexChange(3)" style="cursor: pointer"> 3 </span>
            <span slot="title" @click="stepIndexChange(3)" style="cursor: pointer"> 结果设置 </span>
          </el-step>
        </el-steps>
      </div>
      <!-- 外观设置 -->
      <div v-if="stepIndex == 1" class="appearanceSet" :style="{ height: formSetHeight + 'px' }">
        <el-form ref="appearanceSetForm" :validate-on-rule-change="false" @submit.native.prevent label-position="right"
          label-width="250px" :model="appearanceSetForm" class="appearanceSetForm">
          <!-- 通用设置 -->
          <div class="appearanceSetItem">
            <div class="setItemTitle">
              <h3>通用设置</h3>
              <span>
                <span style="margin-right: 20px">{{ isCommonSetShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="isCommonSetShow = !isCommonSetShow"
                  style="vertical-align: middle; padding: 0">
                  <i v-if="isCommonSetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="isCommonSetShow">
              <el-form-item label="注册标题" prop="titleChinese">
                <el-input v-model="appearanceSetForm.titleChinese" style="width: 50%" size="mini"
                  placeholder="注册标题"></el-input>
              </el-form-item>
              <el-form-item label="注册标题(英文)" prop="titleEnglish">
                <el-input v-model="appearanceSetForm.titleEnglish" style="width: 50%" size="mini"
                  placeholder="注册标题(英文)"></el-input>
              </el-form-item>
              <el-form-item label="语言设置" prop="language">
                <el-checkbox-group v-model="appearanceSetForm.language" style="width: 50%" size="mini">
                  <el-checkbox label="中文" name="CN"></el-checkbox>
                  <el-checkbox label="英文" name="EN"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="主色调" prop="color">
                <el-color-picker v-model="appearanceSetForm.color" style="width: 50%" size="mini"></el-color-picker>
              </el-form-item>
            </div>
          </div>
          <!-- 会议宣传 -->
          <div class="appearanceSetItem">
            <div class="setItemTitle">
              <h3>会议宣传</h3>
              <span>
                <span style="margin-right: 20px">{{ isPublicitySetShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="isPublicitySetShow = !isPublicitySetShow"
                  style="vertical-align: middle; padding: 0">
                  <i v-if="isPublicitySetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="isPublicitySetShow">
              <el-form-item label="是否开启会议宣传" prop="isPropaganda">
                <el-switch v-model="appearanceSetForm.isPropaganda" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>

              <el-form-item label="Banner(pc)" prop="meetingFile">
                <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount" ref="rebateUpload"
                  :before-upload="beforeAvatarUpload" :multiple="false"
                  :http-request="(file) => handleUploadForm(file)">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip" style="margin-left: 100px">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>

              <el-form-item label="是否显示会议时间" prop="isMeetingDate">
                <el-switch v-model="appearanceSetForm.isMeetingDate" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="是否显示会议地点" prop="isMeetinPlace">
                <el-switch v-model="appearanceSetForm.isMeetinPlace" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="是否显示倒计时" prop="isMeetinCountdown">
                <el-switch v-model="appearanceSetForm.isMeetinCountdown" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="会议简介" prop="profile">
                <el-input type="textarea" style="width: 50%" :rows="4" :maxlength="500" show-word-limit
                  placeholder="请输入会议简介" v-model="appearanceSetForm.profile"></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 注册登录 -->
          <div class="appearanceSetItem">
            <div class="setItemTitle">
              <h3>注册登录</h3>
              <span>
                <span style="margin-right: 20px">{{ isRegisterSetShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="isRegisterSetShow = !isRegisterSetShow"
                  style="vertical-align: middle; padding: 0">
                  <i v-if="isRegisterSetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="isRegisterSetShow">
              <el-form-item label="Banner(pc)" prop="loginPcFile">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
                  :header="header" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip" style="margin-left: 100px">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="Banner(手机端)" prop="loginAppFile">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
                  :header="header" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip" style="margin-left: 100px">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="是否显示会议时间" prop="isLoginDate">
                <el-switch v-model="appearanceSetForm.isLoginDate" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="是否显示会议地点" prop="isLoginPlace">
                <el-switch v-model="appearanceSetForm.isLoginPlace" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="是否显示倒计时" prop="isLoginCountdown">
                <el-switch v-model="appearanceSetForm.isLoginCountdown" active-color="#13ce66" inactive-color="#ff4949"
                  active-value="1" inactive-value="0"></el-switch>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="appearanceSetBtns">
          <el-button type="primary" @click="appearanceSetSave">保存,进入下一步</el-button>
          <el-button>取消</el-button>
        </div>
      </div>

      <!-- 表单设置 -->
      <div v-if="stepIndex == 2" class="formSet">
        <el-card class="formInfo" :style="{ height: formSetHeight + 'px' }">
          <div slot="header" class="formInfoTitle">
            <span>表单信息</span>
          </div>

          <div>
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <h2>基本信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(baseInfoItem, baseInfoIndex) in baseInfoList" :key="baseInfoIndex"
                    v-show="!baseInfoItem.isSee" @click="addSetInfoList(baseInfoItem, baseInfoList, 'baseInfoList')">{{
                        baseInfoItem.label
                    }}</li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>联系方式</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(contactWayItem, contactWayIndex) in contactWayList"
                    :key="contactWayIndex" v-show="!contactWayItem.isSee"
                    @click="addSetInfoList(contactWayItem, contactWayList, 'contactWayList')">{{ contactWayItem.label }}
                  </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>工作信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(workInfoItem, workInfoIndex) in workInfoList" :key="workInfoIndex"
                    v-show="!workInfoItem.isSee" @click="addSetInfoList(workInfoItem, workInfoList, 'workInfoList')">{{
                        workInfoItem.label
                    }}</li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>自定义信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(customInfoItem, customInfoIndex) in customInfoList"
                    :key="customInfoIndex" v-show="!customInfoItem.isSee"
                    @click="addSetInfoList(customInfoItem, customInfoList, 'customInfoList')">{{ customInfoItem.label }}
                  </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>特殊信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(specialInfoItem, specialInfoIndex) in specialInfoList"
                    :key="specialInfoIndex" v-show="!specialInfoItem.isSee"
                    @click="addSetInfoList(specialInfoItem, specialInfoList, 'specialInfoList')">{{
                        specialInfoItem.label
                    }}</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
        <el-card class="formPreview" :style="{ height: formSetHeight + 'px' }">
          <div :style="{ minHeight: formSetHeight - 80 + 'px' }">
            <h2 style="text-align: center">{{ eventName }}</h2>
            <draggable v-model="setInfoList" chosenClass="chosen" forceFallback="true" :scroll="true" animation="300"
              @start="onStart" @end="onEnd" @update="onUpdate">
              <transition-group>
                <div class="setInfoItem" v-for="(element, index) in setInfoList" :key="element.mapCode"
                  @click="edititem(element, index)">
                  <!-- 姓名 -->
                  <div v-if="element.mapCode == 'name' && !element.nameSplit" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <el-input style="width: 50%" size="mini" :placeholder="element.placeholder"></el-input>
                  </div>
                  <!-- 姓名拆分 -->
                  <div v-if="element.mapCode == 'name' && element.nameSplit" class="form-item-input">
                    <div>
                      <span class="setInfoItemlabel"> {{ element.surnameTitle }} : </span>
                      <el-input style="width: 50%" size="mini" :placeholder="element.surnamePlaceholder"></el-input>
                    </div>
                    <div>
                      <span class="setInfoItemlabel"> {{ element.nameTitle }} : </span>
                      <el-input style="width: 50%" size="mini" :placeholder="element.namePlaceholder"></el-input>
                    </div>
                  </div>

                  <!-- 性别 -->
                  <div v-if="element.mapCode == 'sex'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <el-radio v-model="setForm.checkedSex" :label="element.options[0]">{{ element.options[0]
                    }}</el-radio>
                    <el-radio v-model="setForm.checkedSex" :label="element.options[1]">{{ element.options[1]
                    }}</el-radio>
                  </div>

                  <!-- 证件 -->
                  <div v-if="element.mapCode == 'certificate'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-select style="width: 100%" v-model="setForm.chenkedCertificate"
                        :placeholder="element.placeholder">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item"> </el-option>
                      </el-select>
                      <br />
                      <el-input style="margin-top: 10px" size="mini" placeholder="请输入您的证件号码"></el-input>
                    </div>
                  </div>

                  <!-- 照片 -->
                  <div v-if="element.mapCode == 'photo'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <el-upload class="avatar-uploader">
                      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>

                  <!-- 地址 -->
                  <div v-if="element.mapCode == 'addres'" class="form-item-input">
                    <!-- 国家 -->
                    <div v-if="element.nationIsShow" class="addresItem" style="margin-top: 20px">
                      <span class="setInfoItemlabel"> {{ element.nationTitle }} : </span>
                      <el-select style="width: 50%" v-model="setForm.nation" :placeholder="element.nationPlaceholder">
                        <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                      </el-select>
                    </div>
                    <!-- 省份 -->
                    <div v-if="element.provinceIsShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{ element.provinceTitle }} : </span>
                      <el-select style="width: 50%" v-model="setForm.province"
                        :placeholder="element.provincePlaceholder">
                        <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                      </el-select>
                    </div>
                    <!-- 城市 -->
                    <div v-if="element.cityIsShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{ element.cityTitle }} : </span>
                      <el-select style="width: 50%" v-model="setForm.city" :placeholder="element.cityPlaceholder">
                        <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                      </el-select>
                    </div>
                    <!-- 区县 -->
                    <div v-if="element.countyIsShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{ element.countyTitle }} : </span>
                      <el-select style="width: 50%" v-model="setForm.county" :placeholder="element.countyPlaceholder">
                        <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                      </el-select>
                    </div>
                    <!-- 详细地址 -->
                    <div v-if="element.detailedAdressISShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{ element.detailedAdressTitle }} : </span>
                      <el-input style="width: 50%" size="mini" v-model="setForm.detailedAdress"
                        :placeholder="element.detailedAdressPlaceholder"></el-input>
                    </div>
                    <!-- 邮编 -->
                    <div v-if="element.postcodeIsShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{ element.postcodeTitle }} : </span>
                      <el-input style="width: 50%" size="mini" v-model="setForm.postcode"
                        :placeholder="element.postcodePlaceholder"></el-input>
                    </div>
                  </div>

                  <!-- 手机号 -->
                  <div v-if="element.mapCode == 'mobile'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px"
                          v-model="setForm.defaultCountryCode" placeholder="请选择国际区号">
                          <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal"
                            :label="'+' + item.dictItemVal" :value="item.dictItemVal"> </el-option>
                        </el-select>
                      </el-input>
                      <br />
                      <el-input v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                        <el-button slot="append">获取验证码</el-button>
                      </el-input>
                    </div>
                  </div>

                  <!-- 备用手机号 -->
                  <div v-if="element.mapCode == 'spareMobile'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px"
                          v-model="setForm.secondPhonedefaultCountryCode" placeholder="请选择国际区号">
                          <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal"
                            :label="'+' + item.dictItemVal" :value="item.dictItemVal"> </el-option>
                        </el-select>
                      </el-input>
                      <br />
                      <el-input v-if="element.isNoteVerify" placeholder="请输入验证码" class="input-with-select">
                        <el-button slot="append">获取验证码</el-button>
                      </el-input>
                    </div>
                  </div>

                  <!-- 固定电话 -->
                  <div v-if="element.mapCode == 'phone'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 80%; display: inline-block; vertical-align: top">
                      <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini"
                        class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px"
                          v-model="setForm.telephoneDefaultCountryCode" placeholder="请选择国际区号">
                          <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal"
                            :label="'+' + item.dictItemVal" :value="item.dictItemVal"> </el-option>
                        </el-select>
                      </el-input>
                      <span> - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                      </span>
                      <span v-if="element.extensionNumbeIsShow"> - <el-input style="width: 150px"
                          :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                    </div>
                  </div>

                  <!-- 传真 -->
                  <div v-if="element.mapCode == 'fax'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 80%; display: inline-block; vertical-align: top">
                      <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini"
                        class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px"
                          v-model="setForm.faxDefaultCountryCode" placeholder="请选择国际区号">
                          <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal"
                            :label="'+' + item.dictItemVal" :value="item.dictItemVal"> </el-option>
                        </el-select>
                      </el-input>
                      <span> - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                      </span>
                      <span v-if="element.extensionNumbeIsShow"> - <el-input style="width: 150px"
                          :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                    </div>
                  </div>

                  <!-- 邮箱 -->
                  <div v-if="element.mapCode == 'email'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                      <br />
                      <el-input v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                        <el-button slot="append">获取验证码</el-button>
                      </el-input>
                    </div>
                  </div>

                  <!-- 备用邮箱 -->
                  <div v-if="element.mapCode == 'spareEmail'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                      <br />
                      <el-input v-if="element.isEmailVerify" placeholder="请输入验证码" class="input-with-select">
                        <el-button slot="append">获取验证码</el-button>
                      </el-input>
                    </div>
                  </div>

                  <!-- 微信号 -->
                  <div v-if="element.mapCode == 'wechat'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- qq -->
                  <div v-if="element.mapCode == 'qq'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 公司 -->
                  <div v-if="element.mapCode == 'company'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 部门 -->
                  <div v-if="element.mapCode == 'department'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 职位 -->
                  <div v-if="element.mapCode == 'position'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                    </div>
                  </div>

                  <!-- 短文本 -->
                  <div v-if="element.systemName == '短文本'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input :placeholder="element.placeholder" :maxlength="element.wordCountLimit"
                        size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 长文本 -->
                  <div v-if="element.systemName == '长文本'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input type="textarea" :placeholder="element.placeholder" :maxlength="element.wordCountLimit"
                        size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 数字 -->
                  <div v-if="element.systemName == '数字'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-input v-model.number="test" :placeholder="element.placeholder" size="mini"></el-input>
                    </div>
                  </div>

                  <!-- 单选框 -->
                  <div v-if="element.systemName == '单选框'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-radio-group
                        :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }">
                        <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{
                            item
                        }}</el-radio>
                      </el-radio-group>
                    </div>
                  </div>

                  <!-- 复选框 -->
                  <div v-if="element.systemName == '复选框'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-checkbox-group v-model="setForm.checkedOptions"
                        :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }"
                        :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length">
                        <el-checkbox v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px">
                          {{ item }} </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <!-- 下拉列表 -->
                  <div v-if="element.systemName == '下拉列表'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-select style="margin-left: 10px; width: 70%" :placeholder="element.placeholder">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <!-- 下拉复选框 -->
                  <div v-if="element.systemName == '下拉复选框'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>

                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-select style="margin-left: 10px; width: 70%" :placeholder="element.placeholder"
                        :multiple="true" v-model="setForm.selectMultipleCheckedOptions" @change="selectMultipleChange">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item || '待输入'"
                          :disabled="element.maxCheckedCount != '' && setForm.selectMultipleCheckedOptions.length >= element.maxCheckedCount && !setForm.selectMultipleCheckedOptions.includes(item)"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <!-- 附件 -->
                  <div v-if="element.systemName == '附件'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <el-upload class="avatar-uploader">
                      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>{{ element.placeholder }}</p>
                    </el-upload>
                  </div>

                  <!-- 日期 -->
                  <div v-if="element.systemName == '日期'" class="form-item-input">
                    <span class="setInfoItemlabel"> {{ element.title }} : </span>
                    <div style="width: 50%; display: inline-block; vertical-align: top">
                      <el-date-picker v-model="setForm.date" align="right" type="date" size="mini"
                        :placeholder="element.placeholder" :picker-options="pickerOptions"></el-date-picker>
                    </div>
                  </div>

                  <!-- 分割线 -->
                  <div v-if="element.systemName == '分割线'" class="form-item-input">
                    <el-divider content-position="center">{{ element.placeholder }}</el-divider>
                  </div>

                  <!-- 分页 -->
                  <div v-if="element.systemName == '分页'" class="form-item-input">
                    <p style="text-align: center">[ 第 {{ element.pagingIndex }} 页/共 {{ pagingCount }} 页 ]</p>
                    <!-- <el-divider content-position="center">{{ element.placeholder }}</el-divider> -->
                  </div>

                  <!-- 说明信息 -->
                  <div v-if="element.systemName == '说明信息'" class="form-item-input">
                    <pre>{{ element.placeholder }}</pre>
                  </div>

                  <div style="display: flex; flex-direction: column; justify-content: space-around">
                    <div style="display: flex">
                      <el-checkbox v-if="!element.isSpecialInfo" v-model="element.isRequire"
                        :disabled="element.isRequireDisabled">必填</el-checkbox>
                      <div class="remove-button el-icon-remove-outline" @click.stop="delSetInfoList(element, index)">
                      </div>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="optionBtns" style="">
            <el-button type="primary" @click="save">
              <span class="el-icon-download"></span>
              保存,进入下一步
            </el-button>
            <el-button>取消</el-button>
          </div>
        </el-card>

        <el-card class="formEdit" :style="{ height: formSetHeight + 'px' }">
          <div slot="header" class="formInfoTitle">
            <span>编辑</span>
          </div>

          <div v-if="setInfoList.length > 0">
            <p class="systemName">系统姓名: {{ setInfoList[checkedIndex].systemName }}</p>

            <div class="eidtContent">
              <!-- 姓名 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'name'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini"
                    v-model="setInfoList[checkedIndex].surnameTitle"></el-input>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini"
                    v-model="setInfoList[checkedIndex].nameTitle"></el-input>
                  <el-input v-if="!setInfoList[checkedIndex].nameSplit" style="" size="mini"
                    v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini"
                    v-model="setInfoList[checkedIndex].surnamePlaceholder"></el-input>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini"
                    v-model="setInfoList[checkedIndex].namePlaceholder"></el-input>

                  <el-input v-if="!setInfoList[checkedIndex].nameSplit" size="mini"
                    v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
                <!-- 姓名拆分 -->
                <div class="eidtContentItem" v-show="setInfoList[checkedIndex].mapCode == 'name'">
                  <p class="eidtContentItemTitle">姓名拆分</p>
                  <el-switch v-model="setInfoList[checkedIndex].nameSplit"> </el-switch>
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 性别 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'sex'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">选项</p>
                  <el-input style="" size="mini" v-model="setInfoList[checkedIndex].options[0]"></el-input>
                  <el-input style="margin-top: 10px" size="mini"
                    v-model="setInfoList[checkedIndex].options[1]"></el-input>
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 证件 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'certificate'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
                <!-- 可选择证件类型 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">可选择证件类型</p>
                  <el-checkbox-group class="certificateOptions" v-model="setInfoList[checkedIndex].options" :min="1"
                    @change="certificateTypeChange">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].certificateAllTypes" :label="item"
                      :key="item"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 校验 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].options.includes('居民身份证')">
                  <p class="eidtContentItemTitle">校验</p>
                  <el-radio-group class="certificateVerify" style="width: 100%"
                    v-model="setInfoList[checkedIndex].check[0].code" @change="certificateVerifyChange">
                    <el-radio label="001">
                      号码逻辑校验
                      <p class="VerifyExplain">仅对填写的身份证号的规则进行逻辑校验，确认为正常的身份证号</p>
                    </el-radio>

                    <el-radio label="002">
                      身份证实名校验
                      <p class="VerifyExplain">对填写的姓名+身份证号进行实名校验，确认姓名与身份证号一致</p>
                    </el-radio>
                    <el-radio label="003">
                      人像实名校验
                      <p class="VerifyExplain">对上传照片与身份证号对应照片比对认证</p>
                    </el-radio>
                  </el-radio-group>
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>
              </div>

              <!-- 照片 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'photo'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 照片裁剪 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">照片裁剪</p>
                  <el-radio-group class="certificateVerify" style="width: 100%"
                    v-model="setInfoList[checkedIndex].photeTailor">
                    <el-radio label="自动压缩裁剪">
                      自动压缩裁剪
                      <p class="VerifyExplain">用户上传照片后系统自动压缩处理（图片可能变形失真）；</p>
                    </el-radio>

                    <el-radio label="手动裁剪">
                      手动裁剪
                      <p class="VerifyExplain">用户上传照片，需进行照片裁剪选取固定尺寸图像</p>
                    </el-radio>
                  </el-radio-group>
                </div>
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">限制照片尺寸 (px)</p>
                  <div style="width: 100%">宽: <el-input style="width: 70px; margin-right: 10px" size="mini"
                      v-model="setInfoList[checkedIndex].photoLimitWidth"
                      @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input> 高: <el-input
                      style="width: 70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight"
                      @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input></div>
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 地址 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'addres'">
                <!-- 国家 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国家</p>
                  <el-switch v-model="setInfoList[checkedIndex].nationIsShow"> </el-switch>
                </div>
                <!-- 国家标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].nationIsShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].nationTitle"></el-input>
                </div>
                <!-- 国家提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].nationIsShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].nationPlaceholder"></el-input>
                </div>

                <!-- 省份 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">省份</p>
                  <el-switch v-model="setInfoList[checkedIndex].provinceIsShow"> </el-switch>
                </div>
                <!-- 省份标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].provinceIsShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].provinceTitle"></el-input>
                </div>
                <!-- 省份提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].provinceIsShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].provincePlaceholder"></el-input>
                </div>

                <!-- 城市 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">城市</p>
                  <el-switch v-model="setInfoList[checkedIndex].cityIsShow" @change="cityIsShowChange"> </el-switch>
                </div>
                <!-- 城市标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].cityIsShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].cityTitle"></el-input>
                </div>
                <!-- 城市提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].cityIsShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].cityPlaceholder"></el-input>
                </div>

                <!-- 区县 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">区县</p>
                  <el-switch v-model="setInfoList[checkedIndex].countyIsShow" @change="countyIsShowChange"> </el-switch>
                </div>
                <!-- 区县标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].countyIsShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].countyTitle"></el-input>
                </div>
                <!-- 区县提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].countyIsShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].countyPlaceholder"></el-input>
                </div>

                <!-- 详细地址 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">详细地址</p>
                  <el-switch v-model="setInfoList[checkedIndex].detailedAdressISShow"
                    @change="detailedAdressIsShowChange"> </el-switch>
                </div>
                <!-- 详细地址标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].detailedAdressISShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].detailedAdressTitle"></el-input>
                </div>
                <!-- 详细地址提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].detailedAdressISShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].detailedAdressPlaceholder"></el-input>
                </div>

                <!-- 邮编 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">邮编</p>
                  <el-switch v-model="setInfoList[checkedIndex].postcodeIsShow" @change="postcodeIsShowChange">
                  </el-switch>
                </div>
                <!-- 邮编地址标题 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].postcodeIsShow">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].postcodeTitle"></el-input>
                </div>
                <!-- 邮编地址提示文本 -->
                <div class="eidtContentItem" v-if="setInfoList[checkedIndex].postcodeIsShow">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].postcodePlaceholder"></el-input>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 手机号 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'mobile'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top: 5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" filterable
                    v-model="setInfoList[checkedIndex].defaultCountryCode" @change="defaultCountryCodeChange"
                    placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                      :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 格式校验 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">格式校验</p>
                  <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify"
                    @change="mobilePhoneVerifyChange">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item"
                      :key="item" :disabled="item == '国际'"></el-checkbox>
                  </el-checkbox-group>
                </div>

                <!-- 短信验证 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">短信验证</p>
                  <el-switch v-model="setInfoList[checkedIndex].isNoteVerify"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>

                <!-- 仅限于后台管理 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">仅限于后台管理</p>
                  <el-switch v-model="setInfoList[checkedIndex].onlyUsedByManageSys"> </el-switch>
                </div>
              </div>

              <!-- 备用手机号 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'spareMobile'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow"
                    v-model="setInfoList[checkedIndex].defaultCountryCode" @change="secondphoneDefaultCountryCodeChange"
                    placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                      :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 格式校验 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">格式校验</p>
                  <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify"
                    @change="mobilePhoneVerifyChange">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item"
                      :key="item" :disabled="item == '国际'"></el-checkbox>
                  </el-checkbox-group>
                </div>

                <!-- 短信验证 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">短信验证</p>
                  <el-switch v-model="setInfoList[checkedIndex].isNoteVerify"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 固定电话 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'phone'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].areaCodePlaceholder"></el-input>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                  <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow"
                    v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow"
                    v-model="setInfoList[checkedIndex].defaultCountryCode" @change="telephoneDefaultCountryCodeChange"
                    placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                      :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 分机号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">分机号</p>
                  <el-switch v-model="setInfoList[checkedIndex].extensionNumbeIsShow"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 传真 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'fax'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].areaCodePlaceholder"></el-input>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                  <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow"
                    v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow"
                    v-model="setInfoList[checkedIndex].defaultCountryCode" @change="faxDefaultCountryCodeChange"
                    placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                      :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 分机号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">分机号</p>
                  <el-switch v-model="setInfoList[checkedIndex].extensionNumbeIsShow"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 邮箱 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'email'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 邮箱验证 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">邮箱验证</p>
                  <el-switch v-model="setInfoList[checkedIndex].isEmailVerify"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>

                <!-- 仅限于后台管理 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">仅限于后台管理</p>
                  <el-switch v-model="setInfoList[checkedIndex].onlyUsedByManageSys"> </el-switch>
                </div>
              </div>

              <!-- 备用邮箱 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'spareEmail'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 邮箱验证 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">邮箱验证</p>
                  <el-switch v-model="setInfoList[checkedIndex].isEmailVerify"> </el-switch>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 微信号 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'wechat'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- QQ号 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'qq'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 唯一 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">唯一</p>
                  <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 公司 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'company'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 部门 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'department'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 职位 -->
              <div v-if="setInfoList[checkedIndex].mapCode == 'position'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 短文本 / 长文本-->
              <div
                v-if="setInfoList[checkedIndex].systemName == '短文本' || setInfoList[checkedIndex].systemName == '长文本'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
                <!-- 限制字数 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">限制字数</p>
                  <el-input-number v-if="setInfoList[checkedIndex].systemName == '短文本'"
                    style="width: 120px; line-height: 32px" v-model="setInfoList[checkedIndex].wordCountLimit"
                    controls-position="right" :min="1" :max="50"
                    @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                  <el-input-number v-if="setInfoList[checkedIndex].systemName == '长文本'"
                    style="width: 120px; line-height: 32px" v-model="setInfoList[checkedIndex].wordCountLimit"
                    controls-position="right" :min="1" :max="200"
                    @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                  <!-- <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input> -->
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 数字 -->
              <div v-if="setInfoList[checkedIndex].systemName == '数字'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
                <!-- 限制数字位数 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 32px">限制数字位数</p>
                  <p>
                    <el-input-number style="width: 80px; line-height: 32px"
                      v-model="setInfoList[checkedIndex].numberDigitLimit" controls-position="right" :min="1" :max="9"
                      @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                    位
                  </p>
                </div>
                <!-- 限制小数点后位数 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 32px">限制小数点后位数</p>
                  <p>
                    小数点后
                    <el-input-number style="width: 80px; line-height: 32px"
                      v-model="setInfoList[checkedIndex].decimalPlacesLimit" controls-position="right" :min="1" :max="6"
                      @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                    位
                  </p>
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 单选框 -->
              <div v-if="setInfoList[checkedIndex].systemName == '单选框'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true"
                      group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]"
                          :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1"
                          style="font-size: 20px; line-height: 28px; cursor: pointer"
                          class="remove-button el-icon-remove-outline"
                          @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')"
                    @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
                </div>

                <!-- 排列方向 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">排列方向</p>
                  <div style="width: 100%">
                    <el-radio v-model="setInfoList[checkedIndex].orientation" label="横向">横向</el-radio>
                    <el-radio v-model="setInfoList[checkedIndex].orientation" label="纵向">纵向</el-radio>
                  </div>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 复选框 -->
              <div v-if="setInfoList[checkedIndex].systemName == '复选框'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true"
                      group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]"
                          :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1"
                          style="font-size: 20px; line-height: 28px; cursor: pointer"
                          class="remove-button el-icon-remove-outline"
                          @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')"
                    @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
                </div>

                <!-- 可选范围 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">可选范围</p>
                  <div style="width: 100%">
                    <p style="margin: 5px 0">
                      <span>至少选择</span>
                      <el-select style="margin-left: 10px; width: 70%"
                        v-model="setInfoList[checkedIndex].minCheckedCount" placeholder="请选择"
                        @change="minCheckedCountChange">
                        <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index"
                          :label="index + 1 + '项'" :value="index + 1"
                          :disabled="index + 1 > setInfoList[checkedIndex].maxCheckedCount && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                    <p style="margin: 5px 0">
                      <span>至多选择</span>
                      <el-select style="margin-left: 10px; width: 70%"
                        v-model="setInfoList[checkedIndex].maxCheckedCount" placeholder="请选择"
                        @change="maxCheckedCountChange">
                        <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index"
                          :label="index + 1 + '项'" :value="index + 1"
                          :disabled="index + 1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                  </div>
                </div>

                <!-- 排列方向 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">排列方向</p>
                  <div style="width: 100%">
                    <el-radio v-model="setInfoList[checkedIndex].orientation" label="横向">横向</el-radio>
                    <el-radio v-model="setInfoList[checkedIndex].orientation" label="纵向">纵向</el-radio>
                  </div>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 下拉列表 -->
              <div v-if="setInfoList[checkedIndex].systemName == '下拉列表'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>

                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true"
                      group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]"
                          :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1"
                          style="font-size: 20px; line-height: 28px; cursor: pointer"
                          class="remove-button el-icon-remove-outline"
                          @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <!-- <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button> -->
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 下拉复选框 -->
              <div v-if="setInfoList[checkedIndex].systemName == '下拉复选框'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true"
                      group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]"
                          :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1"
                          style="font-size: 20px; line-height: 28px; cursor: pointer"
                          class="remove-button el-icon-remove-outline"
                          @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')"
                    @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
                </div>

                <!-- 可选范围 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">可选范围</p>
                  <div style="width: 100%">
                    <p style="margin: 5px 0">
                      <span>至少选择</span>
                      <el-select style="margin-left: 10px; width: 70%"
                        v-model="setInfoList[checkedIndex].minCheckedCount" placeholder="请选择"
                        @change="minCheckedCountChange">
                        <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index"
                          :label="index + 1 + '项'" :value="index + 1"
                          :disabled="index + 1 > setInfoList[checkedIndex].maxCheckedCount && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                    <p style="margin: 5px 0">
                      <span>至多选择</span>
                      <el-select style="margin-left: 10px; width: 70%"
                        v-model="setInfoList[checkedIndex].maxCheckedCount" placeholder="请选择"
                        @change="maxCheckedCountChange">
                        <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index"
                          :label="index + 1 + '项'" :value="index + 1"
                          :disabled="index + 1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                  </div>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 附件 -->
              <div v-if="setInfoList[checkedIndex].systemName == '附件'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>

                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 限制文件类型 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">限制文件类型</p>
                  <el-switch v-model="setInfoList[checkedIndex].fileTypeLimit"> </el-switch>
                  <div v-if="setInfoList[checkedIndex].fileTypeLimit" style="width: 100%">
                    <p>图片文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].imageIsIndeterminate"
                        v-model="setInfoList[checkedIndex].imageCheckAll" @change="imageCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].imageCheckedTypes" @change="imageCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].imageTypes" :key="item" :label="item"
                        style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>文档文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].documentIsIndeterminate"
                        v-model="setInfoList[checkedIndex].documentCheckAll"
                        @change="documentCheckAllChange">全选</el-checkbox></p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].documentCheckedTypes"
                      @change="documentCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].documentTypes" :key="item" :label="item"
                        style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>压缩文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].compressedFileIsIndeterminate"
                        v-model="setInfoList[checkedIndex].compressedFileCheckAll"
                        @change="compressedFileCheckAllChange">全选</el-checkbox></p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].compressedFileCheckedTypes"
                      @change="compressedFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].compressedFileTypes" :key="item"
                        :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>视频文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].videoFileIsIndeterminate"
                        v-model="setInfoList[checkedIndex].videoFileCheckAll"
                        @change="videoFileCheckAllChange">全选</el-checkbox></p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].videoFileCheckedTypes"
                      @change="videoFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].videoFileTypes" :key="item" :label="item"
                        style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>音频文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].audioFileIsIndeterminate"
                        v-model="setInfoList[checkedIndex].audioFileCheckAll"
                        @change="audioFileCheckAllChange">全选</el-checkbox></p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].audioFileCheckedTypes"
                      @change="audioFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].audioFileTypes" :key="item" :label="item"
                        style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>

                <!-- 限制文件大小 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 32px">限制文件大小</p>
                  <el-input style="width: 130px" class="input-with-select"
                    v-model.number="setInfoList[checkedIndex].fileSizeLimit">
                    <span slot="append"> M </span>
                  </el-input>
                </div>

                <!-- 限制图片尺寸 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">限制图片尺寸</p>
                  <el-switch v-model="setInfoList[checkedIndex].pictureSizeLimit"> </el-switch>
                  <div v-if="setInfoList[checkedIndex].pictureSizeLimit" style="width: 100%">宽: <el-input
                      style="width: 70px; margin-right: 10px" size="mini"
                      v-model="setInfoList[checkedIndex].photoLimitWidth"
                      @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input> 高: <el-input
                      style="width: 70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight"
                      @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input></div>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 日期 -->
              <div v-if="setInfoList[checkedIndex].systemName == '日期'">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>

                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 分割线 -->
              <div v-if="setInfoList[checkedIndex].systemName == '分割线'">
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="setInfoList[checkedIndex].systemName == '分页'">
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p style="width: 100%; text-align: center">[ 第 {{ setInfoList[checkedIndex].pagingIndex }} 页/共 {{
                      pagingCount
                  }} 页 ]</p>
                </div>
              </div>

              <!-- 说明信息 -->
              <div v-if="setInfoList[checkedIndex].systemName == '说明信息'">
                <!-- 说明信息 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">说明文字</p>
                  <el-input type="textarea" :rows="10" size="mini"
                    v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 结果页设置 -->
      <div v-if="stepIndex == 3" class="resultSet" :style="{ height: formSetHeight + 'px' }">
        <el-form ref="resultSetForm" :validate-on-rule-change="false" @submit.native.prevent label-position="right"
          :rules="resultSetForm" label-width="200px" :model="resultSetForm" class="resultSetForm">
          <el-form-item label="报名审核" label-width="100px" prop="isNeedApprove">
            <el-radio v-model="resultSetForm.isNeedApprove" :label="0">不需要审核</el-radio>
            <el-radio v-model="resultSetForm.isNeedApprove" :label="1">需要审核</el-radio>
          </el-form-item>
          <div class="transition-box" v-show="drawer">
            <div class="content">
              <div class="pageStatus" @click="drawerStatusHandle(false)" style="cursor: pointer">手机</div>
              <div class="centerContent">
                <div class="themeTitle">
                  <h1>{{ this.appearanceSetForm.language.indexOf('中文') !== -1 ? appearanceSetForm.titleChinese : '' }}/
                    {{ this.appearanceSetForm.language.indexOf('英文') !== -1 ? appearanceSetForm.titleEnglish : '' }}
                  </h1>
                  <!-- <h3>地址</h3> -->
                  <h3>{{ applySetForm.applyDate }}</h3>
                </div>
                <div class="successInfo">
                  <h3 style="text-align: center">{{ resultSetForm.successTitle }}</h3>
                  <pre> {{ resultSetForm.successDescribe }} </pre>
                  <div class="previewBtnsRow">
                    <el-button v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex"
                      v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="resultSetItem">
            <div class="setItemTitle">
              <h3>1、报名成功</h3>
              <span>
                <span style="margin-right: 20px">{{ successIsShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="successIsShow = !successIsShow"
                  style="vertical-align: middle; padding: 0">
                  <i v-if="successIsShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="successIsShow">
              <div style="display: flex">
                <el-card shadow="always" class="previewCard">
                  <div slot="header" style="text-align: center">
                    <h3>预览</h3>
                  </div>
                  <div class="pageStatus" @click="drawerStatusHandle(true)" style="cursor: pointer">电脑</div>
                  <div class="successPreview">
                    <!-- 背景图 -->
                    <img v-if="resultSetForm.successBackground" :src="resultSetForm.successBackground" alt=""
                      style="position: absolute; width: 100%; height: 100%" />
                    <!-- banner 图 -->
                    <el-image v-if="resultSetForm.successBanner" style="width: 100%" :src="resultSetForm.successBanner"
                      :fit="fit"></el-image>
                    <h3 style="text-align: center">{{ resultSetForm.successTitle }}</h3>
                    <pre> {{ resultSetForm.successDescribe }} </pre>
                    <div class="previewBtns">
                      <el-button v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex"
                        v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                    </div>
                  </div>
                </el-card>

                <div class="successFormItem">
                  <el-form-item label="提示主题:" prop="successTitle">
                    <el-input v-model="resultSetForm.successTitle" size="mini" placeholder="请输入提示主题"></el-input>
                  </el-form-item>
                  <el-form-item label="描述:" prop="successDescribe">
                    <el-input v-model="resultSetForm.successDescribe" type="textarea" :rows="4" size="mini"
                      placeholder="请输入描述文案"></el-input>
                  </el-form-item>
                  <el-form-item label="Banner:" prop="successBanner">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload"
                      :http-request="(file) => handleUploadForm(file, 'successBanner')">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="背景图:" prop="successBackground">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload"
                      :http-request="(file) => handleUploadForm(file, 'successBackground')">
                      <i class="el-icon-upload" style="margin: 16px 0"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="提交后是否跳过当前页:" prop="successIsJumpCurrentPage">
                    <div style="display: flex">
                      <div>
                        <el-radio v-model="resultSetForm.successIsJumpCurrentPage" :label="false">不跳过</el-radio>
                        <el-radio v-model="resultSetForm.successIsJumpCurrentPage" :label="true">跳过</el-radio>
                      </div>
                      <div style="display: inline-block">
                        <el-form-item label="跳转页面到:" label-width="100px" prop="successJumpPage"
                          style="margin-bottom: 0px">
                          <el-select v-model="resultSetForm.successJumpPage" placeholder="请选择跳转页面">
                            <el-option v-for="item in buttonCodeOptions" :key="item.dictItemVal"
                              :label="item.dictItemName" :value="item.dictItemVal"></el-option>
                          </el-select>
                          <el-form-item label="" prop="successOutPageUrl" style="margin-bottom: 0px">
                            <el-input v-model="resultSetForm.successOutPageUrl" size="mini"
                              placeholder="请输入外部链接"></el-input>
                          </el-form-item>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form-item>

                  <el-form-item label="按钮设置:">
                    <div v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex"
                      style="display: flex">
                      <el-form-item label="" :prop="'successButtonList.' + btnIndex + '.name'">
                        <el-input v-model="btnItem.name" size="mini" placeholder="请输入按钮名称"></el-input>
                      </el-form-item>
                      <el-form-item label="功能" label-width="50px" :prop="'successButtonList.' + btnIndex + '.value'">
                        <el-select v-model="btnItem.value" placeholder="请选择跳转页面">
                          <el-option v-for="item in skipCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                            :value="item.dictItemVal"></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="remove-button el-icon-circle-plus-outline"
                        @click.stop="addBtn(resultSetForm.successButtonList, btnIndex)"></div>
                      <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0"
                        @click.stop="delBtn(resultSetForm.successButtonList, btnIndex)"></div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="resultSetItem" v-if="resultSetForm.isNeedApprove">
            <div class="setItemTitle">
              <h3>2、待审核</h3>
              <span>
                <span style="margin-right: 20px">{{ waitReviewIsShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="waitReviewIsShow = !waitReviewIsShow"
                  style="vertical-align: middle; padding: 0">
                  <i v-if="waitReviewIsShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="waitReviewIsShow">
              <div style="display: flex">
                <el-card shadow="always" class="previewCard">
                  <div slot="header" style="text-align: center">
                    <h3>预览</h3>
                  </div>
                  <div class="waitReviewPreview">
                    <!-- 背景图 -->
                    <img v-if="resultSetForm.waitReviewBackground" :src="resultSetForm.waitReviewBackground" alt=""
                      style="position: absolute; width: 100%; height: 100%" />
                    <!-- banner 图 -->
                    <el-image v-if="resultSetForm.waitReviewBanner" style="width: 100%"
                      :src="resultSetForm.waitReviewBanner" :fit="fit"></el-image>
                    <h3 style="text-align: center">{{ resultSetForm.waitReviewTitle }}</h3>
                    <pre> {{ resultSetForm.waitReviewDescribe }} </pre>
                    <div class="previewBtns">
                      <el-button v-for="(btnItem, btnIndex) in resultSetForm.waitReviewButtonList" :key="btnIndex"
                        v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                    </div>
                  </div>
                </el-card>

                <div class="waitReviewFormItem">
                  <el-form-item label="提示主题:" prop="waitReviewTitle">
                    <el-input v-model="resultSetForm.waitReviewTitle" size="mini" placeholder="请输入提示主题"></el-input>
                  </el-form-item>
                  <el-form-item label="描述:" prop="waitReviewDescribe">
                    <el-input v-model="resultSetForm.waitReviewDescribe" type="textarea" :rows="4" size="mini"
                      placeholder="请输入描述文案"></el-input>
                  </el-form-item>
                  <el-form-item label="Banner:" prop="waitReviewBanner">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload" :http-request="(file) => handleUploadForm(file)">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="背景图:" prop="waitReviewBackground">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload" :http-request="(file) => handleUploadForm(file)">
                      <i class="el-icon-upload" style="margin: 16px 0"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="提交后是否跳过当前页:" prop="waitReviewIsJumpCurrentPage">
                    <div style="display: flex">
                      <div>
                        <el-radio v-model="resultSetForm.waitReviewIsJumpCurrentPage" :label="false">不跳过</el-radio>
                        <el-radio v-model="resultSetForm.waitReviewIsJumpCurrentPage" :label="true">跳过</el-radio>
                      </div>
                      <div style="display: inline-block">
                        <el-form-item label="跳转页面到:" label-width="100px" prop="waitReviewJumpPage"
                          style="margin-bottom: 0px">
                          <el-select v-model="resultSetForm.waitReviewJumpPage" placeholder="请选择跳转页面">
                            <el-option v-for="item in buttonCodeOptions" :key="item.dictItemVal"
                              :label="item.dictItemName" :value="item.dictItemVal"></el-option>
                          </el-select>
                          <el-form-item label="" prop="waitReviewOutPageUrl" style="margin-bottom: 0px">
                            <el-input v-model="resultSetForm.waitReviewOutPageUrl" size="mini"
                              placeholder="请输入外部链接"></el-input>
                          </el-form-item>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form-item>

                  <el-form-item label="按钮设置:">
                    <div v-for="(btnItem, btnIndex) in resultSetForm.waitReviewButtonList" :key="btnIndex"
                      style="display: flex">
                      <el-form-item label="" :prop="'waitReviewButtonList.' + btnIndex + '.name'">
                        <el-input v-model="btnItem.name" size="mini" placeholder="请输入按钮名称"></el-input>
                      </el-form-item>
                      <el-form-item label="功能" label-width="50px" :prop="'waitReviewButtonList.' + btnIndex + '.value'">
                        <el-select v-model="btnItem.value" placeholder="请选择跳转页面">
                          <el-option v-for="item in skipCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                            :value="item.dictItemVal"></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="remove-button el-icon-circle-plus-outline"
                        @click.stop="addBtn(resultSetForm.waitReviewButtonList, btnIndex)"></div>
                      <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0"
                        @click.stop="delBtn(resultSetForm.waitReviewButtonList, btnIndex)"></div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="resultSetItem" v-if="resultSetForm.isNeedApprove">
            <div class="setItemTitle">
              <h3>3、不通过</h3>
              <span>
                <span style="margin-right: 20px">{{ noPassIsShow ? '收起' : '展开' }}</span>
                <el-button type="text" @click="noPassIsShow = !noPassIsShow" style="vertical-align: middle; padding: 0">
                  <i v-if="noPassIsShow" class="el-icon-caret-top" style="font-size: 30px"></i>
                  <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
                </el-button>
              </span>
            </div>
            <el-divider></el-divider>
            <div v-show="noPassIsShow">
              <div style="display: flex">
                <el-card shadow="always" class="previewCard">
                  <div slot="header" style="text-align: center">
                    <h3>预览</h3>
                  </div>
                  <div class="noPassPreview">
                    <!-- 背景图 -->
                    <img v-if="resultSetForm.noPassBackground" :src="resultSetForm.noPassBackground" alt=""
                      style="position: absolute; width: 100%; height: 100%" />
                    <!-- banner 图 -->
                    <el-image v-if="resultSetForm.noPassBanner" style="width: 100%" :src="resultSetForm.noPassBanner"
                      :fit="fit"></el-image>
                    <h3 style="text-align: center">{{ resultSetForm.noPassTitle }}</h3>
                    <pre> {{ resultSetForm.noPassDescribe }} </pre>
                    <div class="previewBtns">
                      <el-button v-for="(btnItem, btnIndex) in resultSetForm.noPassButtonList" :key="btnIndex"
                        v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                    </div>
                  </div>
                </el-card>

                <div class="noPassFormItem">
                  <el-form-item label="提示主题:" prop="noPassTitle">
                    <el-input v-model="resultSetForm.noPassTitle" size="mini" placeholder="请输入提示主题"></el-input>
                  </el-form-item>
                  <el-form-item label="描述:" prop="noPassDescribe">
                    <el-input v-model="resultSetForm.noPassDescribe" type="textarea" :rows="4" size="mini"
                      placeholder="请输入描述文案"></el-input>
                  </el-form-item>
                  <el-form-item label="Banner:" prop="noPassBanner">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload" :http-request="(file) => handleUploadForm(file)">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="背景图:" prop="noPassBackground">
                    <el-upload class="upload-demo" drag action :limit="1" :on-exceed="fileLimitCount"
                      :before-upload="beforeAvatarUpload" :http-request="(file) => handleUploadForm(file)">
                      <i class="el-icon-upload" style="margin: 16px 0"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="提交后是否跳过当前页:" prop="noPassIsJumpCurrentPage">
                    <div style="display: flex">
                      <div>
                        <el-radio v-model="resultSetForm.noPassIsJumpCurrentPage" :label="false">不跳过</el-radio>
                        <el-radio v-model="resultSetForm.noPassIsJumpCurrentPage" :label="true">跳过</el-radio>
                      </div>
                      <div style="display: inline-block">
                        <el-form-item label="跳转页面到:" label-width="100px" prop="noPassJumpPage"
                          style="margin-bottom: 0px">
                          <el-select v-model="resultSetForm.noPassJumpPage" placeholder="请选择跳转页面">
                            <el-option v-for="item in buttonCodeOptions" :key="item.dictItemVal"
                              :label="item.dictItemName" :value="item.dictItemVal"></el-option>
                          </el-select>
                          <el-form-item label="" prop="noPassOutPageUrl" style="margin-bottom: 0px">
                            <el-input v-model="resultSetForm.noPassOutPageUrl" size="mini"
                              placeholder="请输入外部链接"></el-input>
                          </el-form-item>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form-item>

                  <el-form-item label="按钮设置:">
                    <div v-for="(btnItem, btnIndex) in resultSetForm.noPassButtonList" :key="btnIndex"
                      style="display: flex">
                      <el-form-item label="" :prop="'noPassButtonList.' + btnIndex + '.name'">
                        <el-input v-model="btnItem.name" size="mini" placeholder="请输入按钮名称"></el-input>
                      </el-form-item>
                      <el-form-item label="功能" label-width="50px" :prop="'noPassButtonList.' + btnIndex + '.value'">
                        <el-select v-model="btnItem.value" placeholder="请选择跳转页面">
                          <el-option v-for="item in skipCodeOptions" :key="item.dictItemVal" :label="item.dictItemName"
                            :value="item.dictItemVal"></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="remove-button el-icon-circle-plus-outline"
                        @click.stop="addBtn(resultSetForm.noPassButtonList, btnIndex)"></div>
                      <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0"
                        @click.stop="delBtn(resultSetForm.noPassButtonList, btnIndex)"></div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </el-form>
        <div class="resultSetBtns">
          <el-button @click="preStep">上一步(暂存)</el-button>
          <el-button type="primary" @click="resultSetSave('resultSetForm')">生成表单</el-button>
        </div>
      </div>
    </div>

    <!-- 表单设置-批量新增选项 弹窗 -->
    <el-dialog title="批量新增" width="500px" :visible.sync="batchEditDiologVisible" :modal-append-to-body="true"
      :append-to-body="true">
      <p>输入选项值（每行一个）</p>
      <el-input type="textarea" :rows="10" v-model="batchEditOptions"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchEditDiologVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchEditOptionsComfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import screenfull from 'screenfull'
import applySet from './applySet.vue'
import { mapGetters } from 'vuex'
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
export default {
  name: 'attendeeFormConfig',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      applySetForm: {
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
        assistApplyOpenField: [] // 协助报名开放字段
      },
      drawer: false,
      stepIndex: 1,
      header: {
        token: window.sessionStorage.getItem('token')
      },
      resultSetForm: {
        successTitle: [
          { required: true, message: '请输入提示主题', trigger: 'blur' }
        ],
        waitReviewTitle: [
          { required: true, message: '请输入提示主题', trigger: 'blur' }
        ],
        noPassTitle: [
          { required: true, message: '请输入提示主题', trigger: 'blur' }
        ],
      },
      form: {
        moreShowFlg: false,
        listQuery: {
          current: 1,
          size: 20,
          isPage: false,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'mapSort.asc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.signupContactCol.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/register/signupContactCol/page',
          doDelete: '/api/register/signupContactCol/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'initialize',
            type: 'route',
            i18n: '初始化表单',
            event: this.initialize
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'mapCode',
              label: 'website.signupContactCol.list.mapCode'
            },
            {
              prop: 'mapName',
              label: 'website.signupContactCol.list.mapName'
            },
            {
              prop: 'mapComp',
              label: 'website.signupContactCol.list.mapComp',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapComp')
              }
            },
            {
              prop: 'mapBase',
              label: 'website.signupContactCol.list.mapBase',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapBase')
              }
            },

            {
              prop: 'mapCompAttr',
              label: 'website.signupContactCol.list.mapCompAttr',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapCompAttr')
              }
            },
            {
              prop: 'enumLable',
              label: 'website.signupContactCol.list.enumLable'
            },
            {
              prop: 'mapType',
              label: 'website.signupContactCol.list.mapType',
              align: 'center',
              format: {
                dict: this.$t('datadict.yesNo')
              }
            },
            {
              prop: 'mapSort',
              label: 'website.signupContactCol.list.mapSort'
            }
          ]
        }
      },
      baseInfoList: [
        { label: '姓名', value: 'name', isSee: false },
        { label: '性别', value: 'sex', isSee: false },
        { label: '证件', value: 'certificate', isSee: false },
        { label: '照片', value: 'photo', isSee: false }
      ],
      contactWayList: [
        { label: '地址', value: 'addres', isSee: false },
        { label: '手机号', value: 'mobile', isSee: false },
        { label: '备用手机', value: 'spareMobile', isSee: false },
        { label: '固定电话', value: 'phone', isSee: false },
        { label: '传真', value: 'fax', isSee: false },
        { label: '邮箱', value: 'email', isSee: false },
        { label: '备用邮箱', value: 'spareEmail', isSee: false },
        { label: '微信号', value: 'wechat', isSee: false },
        { label: 'QQ号', value: 'qq', isSee: false }
      ],
      workInfoList: [
        { label: '公司', value: 'company' },
        { label: '部门', value: 'department' },
        { label: '职位', value: 'position' }
      ],
      customInfoList: [
        { label: '短文本', value: 'input' },
        { label: '长文本', value: 'textarea' },
        { label: '数字', value: 'number' },
        { label: '单选框', value: 'radio' },
        { label: '复选框', value: 'checkbox' },
        { label: '下拉列表', value: 'select' },
        { label: '下拉复选框', value: 'selects' },
        { label: '附件', value: 'file' },
        { label: '日期', value: 'date' }
      ],
      specialInfoList: [
        { label: '分割线', value: 'crossLine' },
        { label: '分页', value: 'paging' },
        { label: '说明信息', value: 'explainInfo' }
      ],
      test: '',
      checkAll: false,
      isIndeterminate: true,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      isCommonSetShow: true, // 通用设置是否显示
      isPublicitySetShow: true, // 会议宣传是否显示
      isRegisterSetShow: true, // 注册登录是否显示
      customInfoCount: 0, // 自定义信息数量
      textareaNum: 35, // 长文本字段序号为 36-40
      pagingCount: 0, // 分页数量
      eventName: '', // 会议名称
      drag: false,
      countryCodeOptions: [], // 国际区号下拉选项  dictItemName - dictItemVal
      buttonCodeOptions: [],//按钮字典
      skipCodeOptions: [],//跳转页面字典
      setInfoList: [], // 选中的配置信息列表
      batchEditOptions: '', // 批量编辑信息
      // 表格高度
      formSetHeight: 0,
      batchEditDiologVisible: false,
      appearanceSetForm: {
        titleChinese: '', // 标题
        titleEnglish: '', // 英文标题
        language: ['中文'], // 语言
        language: ['中文'], // 语言
        color: '#409EFF', // 主色调
        isPropaganda: 0, // 是否开启会议宣传
        BannerList: [], // banner 列表
        meetingFile: '',
        isMeetingDate: 0, // 是否显示会议时间
        isMeetinPlace: 0, // 是否显示会议地点
        isMeetinCountdown: 0, // 是否显示倒计时
        profile: '', // 会议简介

        registerBannerPCList: [], // 注册登录PC BannerList
        loginPcFile: '',
        registerBannerMobileList: [], // 注册登录移动端 BannerList
        loginAppFile: '',
        isLoginDate: 0, // 是否显示会议时间
        isLoginPlace: 0, // 是否显示会议地点
        isLoginCountdown: 0 // 是否显示倒计时
      },
      setForm: {
        checkedSex: '',
        chenkedCertificate: [],
        verifyType: '',
        nation: '',
        province: '',
        city: '',
        county: '',
        detailedAdress: '',
        defaultCountryCode: '',
        secondPhonedefaultCountryCode: '',
        mobilePhoneVerify: [],
        telephoneDefaultCountryCode: '',
        faxDefaultCountryCode: '',
        checkedOptions: [],
        selectMultipleCheckedOptions: [],
        date: ''
      },
      checkedIndex: 0, // 选中预览item下标
      queryResult: {
        appFile: '',//手机文件
        backgroundFile: '',//背景图文件
        describe: '',//描述
        eventCode: '',//会议code
        isSkip: '',//是否跳过当前页(1是0否)
        resultButton: [],//结果页按钮表
        skipPage: '',//跳转页面(数据字典SKIP_PAGE)
        skipWebsite: '',//跳转网址
        theme: '',//提示主题
        type: '',//1、报名成功，2、待审核，3、不通过
      },
      resultSetForm: {
        isNeedApprove: 0, // 是否需要审核
        successTitle: '', // 报名成功提示主题
        successDescribe: '', // 报名成功描述
        successBanner: '', // 报名成功Banner
        successBackground: '', // 报名成功背景图
        successIsJumpCurrentPage: false, // 是否跳过当前页面
        successJumpPage: '', // 选择跳转页面
        successOutPageUrl: '', // 站外页面URL
        successButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ],

        waitReviewTitle: '', // 待审核 提示主题
        waitReviewDescribe: '', // 待审核 描述
        waitReviewBanner: '', // 待审核 Banner
        waitReviewBackground: '', // 待审核 背景图
        waitReviewIsJumpCurrentPage: false, // 待审核 是否跳过当前页面
        waitReviewJumpPage: '', // 待审核 选择跳转页面
        waitReviewOutPageUrl: '', // 待审核 站外页面URL
        waitReviewButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ],

        noPassTitle: '', // 不通过提示主题
        noPassDescribe: '', // 不通过 描述
        noPassBanner: '', // 不通过Banner
        noPassBackground: '', // 不通过背景图
        noPassIsJumpCurrentPage: false, // 不通过 是否跳过当前页面
        noPassJumpPage: '', // 不通过 选择跳转页面
        noPassOutPageUrl: '', // 不通过 站外页面URL
        noPassButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ]
      },
      jumpPageOptions: [
        { label: '首页菜单', value: '001' },
        { label: '个人中心', value: '002' },
        { label: '参观码', value: '003' },
        { label: '报名页面', value: '004' },
        { label: '会议简介', value: '005' },
        { label: '站内页面', value: '006' },
        { label: '站外页面', value: '007' }
      ], // 跳转页面选项
      btnOptions: [
        { label: '返回首页', value: '001' },
        { label: '重新报名', value: '002' },
        { label: '查看报名信息', value: '003' },
        { label: '前往个人中心', value: '004' },
        { label: '退出登录', value: '005' },
        { label: '修改信息', value: '006' }
      ],
      successIsShow: true, // 报名成功是否显示
      waitReviewIsShow: true, // 报名成功是否显示
      noPassIsShow: true, // 报名成功是否显示
      isFormSetComplete: false, // 表单设置是否完成
      resultNoFrom: [{ appFile: '', backgroundFile: '', describe_info: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }],
      resultFrom: [
        { appFile: '', backgroundFile: '', describe_info: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describe_info: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describe_info: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }
      ]
    }
  },
  components: {
    draggable,
    applySet
  },
  mounted () {
    this.tableComputed()
    // this.getEventInfo()
    // 获取国际区号数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'COUNTRY_CODE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then((res) => {
      this.countryCodeOptions = res.data
      // dictItemName \ dictItemVal
    })
    // 获取按钮下拉数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'RESULT_SKIP_PAGE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then((res) => {
      this.buttonCodeOptions = res.data
      console.log(this.buttonCodeOptions, 'this.buttonCodeOptions')
      // dictItemName \ dictItemVal
    })
    // 获取跳转页面数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'RESULT_BTN', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then((res) => {
      this.skipCodeOptions = res.data
      console.log(this.skipCodeOptions, 'this.skipCodeOptions')
      // dictItemName \ dictItemVal
    })
  },
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight'])
  },
  watch: {
    customInfoCount (newVal, oldVal) {
      if (newVal > 0) {
        let coustomInfoIndex = 0
        let textareaNum = 35 // 长文本字段需要为 36-40
        this.setInfoList.forEach((item, index) => {
          if (item.isCoustomInfo) {
            if (item.isTexeArea) {
              textareaNum++
              item.mapCode = 'reservedStr' + textareaNum
            } else {
              coustomInfoIndex++
              item.mapCode = 'reservedStr' + coustomInfoIndex
            }
          }
        })
      }
    },
    pagingCount (newVal, oldVal) {
      if (newVal > 0) {
        let pagingIndex = 0
        this.setInfoList.forEach((item, index) => {
          if (item.isPaging) {
            pagingIndex++
            item.pagingIndex = pagingIndex
            item.mapCode = 'paging' + pagingIndex
          }
        })
      }
    },
    clientHeight () {
      this.tableComputed()
    },
    stepIndex (newVal, oldVal) {
      if (newVal == 1) {
        this.getAppearanceSet()
      }
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    applySetFormFn (applySetForm) {
      this.applySetForm = applySetForm
    },
    // 外观设置保存
    appearanceSetSave () {
      this.appearanceSetForm.eventCode = this.form.listQuery.data.eventCode
      this.appearanceSetForm.language = this.appearanceSetForm.language.join(',')
      this.appearanceSetForm.code = ''
      this.appearanceSetForm.id = ''
      request({
        url: '/api/register/signupExterior/save',
        method: 'POST',
        data: {
          data: this.appearanceSetForm,
          funcModule: '表单外观设置',
          funcOperation: '表单外观设置保存'
        }
      }).then((res) => {
        if (res.status) {
          // 进入下一步 表单设置
          this.stepIndex = 2
        }
      }).catch(res => {
        console.log(res)
      })
    },
    drawerStatusHandle (status) {
      this.drawer = status
    },
    getAppearanceSet () {
      request({
        url: '/api/register/signupExterior/get',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '表单外观设置',
          funcOperation: '表单外观设置查询'
        }
      }).then((res) => {
        if (res.status) {
          if (JSON.stringify(res.data) === "{}") {

          } else {
            this.appearanceSetForm = res.data
            Object.keys(this.appearanceSetForm).forEach(key => {
              if (key === 'tenantCode') delete (this.appearanceSetForm[key])
            })
            this.appearanceSetForm.code = ''
            this.appearanceSetForm.id = ''
            this.appearanceSetForm.language = this.appearanceSetForm.language.split(',')
          }
        }
      })
    },
    // 结果页设置 上一步(暂存)
    preStep () {
      this.stepIndex = 2
    },
    resultSetSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isFormSetComplete = true
          console.log(this.resultSetForm, 'resultSetFormresultSetForm')
          if (this.resultSetForm.isNeedApprove === 0) {
            this.resultNoFrom[0].appFile = this.resultSetForm.successBanner
            this.resultNoFrom[0].backgroundFile = this.resultSetForm.successBackground
            this.resultNoFrom[0].describe_info = this.resultSetForm.successDescribe
            this.resultNoFrom[0].isSkip = this.resultSetForm.successIsJumpCurrentPage ? 1 : 0
            this.resultNoFrom[0].skipPage = this.resultSetForm.successJumpPage
            this.resultNoFrom[0].skipWebsite = this.resultSetForm.successOutPageUrl
            this.resultNoFrom[0].theme = this.resultSetForm.successTitle
            this.resultNoFrom[0].resultButton = this.resultSetForm.successButtonList
            this.resultNoFrom[0].type = '1'
            console.log(this.resultNoFrom, 'resultNoFrom')
          }
          if (this.resultSetForm.isNeedApprove === 1) {
            this.resultFrom[0].appFile = this.resultSetForm.successBanner
            this.resultFrom[0].backgroundFile = this.resultSetForm.successBackground
            this.resultFrom[0].describe_info = this.resultSetForm.successDescribe
            this.resultFrom[0].isSkip = this.resultSetForm.successIsJumpCurrentPage ? 1 : 0
            this.resultFrom[0].skipPage = this.resultSetForm.successJumpPage
            this.resultFrom[0].skipWebsite = this.resultSetForm.successOutPageUrl
            this.resultFrom[0].theme = this.resultSetForm.successTitle
            this.resultFrom[0].resultButton = this.resultSetForm.successButtonList
            this.resultFrom[0].type = '1'

            this.resultFrom[1].appFile = this.resultSetForm.waitReviewBanner
            this.resultFrom[1].backgroundFile = this.resultSetForm.waitReviewBackground
            this.resultFrom[1].describe_info = this.resultSetForm.waitReviewDescribe
            this.resultFrom[1].isSkip = this.resultSetForm.waitReviewIsJumpCurrentPage ? 1 : 0
            this.resultFrom[1].skipPage = this.resultSetForm.waitReviewJumpPage
            this.resultFrom[1].skipWebsite = this.resultSetForm.waitReviewOutPageUrl
            this.resultFrom[1].theme = this.resultSetForm.waitReviewTitle
            this.resultFrom[1].resultButton = this.resultSetForm.waitReviewButtonList
            this.resultFrom[1].type = '2'

            this.resultFrom[2].appFile = this.resultSetForm.noPassBanner
            this.resultFrom[2].backgroundFile = this.resultSetForm.noPassBackground
            this.resultFrom[2].describe_info = this.resultSetForm.noPassDescribe
            this.resultFrom[2].isSkip = this.resultSetForm.noPassIsJumpCurrentPage ? 1 : 0
            this.resultFrom[2].skipPage = this.resultSetForm.noPassJumpPage
            this.resultFrom[2].skipWebsite = this.resultSetForm.noPassOutPageUrl
            this.resultFrom[2].theme = this.resultSetForm.noPassTitle
            this.resultFrom[2].resultButton = this.resultSetForm.noPassButtonList
            this.resultFrom[2].type = '3'
            console.log(this.resultFrom, 'resultFrom')
          }
          request({
            url: '/api/register/signupResult/save',
            method: 'POST',
            data: {
              data: this.resultSetForm.isNeedApprove === 0 ? this.resultNoFrom : this.resultFrom,
              funcModule: '表单外观设置',
              funcOperation: '创建结果页'
            }
          }).then((res) => {
            if (res.status) {
              this.$message({ message: '生成表单成功', type: 'success' })
            }
          })
        }
      })
    },

    setResult () {
      this.isFormSetComplete = false
      this.stepIndex = 3
      this.resultSetForm.isNeedApprove = 1
    },
    getEventInfo () {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      this.baseInfoList.forEach((baseInfoItem) => {
        baseInfoItem.isSee = false
      })
      this.contactWayList.forEach((contactWayItem) => {
        contactWayItem.isSee = false
      })
      this.workInfoList.forEach((workInfoItem) => {
        workInfoItem.isSee = false
      })

      request({
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then((response) => {
        if (response.data.json) {
          this.setInfoList = JSON.parse(response.data.json)
        } else {
          this.setInfoList = []
        }
        // 初始化数据,如果返回数据有 基本信息、联系方式、工作信息，隐藏左侧选项
        this.setInfoList.forEach((setInfoItem) => {
          // 基本信息
          this.baseInfoList.forEach((baseInfoItem) => {
            if (baseInfoItem.value == setInfoItem.mapCode) {
              baseInfoItem.isSee = true
            }
          })
          // 联系方式
          this.contactWayList.forEach((contactWayItem) => {
            if (contactWayItem.value == setInfoItem.mapCode) {
              contactWayItem.isSee = true
            }
          })
          // 工作信息
          this.workInfoList.forEach((workInfoItem) => {
            if (workInfoItem.value == setInfoItem.mapCode) {
              workInfoItem.isSee = true
            }
          })
          if (setInfoItem.isCoustomInfo) {
            this.customInfoCount++
          }
        })
      })
    },
    // 表单设置保存
    save () {
      this.setInfoList.forEach((item) => {
        if (item.systemName == '附件') {
          item.allFileTypes = [...item.imageCheckedTypes, ...item.documentCheckedTypes, ...item.compressedFileCheckedTypes, ...item.videoFileCheckedTypes, ...item.audioFileCheckedTypes]
        }
      })
      request({
        url: 'api/register/signupContactCol/save',
        method: 'POST',
        data: {
          data: {
            eventCode: this.form.listQuery.data.eventCode,
            json: this.setInfoList
          },
          funcModule: '获取模块类型',
          funcOperation: '获取模块类型'
        }
      }).then((res) => {
        if (res.status) {
          this.$message.success('保存成功')
          this.stepIndex = 3
        } else {
          this.$message.error('保存失败')
        }
      })
      console.log(this.setInfoList)
    },
    //移除表单信息
    delSetInfoList (itemList, itemIndex) {
      switch (itemList.parentListName) {
        case 'baseInfoList':
          var index = this.baseInfoList.findIndex((item) => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.baseInfoList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'contactWayList':
          var index = this.contactWayList.findIndex((item) => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.contactWayList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'workInfoList':
          var index = this.workInfoList.findIndex((item) => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.workInfoList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'customInfoList':
          var index = this.customInfoList.findIndex((item) => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          // this.customInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex, 1)
          this.customInfoCount--
          break
        case 'specialInfoList':
          var index = this.specialInfoList.findIndex((item) => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          // this.specialInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex, 1)
          if (itemList.isPaging) {
            this.pagingCount--
          }
          break
        default:
          break
      }
      console.log(this.setInfoList)
    },
    // 添加表单信息
    addSetInfoList (itemList, parentList, parentListName) {
      //当前点击的tag   当前点击tag的数组
      // placeholder 输入框提示词  content 输入的值  isSee 是否在表单中的布尔值
      // var obj = {'label':itemList.label,'value':itemList.value,content:'','placeholder':`请输入${itemList.label}`,'content':'','isSee':true,'parentListName':parentListName};
      var obj = {
        systemName: itemList.label, // 系统名称
        mapCode: itemList.value, // 表单绑定字段
        check: [{ code: '', name: '' }], // 校验类型 { code: '', name: ''}
        mapBase: parentListName == 'customInfoList' ? 1 : 2, // 1：自定义属性 ，2：基础属性
        isSee: true,
        isCoustomInfo: false, // 是否是自定义信息
        isSpecialInfo: false, // 是否是特殊信息
        isPaging: false, // 是否是分页
        pagingIndex: 0, // 分页顺序
        parentListName: parentListName,
        isRequire: false, // 是否必填
        isRequireDisabled: false, // 必填是否运行修改
        title: itemList.label, // 标题
        surnameTitle: '姓', // 姓title
        nameTitle: '名', // 名title
        placeholder: `请输入${itemList.label}`, // 提示文本
        surnamePlaceholder: '请输入姓', // 姓-提示文本
        namePlaceholder: '请输入名', // 名-提示文本
        nameSplit: false, //姓名拆分
        notAllowEdit: false, // 报名后不允许编辑

        // sexRadioOptions: ['先生','女士'], // 性别选项
        certificateAllTypes: ['居民身份证', '护照', '军人证', '港澳居民来往内地通行证', '台湾居民来往内地通行证', '港澳台居民居住证', '其他法定有效证件'], // 证件可选类型
        certificatecheckedTypes: [], // 证件已选类型
        certificateVerifyOptions: ['号码逻辑校验', '身份证实名校验', '人像实名校验'], //校验选项
        certificateVerify: '号码逻辑校验', // 选中校验方式
        isOnly: false, // 唯一
        photeTailorOptions: ['手动压缩裁剪', '自动裁剪'], //照片裁剪选项
        photeTailor: '自动压缩裁剪', // 选中照片裁剪方式
        photoLimitWidth: '', // 限制照片尺寸-宽
        photoLimitHeight: '', // 限制照片尺寸-高
        nationIsShow: true, // 是否展示国家
        nationTitle: '国家', // 国家标题
        nationPlaceholder: '请选择国家', // 国家提示文本
        provinceIsShow: false, // 省份是否展示
        provinceTitle: '省份', // 省份标题
        provincePlaceholder: '请选择省份', // 省份提示文本
        cityIsShow: false, // 城市是否展示
        cityTitle: '城市', // 城市标题
        cityPlaceholder: '请选择城市', // 城市提示文本
        countyIsShow: false, // 区县是否展示
        countyTitle: '区/县', // 区县标题
        countyPlaceholder: '请选择区县', // 区县提示文本
        detailedAdressISShow: false, // 详细地址是否展示
        detailedAdressTitle: '详细地址', // 详细地址标题
        detailedAdressPlaceholder: '请输入详细地址', // 详细地址提示文本
        postcodeIsShow: false, // 邮编是否显示
        postcodeTitle: '邮编', // 邮编标题
        postcodePlaceholder: '请输入邮编', // 邮编提示文本
        countryCodeIsShow: false, // 国际区号是否展示
        defaultCountryCode: '', // 默认国际区号
        mobilePhoneVerifyOptions: ['中国大陆', '港澳台', '国际'], // 格式校验选项
        mobilePhoneVerify: [], // 格式校验选中选项
        isNoteVerify: false, // 是否短信验证
        onlyUsedByManageSys: false, // 仅限于后台管理
        areaCodePlaceholder: '请输入区号', // 区号提示文本
        // telephonePlaceholder: '请输入固定电话', // 固定电话提示文本
        extensionNumbeIsShow: false, // 分机号是否展示
        extensionNumberPlaceholder: '请输入分机号', // 分机号提示文本
        isEmailVerify: false, // 是否邮箱验证

        wordCountLimit: 50, // 字数限制
        numberDigitLimit: 4, // 数字位数限制
        decimalPlacesLimit: 4, // 小数点位数限制
        options: [], // 选项
        radioOptions: [], // 单选框选项
        orientations: ['横向', '纵向'], // 排列方向选项
        orientation: '横向', // 排列方向
        minCheckedCount: '', // 最少选择数量
        maxCheckedCount: '', // 最多选择数量
        fileTypeLimit: false, // 是否限制文件类型
        pictureSizeLimit: false, // 是否限制图片尺寸

        imageTypes: ['.gif', '.png', '.jpg', '.jpeg', '.bmp'], // 图片文件类型
        imageCheckedTypes: [], // 图片文件选中类型
        imageCheckAll: false, // 图片是否全选
        imageIsIndeterminate: false, // 图片indeterminate 状态

        documentTypes: ['.doc', '.docx', '.pdf', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'], // 文档类型
        documentCheckedTypes: [], // 文档选中类型
        documentCheckAll: false, // 文档是否全选
        documentIsIndeterminate: false, // 文档indeterminate 状态

        compressedFileTypes: ['.zip', '.rar', '.gzi'], // 压缩文件类型
        compressedFileCheckedTypes: [], // 压缩文件选中类型
        compressedFileCheckAll: false, // 压缩文件是否全选
        compressedFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        videoFileTypes: ['.mp4', '.m3u8', '.flv', '.f4v', '.webm', '.mov', '.m4v', '.3gp', '.avi', '.wmv'], // 视频文件类型
        videoFileCheckedTypes: [], // 视频文件选中类型
        videoFileCheckAll: false, // 压缩文件是否全选
        videoFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        audioFileTypes: ['.mp3', '.wam', '.wav', '.amr', '.m4a', '.aac'], // 音频文件类型
        audioFileCheckedTypes: [], // 音频文件选中类型
        audioFileCheckAll: false, // 压缩文件是否全选
        audioFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        allFileTypes: [], // 允许上传文件类型合集
        fileSizeLimit: 50, // 文件大小限制
        explain: '' // 说明文字
      }

      if (parentListName == 'customInfoList') {
        this.customInfoCount++
        if (this.customInfoCount > 40) {
          this.$message.warning('新增自定义信息数量超出最大限制')
          return
        }
        // obj.mapCode = 'reservedStr' + this.customInfoCount
        obj.isCoustomInfo = true
        obj.title = '您的标题'
        // if(itemList.value == 'input'){
        //   this.setForm['input'+this.customInfoCount] = '';
        // }
        if (itemList.value == 'textarea') {
          obj.isTexeArea = true
          this.textareaNum++
          obj.wordCountLimit = 200
        }
        if (['radio', 'checkbox', 'select', 'selects'].includes(itemList.value)) {
          obj.options = ['选项一', '选项二']
        }
      }

      if (parentListName == 'specialInfoList') {
        obj.isSpecialInfo = true
      }
      var index = parentList.findIndex((item) => {
        return item.value == itemList.value
      })
      // 性别添加选项
      if (itemList.value == 'sex') {
        obj.options = ['先生', '女士']
      }
      // 电话添加校验
      if (itemList.value == 'phone') {
        obj.check[0].code = '014'
      }
      // 传真添加校验
      if (itemList.value == 'fax') {
        obj.check[0].code = '015'
      }

      // 照片限制宽高
      if (itemList.value == 'photo') {
        obj.pictureSizeLimit = true
      }

      // 证件
      if (itemList.value == 'certificate') {
        obj.options = ['居民身份证']
        obj.check[0].code = '001'
      }
      // 分割线
      if (itemList.value == 'crossLine') {
        obj.mapCode = 'crossLine' + this.setInfoList.length
      }

      // 分页
      if (itemList.value == 'paging') {
        obj.isPaging = true
        this.pagingCount++
      }

      // 说明信息
      if (itemList.value == 'explainInfo') {
        obj.mapCode = 'explainInfo' + this.setInfoList.length
      }
      if (parentListName == 'baseInfoList' || parentListName == 'contactWayList' || parentListName == 'workInfoList') {
        parentList[index].isSee = true
      }
      this.setInfoList.push(obj)
    },
    selectMultipleChange (val) {
    },
    // 分步改变
    stepIndexChange (setpIndex) {
      this.stepIndex = setpIndex
    },
    stepIndexFn (step) {
      this.stepIndex = step
    },
    isFormSetCompleteFn (status) {
      this.isFormSetComplete = status
    },
    certificateTypeChange (certificateOptions) {
      // 证件类型不包括居民身份证时 校验code设为空
      if (!certificateOptions.includes('居民身份证')) {
        this.setInfoList[this.checkedIndex].check[0].code = ''
      }
      // 勾选 居民身份证 后, 是最后一项
      if (certificateOptions[certificateOptions.length - 1] == '居民身份证') {
        this.setInfoList[this.checkedIndex].check[0].code = '001'
      }
      console.log(this.setInfoList[this.checkedIndex])
    },
    numberChange (val) {
      // numberDigitLimit: 4, // 数字位数限制
      // decimalPlacesLimit: 4, // 小数点位数限制.
      let integer = val.split('.')[0] || ''
      let decimal = val.split('.')[1] || ''
      if (Number(integer) >= Math.pow(10, this.setInfoList[this.checkedIndex].numberDigitLimit)) {
        this.test = this.test
      }
      if (decimal.length > this.setInfoList[this.checkedIndex].decimalPlacesLimit) {
        this.test = this.test
        return
      }
    },

    fileLimitCount (files, fileList) {
      this.$message.warning('只允许上传一个文件')
      // this.$set(fileList[0], 'raw', files[0])
      // this.$set(fileList[0], 'name', files[0].name)
      // this.$refs['rebateUpload'].clearFiles()//清除文件
      // this.$refs['rebateUpload'].handleStart(files[0])//选择文件后的赋值方法
    },
    beforeAvatarUpload (file) {
      const fileName = file.name
      const extension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase()
      console.log(extension, 'extension')
      let isAllowUpload = true
      let acceptType = ['.jpg', '.png', '.jpeg', '.bmp', '.webp']

      // 判断后缀名是否允许上传
      isAllowUpload = acceptType.includes(extension)
      if (!isAllowUpload) {
        const errMsg = '注意: 只允许上传以下文件类型：' + acceptType.join('、')
        this.$message.error(errMsg)
        return false
      }

      // const sizeLimit = file.size / 1024 / 1024 < element.fileSizeLimit;
      // if (!sizeLimit) {
      //   this.$message.error(`上传附件大小不能超过 ${element.fileSizeLimit}MB!`);
      //   return false;
      // }

      return isAllowUpload
    },
    // 自定义上传文件
    handleUploadForm (param, uploadType) {
      console.log(param, 'param')
      let formData = new FormData()
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
      }).then((data) => {
        if (data.status) {
          this.$message('上传文件成功')
          // this.setForm.signupContactDtlDto[element.mapCode] = data.data.filePath
          if (uploadType == 'successBanner') {
            this.resultSetForm.successBanner = data.data.filePath
          } else if (uploadType == 'successBackground') {
            this.resultSetForm.successBackground = data.data.filePath
          } else if (uploadType == 'waitReviewBanner') {
            this.resultSetForm.waitReviewBanner = data.data.filePath
          } else if (uploadType == 'waitReviewBackground') {
            this.resultSetForm.waitReviewBackground = data.data.filePath
          } else if (uploadType == 'noPassBanner') {
            this.resultSetForm.noPassBanner = data.data.filePath
          } else if (uploadType == 'noPassBackground') {
            this.resultSetForm.noPassBackground = data.data.filePath
          }
          param.onSuccess(data)
        }
        // console.log(this.setFormFile[element.mapCode])
        loading.close()
      }).catch(res => {
        debugger
        loading.close()
      })
    },
    // 附件-文件上传限制类型 勾选 ---- 开始
    imageCheckAllChange (val) {
      debugger
      this.setInfoList[this.checkedIndex].imageCheckedTypes = val ? this.setInfoList[this.checkedIndex].imageTypes : []
      this.setInfoList[this.checkedIndex].imageIsIndeterminate = false
      this.setInfoList[this.checkedIndex].allFileTypes = this.setInfoList[this.checkedIndex].allFileTypes.concat(this.setInfoList[this.checkedIndex].imageCheckedTypes)
    },
    imageCheckChange (value) {
      debugger
      let checkedCount = value.length
      this.setInfoList[this.checkedIndex].imageCheckAll = checkedCount === this.setInfoList[this.checkedIndex].imageTypes.length
      this.setInfoList[this.checkedIndex].imageIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].imageTypes.length
      // this.setInfoList[this.checkedIndex].allFileTypes = this.setInfoList[this.checkedIndex].allFileTypes.concat(this.setInfoList[this.checkedIndex].imageCheckedTypes)
    },
    documentCheckAllChange (val) {
      this.setInfoList[this.checkedIndex].documentCheckedTypes = val ? this.setInfoList[this.checkedIndex].documentTypes : []
      this.setInfoList[this.checkedIndex].documentIsIndeterminate = false
    },
    documentCheckChange (value) {
      let checkedCount = value.length
      this.setInfoList[this.checkedIndex].documentCheckAll = checkedCount === this.setInfoList[this.checkedIndex].documentTypes.length
      this.setInfoList[this.checkedIndex].documentIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].documentTypes.length
    },
    compressedFileCheckAllChange (val) {
      this.setInfoList[this.checkedIndex].compressedFileCheckedTypes = val ? this.setInfoList[this.checkedIndex].compressedFileTypes : []
      this.setInfoList[this.checkedIndex].compressedFileIsIndeterminate = false
    },
    compressedFileCheckChange (value) {
      let checkedCount = value.length
      this.setInfoList[this.checkedIndex].compressedFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].compressedFileTypes.length
      this.setInfoList[this.checkedIndex].compressedFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].compressedFileTypes.length
    },
    videoFileCheckAllChange (val) {
      this.setInfoList[this.checkedIndex].videoFileCheckedTypes = val ? this.setInfoList[this.checkedIndex].videoFileTypes : []
      this.setInfoList[this.checkedIndex].videoFileIsIndeterminate = false
    },
    videoFileCheckChange (value) {
      let checkedCount = value.length
      this.setInfoList[this.checkedIndex].videoFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].videoFileFileTypes.length
      this.setInfoList[this.checkedIndex].videoFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].videoFileTypes.length
    },
    audioFileCheckAllChange (val) {
      this.setInfoList[this.checkedIndex].audioFileCheckedTypes = val ? this.setInfoList[this.checkedIndex].audioFileTypes : []
      this.setInfoList[this.checkedIndex].audioFileIsIndeterminate = false
    },
    audioFileCheckChange (value) {
      let checkedCount = value.length
      this.setInfoList[this.checkedIndex].audioFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].audioFileFileTypes.length
      this.setInfoList[this.checkedIndex].audioFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].audioFileTypes.length
    },
    // 附件-文件上传限制类型 勾选 --- 结束

    // 地址 -- 城市 开关回调
    cityIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
      }
    },
    // 地址 -- 区/县 开关回调
    countyIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
      }
    },
    // 地址 -- 详细地址 开关回调
    detailedAdressIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
        this.setInfoList[this.checkedIndex].countyIsShow = true
      }
    },
    // 地址 -- 邮编 开关回调
    postcodeIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
        this.setInfoList[this.checkedIndex].countyIsShow = true
        this.setInfoList[this.checkedIndex].detailedAdressISShow = true
      }
    },

    // 限制图片尺寸修改
    photoLimitSizehChange (setInfoListItem) {
      setInfoListItem.check.code = '004'
      setInfoListItem.check.name = setInfoListItem.photoLimitWidth + ',' + setInfoListItem.photoLimitHeight
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    minCheckedCountChange (val) {
      if (val != 0) {
        this.setInfoList[this.checkedIndex].isRequire = true
        this.setInfoList[this.checkedIndex].isRequireDisabled = true
      }
      debugger
      this.setInfoList[this.checkedIndex].check[0].code = '011'
      this.setInfoList[this.checkedIndex].check[0].name = val
    },
    maxCheckedCountChange (val) {
      let hasMaxLimit = this.setInfoList[this.checkedIndex].check.some((checkItem) => {
        return checkItem.code == '012'
      })
      if (hasMaxLimit) {
        let maxLimit = this.setInfoList[this.checkedIndex].check.find((checkItem) => {
          return checkItem.code == '012'
        })
        maxLimit.name = val
      } else {
        this.setInfoList[this.checkedIndex].check.push({ code: '012', name: val })
      }
      console.log(this.setInfoList[this.checkedIndex].check)
    },
    batchEditOptionsComfirm () {
      let tempArr = this.batchEditOptions.split('\n')
      this.setInfoList[this.checkedIndex].options = this.setInfoList[this.checkedIndex].options.concat(tempArr)
      // this.setInfoList[this.checkedIndex].options.forEach((option,optionIdnex) => {
      //   this.setInfoList[this.checkedIndex].options[optionIdnex] = tempArr[optionIdnex]
      // })
      this.batchEditDiologVisible = false
      this.batchEditOptions = ''
      // console.log(this.batchEditOptions)
    },
    radioAddOption (setInfoListItem, optionValue) {
      setInfoListItem.options.push(optionValue)
    },
    delRadioOption (setInfoListItem, option, optionIndex) {
      debugger
      // this.setInfoList.splice(itemIndex,1);
      setInfoListItem.options.splice(optionIndex, 1)
    },
    // 证件类型勾选
    certificateVerifyChange (val) {
      this.setInfoList[this.checkedIndex].check[0].code = val
    },
    // 国际区号默认国家/地区
    defaultCountryCodeChange (val) {
      this.setForm.defaultCountryCode = val
    },
    secondphoneDefaultCountryCodeChange (val) {
      this.setForm.secondPhonedefaultCountryCode = val
    },
    telephoneDefaultCountryCodeChange (val) {
      this.setForm.telephoneDefaultCountryCode = val
    },
    faxDefaultCountryCodeChange (val) {
      this.setForm.faxDefaultCountryCode = val
    },
    wordCountLimitChange (setInfoListItem) {
      setInfoListItem.check[0].code = '008'
      setInfoListItem.check[0].name = setInfoListItem.wordCountLimit
      console.log(this.setInfoList)
    },
    // 数字位数限制 添加校验
    numberDigitLimitChange (setInfoListItem) {
      setInfoListItem.check[0].code = '009'
      setInfoListItem.check[0].name = setInfoListItem.numberDigitLimit
      console.log(this.setInfoList)
    },
    // 小数位数限制 添加校验
    decimalPlacesLimitChange (setInfoListItem) {
      setInfoListItem.check[1].code = '010'
      setInfoListItem.check[1].name = setInfoListItem.decimalPlacesLimit
      console.log(this.setInfoList)
    },
    // 手机号 校验勾选
    mobilePhoneVerifyChange (val) {
      // 005：手机号格式校验(中国大陆)
      // 006：手机号格式校验(港澳台)
      // 007：手机号格式校验(国际)
      debugger
      this.setInfoList[this.checkedIndex].check = []
      val.forEach((element) => {
        if (element == '中国大陆') {
          this.setInfoList[this.checkedIndex].check.push({ code: '005', name: '' })
        } else if (element == '港澳台') {
          this.setInfoList[this.checkedIndex].check.push({ code: '006', name: '' })
          // this.setInfoList[this.checkedIndex].check[0].code = '006'
        } else if (element == '国际') {
          this.setInfoList[this.checkedIndex].check.push({ code: '007', name: '' })
          // this.setInfoList[this.checkedIndex].check[0].code = '007'
        }
      })
    },
    onChangeAll (params) {
      // 会议编码 params.code
      // 会议名称 params.name
      this.eventName = params.name
      this.stepIndex = 1
      this.getEventInfo()
      this.getAppearanceSet()
    },
    initialize () {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      request({
        url: '/api/register/signupContactCol/initialize',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      })
        .then((response) => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.$refs.bsTable.doRefresh()
        })
    },
    edititem (checkedItem, checkedIndex) {
      this.checkedIndex = checkedIndex
    },
    // 结果页设置 添加按钮
    addBtn (btnList, btnIndex) {
      btnList.splice(btnIndex + 1, 0, {
        name: '',
        value: ''
      })
      console.log(this.resultSetForm.successButtonList, 'this.resultSetForm.successButtonList')
    },
    // 结果页设置 删除按钮
    delBtn (btnList, btnIndex) {
      btnList.splice(btnIndex, 1)
      console.log(this.resultSetForm.successButtonList, 'this.resultSetForm.successButtonList')
    },
    //开始拖拽事件
    onStart () {
      this.drag = true
    },
    //拖拽结束事件
    onEnd () {
      this.drag = false
    },
    // 拖拽变换位置时触发的事件
    onUpdate () {
      let pagingIndex = 0
      this.setInfoList.forEach((item, index) => {
        if (item.isPaging) {
          pagingIndex++
          item.pagingIndex = pagingIndex
          item.mapCode = 'paging' + pagingIndex
        }
      })
    },
    // 计算列表高度
    tableComputed () {
      // const elHead = document.getElementById('elHead')
      this.formSetHeight = 0

      // 顶部菜单 高48px
      this.formSetHeight -= 48
      // tagView 高 36px
      this.formSetHeight -= 36
      // 头部表单 高 68
      this.formSetHeight -= 68
      // 步骤条 高 57
      this.formSetHeight -= 57
      // padding 10px
      this.formSetHeight -= 20
      // 调节尺寸
      this.formSetHeight -= 10

      // 是否最大化
      if (screenfull.isFullscreen) {
        this.formSetHeight += 48
        this.formSetHeight += 36
      }
      this.formSetHeight += this.clientHeight

      // this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 97 : this.clientHeight - getElHeadHeight - 67) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 77 : this.clientHeight - getElHeadHeight - 47
      // this.formSetHeight = this.formSetHeight - 50
    }
  }
}
</script>

<style lang="scss" scoped>
.transition-box {
  background: rgba(0, 0, 0, .3);
  position: absolute;
  left: 0;
  width: 100%;
  height: 600px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  height: 90%;
  background-color: #f2f2f2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .centerContent {
    width: 80%;
    height: 400px;

    .themeTitle {
      width: 100%;
      height: 150px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 30px;
      display: flex;
      direction: columns;
      justify-content: center;
      align-items: center;
    }

    .successInfo {
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      background-color: #fff;

    }
  }

  .pageStatus {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px;
    border-radius: 50%;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
  }



}

.steps {
  width: 80%;
  margin: 0 auto;

  .stepIcon {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid;
    background: #fff;
  }
}

.formSet {
  display: flex;
  justify-content: space-between;
  min-width: 1250px;

  .formInfo {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .formInfoItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
    }

    .formInfoItem {
      min-width: 50px;
      margin: 10px 10px;
      text-align: center;
      cursor: pointer;
    }
  }

  .formPreview {
    width: 60%;
    overflow: auto;
    position: relative;
    margin: 0 20px;

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

    .setInfoItem:hover {
      background: #eee;
    }

    .setInfoItemlabel {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }

    .optionBtns {
      position: sticky;
      bottom: 0;
      // width: calc(100% - 40px);
      text-align: center;
    }
  }

  .formEdit {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .eidtContentItem {
      // line-height: 32px;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      height: auto !important;
    }

    .systemName {
      background: #eee;
      padding: 10px 20px;
      margin-bottom: 20px;
    }

    .eidtContent {
      padding: 0 20px;

      .eidtContentItem {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 10px 0;

        .eidtContentItemTitle {
          font-weight: bold;
        }

        .VerifyExplain {
          color: #ccc;
          font-weight: 400;
          padding-left: 30px;
          margin-bottom: 10px;
          white-space: normal;
        }
      }
    }
  }
}

.appearanceSet {
  padding: 20px 50px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;

  .appearanceSetItem {
    .el-form-item {

      // margin-left: 100px;
      .el-form-item__label {
        margin-right: 100px;
      }
    }

    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }

  .appearanceSetBtns {
    text-align: center;
  }
}

.resultSet {
  padding: 20px 50px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .resultSetItem {
    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }

    .previewCard {
      width: 290px;
      height: 515px;
      position: relative;

      .pageStatus {
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 5px;
        border-radius: 50%;
        background-color: #f2f2f2;
      }

      pre {
        white-space: pre-wrap;
        word-break: break-word;
      }

      .previewBtns {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }

      .previewBtnsRow {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }
    }

    .el-upload-dragger {
      height: 120px;

      .el-icon-upload {
        margin: 16px 0;
      }
    }

    .el-upload__tip {
      margin-top: 0;
    }

    .remove-button {
      cursor: pointer;
      font-size: 20px;
      line-height: 28px;
      margin-left: 10px;
    }
  }

  .resultSetBtns {
    text-align: center;
  }
}
</style>

<style scoped>
.formPreview /deep/ .el-card__body {
  min-height: 100%;
}

.formEdit /deep/ .el-card__body {
  padding: 0;
}

.certificateOptions {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.certificateVerify {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>