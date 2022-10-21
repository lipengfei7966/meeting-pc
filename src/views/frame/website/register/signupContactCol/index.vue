<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <!-- <bs-table ref="bsTable" :mainData="mainData"></bs-table> -->
    <div style="padding: 0 20px">
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="外观设置"></el-step>
          <el-step title="表单设置"></el-step>
          <el-step title="其他设置"></el-step>
        </el-steps>
      </div>
      <div class="formSet">
        <el-card class="formInfo">
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
                  <li class="formInfoItem" v-for="(baseInfoItem, baseInfoIndex) in baseInfoList" :key="baseInfoIndex" v-show="!baseInfoItem.isSee" @click="addSetInfoList( baseInfoItem ,baseInfoList,'baseInfoList')"> {{ baseInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>联系方式</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(contactWayItem, contactWayIndex) in contactWayList" :key="contactWayIndex" v-show="!contactWayItem.isSee" @click="addSetInfoList(contactWayItem,contactWayList,'contactWayList')"> {{ contactWayItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>工作信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(workInfoItem, workInfoIndex) in workInfoList" :key="workInfoIndex" v-show="!workInfoItem.isSee" @click="addSetInfoList(workInfoItem,workInfoList,'workInfoList')"> {{ workInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>自定义信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(customInfoItem, customInfoIndex) in customInfoList" :key="customInfoIndex" v-show="!customInfoItem.isSee" @click="addSetInfoList(customInfoItem,customInfoList,'customInfoList')"> {{ customInfoItem.label }} </li>
                </ul>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <h2>特殊信息</h2>
                </template>
                <ul class="formInfoItems">
                  <li class="formInfoItem" v-for="(specialInfoItem, specialInfoIndex) in specialInfoList" :key="specialInfoIndex" v-show="!specialInfoItem.isSee" @click="addSetInfoList(specialInfoItem,specialInfoList,'specialInfoList')"> {{ specialInfoItem.label }} </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
        <el-card class="formPreview">
          <div>
            <h2 style="text-align:center"> {{ eventName }}</h2>
            <draggable v-model="setInfoList" chosenClass="chosen" forceFallback="true" :scroll="true" animation="300" @start="onStart" @end="onEnd" @update="onUpdate">
              <transition-group>
                <div class="setInfoItem" v-for="(element,index) in setInfoList" :key="element.mapCode" @click="edititem(element,index)">
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
                    <el-radio v-model="setForm.checkedSex" :label="element.sexRadioOptions[0]">{{ element.sexRadioOptions[0] }}</el-radio>
                    <el-radio v-model="setForm.checkedSex" :label="element.sexRadioOptions[1]">{{ element.sexRadioOptions[1] }}</el-radio>
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
                      <el-input style="width: 50%" size="mini" v-model="setForm.detailedAdress" :placeholder="element.detailedAdressPlaceholder"></el-input>
                    </div>
                    <!-- 邮编 -->
                    <div v-if="element.postcodeIsShow" class="addresItem">
                      <span class="setInfoItemlabel"> {{element.postcodeTitle}} : </span>
                      <el-input style="width: 50%" size="mini" v-model="setForm.postcode" :placeholder="element.postcodePlaceholder"></el-input>
                    </div>

                  </div>

                  <!-- 手机号 -->
                  <div v-if="element.mapCode == 'phone' " class="form-item-input">
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
                  <div v-if="element.mapCode == 'secondPhone' " class="form-item-input">
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
                  <div v-if="element.mapCode == 'telephone' " class="form-item-input">
                    <span class="setInfoItemlabel"> {{element.title}} : </span>

                    <div style="width: 80%;display:inline-block;vertical-align: top;">
                      <el-input style="width: 200px" :placeholder="element.areaCodePlaceholder" size="mini" class="input-with-select">
                        <el-select v-if="element.countryCodeIsShow" slot="prepend" style="width: 80px" v-model="setForm.telephoneDefaultCountryCode" placeholder="请选择国际区号">
                          <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="'+'+item.dictItemVal" :value="item.dictItemVal"> </el-option>
                        </el-select>
                      </el-input>
                      <span>
                        - <el-input style="width: 120px" :placeholder="element.placeholder" size="mini"></el-input>
                      </span>
                      <span v-if="element.extensionNumbeIsShow">
                        - <el-input style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
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
                        - <el-input style="width: 120px" :placeholder="element.placeholder" size="mini"></el-input>
                      </span>
                      <span v-if="element.extensionNumbeIsShow">
                        - <el-input style="width: 120px" :placeholder="element.extensionNumberPlaceholder" size="mini"></el-input>
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
                  <div v-if="element.mapCode == 'secondEmail' " class="form-item-input">
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

                  <!-- QQ -->
                  <div v-if="element.mapCode == 'QQ' " class="form-item-input">
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
                      <el-radio-group :style="{width:'100%',display:'flex',flexDirection:element.orientation=='横向'?'row':'column'}">
                        <el-radio v-for="item in element.options" :key="item" :label="item" style="margin: 5px 15px"> {{ item }}</el-radio>
                      </el-radio-group>
                    </div>
                  </div>

                  <!-- 复选框 -->
                  <div v-if="element.systemName == '复选框' " class="form-item-input">
                    <span class="setInfoItemlabel"> {{element.title}} : </span>

                    <div style="width: 50%;display:inline-block;vertical-align: top;">
                      <el-checkbox-group v-model="setForm.checkedOptions" :style="{width:'100%',display:'flex',flexDirection:element.orientation=='横向'?'row':'column'}" :min="element.minCheckedCount || 0" :max="element.maxCheckedCount || element.options.length">
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
                      <el-select style="margin-left: 10px;width:70%" :placeholder="element.placeholder" :multiple="true" v-model="setForm.selectMultipleCheckedOptions" @change="selectMultipleChange">
                        <el-option v-for="item in element.options" :key="item" :label="item" :value="item || '待输入'" :disabled="(element.maxCheckedCount != '' && setForm.selectMultipleCheckedOptions.length >= element.maxCheckedCount) && !setForm.selectMultipleCheckedOptions.includes(item)"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <!-- 附件 -->
                  <div v-if="element.systemName == '附件' " class="form-item-input">
                    <span class="setInfoItemlabel"> {{element.title}} : </span>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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

                  <div style="display: flex;flex-direction: column;justify-content: space-around;">
                    <div style="display: flex;">
                      <el-checkbox v-if="!element.isSpecialInfo" v-model="element.isRequire">必填</el-checkbox>
                      <div class="remove-button el-icon-remove-outline" @click.stop="delSetInfoList(element,index)"></div>
                    </div>

                  </div>

                </div>
              </transition-group>
            </draggable>
          </div>
        </el-card>

        <el-card class="formEdit">
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
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].surnameTitle"></el-input>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].nameTitle"></el-input>
                  <el-input v-if="!setInfoList[checkedIndex].nameSplit" style="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].surnamePlaceholder"></el-input>
                  <el-input v-if="setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].namePlaceholder"></el-input>

                  <el-input v-if="!setInfoList[checkedIndex].nameSplit" size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
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
                  <el-input style="" size="mini" v-model="setInfoList[checkedIndex].sexRadioOptions[0]"></el-input>
                  <el-input style="margin-top: 10px" size="mini" v-model="setInfoList[checkedIndex].sexRadioOptions[1]"></el-input>
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
                  <el-checkbox-group class="certificateOptions" v-model="setInfoList[checkedIndex].options" :min="1">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].certificateAllTypes" :label="item" :key="item"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 校验 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">校验</p>
                  <el-radio-group class="certificateVerify" style="width:100%" v-model="setForm.verifyType" @change="certificateVerifyChange">
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
                  <el-radio-group class="certificateVerify" style="width:100%" v-model="setInfoList[checkedIndex].photeTailor">
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
                  <div style="width:100%">
                    宽: <el-input style="width:70px;margin-right: 10px" size="mini" v-model="setInfoList[checkedIndex].photoLimitWidth" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
                    高: <el-input style="width:70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
                  </div>
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
                  <el-switch v-model="setInfoList[checkedIndex].detailedAdressISShow" @change="detailedAdressIsShowChange"> </el-switch>
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
                  <el-switch v-model="setInfoList[checkedIndex].postcodeIsShow" @change="postcodeIsShowChange"> </el-switch>
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
              <div v-if="setInfoList[checkedIndex].mapCode == 'phone'">
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
                  <el-select style="margin-top:5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="defaultCountryCodeChange" placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 格式校验 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">格式校验</p>
                  <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify" @change="mobilePhoneVerifyChange">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item" :key="item"></el-checkbox>
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
              <div v-if="setInfoList[checkedIndex].mapCode == 'secondPhone'">
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
                  <el-select style="margin-top:5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="secondphoneDefaultCountryCodeChange" placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName" :value="item.dictItemVal"> </el-option>
                  </el-select>
                </div>

                <!-- 格式校验 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">格式校验</p>
                  <el-checkbox-group v-model="setInfoList[checkedIndex].mobilePhoneVerify" @change="mobilePhoneVerifyChange">
                    <el-checkbox v-for="item in setInfoList[checkedIndex].mobilePhoneVerifyOptions" :label="item" :key="item"></el-checkbox>
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
              <div v-if="setInfoList[checkedIndex].mapCode == 'telephone'">
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
                  <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow" v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top:5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="telephoneDefaultCountryCodeChange" placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName" :value="item.dictItemVal"> </el-option>
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
                  <el-input size="mini" v-if="setInfoList[checkedIndex].extensionNumbeIsShow" v-model="setInfoList[checkedIndex].extensionNumberPlaceholder"></el-input>
                </div>

                <!-- 国际区号 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">国际区号</p>
                  <el-switch v-model="setInfoList[checkedIndex].countryCodeIsShow"> </el-switch>
                  <el-select style="margin-top:5px" v-if="setInfoList[checkedIndex].countryCodeIsShow" v-model="setInfoList[checkedIndex].defaultCountryCode" @change="faxDefaultCountryCodeChange" placeholder="设置默认的国家/地区">
                    <el-option v-for="item in countryCodeOptions" :key="item.dictItemVal" :label="item.dictItemName" :value="item.dictItemVal"> </el-option>
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
              <div v-if="setInfoList[checkedIndex].mapCode == 'secondEmail'">
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
              <div v-if="setInfoList[checkedIndex].mapCode == 'QQ'">
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
              <div v-if="setInfoList[checkedIndex].systemName == '短文本' || setInfoList[checkedIndex].systemName == '长文本'">
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
                  <el-input-number style="width:120px; line-height: 32px;" v-model="setInfoList[checkedIndex].wordCountLimit" controls-position="right" :min="1" @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                  <!-- <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input> -->
                </div>
                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 数字 -->
              <div v-if="setInfoList[checkedIndex].systemName == '数字' ">
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
                    <el-input-number style="width:80px; line-height: 32px;" v-model="setInfoList[checkedIndex].numberDigitLimit" controls-position="right" :min="1" @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
                    位
                  </p>
                </div>
                <!-- 限制小数点后位数 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 32px">限制小数点后位数</p>
                  <p>
                    小数点后
                    <el-input-number style="width:80px; line-height: 32px;" v-model="setInfoList[checkedIndex].decimalPlacesLimit" controls-position="right" :min="1" @change="wordCountLimitChange(setInfoList[checkedIndex])"></el-input-number>
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
              <div v-if="setInfoList[checkedIndex].systemName == '单选框' ">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height:34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item,index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项'+(index+1)" style="margin: 5px 5px 5px 0;width:85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px;line-height:28px;cursor:pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex],item,index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
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
              <div v-if="setInfoList[checkedIndex].systemName == '复选框' ">
                <!-- 标题 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">标题</p>
                  <el-input tyle="" size="mini" v-model="setInfoList[checkedIndex].title"></el-input>
                </div>
                <!-- 选项 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height:34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item,index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项'+(index+1)" style="margin: 5px 5px 5px 0;width:85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px;line-height:28px;cursor:pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex],item,index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
                </div>

                <!-- 可选范围 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">可选范围</p>
                  <div style="width: 100%">
                    <p style="margin: 5px 0">
                      <span>至少选择</span>
                      <el-select style="margin-left: 10px;width:70%" v-model="setInfoList[checkedIndex].minCheckedCount" placeholder="请选择" @change="minCheckedCountChange">
                        <el-option v-for="(item,index) in setInfoList[checkedIndex].options" :key="index" :label="(index+1)+'项'" :value="index+1" :disabled="(index+1 > setInfoList[checkedIndex].maxCheckedCount) && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                    <p style="margin: 5px 0">
                      <span>至多选择</span>
                      <el-select style="margin-left: 10px;width:70%" v-model="setInfoList[checkedIndex].maxCheckedCount" placeholder="请选择" @change="maxCheckedCountChange">
                        <el-option v-for="(item,index) in setInfoList[checkedIndex].options" :key="index" :label="(index+1)+'项'" :value="index+1" :disabled="index+1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
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
              <div v-if="setInfoList[checkedIndex].systemName == '下拉列表' ">
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
                  <p class="eidtContentItemTitle" style="line-height:34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item,index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项'+(index+1)" style="margin: 5px 5px 5px 0;width:85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px;line-height:28px;cursor:pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex],item,index)"></span>
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
              <div v-if="setInfoList[checkedIndex].systemName == '下拉复选框' ">
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
                  <p class="eidtContentItemTitle" style="line-height:34px">选项</p>
                  <el-button type="text" @click="batchEditDiologVisible = true">批量新增</el-button>
                  <div class="radioOptions" style="width: 100%">
                    <draggable v-model="setInfoList[checkedIndex].options" chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                      <p v-for="(item,index) in setInfoList[checkedIndex].options" :key="index">
                        <el-input size="mini" v-model="setInfoList[checkedIndex].options[index]" :placeholder="'请输入选项'+(index+1)" style="margin: 5px 5px 5px 0;width:85%"></el-input>
                        <span v-if="setInfoList[checkedIndex].options.length > 1" style="font-size: 20px;line-height:28px;cursor:pointer" class="remove-button el-icon-remove-outline" @click.stop="delRadioOption(setInfoList[checkedIndex],item,index)"></span>
                      </p>
                    </draggable>
                  </div>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex]), ''">添加</el-button>
                  <el-button type="primary" @click="radioAddOption(setInfoList[checkedIndex], '其他')">添加其他</el-button>
                </div>

                <!-- 可选范围 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">可选范围</p>
                  <div style="width: 100%">
                    <p style="margin: 5px 0">
                      <span>至少选择</span>
                      <el-select style="margin-left: 10px;width:70%" v-model="setInfoList[checkedIndex].minCheckedCount" placeholder="请选择" @change="minCheckedCountChange">
                        <el-option v-for="(item,index) in setInfoList[checkedIndex].options" :key="index" :label="(index+1)+'项'" :value="index+1" :disabled="(index+1 > setInfoList[checkedIndex].maxCheckedCount) && setInfoList[checkedIndex].maxCheckedCount !== ''"></el-option>
                        <el-option label="不限" value=""></el-option>
                      </el-select>
                    </p>
                    <p style="margin: 5px 0">
                      <span>至多选择</span>
                      <el-select style="margin-left: 10px;width:70%" v-model="setInfoList[checkedIndex].maxCheckedCount" placeholder="请选择" @change="maxCheckedCountChange">
                        <el-option v-for="(item,index) in setInfoList[checkedIndex].options" :key="index" :label="(index+1)+'项'" :value="index+1" :disabled="index+1 < setInfoList[checkedIndex].minCheckedCount"></el-option>
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
              <div v-if="setInfoList[checkedIndex].systemName == '附件' ">
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
                  <div v-if="setInfoList[checkedIndex].fileTypeLimit" style="width:100%">
                    <p>
                      图片文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].imageIsIndeterminate" v-model="setInfoList[checkedIndex].imageCheckAll" @change="imageCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].imageCheckedTypes" @change="imageCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].imageTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>
                      文档文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].documentIsIndeterminate" v-model="setInfoList[checkedIndex].documentCheckAll" @change="documentCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].documentCheckedTypes" @change="documentCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].documentTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>
                      压缩文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].compressedFileIsIndeterminate" v-model="setInfoList[checkedIndex].compressedFileCheckAll" @change="compressedFileCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].compressedFileCheckedTypes" @change="compressedFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].compressedFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>
                      视频文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].videoFileIsIndeterminate" v-model="setInfoList[checkedIndex].videoFileCheckAll" @change="videoFileCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].videoFileCheckedTypes" @change="videoFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].videoFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                    <p>
                      音频文件: <el-checkbox :indeterminate="setInfoList[checkedIndex].audioFileIsIndeterminate" v-model="setInfoList[checkedIndex].audioFileCheckAll" @change="audioFileCheckAllChange">全选</el-checkbox>
                    </p>
                    <el-checkbox-group v-model="setInfoList[checkedIndex].audioFileCheckedTypes" @change="audioFileCheckChange">
                      <el-checkbox v-for="item in setInfoList[checkedIndex].audioFileTypes" :key="item" :label="item" style="margin: 5px 15px"> {{ item }} </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>

                <!-- 限制文件大小 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle" style="line-height: 32px">限制文件大小</p>
                  <el-input style="width: 130px" class="input-with-select" v-model.number="setInfoList[checkedIndex].fileSizeLimit">
                    <span slot="append"> M </span>
                  </el-input>
                </div>

                <!-- 限制图片尺寸 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">限制图片尺寸</p>
                  <el-switch v-model="setInfoList[checkedIndex].pictureSizeLimit"> </el-switch>
                  <div v-if="setInfoList[checkedIndex].pictureSizeLimit" style="width:100%">
                    宽: <el-input style="width:70px;margin-right: 10px" size="mini" v-model="setInfoList[checkedIndex].photoLimitWidth" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
                    高: <el-input style="width:70px" size="mini" v-model="setInfoList[checkedIndex].photoLimitHeight" @change="photoLimitSizehChange(setInfoList[checkedIndex])"></el-input>
                  </div>
                </div>

                <!-- 报名后不允许编辑 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">报名后不允许编辑</p>
                  <el-switch v-model="setInfoList[checkedIndex].notAllowEdit"> </el-switch>
                </div>
              </div>

              <!-- 日期 -->
              <div v-if="setInfoList[checkedIndex].systemName == '日期' ">
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
              <div v-if="setInfoList[checkedIndex].systemName == '分割线' ">
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">提示文本</p>
                  <el-input size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="setInfoList[checkedIndex].systemName == '分页' ">
                <!-- 提示文本 -->
                <div class="eidtContentItem">
                  <p style="width:100%;text-align:center">[ 第 {{ setInfoList[checkedIndex].pagingIndex }} 页/共 {{ pagingCount }} 页 ]</p>
                </div>
              </div>

              <!-- 说明信息 -->
              <div v-if="setInfoList[checkedIndex].systemName == '说明信息' ">
                <!-- 说明信息 -->
                <div class="eidtContentItem">
                  <p class="eidtContentItemTitle">说明文字</p>
                  <el-input type="textarea" :rows="10" size="mini" v-model="setInfoList[checkedIndex].placeholder"></el-input>
                </div>
              </div>

            </div>

          </div>
        </el-card>
        <!-- <el-button @click="save">保存</el-button> -->
      </div>
    </div>

    <el-dialog title="批量新增" width="500px" :visible.sync="batchEditDiologVisible" :modal-append-to-body="true" :append-to-body="true">
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
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
export default {
  name: 'signupContactCol',
  data() {
    return {
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
        {label: '姓名', value: 'name'},
        {label: '性别', value: 'sex'},
        {label: '证件', value: 'certificate'},
        {label: '照片', value: 'photo'},
      ],
      contactWayList:[
        {label: '地址', value: 'addres'},
        {label: '手机号', value: 'phone'},
        {label: '备用手机', value: 'secondPhone'},
        {label: '固定电话', value: 'telephone'},
        {label: '传真', value: 'fax'},
        {label: '邮箱', value: 'email'},
        {label: '备用邮箱', value: 'secondEmail'},
        {label: '微信号', value: 'wechat'},
        {label: 'QQ号', value: 'QQ'},
      ],
      workInfoList:[
        {label: '公司', value: 'company'},
        {label: '部门', value: 'department'},
        {label: '职位', value: 'position'},
      ],
      customInfoList:[
        {label: '短文本', value: 'input'},
        {label: '长文本', value: 'textarea'},
        {label: '数字', value: 'number'},
        {label: '单选框', value: 'radio'},
        {label: '复选框', value: 'checkbox'},
        {label: '下拉列表', value: 'select'},
        {label: '下拉复选框', value: 'selects'},
        {label: '附件', value: 'file'},
        {label: '日期', value: 'date'},
      ],
      specialInfoList: [
        {label: '分割线', value: 'crossLine'},
        {label: '分页', value: 'paging'},
        {label: '说明信息', value: 'explainInfo'},
      ],
      test: '',
      checkAll: false,
      isIndeterminate: true,
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

      customInfoCount: 0, // 自定义信息数量
      pagingCount: 0, // 分页数量
      eventName: '', // 会议名称
      drag: false,
      countryCodeOptions: [], // 国际区号下拉选项  dictItemName - dictItemVal
      setInfoList: [], // 选中的配置信息列表
      batchEditOptions: '', // 批量编辑信息
      // 表格高度
      formSetHeight: 0,
      batchEditDiologVisible: false,
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
      checkedIndex: 0, // 选中预览item下标
    }
  },
  components: {
    draggable,
  },
  mounted() {
    // 获取国际区号数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'COUNTRY_CODE', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      // debugger
      this.countryCodeOptions = res.data
      // dictItemName \ dictItemVal
    })
  },
  watch:{
    customInfoCount(newVal ,oldVal) {
      if (newVal > 0) {
        let coustomInfoIndex = 0;
        this.setInfoList.forEach((item,index) => {
          if(item.isCoustomInfo){
            coustomInfoIndex ++;
            item.mapCode = 'RESERVED_STR' + coustomInfoIndex
          }
        })
      }
    },
    pagingCount(newVal ,oldVal) {
      if (newVal > 0) {
        let pagingIndex = 0;
        this.setInfoList.forEach((item,index) => {
          if(item.isPaging){
            pagingIndex++;
            item.pagingIndex = pagingIndex;
            item.mapCode = 'paging' + pagingIndex
          }
        })
      }
    },

  },
  methods: {
    save(){
      console.log(this.setInfoList)
    },
    //移除表单信息
    delSetInfoList(itemList,itemIndex){
      // debugger
      switch (itemList.parentListName) {
        case 'baseInfoList':
          var index = this.baseInfoList.findIndex(item=>{
            return item.value == itemList.mapCode;
          })
          this.checkedIndex = 0
          this.baseInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex,1);
          break;
        case 'contactWayList':
          var index = this.contactWayList.findIndex(item=>{
            return item.value == itemList.mapCode;
          })
          this.checkedIndex = 0
          this.contactWayList[index].isSee = false;
          this.setInfoList.splice(itemIndex,1);
          break;
        case 'workInfoList':
          var index = this.workInfoList.findIndex(item=>{
            return item.value == itemList.mapCode;
          })
          this.checkedIndex = 0
          this.workInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex,1);
          break;
        case 'customInfoList':
          var index = this.customInfoList.findIndex(item=>{
            return item.value == itemList.mapCode;
          })
          this.checkedIndex = 0
          // this.customInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex,1);
          this.customInfoCount --;
          break;
        case 'specialInfoList':
          var index = this.specialInfoList.findIndex(item=>{
            return item.value == itemList.mapCode;
          })
          this.checkedIndex = 0
          // this.specialInfoList[index].isSee = false;
          this.setInfoList.splice(itemIndex,1);
          if(itemList.isPaging){
            this.pagingCount --;
          }
          break;
        default:
          break;
      }
      console.log(this.setInfoList)
    },
    // 添加表单信息
    addSetInfoList(itemList,parentList,parentListName){   //当前点击的tag   当前点击tag的数组
      // placeholder 输入框提示词  content 输入的值  isSee 是否在表单中的布尔值
      // var obj = {'label':itemList.label,'value':itemList.value,content:'','placeholder':`请输入${itemList.label}`,'content':'','isSee':true,'parentListName':parentListName};
      var obj = {
        systemName: itemList.label,    // 系统名称
        mapCode: itemList.value, // 表单绑定字段
        check:[{ code: '', name: ''}], // 校验类型 { code: '', name: ''}
        mapBase: parentListName == 'customInfoList'? 1 : 2, // 1：自定义属性 ，2：基础属性
        isSee: true,
        isCoustomInfo: false, // 是否是自定义信息
        isSpecialInfo: false, // 是否是特殊信息
        isPaging: false, // 是否是分页
        pagingIndex: 0, // 分页顺序
        parentListName: parentListName,
        isRequire: false, // 是否必填
        title: itemList.label, // 标题
        surnameTitle: '姓', // 姓title
        nameTitle: '名', // 名title
        placeholder: `请输入${itemList.label}提示文本`, // 提示文本
        surnamePlaceholder: '请输入姓', // 姓-提示文本
        namePlaceholder: '请输入名', // 名-提示文本
        nameSplit: false, //姓名拆分
        notAllowEdit: false, // 报名后不允许编辑

        sexRadioOptions: ['先生','女士'], // 性别选项
        certificateAllTypes: ['居民身份证','护照','军人证','港澳居民来往内地通行证','台湾居民来往内地通行证','港澳台居民居住证','其他法定有效证件'], // 证件可选类型
        certificatecheckedTypes: [], // 证件已选类型
        certificateVerifyOptions: ['号码逻辑校验', '身份证实名校验','人像实名校验'], //校验选项
        certificateVerify: '号码逻辑校验', // 选中校验方式
        isOnly: false, // 唯一
        photeTailorOptions: ['手动压缩裁剪','自动裁剪'], //照片裁剪选项
        photeTailor: '自动压缩裁剪', // 选中照片裁剪方式
        photoLimitWidth: '', // 限制照片尺寸-宽
        photoLimitHeight: '', // 限制照片尺寸-高
        nationIsShow: false, // 是否展示国家
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
        countryCodeIsShow: true, // 国际区号是否展示
        defaultCountryCode: '', // 默认国际区号
        mobilePhoneVerifyOptions: ['中国大陆','港澳台','国际'], // 格式校验选项
        mobilePhoneVerify:[], // 格式校验选中选项
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
        options: ["选项一","选项二"], // 选项
        radioOptions: [], // 单选框选项
        orientations: ['横向','纵向'], // 排列方向选项
        orientation: '横向', // 排列方向
        minCheckedCount: '', // 最少选择数量
        maxCheckedCount: '', // 最多选择数量
        fileTypeLimit: false, // 是否限制文件类型
        pictureSizeLimit: false, // 是否限制图片尺寸

        imageTypes: ['.gif','.png','.jpg','.jpeg','.bmp'], // 图片文件类型
        imageCheckedTypes:[], // 图片文件选中类型
        imageCheckAll: false, // 图片是否全选
        imageIsIndeterminate: false, // 图片indeterminate 状态

        documentTypes: ['.doc','.docx','.pdf','.xls','.xlsx','.ppt','.pptx','.txt'], // 文档类型
        documentCheckedTypes: [], // 文档选中类型
        documentCheckAll: false, // 文档是否全选
        documentIsIndeterminate: false, // 文档indeterminate 状态

        compressedFileTypes: ['.zip','.rar','.gzi'], // 压缩文件类型
        compressedFileCheckedTypes: [], // 压缩文件选中类型
        compressedFileCheckAll: false, // 压缩文件是否全选
        compressedFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        videoFileTypes: ['.mp4','.m3u8','.flv','.f4v','.webm','.mov','.m4v','.3gp','.avi','.wmv'], // 视频文件类型
        videoFileCheckedTypes: [], // 视频文件选中类型
        videoFileCheckAll: false, // 压缩文件是否全选
        videoFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        audioFileTypes: ['.mp3','.wam','.wav','.amr','.m4a','.aac'],// 音频文件类型
        audioFileCheckedTypes: [],// 音频文件选中类型
        audioFileCheckAll: false, // 压缩文件是否全选
        audioFileIsIndeterminate: false, // 压缩文件indeterminate 状态

        allFileTypes:[], // 允许上传文件类型合集
        fileSizeLimit: 50, // 文件大小限制
        explain: '', // 说明文字
      }

      if(parentListName == 'customInfoList'){
        this.customInfoCount ++ ;
        if(this.customInfoCount > 40){
          this.$message.warning('新增自定义信息数量超出最大限制')
          return
        }
        obj.mapCode = 'RESERVED_STR' + this.customInfoCount
        obj.isCoustomInfo = true;
        obj.title = '您的标题';
        if(itemList.value == 'input'){
          this.setForm['input'+this.customInfoCount] = '';
        }
        if(itemList.value == 'textarea'){
          obj.wordCountLimit = 200;
          // this.setForm['textarea'+this.customInfoCount] = '';
        }
      }
      if(parentListName == 'specialInfoList'){
        obj.isSpecialInfo = true;
      }
      var index = parentList.findIndex(item => {
        return item.value == itemList.value
      })

      // 分割线
      // debugger
      if( itemList.value == "certificate"){
        obj.options = ['居民身份证'];
      }
      // 分割线
      if( itemList.value == "crossLine"){
        obj.mapCode = 'crossLine' + this.setInfoList.length;
      }

      // 分页
      if( itemList.value == "paging"){
        obj.isPaging = true;
        this.pagingCount ++;
      }

      // 说明信息
      if( itemList.value == "explainInfo"){
        obj.mapCode = 'explainInfo' + this.setInfoList.length;
      }

      if(parentListName == 'baseInfoList' || parentListName == 'contactWayList' || parentListName == 'workInfoList'){
        parentList[index].isSee = true;
      }
      this.setInfoList.push(obj);
    },
    selectMultipleChange(val){
      // debugger
    },
    numberChange(val){
      // numberDigitLimit: 4, // 数字位数限制
      // decimalPlacesLimit: 4, // 小数点位数限制.
      let integer = val.split('.')[0] || ''
      let decimal = val.split('.')[1] || ''
      if(Number(integer) >= Math.pow(10,this.setInfoList[this.checkedIndex].numberDigitLimit)){
        this.test = this.test
      }
      if(decimal.length > this.setInfoList[this.checkedIndex].decimalPlacesLimit){
        this.test = this.test
        return
      }
      // debugger
    },

  // 附件-文件上传限制类型 勾选 ---- 开始
    imageCheckAllChange(val) {
      this.setInfoList[this.checkedIndex].imageCheckedTypes = val? this.setInfoList[this.checkedIndex].imageTypes : []
      this.setInfoList[this.checkedIndex].imageIsIndeterminate = false;
    },
    imageCheckChange(value) {
      let checkedCount = value.length;
      this.setInfoList[this.checkedIndex].imageCheckAll = checkedCount === this.setInfoList[this.checkedIndex].imageTypes.length;
      this.setInfoList[this.checkedIndex].imageIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].imageTypes.length;
    },
    documentCheckAllChange(val) {
      this.setInfoList[this.checkedIndex].documentCheckedTypes = val? this.setInfoList[this.checkedIndex].documentTypes : []
      this.setInfoList[this.checkedIndex].documentIsIndeterminate = false;
    },
    documentCheckChange(value) {
      let checkedCount = value.length;
      this.setInfoList[this.checkedIndex].documentCheckAll = checkedCount === this.setInfoList[this.checkedIndex].documentTypes.length;
      this.setInfoList[this.checkedIndex].documentIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].documentTypes.length;
    },
    compressedFileCheckAllChange(val) {
      this.setInfoList[this.checkedIndex].compressedFileCheckedTypes = val? this.setInfoList[this.checkedIndex].compressedFileTypes : []
      this.setInfoList[this.checkedIndex].compressedFileIsIndeterminate = false;
    },
    compressedFileCheckChange(value) {
      let checkedCount = value.length;
      this.setInfoList[this.checkedIndex].compressedFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].compressedFileTypes.length;
      this.setInfoList[this.checkedIndex].compressedFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].compressedFileTypes.length;
    },
    videoFileCheckAllChange(val) {
      this.setInfoList[this.checkedIndex].videoFileCheckedTypes = val? this.setInfoList[this.checkedIndex].videoFileTypes : []
      this.setInfoList[this.checkedIndex].videoFileIsIndeterminate = false;
    },
    videoFileCheckChange(value) {
      let checkedCount = value.length;
      this.setInfoList[this.checkedIndex].videoFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].videoFileFileTypes.length;
      this.setInfoList[this.checkedIndex].videoFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].videoFileTypes.length;
    },
    audioFileCheckAllChange(val) {
      this.setInfoList[this.checkedIndex].audioFileCheckedTypes = val? this.setInfoList[this.checkedIndex].audioFileTypes : []
      this.setInfoList[this.checkedIndex].audioFileIsIndeterminate = false;
    },
    audioFileCheckChange(value) {
      let checkedCount = value.length;
      this.setInfoList[this.checkedIndex].audioFileCheckAll = checkedCount === this.setInfoList[this.checkedIndex].audioFileFileTypes.length;
      this.setInfoList[this.checkedIndex].audioFileIsIndeterminate = checkedCount > 0 && checkedCount < this.setInfoList[this.checkedIndex].audioFileTypes.length;
    },
  // 附件-文件上传限制类型 勾选 --- 结束

    // 地址 -- 城市 开关回调
    cityIsShowChange(val){
      if(val){
        this.setInfoList[this.checkedIndex].provinceIsShow = true;
      }
    },
    // 地址 -- 区/县 开关回调
    countyIsShowChange(val){
      if(val){
        this.setInfoList[this.checkedIndex].provinceIsShow = true;
        this.setInfoList[this.checkedIndex].cityIsShow = true;
      }
    },
    // 地址 -- 详细地址 开关回调
    detailedAdressIsShowChange(val){
      if(val){
        this.setInfoList[this.checkedIndex].provinceIsShow = true;
        this.setInfoList[this.checkedIndex].cityIsShow = true;
        this.setInfoList[this.checkedIndex].countyIsShow = true;
      }
    },
    // 地址 -- 邮编 开关回调
    postcodeIsShowChange(val){
      if(val){
        this.setInfoList[this.checkedIndex].provinceIsShow = true;
        this.setInfoList[this.checkedIndex].cityIsShow = true;
        this.setInfoList[this.checkedIndex].countyIsShow = true;
        this.setInfoList[this.checkedIndex].detailedAdressISShow = true;
      }
    },

    // 限制图片尺寸修改
    photoLimitSizehChange(setInfoListItem){
      setInfoListItem.check.code = '004'
      setInfoListItem.check.name = setInfoListItem.photoLimitWidth + ',' + setInfoListItem.photoLimitHeight
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
    minCheckedCountChange(val){
      debugger
      this.setInfoList[this.checkedIndex].check[0].code = '011';
      this.setInfoList[this.checkedIndex].check[0].name = val;
    },
    maxCheckedCountChange(val){
      let hasMaxLimit = this.setInfoList[this.checkedIndex].check.some(checkItem => {
        return checkItem.code == '012'
      })
      if(hasMaxLimit){
        let maxLimit = this.setInfoList[this.checkedIndex].check.find(checkItem => {
          return checkItem.code == '012'
        })
        maxLimit.name = val;
      }else{
        this.setInfoList[this.checkedIndex].check.push({code: '012', name: val})
      }
      console.log(this.setInfoList[this.checkedIndex].check)
      debugger
    },
    batchEditOptionsComfirm(){
      // debugger
      let tempArr = this.batchEditOptions.split('\n')
      this.setInfoList[this.checkedIndex].options = this.setInfoList[this.checkedIndex].options.concat(tempArr)
      // this.setInfoList[this.checkedIndex].options.forEach((option,optionIdnex) => {
      //   this.setInfoList[this.checkedIndex].options[optionIdnex] = tempArr[optionIdnex]
      // })
      this.batchEditDiologVisible = false;
      this.batchEditOptions = '';
      // console.log(this.batchEditOptions)
    },
    radioAddOption(setInfoListItem, optionValue){
      setInfoListItem.options.push(optionValue)
    },
    delRadioOption(setInfoListItem, option, optionIndex){
      debugger
      // this.setInfoList.splice(itemIndex,1);
      setInfoListItem.options.splice(optionIndex,1);
    },
    // 证件类型勾选
    certificateVerifyChange(val){
      this.setInfoList[this.checkedIndex].check[0].code = val;
    },
    // 国际区号默认国家/地区
    defaultCountryCodeChange(val){
      this.setForm.defaultCountryCode = val;
    },
    secondphoneDefaultCountryCodeChange(val){
      this.setForm.secondPhonedefaultCountryCode = val;
    },
    telephoneDefaultCountryCodeChange(val){
      this.setForm.telephoneDefaultCountryCode = val;
    },
    faxDefaultCountryCodeChange(val){
      this.setForm.faxDefaultCountryCode = val;
    },
    wordCountLimitChange(setInfoListItem){
      setInfoListItem.check[0].code = '008'
      setInfoListItem.check[0].name = setInfoListItem.wordCountLimit
      console.log(this.setInfoList)
    },
    // 手机号 校验勾选
    mobilePhoneVerifyChange(val){
      // 005：手机号格式校验(中国大陆)
      // 006：手机号格式校验(港澳台)
      // 007：手机号格式校验(国际)
      val.forEach(element => {
        if(element == "中国大陆"){
          this.setInfoList[this.checkedIndex].check[0].code = '005'
        }else if(element == "港澳台"){
          this.setInfoList[this.checkedIndex].check[0].code = '006'
        }else if(element == "国际"){
          this.setInfoList[this.checkedIndex].check[0].code = '007'
        }
      });
    },
    onChangeAll(params) {
      // 会议编码 params.code
      // 会议名称 params.name
      this.eventName = params.name
      // debugger
      // this.$refs.bsTable.doRefresh()
    },
    initialize() {
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
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.$refs.bsTable.doRefresh()
        })
    },
    edititem(checkedItem, checkedIndex){
      // debugger
      this.checkedIndex = checkedIndex;
    },
     //开始拖拽事件
    onStart(){
      this.drag=true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag=false;
    },
    // 拖拽变换位置时触发的事件
    onUpdate(){
      let pagingIndex = 0;
      this.setInfoList.forEach((item,index) => {
        if(item.isPaging){
          pagingIndex++;
          item.pagingIndex = pagingIndex;
          item.mapCode = 'paging' + pagingIndex
        }
      })
    }
    // 计算列表高度
    // tableComputed() {
    //     const elHead = document.getElementById('elHead')
    //     let getElHeadHeight = 0
    //     if (this.hasLayout) {
    //       this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 188 : this.clientHeight - getElHeadHeight - 158) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 172 : this.clientHeight - getElHeadHeight - 142
    //     } else {
    //       this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 97 : this.clientHeight - getElHeadHeight - 67) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 77 : this.clientHeight - getElHeadHeight - 47
    //     }
    //     if (this.mainData.isTabBar) {
    //       this.formSetHeight = this.formSetHeight - 30
    //     }
    // },
  }
}
</script>

<style lang="scss">
.steps {
  width: 80%;
  margin: 0 auto;
}
.formSet {
  display: flex;
  justify-content: space-between;
  min-width: 1250px;
  .formInfo {
    width: 20%;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }
    .formInfoItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
      // width: 100px;
      text-align: left;
      margin-right: 10px;
    }
  }
  .formEdit {
    width: 20%;
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
</style>

<style scoped>
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