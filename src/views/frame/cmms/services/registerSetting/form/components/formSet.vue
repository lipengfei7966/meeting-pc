<template>
  <div class="container" style="display:flex;width:100%">
    <el-card class="formInfo" :style="{ height: formSetHeight + 'px',width:20+'%'}">
      <div slot="header" class="formInfoTitle">
        <span>{{$t('form.formInformation')}}</span>
      </div>

      <div>
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <h2>{{$t('form.basicInformation')}}</h2>
            </template>
            <ul class="formInfoItems">
              <li class="formInfoItem" v-for="(baseInfoItem, baseInfoIndex) in baseInfoList" :key="baseInfoIndex" v-show="!baseInfoItem.isSee" @click="addSetInfoList(baseInfoItem, baseInfoList, 'baseInfoList')">{{baseInfoItem.label}}</li>
            </ul>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <h2>{{$t('form.contactWay')}}</h2>
            </template>
            <ul class="formInfoItems">
              <li class="formInfoItem" v-for="(contactWayItem, contactWayIndex) in contactWayList" :key="contactWayIndex" v-show="!contactWayItem.isSee" @click="addSetInfoList(contactWayItem, contactWayList, 'contactWayList')">{{ contactWayItem.label }}
              </li>
            </ul>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <h2>{{$t('form.jobInformantion')}}</h2>
            </template>
            <ul class="formInfoItems">
              <li class="formInfoItem" v-for="(workInfoItem, workInfoIndex) in workInfoList" :key="workInfoIndex" v-show="!workInfoItem.isSee" @click="addSetInfoList(workInfoItem, workInfoList, 'workInfoList')">{{workInfoItem.label}}</li>
            </ul>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <h2>{{$t('form.customInformation')}}</h2>
            </template>
            <ul class="formInfoItems">
              <li class="formInfoItem" v-for="(customInfoItem, customInfoIndex) in customInfoList" :key="customInfoIndex" v-show="!customInfoItem.isSee" @click="addSetInfoList(customInfoItem, customInfoList, 'customInfoList')">{{ customInfoItem.label }}</li>
            </ul>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <h2>{{$t('form.specialInformation')}}</h2>
            </template>
            <ul class="formInfoItems">
              <li class="formInfoItem" v-for="(specialInfoItem, specialInfoIndex) in specialInfoList" :key="specialInfoIndex" v-show="!specialInfoItem.isSee" @click="addSetInfoList(specialInfoItem, specialInfoList, 'specialInfoList')">{{specialInfoItem.label}}</li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <!-- 中间信息 -->
    <el-card class="formPreview" :style="{ height: formSetHeight + 'px',width:60+'%' }">
      <div :style="{ minHeight: formSetHeight - 80 + 'px',width:100+'%' }">
        <h2 style="text-align: center">{{ eventName }}</h2>
        <draggable v-model="setInfoList" chosenClass="chosen" forceFallback="true" :scroll="true" animation="300" @start="onStart" @end="onEnd" @update="onUpdate">
          <transition-group>
            <div class="setInfoItem" v-for="(element, index) in setInfoList" :key="element.mapCode" @click="edititem(element, index)">
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
                <el-radio v-model="setForm.checkedSex" :label="element.options[0]">{{ element.options[0]}}</el-radio>
                <el-radio v-model="setForm.checkedSex" :label="element.options[1]">{{ element.options[1]}}</el-radio>
              </div>

              <!-- 证件 -->
              <div v-if="element.mapCode == 'certificate'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>
                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-select style="width: 100%" v-model="setForm.chenkedCertificate" :placeholder="element.placeholder">
                    <el-option v-for="item in theCertificateType" :key="item.key" :value="item.value" :label="item.label"> </el-option>
                  </el-select>
                  <br />
                  <el-input style="margin-top: 10px" size="mini" :placeholder="element.certificateNumPlaceholder"></el-input>
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
                  <el-select style="width: 50%" v-model="setForm.province" :placeholder="element.provincePlaceholder">
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
                  <el-input style="width: 50%" size="mini" v-model="setForm.detailedAdress" :placeholder="element.detailedAdressPlaceholder"></el-input>
                </div>
                <!-- 邮编 -->
                <div v-if="element.postcodeIsShow" class="addresItem">
                  <span class="setInfoItemlabel"> {{ element.postcodeTitle }} : </span>
                  <el-input style="width: 50%" size="mini" v-model="setForm.postcode" :placeholder="element.postcodePlaceholder"></el-input>
                </div>
              </div>

              <!-- 手机号 -->
              <div v-if="element.mapCode == 'mobile'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>
                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                    <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.defaultCountryCode" :placeholder="$t('form.selectInternationalCode')">
                      <el-option v-for="item in countryCodeOptions" :key="item.value" :label="'+' + item.value" :value="item.value"> </el-option>
                    </el-select>
                  </el-input>
                  <br />
                  <el-input v-if="element.isNoteVerify" :placeholder="$t('form.enterVerification')" class="input-with-select">
                    <el-button slot="append">{{$t('form.getVerificationCode')}}</el-button>
                  </el-input>
                </div>
              </div>

              <!-- 备用手机号 -->
              <div v-if="element.mapCode == 'spareMobile'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-input :placeholder="element.placeholder" size="mini" class="input-with-select">
                    <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.secondPhonedefaultCountryCode" :placeholder="$t('form.selectInternationalCode')">
                      <el-option v-for="item in countryCodeOptions" :key="item.value" :label="'+' + item.value" :value="item.value"> </el-option>
                    </el-select>
                  </el-input>
                  <br />
                  <el-input v-if="element.isNoteVerify" :placeholder="$t('form.enterVerification')" class="input-with-select">
                    <el-button slot="append">{{$t('form.getVerificationCode')}}</el-button>
                  </el-input>
                </div>
              </div>

              <!-- 固定电话 -->
              <div v-if="element.mapCode == 'phone'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 80%; display: inline-block; vertical-align: top">
                  <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                    <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.telephoneDefaultCountryCode" :placeholder="$t('form.selectInternationalCode')">
                      <el-option v-for="item in countryCodeOptions" :key="item.value" :label="'+' + item.value" :value="item.value"> </el-option>
                    </el-select>
                  </el-input>
                  <span> - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                  </span>
                  <span v-if="element.extensionNumbeIsShow"> - <el-input style="width: 150px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                </div>
              </div>

              <!-- 传真 -->
              <div v-if="element.mapCode == 'fax'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 80%; display: inline-block; vertical-align: top">
                  <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                    <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.faxDefaultCountryCode" :placeholder="$t('form.selectInternationalCode')">
                      <el-option v-for="item in countryCodeOptions" :key="item.value" :label="'+' + item.value" :value="item.value"> </el-option>
                    </el-select>
                  </el-input>
                  <span> - <el-input style="width: 150px" :placeholder="element.placeholder" size="mini"></el-input>
                  </span>
                  <span v-if="element.extensionNumbeIsShow"> - <el-input style="width: 150px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input> </span>
                </div>
              </div>

              <!-- 邮箱 -->
              <div v-if="element.mapCode == 'email'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                  <br />
                  <el-input v-if="element.isEmailVerify" :placeholder="$t('form.enterVerification')" class="input-with-select">
                    <el-button slot="append">{{$t('form.getVerificationCode')}}</el-button>
                  </el-input>
                </div>
              </div>

              <!-- 备用邮箱 -->
              <div v-if="element.mapCode == 'spareEmail'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-input :placeholder="element.placeholder" size="mini" class="input-with-select"></el-input>
                  <br />
                  <el-input v-if="element.isEmailVerify" :placeholder="$t('form.enterVerification')" class="input-with-select">
                    <el-button slot="append">{{$t('form.getVerificationCode')}}</el-button>
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
                  <el-input :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
                </div>
              </div>

              <!-- 长文本 -->
              <div v-if="element.systemName == '长文本'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-input type="textarea" :placeholder="element.placeholder" :maxlength="element.wordCountLimit" size="mini"></el-input>
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
                  <el-radio-group :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }">
                    <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{item}}</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <!-- 复选框 -->
              <div v-if="element.systemName == '复选框'" class="form-item-input">
                <span class="setInfoItemlabel"> {{ element.title }} : </span>

                <div style="width: 50%; display: inline-block; vertical-align: top">
                  <el-checkbox-group v-model="setForm.checkedOptions" :style="{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: element.orientation == '横向' ? 'row' : 'column' }" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length">
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
                  <el-select style="margin-left: 10px; width: 70%" :placeholder="element.placeholder" :multiple="true" v-model="setForm.selectMultipleCheckedOptions" @change="selectMultipleChange">
                    <el-option v-for="item in element.options" :key="item" :label="item" :value="item || '待输入'" :disabled="element.maxCheckedCount != '' && setForm.selectMultipleCheckedOptions.length >= element.maxCheckedCount && !setForm.selectMultipleCheckedOptions.includes(item)"></el-option>
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
                  <el-date-picker v-model="setForm.date" align="right" type="date" size="mini" :placeholder="element.placeholder" :picker-options="pickerOptions"></el-date-picker>
                </div>
              </div>

              <!-- 分割线 -->
              <div v-if="element.systemName == '分割线'" class="form-item-input">
                <el-divider content-position="center">{{ element.placeholder }}</el-divider>
              </div>

              <!-- 分页 -->
              <div v-if="element.systemName == '分页'" class="form-item-input">
                <p style="text-align: center">[ {{$t('form.di')}} {{ element.pagingIndex }} {{$t('form.total')}} {{ pageTotal }} {{$t('form.Page')}} ]</p>
              </div>

              <!-- 说明信息 -->
              <div v-if="element.systemName == '说明信息'" class="form-item-input">
                <pre>{{ element.placeholder }}</pre>
              </div>

              <div style="display: flex; flex-direction: column; justify-content: space-around">
                <div style="display: flex">
                  <el-checkbox v-if="!element.isSpecialInfo" v-model="element.isRequire" :disabled="element.isRequireDisabled">{{$t('form.required')}}</el-checkbox>
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
          {{$t('appearance.saveAndNext')}}
        </el-button>
        <el-button @click="canelFn">{{$t('applySet.cancel')}}</el-button>
      </div>
    </el-card>
    <!-- 右侧编辑 -->
    <el-card class="formEdit" :style="{ height: formSetHeight + 'px' ,width:20+'%'}">
      <div slot="header" class="formInfoTitle">
        <span>{{$t('form.edit')}}</span>
      </div>

      <div v-if="setInfoList.length > 0">
        <p class="systemName">{{$t('form.systemName')}}: {{ setInfoList[checkedIndex].systemName }}</p>

        <div class="eidtContent">
          <!-- 姓名 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'name'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].surnameTitle"></el-input>
              <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].nameTitle"></el-input>
              <el-input v-if="!setInfoList[checkedIndex].nameSplit" style="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].surnamePlaceholder"></el-input>
              <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].namePlaceholder"></el-input>
              <el-input v-if="!setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
            <!-- 姓名拆分 -->
            <div class="eidtContentItem" v-show="setInfoList[checkedIndex].mapCode == 'name'">
              <p class="eidtContentItemTitle">{{$t('form.nameSplitting')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].nameSplit"> </el-switch>
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 性别 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'sex'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 选项 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.options')}}</p>
              <el-input style="" size="mini" v-model="setInfoList[checkedIndex].options[0]"></el-input>
              <el-input style="margin-top: 10px" size="mini" v-model="setInfoList[checkedIndex].options[1]"></el-input>
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 证件 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'certificate'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.documentTypeTips')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
              <p class="eidtContentItemTitle">{{$t('form.documentNumberTips')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].certificateNumPlaceholder"></el-input>
            </div>
            <!-- 可选择证件类型 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.chooseDocumentType')}}</p>
              <el-checkbox-group class="certificateOptions" v-model="setInfoList[checkedIndex].options" :min="1" @change="certificateTypeChange">
                <el-checkbox v-for="item in $t('datadict.certificateType')" :key="item.key" :label="item.value">{{ item.label }}</el-checkbox>
                <!-- <el-checkbox v-for="item in setInfoList[checkedIndex].certificateAllTypes" :label="item" :key="item"></el-checkbox> -->
              </el-checkbox-group>
            </div>
            <!-- 校验 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].options.includes('NI')">
              <p class="eidtContentItemTitle">{{$t('form.verify')}}</p>
              <el-radio-group class="certificateVerify" style="width: 100%" v-model="setInfoList[checkedIndex].check[0].code" @change="certificateVerifyChange">
                <el-radio label="001">
                  {{$t('form.numberlogicvalidation')}}
                  <p class="VerifyExplain">{{$t('form.onlytherulesoftheIDnumber')}}</p>
                </el-radio>

                <el-radio label="002">
                  {{$t('form.idcardrealnameverification')}}
                  <p class="VerifyExplain">{{$t('form.checktherealname')}}</p>
                </el-radio>
                <el-radio label="003">
                  {{$t('form.portraitrealnameverification')}}
                  <p class="VerifyExplain">{{$t('form.compareandauthenticatetheuploaded')}}</p>
                </el-radio>
              </el-radio-group>
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>
          </div>

          <!-- 照片 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'photo'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 照片裁剪 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.photoCropping')}}</p>
              <el-radio-group class="certificateVerify" style="width: 100%" v-model="setInfoList[checkedIndex].photeTailor">
                <el-radio :label="$t('form.automaticcompressionandclipping')">
                  {{$t('form.automaticcompressionandclipping')}}
                  <p class="VerifyExplain"> {{$t('form.systemautomaticallycompressesTips')}}；</p>
                </el-radio>

                <el-radio :label="$t('form.manualClipping')">
                  {{$t('form.manualClipping')}}
                  <p class="VerifyExplain"> {{$t('form.photoAndNeedsToCrop')}}</p>
                </el-radio>
              </el-radio-group>
            </div>
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.limitingphotosizes')}} (px)</p>
              <div style="width: 100%">{{$t('form.width')}}: <el-input style="width: 70px; margin-right: 10px" size="mini" v-model="setInfoList[checkedIndex].photoLimitWidth" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input> {{$t('form.height')}}: <el-input style="width: 70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
              </div>
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 地址 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'addres'">
            <!-- 国家 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.nation')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].nationIsShow"> </el-switch>
            </div>
            <!-- 国家标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].nationIsShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].nationTitle"></el-input>
            </div>
            <!-- 国家提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].nationIsShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].nationPlaceholder"></el-input>
            </div>

            <!-- 省份 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.province')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].provinceIsShow" @change="provinceChange"> </el-switch>
            </div>
            <!-- 省份标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].provinceIsShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].provinceTitle"></el-input>
            </div>
            <!-- 省份提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].provinceIsShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].provincePlaceholder"></el-input>
            </div>

            <!-- 城市 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.city')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].cityIsShow" @change="cityIsShowChange"> </el-switch>
            </div>
            <!-- 城市标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].cityIsShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].cityTitle"></el-input>
            </div>
            <!-- 城市提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].cityIsShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].cityPlaceholder"></el-input>
            </div>

            <!-- 区县 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.districtsAndCounties')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].countyIsShow" @change="countyIsShowChange"> </el-switch>
            </div>
            <!-- 区县标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].countyIsShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].countyTitle"></el-input>
            </div>
            <!-- 区县提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].countyIsShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].countyPlaceholder"></el-input>
            </div>

            <!-- 详细地址 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.detailedaddress')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].detailedAdressISShow" @change="detailedAdressIsShowChange"> </el-switch>
            </div>
            <!-- 详细地址标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].detailedAdressISShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].detailedAdressTitle"></el-input>
            </div>
            <!-- 详细地址提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].detailedAdressISShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].detailedAdressPlaceholder"></el-input>
            </div>

            <!-- 邮编 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.postalCode')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].postcodeIsShow" @change="postcodeIsShowChange">
              </el-switch>
            </div>
            <!-- 邮编地址标题 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].postcodeIsShow">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].postcodeTitle"></el-input>
            </div>
            <!-- 邮编地址提示文本 -->
            <div class="eidtContentItem" v-if="setInfoList[checkedIndex].postcodeIsShow">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].postcodePlaceholder"></el-input>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 手机号 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'mobile'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 国际区号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.countryCode')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
              <el-select style="margin-top: 5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" filterable v-model="setInfoList[checkedIndex].defaultCountryCode" @change="defaultCountryCodeChange" :placeholder="$t('form.setsthedefaultCountry')">
                <el-option v-for="item in countryCodeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>

            <!-- 格式校验 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.formatValidation')}}</p>
              <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify" @change="mobilePhoneVerifyChange">
                <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item" :key="item" :disabled="item == '国际'"></el-checkbox>
              </el-checkbox-group>
            </div>

            <!-- 短信验证 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.sMSVerification')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isNoteVerify"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>

            <!-- 仅限于后台管理 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.backgroundManagementOnly')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].onlyUsedByManageSys"> </el-switch>
            </div>
          </div>

          <!-- 备用手机号 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'spareMobile'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 国际区号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.countryCode')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
              <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="secondphoneDefaultCountryCodeChange" :placeholder="$t('form.setsthedefaultCountry')">
                <el-option v-for="item in countryCodeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>

            <!-- 格式校验 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.formatValidation')}}</p>
              <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify" @change="mobilePhoneVerifyChange">
                <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item" :key="item" :disabled="item == '国际'"></el-checkbox>
              </el-checkbox-group>
            </div>

            <!-- 短信验证 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.sMSVerification')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isNoteVerify"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 固定电话 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'phone'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].areaCodePlaceholder"></el-input>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
              <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow" v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
            </div>

            <!-- 国际区号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.countryCode')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
              <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="telephoneDefaultCountryCodeChange" :placeholder="$t('form.setsthedefaultCountry')">
                <el-option v-for="item in countryCodeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>

            <!-- 分机号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.extensionNumber')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].extensionNumbeIsShow"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 传真 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'fax'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].areaCodePlaceholder"></el-input>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
              <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow" v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
            </div>

            <!-- 国际区号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.countryCode')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
              <el-select style="margin-top: 5px" filterable v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="faxDefaultCountryCodeChange" :placeholder="$t('form.setsthedefaultCountry')">
                <el-option v-for="item in countryCodeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>

            <!-- 分机号 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.extensionNumber')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].extensionNumbeIsShow"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 邮箱 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'email'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 邮箱验证 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.mailboxVerification')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isEmailVerify"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>

            <!-- 仅限于后台管理 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.backgroundManagementOnly')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].onlyUsedByManageSys"> </el-switch>
            </div>
          </div>

          <!-- 备用邮箱 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'spareEmail'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 邮箱验证 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.mailboxVerification')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isEmailVerify"> </el-switch>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 微信号 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'wechat'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- QQ号 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'qq'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 唯一 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unique')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].isOnly"> </el-switch>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 公司 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'company'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 部门 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'department'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 职位 -->
          <div v-if="setInfoList[checkedIndex].mapCode == 'position'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 短文本 / 长文本-->
          <div v-if="setInfoList[checkedIndex].systemName == '短文本' || setInfoList[checkedIndex].systemName == '长文本'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
            <!-- 限制字数 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.wordLimit')}}</p>
              <el-input-number v-if="setInfoList[checkedIndex].systemName == '短文本'" style="width: 120px; line-height: 32px" v-model="setInfoList[checkedIndex].wordCountLimit" controls-position="right" :min="1" :max="50" @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
              <el-input-number v-if="setInfoList[checkedIndex].systemName == '长文本'" style="width: 120px; line-height: 32px" v-model="setInfoList[checkedIndex].wordCountLimit" controls-position="right" :min="1" :max="200" @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
              <!-- <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input> -->
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 数字 -->
          <div v-if="setInfoList[checkedIndex].systemName == '数字'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
            <!-- 限制数字位数 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 32px">{{$t('form.limitthenumberofdigits')}}</p>
              <p>
                <el-input-number style="width: 80px; line-height: 32px" v-model="setInfoList[checkedIndex].numberDigitLimit" controls-position="right" :min="1" :max="9" @change="numberDigitLimitChange(setInfoList[checkedIndex])"></el-input-number>
                {{$t('form.bit')}}
              </p>
            </div>
            <!-- 限制小数点后位数 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 32px">{{$t('form.limitthenumberofdecimalplaces')}}</p>
              <p>
                {{$t('form.the')}}
                <el-input-number style="width: 80px; line-height: 32px" v-model="setInfoList[checkedIndex].decimalPlacesLimit" controls-position="right" :min="1" :max="6" @change="decimalPlacesLimitChange(setInfoList[checkedIndex])"></el-input-number>
                {{$t('form.decimalPlace')}}
              </p>
            </div>
            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 单选框 -->
          <div v-if="setInfoList[checkedIndex].systemName == '单选框'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 选项 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 34px">{{$t('form.options')}}</p>
              <el-button type="text" @click="batchEditDiologVisible = true">{{$t('form.batchAddition')}}</el-button>
              <div class="radioOptions" style="width: 100%">
                <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                  <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                    <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                    <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px; line-height: 28px; cursor: pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                  </p>
                </draggable>
              </div>
              <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
              <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
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
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 复选框 -->
          <div v-if="setInfoList[checkedIndex].systemName == '复选框'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 选项 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 34px">{{$t('form.options')}}</p>
              <el-button type="text" @click="batchEditDiologVisible = true">{{$t('form.batchAddition')}}</el-button>
              <div class="radioOptions" style="width: 100%">
                <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                  <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                    <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                    <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px; line-height: 28px; cursor: pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                  </p>
                </draggable>
              </div>
              <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
              <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
            </div>

            <!-- 可选范围 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">可选范围</p>
              <div style="width: 100%">
                <p style="margin: 5px 0">
                  <span>至少选择</span>
                  <el-select style="margin-left: 10px; width: 70%" v-model="setInfoList[checkedIndex].minCheckedCount" placeholder="请选择" @change="minCheckedCountChange">
                    <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index" :label="index + 1 + '项'" :value="index + 1" :disabled="index + 1 > setInfoList[checkedIndex].maxCheckedCount && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                    <el-option label="不限" value=""></el-option>
                  </el-select>
                </p>
                <p style="margin: 5px 0">
                  <span>至多选择</span>
                  <el-select style="margin-left: 10px; width: 70%" v-model="setInfoList[checkedIndex].maxCheckedCount" placeholder="请选择" @change="maxCheckedCountChange">
                    <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index" :label="index + 1 + '项'" :value="index + 1" :disabled="index + 1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
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
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 下拉列表 -->
          <div v-if="setInfoList[checkedIndex].systemName == '下拉列表'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>

            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 选项 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 34px">{{$t('form.options')}}</p>
              <el-button type="text" @click="batchEditDiologVisible = true">{{$t('form.batchAddition')}}</el-button>
              <div class="radioOptions" style="width: 100%">
                <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                  <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                    <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                    <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px; line-height: 28px; cursor: pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                  </p>
                </draggable>
              </div>
              <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
              <!-- <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button> -->
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 下拉复选框 -->
          <div v-if="setInfoList[checkedIndex].systemName == '下拉复选框'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
            <!-- 选项 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 34px">{{$t('form.options')}}</p>
              <el-button type="text" @click="batchEditDiologVisible = true">{{$t('form.batchAddition')}}</el-button>
              <div class="radioOptions" style="width: 100%">
                <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                  <p v-for="(item, index) in setInfoList[checkedIndex].options" :key="index">
                    <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项' + (index + 1)" style="margin: 5px 5px 5px 0; width: 85%"></el-input>
                    <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px; line-height: 28px; cursor: pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex], item, index)"></span>
                  </p>
                </draggable>
              </div>
              <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">{{$t('form.add')}}</el-button>
              <el-button type="primary" v-if="!setInfoList[checkedIndex].options.includes('其他')" @click="radioAddOption(setInfoList[checkedIndex], '其他')">{{$t('form.addOther')}}</el-button>
            </div>

            <!-- 可选范围 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.optionalRange')}}</p>
              <div style="width: 100%">
                <p style="margin: 5px 0">
                  <span>{{$t('form.atleastchoose')}}</span>
                  <el-select style="margin-left: 10px; width: 70%" v-model="setInfoList[checkedIndex].minCheckedCount" :placeholder="$t('form.pleaseChoose')" @change="minCheckedCountChange">
                    <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index" :label="index + 1 + $t('form.item')" :value="index + 1" :disabled="index + 1 > setInfoList[checkedIndex].maxCheckedCount && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                    <el-option :label="$t('form.unlimited')" value=""></el-option>
                  </el-select>
                </p>
                <p style="margin: 5px 0">
                  <span>{{$t('form.atmostchoice')}}</span>
                  <el-select style="margin-left: 10px; width: 70%" v-model="setInfoList[checkedIndex].maxCheckedCount" :placeholder="$t('form.pleaseChoose')" @change="maxCheckedCountChange">
                    <el-option v-for="(item, index) in setInfoList[checkedIndex].options" :key="index" :label="index + 1 + $t('form.item')" :value="index + 1" :disabled="index + 1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
                    <el-option :label="$t('form.unlimited')" value=""></el-option>
                  </el-select>
                </p>
              </div>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 附件 -->
          <div v-if="setInfoList[checkedIndex].systemName == '附件'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>

            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 限制文件类型 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.limitingFileTypes')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].fileTypeLimit"> </el-switch>
              <div v-if="setInfoList[checkedIndex].fileTypeLimit" style="width: 100%">
                <p>{{$t('form.pictureFile')}}: <el-checkbox :indeterminate="setInfoList[checkedIndex].imageIsIndeterminate" v-model="setInfoList[checkedIndex].imageCheckAll" @change="imageCheckAllChange">{{$t('form.checkAll')}}</el-checkbox>
                </p>
                <el-checkbox-group v-model="setInfoList[checkedIndex].imageCheckedTypes" @change="imageCheckChange">
                  <el-checkbox v-for="item in setInfoList[checkedIndex].imageTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
                <p>{{$t('form.documentFile')}}: <el-checkbox :indeterminate="setInfoList[checkedIndex].documentIsIndeterminate" v-model="setInfoList[checkedIndex].documentCheckAll" @change="documentCheckAllChange">{{$t('form.checkAll')}}</el-checkbox>
                </p>
                <el-checkbox-group v-model="setInfoList[checkedIndex].documentCheckedTypes" @change="documentCheckChange">
                  <el-checkbox v-for="item in setInfoList[checkedIndex].documentTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
                <p>{{$t('form.compressedFiles')}}: <el-checkbox :indeterminate="setInfoList[checkedIndex].compressedFileIsIndeterminate" v-model="setInfoList[checkedIndex].compressedFileCheckAll" @change="compressedFileCheckAllChange">{{$t('form.checkAll')}}</el-checkbox>
                </p>
                <el-checkbox-group v-model="setInfoList[checkedIndex].compressedFileCheckedTypes" @change="compressedFileCheckChange">
                  <el-checkbox v-for="item in setInfoList[checkedIndex].compressedFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
                <p>{{$t('form.videoFile')}}: <el-checkbox :indeterminate="setInfoList[checkedIndex].videoFileIsIndeterminate" v-model="setInfoList[checkedIndex].videoFileCheckAll" @change="videoFileCheckAllChange">{{$t('form.checkAll')}}</el-checkbox>
                </p>
                <el-checkbox-group v-model="setInfoList[checkedIndex].videoFileCheckedTypes" @change="videoFileCheckChange">
                  <el-checkbox v-for="item in setInfoList[checkedIndex].videoFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
                <p>{{$t('form.audioFile')}}: <el-checkbox :indeterminate="setInfoList[checkedIndex].audioFileIsIndeterminate" v-model="setInfoList[checkedIndex].audioFileCheckAll" @change="audioFileCheckAllChange">{{$t('form.checkAll')}}</el-checkbox>
                </p>
                <el-checkbox-group v-model="setInfoList[checkedIndex].audioFileCheckedTypes" @change="audioFileCheckChange">
                  <el-checkbox v-for="item in setInfoList[checkedIndex].audioFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <!-- 限制文件大小 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle" style="line-height: 32px">{{$t('form.limitFileSize')}}</p>
              <el-input style="width: 130px" class="input-with-select" v-model.number="setInfoList[checkedIndex].fileSizeLimit">
                <span slot="append"> M </span>
              </el-input>
            </div>

            <!-- 限制图片尺寸 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.limitingTheImageSize')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].pictureSizeLimit"> </el-switch>
              <div v-if="setInfoList[checkedIndex].pictureSizeLimit" style="width: 100%">宽: <el-input style="width: 70px; margin-right: 10px" size="mini" v-model="setInfoList[checkedIndex].photoLimitWidth" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input> 高: <el-input style="width: 70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
              </div>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 日期 -->
          <div v-if="setInfoList[checkedIndex].systemName == '日期'">
            <!-- 标题 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.title')}}</p>
              <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
            </div>

            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>

            <!-- 报名后不允许编辑 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.unAllowedEditing')}}</p>
              <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
            </div>
          </div>

          <!-- 分割线 -->
          <div v-if="setInfoList[checkedIndex].systemName == '分割线'">
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.Alertingtext')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
          </div>

          <!-- 11 -->
          <div v-if="setInfoList[checkedIndex].systemName == '分页'">
            <!-- 提示文本 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.pageTitle')}}</p>
              <el-input size="mini" v-model="setInfoList[checkedIndex].pageTitle" :placeholder="setInfoList[checkedIndex].placeholder"></el-input>
              <p style="width: 100%; text-align: center">[ {{$t('form.di')}} {{ setInfoList[checkedIndex].pagingIndex }} {{$t('form.total')}} {{pageTotal}} {{$t('form.Page')}} ]</p>
            </div>
          </div>

          <!-- 说明信息 -->
          <div v-if="setInfoList[checkedIndex].systemName == '说明信息'">
            <!-- 说明信息 -->
            <div class="eidtContentItem">
              <p class="eidtContentItemTitle">{{$t('form.caption')}}</p>
              <el-input type="textarea" :rows="10" size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 表单设置-批量新增选项 弹窗 -->
    <el-dialog :title="$t('form.batchAddition')" width="500px" :visible.sync="batchEditDiologVisible" :modal-append-to-body="true" :append-to-body="true">
      <p>{{$t('form.enterOptionValues')}}</p>
      <el-input type="textarea" :rows="10" v-model="batchEditOptions"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchEditDiologVisible = false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="batchEditOptionsComfirm">{{$t('form.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import screenfull from 'screenfull'
import request from '@/utils/frame/base/request'
import { mapGetters } from 'vuex'
export default {
  name: 'formSet',
  components:{
    draggable
  },
  data () {
    return {
      formUpdateStatus:false,
      batchEditOptions: '', // 批量编辑信息
      batchEditDiologVisible: false,
      checkedIndex: 0, // 选中预览item下标
      eventCode:'',
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
      pageTotal:0,
      eventName: '', // 会议名称
      drag: false,
      countryCodeOptions: [], // 国际区号下拉选项  label - value
      buttonCodeOptions: [], //按钮字典
      skipCodeOptions: [], //跳转页面字典
      setInfoList: [], // 选中的配置信息列表
      batchEditOptions: '', // 批量编辑信息
      setInfoList: [], // 选中的配置信息列表
      batchEditOptions: '', // 批量编辑信息
      // 表格高度
      formSetHeight: 0,
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
      numDigit:{code:'009',name:4},
      decimalPlaces:{code:'010',name:4}
    }
  },
  created () {},
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
    },
    computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight']),
    httpHeaders () {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  },
  mounted () {
    this.tableComputed()
    // this.getEventInfo()
    // 获取国际区号数据字典
    this.countryCodeOptions = this.$t('datadict.countryCode')
    // 获取按钮下拉数据字典
    this.buttonCodeOptions = this.$t('datadict.resultSkipPage')
  },
  methods: {
     // 获取表单设置
     getEventInfo (eventCode,eventName) {
      this.eventCode=eventCode?eventCode:this.eventCode
      this.eventName=eventName?eventName:this.eventName
      this.pageTotal=0
      this.pagingCount=0
      if (this.eventCode == '') {
        this.$message.warning(this.$t('form.pleaseSelectMeeting'))
        return
      }
      this.baseInfoList.forEach(baseInfoItem => {
        baseInfoItem.isSee = false
      })
      this.contactWayList.forEach(contactWayItem => {
        contactWayItem.isSee = false
      })
      this.workInfoList.forEach(workInfoItem => {
        workInfoItem.isSee = false
      })
      request({
        url: '/api/biz/cmsEventInfo/get',
        method: 'POST',
        data: {
          data: this.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      }).then(response => {
        if (response.status) {
          this.getActiveObj = response.data
          if (response.data.json) {
            this.setInfoList = JSON.parse(response.data.json)
            console.log(JSON.parse(response.data.json),'JSON.parse(response.data.json)');
          } else {
            this.setInfoList = []
          }
        }
        // 初始化数据,如果返回数据有 基本信息、联系方式、工作信息，隐藏左侧选项
        this.setInfoList.forEach(setInfoItem => {

          // 基本信息
          this.baseInfoList.forEach(baseInfoItem => {
            if (baseInfoItem.value == setInfoItem.mapCode) {
              baseInfoItem.isSee = true
            }
          })
          // 联系方式
          this.contactWayList.forEach(contactWayItem => {
            if (contactWayItem.value == setInfoItem.mapCode) {
              contactWayItem.isSee = true
            }
          })
          // 工作信息
          this.workInfoList.forEach(workInfoItem => {
            if (workInfoItem.value == setInfoItem.mapCode) {
              workInfoItem.isSee = true
            }
          })
          if (setInfoItem.isCoustomInfo) {
            this.customInfoCount++
          }
          if(setInfoItem.systemName == '分页'){
            this.pageTotal++
            this.pagingCount++
          }
          if (setInfoItem.systemName == '证件') {
            let cardCode = this.$t('datadict.certificateType')
            this.theCertificateType=[]
            setInfoItem.options.forEach(v=>{
              cardCode.forEach(i=>{
                if(i.value == v){
                  this.theCertificateType.push(i)
                }
              })
            })
          }
        })
      })
    },
    canelFn(){
      this.$emit('stepIndex',0)
    },
    // 表单设置保存
    save () {
      this.setInfoList.forEach(item => {
        if (item.systemName == '附件') {
          item.allFileTypes = [...item.imageCheckedTypes, ...item.documentCheckedTypes, ...item.compressedFileCheckedTypes, ...item.videoFileCheckedTypes, ...item.audioFileCheckedTypes]
        }
        if (item.systemName == '数字') {
          item.check=[]
        item.check.push(this.numDigit)
        item.check.push(this.decimalPlaces)
        // item.check.forEach((i,x)=>{
        //   if(i.code==''||i.name==''){
        //     item.check.splice(x)
        //   }
        // })
        // item.check=[...item.check]
      }
      })

      request({
        url: 'api/register/signupContactCol/save',
        method: 'POST',
        data: {
          data: {
            eventCode: this.eventCode,
            json: this.setInfoList
          },
          funcModule: '获取模块类型',
          funcOperation: '获取模块类型'
        }
      }).then(res => {
        if (res.status) {
          this.$message.success(this.$t('form.saveSuccess'))
          this.getEventInfo()
          this.$emit('stepIndex',2)
          this.formUpdateStatus=true
          this.$emit('formUpdateStatus',true)

        } else {
          this.$message.error(this.$t('form.saveFail'))
        }
      })
      console.log(this.setInfoList)
    },
    // 附件-文件上传限制类型 勾选 ---- 开始
    imageCheckAllChange (val) {
      this.setInfoList[this.checkedIndex].imageCheckedTypes = val ? this.setInfoList[this.checkedIndex].imageTypes : []
      this.setInfoList[this.checkedIndex].imageIsIndeterminate = false
      this.setInfoList[this.checkedIndex].allFileTypes = this.setInfoList[this.checkedIndex].allFileTypes.concat(this.setInfoList[this.checkedIndex].imageCheckedTypes)
    },
    imageCheckChange (value) {
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
    // 地址 -- 省 开关回调
    provinceChange (e) {
      if (e) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
      } else {
        this.setInfoList[this.checkedIndex].provinceIsShow = false
        this.setInfoList[this.checkedIndex].cityIsShow = false
        this.setInfoList[this.checkedIndex].countyIsShow = false
        this.setInfoList[this.checkedIndex].detailedAdressISShow = false
      }
    },
    // 地址 -- 城市 开关回调
    cityIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
      } else {
        this.setInfoList[this.checkedIndex].cityIsShow = false
        this.setInfoList[this.checkedIndex].countyIsShow = false
        this.setInfoList[this.checkedIndex].detailedAdressISShow = false
      }
    },
    // 地址 -- 区/县 开关回调
    countyIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
        this.setInfoList[this.checkedIndex].countyIsShow = true
      } else {
        this.setInfoList[this.checkedIndex].countyIsShow = false
        this.setInfoList[this.checkedIndex].detailedAdressISShow = false
      }
    },
    // 地址 -- 详细地址 开关回调
    detailedAdressIsShowChange (val) {
      if (val) {
        this.setInfoList[this.checkedIndex].provinceIsShow = true
        this.setInfoList[this.checkedIndex].cityIsShow = true
        this.setInfoList[this.checkedIndex].countyIsShow = true
      } else {
        this.setInfoList[this.checkedIndex].detailedAdressISShow = false
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
      console.log(val, 'val')
      if (val == '') {
        this.setInfoList[this.checkedIndex].isRequire = false
        this.setInfoList[this.checkedIndex].isRequireDisabled = false
      } else {
        this.setInfoList[this.checkedIndex].isRequire = true
        this.setInfoList[this.checkedIndex].isRequireDisabled = true
      }
      //
      this.setInfoList[this.checkedIndex].check[0].code = '011'
      this.setInfoList[this.checkedIndex].check[0].name = val
    },
    maxCheckedCountChange (val) {
      let hasMaxLimit = this.setInfoList[this.checkedIndex].check.some(checkItem => {
        return checkItem.code == '012'
      })
      if (hasMaxLimit) {
        let maxLimit = this.setInfoList[this.checkedIndex].check.find(checkItem => {
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
      this.numDigit={ code:'009',name:this.setInfoList[this.checkedIndex].numberDigitLimit}
    },
    // 小数位数限制 添加校验
    decimalPlacesLimitChange (setInfoListItem) {
      this.decimalPlaces={ code:'010',name:this.setInfoList[this.checkedIndex].decimalPlacesLimit}
    },
    radioAddOption (setInfoListItem, optionValue) {
      setInfoListItem.options.push(optionValue)
    },
    delRadioOption (setInfoListItem, option, optionIndex) {
      // this.setInfoList.splice(itemIndex,1);
      setInfoListItem.options.splice(optionIndex, 1)
    },
    // 手机号 校验勾选
    mobilePhoneVerifyChange (val) {
      // 005：手机号格式校验(中国大陆)
      // 006：手机号格式校验(港澳台)
      // 007：手机号格式校验(国际)

      this.setInfoList[this.checkedIndex].check = []
      val.forEach(element => {
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
    selectMultipleChange (val) { },
    certificateTypeChange (certificateOptions) {
      console.log(certificateOptions,'certificateOptions');
      // 证件类型不包括居民身份证时 校验code设为空
      if (!certificateOptions.includes('NI')) {
        this.setInfoList[this.checkedIndex].check[0].code = ''
      }
      // 勾选 居民身份证 后, 是最后一项
      if (certificateOptions[certificateOptions.length - 1] == 'NI') {
        this.setInfoList[this.checkedIndex].check[0].code = '001'
      }
      console.log(this.setInfoList[this.checkedIndex])
      let cardCode = this.$t('datadict.certificateType')
      this.theCertificateType=[]
      certificateOptions.forEach(v=>{
        cardCode.forEach(i=>{
          if(i.value == v){
            this.theCertificateType.push(i)
          }
        })
      })
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
    initialize () {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('form.pleaseSelectMeeting'))
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
        .then(response => {
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
     //移除表单信息
     delSetInfoList (itemList, itemIndex) {
      switch (itemList.parentListName) {
        case 'baseInfoList':
          var index = this.baseInfoList.findIndex(item => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.baseInfoList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'contactWayList':
          var index = this.contactWayList.findIndex(item => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.contactWayList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'workInfoList':
          var index = this.workInfoList.findIndex(item => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          this.workInfoList[index].isSee = false
          this.setInfoList.splice(itemIndex, 1)
          break
        case 'customInfoList':
          var index = this.customInfoList.findIndex(item => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          // this.customInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex, 1)
          this.customInfoCount--
          break
        case 'specialInfoList':
          var index = this.specialInfoList.findIndex(item => {
            return item.value == itemList.mapCode
          })
          this.checkedIndex = 0
          // this.specialInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex, 1)
          if (itemList.isPaging) {
            if(this.pageTotal>0){
              this.pagingCount--
              this.pageTotal--
            }else{
              this.pagingCount=0
            }
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
        pageTitle:'',
        placeholder: `请输入${itemList.label}`, // 提示文本
        certificateNumPlaceholder: '请输入您的证件号码',
        surnamePlaceholder: '请输入姓', // 姓-提示文本
        namePlaceholder: '请输入名', // 名-提示文本
        //pageTitlePlaceholder: '请输入分页标题', // 分页标题-提示文本
        nameSplit: false, //姓名拆分
        notAllowEdit: false, // 报名后不允许编辑

        // sexRadioOptions: ['先生','女士'], // 性别选项
        // certificateAllTypes: ['居民身份证', '护照', '军人证', '港澳居民来往内地通行证', '台湾居民来往内地通行证', '港澳台居民居住证', '其他法定有效证件'], // 证件可选类型
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
          this.$message.warning(this.$t('form.customInformationExceeds'))
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
      var index = parentList.findIndex(item => {
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
      // 手机添加校验
      if (itemList.value == 'mobile') {
        obj.isOnly=true
      }
      // 邮箱添加校验
      if (itemList.value == 'email') {
        obj.isOnly=true
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
        obj.options = ['NI']
        this.theCertificateType=[]
        let cardCode = this.$t('datadict.certificateType')
        obj.options.forEach(v=>{
          cardCode.forEach(i=>{
            if(i.value == v){
              this.theCertificateType.push(i)
            }
          })
        })
        obj.check[0].code = '001'
        obj.placeholder = `请选择您的${itemList.label}类型`
      }
      // 分割线
      if (itemList.value == 'crossLine') {
        obj.mapCode = 'crossLine' + this.setInfoList.length
      }

      // 分页
      if (itemList.value == 'paging') {
        obj.isPaging = true
        this.pagingCount++
        this.pageTotal++
        obj.pageTitle=`第${this.pagingCount}页`
        obj.placeholder = `请输入${itemList.label}标题`
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
      console.log(this.clientHeigh,'this.clientHeight')
    }
  },
}
</script>

<style>
.el-form-label__frameBox {
  display: none;
}

.el-upload .el-upload-dragger {
  width: 150px;
  height: 150px;
}

.upload-demo .el-upload--picture-card {
  position: static;
  overflow: inherit;
}
</style>

<style lang="scss" scoped>
.transition-box {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  width: 100%;
  height: 700px;
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
    height: 500px;

    .themeTitle {
      width: 100%;
      height: 150px;
      padding-top: 40px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 30px;
      text-align: center;
      // display: flex;
      // flex-direction: columns;
      // justify-content: center;
      // align-items: center;
    }

    .successInfo {
      position: relative;
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 80px;
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
  padding: 20px 10px;
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

      .centerContent .previewBtnsRow {
        // position: absolute;
        width: 100%;
        height: 100px;
        // bottom: 20px;
        // margin: 20px 0;
        // left: 50%;
        // right: 50%;
        // transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        // flex-direction: row;
        // align-items: center;

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

