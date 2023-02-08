<template>
  <div class="container">
    <el-form ref="resultSetForm" :validate-on-rule-change="false" @submit.native.prevent label-position="right" :rules="resultSetForm" label-width="200px" :model="resultSetForm" class="resultSetForm">
      <el-form-item :label="$t('result.registrationReview')" label-width="100px" prop="isNeedApprove">
        <el-radio-group v-model="resultSetForm.isNeedApprove">
          <el-radio label="0">{{$t('result.noNeedtoAudit')}}</el-radio>
          <el-radio label="1">{{$t('result.needtoaudit')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="transition-box" v-show="drawer">
        <div class="content">
          <div class="pageStatus" @click="drawerStatusHandle(false)" style="cursor: pointer">{{$t('result.mobile')}}</div>
          <div class="centerContent">
            <div class="themeTitle">
              <h2>{{ getActiveObj.eventName ? getActiveObj.eventName : '--' }}</h2>
              <h3>{{ getActiveObj.eventBeginTime ? getActiveObj.eventBeginTime : '--' }}/{{getActiveObj.eventEndTime ? getActiveObj.eventEndTime : '--'}}</h3>
              <h3>{{ getActiveObj.eventPlace ? getActiveObj.eventPlace : '--' }}</h3>
            </div>
            <div class="successInfo" style="display:flex;justify-content:center">
              <div style="position:absolute;width:80%;height:100%;text-align:center;z-index:2">
                <h3 style="margin:20px">{{ resultSetForm.successTitle }}</h3>
                <pre> {{ resultSetForm.successDescribe }} </pre>
              </div>

            </div>
            <div class="previewBtnsRow" style="display: flex;justify-content: center;">
              <el-button v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="transition-box" v-show="auditStatusDrawer">
        <div class="content">
          <div class="pageStatus" @click="auditStatusDrawerStatusHandle(false)" style="cursor: pointer">{{$t('result.mobile')}}</div>
          <div class="centerContent">
            <div class="themeTitle">
              <h2>{{ getActiveObj.eventName ? getActiveObj.eventName : '--' }}</h2>
              <h3>{{ getActiveObj.eventBeginTime ? getActiveObj.eventBeginTime : '--' }}/{{getActiveObj.eventEndTime ? getActiveObj.eventEndTime : '--'}}</h3>
              <h3>{{ getActiveObj.eventPlace ? getActiveObj.eventPlace : '--' }}</h3>
            </div>
            <div class="successInfo" style="display:flex;justify-content:center">
              <div style="position:absolute;width:80%;height:100%;text-align:center;z-index:2">
                <h3 style="margin:20px">{{ resultSetForm.waitReviewTitle }}</h3>
                <pre> {{ resultSetForm.waitReviewDescribe }} </pre>
              </div>

            </div>
            <div class="previewBtnsRow" style="display: flex;justify-content: center;">
              <el-button v-for="(btnItem, btnIndex) in resultSetForm.waitReviewButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="transition-box" v-show="noPassDrawer">
        <div class="content">
          <div class="pageStatus" @click="noPassDrawerStatusHandle(false)" style="cursor: pointer">{{$t('result.mobile')}}</div>
          <div class="centerContent">
            <div class="themeTitle">
              <h2>{{ getActiveObj.eventName ? getActiveObj.eventName : '--' }}</h2>
              <h3>{{ getActiveObj.eventBeginTime ? getActiveObj.eventBeginTime : '--' }}/{{getActiveObj.eventEndTime ? getActiveObj.eventEndTime : '--'}}</h3>
              <h3>{{ getActiveObj.eventPlace ? getActiveObj.eventPlace : '--' }}</h3>
            </div>
            <div class="successInfo" style="display:flex;justify-content:center">
              <div style="position:absolute;width:80%;height:100%;text-align:center;z-index:2">
                <h3 style="margin:20px">{{ resultSetForm.noPassTitle }}</h3>
                <pre> {{ resultSetForm.noPassDescribe }} </pre>
              </div>

            </div>
            <div class="previewBtnsRow" style="display: flex;justify-content: center;">
              <el-button v-for="(btnItem, btnIndex) in resultSetForm.noPassButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="resultSetItem">
        <div class="setItemTitle">
          <h3>1、{{$t('result.registrationSuccess')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ successIsShow ? $t('result.fewer') : $t('result.expand') }}</span>
            <el-button type="text" @click="successIsShow = !successIsShow" style="vertical-align: middle; padding: 0">
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
                <h3>{{$t('result.preview')}}</h3>
              </div>
              <div class="pageStatus" @click="drawerStatusHandle(true)" style="cursor: pointer">{{$t('result.computer')}}</div>
              <div class="successPreview">
                <!-- 背景图 -->
                <img v-if="resultSetForm.successBackground" :src="resultSetForm.successBackground" alt="" style="position: absolute; left:0;top:50px;width: 100%; height: 100%;" />
                <!-- banner 图 -->
                <div style="position: absolute;left:0;top:50px;z-index:2;width: 100%;">
                  <el-image v-if="resultSetForm.successBanner" style="width: 100%;text-align:center" :src="resultSetForm.successBanner" fit="fill"></el-image>
                  <h3 style="text-align: center;">
                    {{ resultSetForm.successTitle }}</h3>
                  <pre style=""> {{ resultSetForm.successDescribe }} </pre>
                </div>
                <div class="previewBtns">
                  <el-button v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                </div>
              </div>
            </el-card>

            <div class="successFormItem">
              <el-form-item :label="$t('result.tipTopics')+':'" prop="successTitle" :rules="[{ required: true, message: $t('result.pleaseenterapromptsubject'), trigger: 'blur' }]">
                <el-input v-model="resultSetForm.successTitle" size="mini" :placeholder="$t('result.pleaseenterapromptsubject')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('result.describe')+':'" prop="successDescribe">
                <el-input type="textarea" :rows="4" size="mini" v-model="resultSetForm.successDescribe" :placeholder="$t('result.pleaseenterthedescriptiontext')" maxlength="200" show-word-limit>
                </el-input>

              </el-form-item>
              <el-form-item label="Banner:" prop="successBanner" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(successBannerSelectRow)=='{}'" type="primary" @click="tempHandleFn('successBanner')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(successBannerSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ successBannerSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(successBannerSelectRow)!='{}'" type="danger" @click="delectFn('successBanner')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(successBannerSelectRow)!='{}'" type="primary" @click="tempHandleFn('successBanner')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.backgroundImage')+':'" prop="successBackground" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(successBackgroundSelectRow)=='{}'" type="primary" @click="tempHandleFn('successBackground')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(successBackgroundSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ successBackgroundSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(successBackgroundSelectRow)!='{}'" type="danger" @click="delectFn('successBackground')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(successBackgroundSelectRow)!='{}'" type="primary" @click="tempHandleFn('successBackground')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.whethertoskiptheresultspageaftersubmission')+':'" prop="successIsJumpCurrentPage">
                <div style="display: flex">
                  <div>
                    <el-radio v-model="resultSetForm.successIsJumpCurrentPage" label="0">{{$t('result.dontskip')}}</el-radio>
                    <el-radio v-model="resultSetForm.successIsJumpCurrentPage" label="1">{{$t('result.skip')}}</el-radio>
                  </div>
                  <div style="display: inline-block" v-show="resultSetForm.successIsJumpCurrentPage == '1'">
                    <el-form-item :label="$t('result.jumptothepage')+':'" label-width="100px" prop="successJumpPage" style="margin-bottom: 0px">
                      <el-select v-model="resultSetForm.successJumpPage" :placeholder="$t('result.pleaseselectthepagetogoto')">
                        <el-option v-for="item in buttonCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-form-item label="" prop="successOutPageUrl" style="margin-bottom: 0px" v-if="resultSetForm.successJumpPage == '7'">
                        <el-input v-model="resultSetForm.successOutPageUrl" size="mini" :placeholder="$t('result.Pleaseentertheexternallink')"></el-input>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </div>
              </el-form-item>

              <el-form-item :label="$t('result.buttonSettings')+':'" v-show="resultSetForm.successIsJumpCurrentPage=='0'">
                <div v-for="(btnItem, btnIndex) in resultSetForm.successButtonList" :key="btnIndex" style="display: flex">
                  <el-form-item label="" :prop="'successButtonList.' + btnIndex + '.name'">
                    <el-input v-model="btnItem.name" size="mini" :placeholder="$t('result.pleaseenteranameforthebutton')"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('result.function')+':'" label-width="100px" :prop="'successButtonList.' + btnIndex + '.value'">
                    <el-select v-model="btnItem.value" :placeholder="$t('result.pleaseselectthepagetogoto')">
                      <el-option v-for="item in skipCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="remove-button el-icon-circle-plus-outline" @click.stop="addBtnSuccess(resultSetForm.successButtonList, btnIndex)"></div>
                  <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0" @click.stop="delBtnSuccess(resultSetForm.successButtonList, btnIndex)"></div>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>

      <div class="resultSetItem" v-if="resultSetForm.isNeedApprove === '1'">
        <div class="setItemTitle">
          <h3>2、{{$t('result.pendingReview')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ waitReviewIsShow ? $t('result.fewer') : $t('result.expand') }}</span>
            <el-button type="text" @click="waitReviewIsShow = !waitReviewIsShow" style="vertical-align: middle; padding: 0">
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
                <h3>{{$t('result.preview')}}</h3>
              </div>
              <div class="pageStatus" @click="auditStatusDrawerStatusHandle(true)" style="cursor: pointer">{{$t('result.computer')}}</div>
              <div class="waitReviewPreview">
                <!-- 背景图 -->
                <img v-if="resultSetForm.waitReviewBackground" :src="resultSetForm.waitReviewBackground" alt="" style="position: absolute; left:0;top:50px;width: 100%; height: 100%;" />
                <!-- banner 图 -->
                <div style="position: absolute;left:0;top:50px;z-index:2;width: 100%;">
                  <el-image v-if="resultSetForm.waitReviewBanner" style="width: 100%;text-align: center;" :src="resultSetForm.waitReviewBanner" fit="fill"></el-image>
                  <h3 style="text-align:center">{{ resultSetForm.waitReviewTitle }}</h3>
                  <pre> {{ resultSetForm.waitReviewDescribe }} </pre>
                </div>
                <div class="previewBtns">
                  <el-button v-for="(btnItem, btnIndex) in resultSetForm.waitReviewButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                </div>
              </div>
            </el-card>

            <div class="waitReviewFormItem">
              <el-form-item :label="$t('result.tipTopics')+':'" prop="waitReviewTitle" :rules="[{ required: true, message: $t('result.pleaseenterapromptsubject'), trigger: 'blur' }]">
                <el-input v-model="resultSetForm.waitReviewTitle" size="mini" :placeholder="$t('result.pleaseenterapromptsubject')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('result.describe')+':'" prop="waitReviewDescribe">
                <el-input v-model="resultSetForm.waitReviewDescribe" type="textarea" :rows="4" size="mini" :placeholder="$t('result.pleaseenterthedescriptiontext')"></el-input>
              </el-form-item>
              <el-form-item label="Banner:" prop="waitReviewBanner" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(waitReviewBannerSelectRow)=='{}'" type="primary" @click="tempHandleFn('waitReviewBanner')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(waitReviewBannerSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ waitReviewBannerSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(waitReviewBannerSelectRow)!='{}'" type="danger" @click="delectFn('waitReviewBanner')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(waitReviewBannerSelectRow)!='{}'" type="primary" @click="tempHandleFn('waitReviewBanner')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.backgroundImage')+':'" prop="waitReviewBackground" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(waitReviewBackgroundSelectRow)=='{}'" type="primary" @click="tempHandleFn('waitReviewBackground')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(waitReviewBackgroundSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ waitReviewBackgroundSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(waitReviewBackgroundSelectRow)!='{}'" type="danger" @click="delectFn('waitReviewBackground')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(waitReviewBackgroundSelectRow)!='{}'" type="primary" @click="tempHandleFn('waitReviewBackground')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.whethertoskiptheresultspageaftersubmission')+':'" prop="waitReviewIsJumpCurrentPage">
                <div style="display: flex">
                  <div>
                    <el-radio v-model="resultSetForm.waitReviewIsJumpCurrentPage" label="0">{{$t('result.dontskip')}}</el-radio>
                    <el-radio v-model="resultSetForm.waitReviewIsJumpCurrentPage" label="1">{{$t('result.skip')}}</el-radio>
                  </div>
                  <div style="display: inline-block" v-show="resultSetForm.waitReviewIsJumpCurrentPage == '1'">
                    <el-form-item :label="$t('result.jumptothepage')+':'" label-width="100px" prop="waitReviewJumpPage" style="margin-bottom: 0px">
                      <el-select v-model="resultSetForm.waitReviewJumpPage" :placeholder="$t('result.pleaseselectthepagetogoto')">
                        <el-option v-for="item in buttonCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-form-item label="" prop="waitReviewOutPageUrl" style="margin-bottom: 0px">
                        <el-input v-model="resultSetForm.waitReviewOutPageUrl" size="mini" v-if="resultSetForm.waitReviewJumpPage == '7'" :placeholder="$t('result.Pleaseentertheexternallink')"></el-input>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </div>
              </el-form-item>

              <el-form-item :label="$t('result.buttonSettings')+':'" v-show="resultSetForm.waitReviewIsJumpCurrentPage=='0'">
                <div v-for="(btnItem, btnIndex) in resultSetForm.waitReviewButtonList" :key="btnIndex" style="display: flex">
                  <el-form-item label="" :prop="'waitReviewButtonList.' + btnIndex + '.name'">
                    <el-input v-model="btnItem.name" size="mini" :placeholder="$t('result.pleaseenteranameforthebutton')"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('result.function')+':'" label-width="100px" :prop="'waitReviewButtonList.' + btnIndex + '.value'">
                    <el-select v-model="btnItem.value" :placeholder="$t('result.pleaseselectthepagetogoto')">
                      <el-option v-for="item in skipCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="remove-button el-icon-circle-plus-outline" @click.stop="addBtnWaitReview(resultSetForm.waitReviewButtonList, btnIndex)"></div>
                  <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0" @click.stop="delBtnWaitReview(resultSetForm.waitReviewButtonList, btnIndex)"></div>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>

      <div class="resultSetItem" v-if="resultSetForm.isNeedApprove === '1'">
        <div class="setItemTitle">
          <h3>3、{{$t('result.noPass')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ noPassIsShow ? $t('result.fewer') : $t('result.expand') }}</span>
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
                <h3>{{$t('result.preview')}}</h3>
              </div>
              <div class="pageStatus" @click="noPassDrawerStatusHandle(true)" style="cursor: pointer">{{$t('result.computer')}}</div>
              <div class="noPassPreview">
                <!-- 背景图 -->
                <img v-if="resultSetForm.noPassBackground" :src="resultSetForm.noPassBackground" alt="" style="position: absolute; left:0;top:60px;width: 100%; height: 100%;" />
                <!-- banner 图 -->
                <div style="position: absolute;left:0;top:60px;z-index:2;width: 100%;">
                  <el-image v-if="resultSetForm.noPassBanner" style="width: 100%;text-align:center" :src="resultSetForm.noPassBanner" fit="fill"></el-image>
                  <h3 style="text-align: center">{{ resultSetForm.noPassTitle }}</h3>
                  <pre> {{ resultSetForm.noPassDescribe }} </pre>
                </div>
                <div class="previewBtns">
                  <el-button v-for="(btnItem, btnIndex) in resultSetForm.noPassButtonList" :key="btnIndex" v-show="btnItem.name" type="primary"> {{ btnItem.name }}</el-button>
                </div>
              </div>
            </el-card>

            <div class="noPassFormItem">
              <el-form-item :label="$t('result.tipTopics')+':'" prop="noPassTitle" :rules="[{ required: true, message: $t('result.pleaseenterapromptsubject'), trigger: 'blur' }]">
                <el-input v-model="resultSetForm.noPassTitle" size="mini" :placeholder="$t('result.pleaseenterapromptsubject')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('result.describe')+':'" prop="noPassDescribe">
                <el-input v-model="resultSetForm.noPassDescribe" type="textarea" :rows="4" size="mini" :placeholder="$t('result.pleaseenterthedescriptiontext')"></el-input>
              </el-form-item>
              <el-form-item label="Banner:" prop="noPassBanner" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(noPassBannerSelectRow)=='{}'" type="primary" @click="tempHandleFn('noPassBanner')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(noPassBannerSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ noPassBannerSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(noPassBannerSelectRow)!='{}'" type="danger" @click="delectFn('noPassBanner')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(noPassBannerSelectRow)!='{}'" type="primary" @click="tempHandleFn('noPassBanner')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.backgroundImage')+':'" prop="noPassBackground" style="marginBottom:50px">
                <el-button v-if="JSON.stringify(noPassBackgroundSelectRow)=='{}'" type="primary" @click="tempHandleFn('noPassBackground')">选择图册</el-button>
                <div style="display:flex">
                  <p v-if="JSON.stringify(noPassBackgroundSelectRow)!='{}'" style="paddingRight:30px">图册名称：{{ noPassBackgroundSelectRow.name }}</p>
                  <el-link v-if="JSON.stringify(noPassBackgroundSelectRow)!='{}'" type="danger" @click="delectFn('noPassBackground')">删除</el-link>
                </div>
                <el-button v-if="JSON.stringify(noPassBackgroundSelectRow)!='{}'" type="primary" @click="tempHandleFn('noPassBackground')">重新选择图册</el-button>
              </el-form-item>

              <el-form-item :label="$t('result.whethertoskiptheresultspageaftersubmission')+':'" prop="noPassIsJumpCurrentPage">
                <div style="display: flex">
                  <div>
                    <el-radio v-model="resultSetForm.noPassIsJumpCurrentPage" label="0">{{$t('result.dontskip')}}</el-radio>
                    <el-radio v-model="resultSetForm.noPassIsJumpCurrentPage" label="1">{{$t('result.skip')}}</el-radio>
                  </div>
                  <div style="display: inline-block" v-show="resultSetForm.noPassIsJumpCurrentPage == '1'">
                    <el-form-item :label="$t('result.jumptothepage')+':'" label-width="100px" prop="noPassJumpPage" style="margin-bottom: 0px">
                      <el-select v-model="resultSetForm.noPassJumpPage" :placeholder="$t('result.pleaseselectthepagetogoto')">
                        <el-option v-for="item in buttonCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-form-item label="" prop="noPassOutPageUrl" style="margin-bottom: 0px">
                        <el-input v-model="resultSetForm.noPassOutPageUrl" size="mini" v-if="resultSetForm.noPassJumpPage == '7'" :placeholder="$t('result.Pleaseentertheexternallink')"></el-input>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </div>
              </el-form-item>

              <el-form-item :label="$t('result.buttonSettings')+':'" v-show="resultSetForm.noPassIsJumpCurrentPage=='0'">
                <div v-for="(btnItem, btnIndex) in resultSetForm.noPassButtonList" :key="btnIndex" style="display: flex">
                  <el-form-item label="" :prop="'noPassButtonList.' + btnIndex + '.name'">
                    <el-input v-model="btnItem.name" size="mini" :placeholder="$t('result.pleaseenteranameforthebutton')"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('result.function')+':'" label-width="100px" :prop="'noPassButtonList.' + btnIndex + '.value'">
                    <el-select v-model="btnItem.value" :placeholder="$t('result.pleaseselectthepagetogoto')">
                      <el-option v-for="item in skipCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="remove-button el-icon-circle-plus-outline" @click.stop="addBtnNoPass(resultSetForm.noPassButtonList, btnIndex)"></div>
                  <div class="remove-button el-icon-remove-outline" v-if="btnIndex != 0" @click.stop="delBtnNoPass(resultSetForm.noPassButtonList, btnIndex)"></div>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="resultSetBtns">
      <el-popconfirm :confirm-button-text='$t("result.ok")' :cancel-button-text='$t("result.no")' icon="el-icon-info" icon-color="red" @cancel="preStep" :title='$t("result.confirmReleaseTips")'>
        <el-button slot="reference">{{$t('result.preNext')}}</el-button>
      </el-popconfirm>

      <el-button type="primary" @click="resultSetSave('resultSetForm')">{{$t('result.generatingtheform')}}</el-button>
    </div>
    <el-dialog title="图册选择" :visible.sync="successBannerVisible">
      <altasTemp ref="successBanner" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('successBanner',$event)" @cancel="cancel('successBanner')"></altasTemp>
    </el-dialog>
    <el-dialog title="图册选择" :visible.sync="successBackgroundVisible">
      <altasTemp ref="successBackground" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('successBackground',$event)" @cancel="cancel('successBackground')"></altasTemp>
    </el-dialog>
    <el-dialog title="图册选择" :visible.sync="waitReviewBannerVisible">
      <altasTemp ref="waitReviewBanner" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('waitReviewBanner',$event)" @cancel="cancel('waitReviewBanner')"></altasTemp>
    </el-dialog>
    <el-dialog title="图册选择" :visible.sync="waitReviewBackgroundVisible">
      <altasTemp ref="waitReviewBackground" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('waitReviewBackground',$event)" @cancel="cancel('waitReviewBackground')"></altasTemp>
    </el-dialog>
    <el-dialog title="图册选择" :visible.sync="noPassBannerVisible">
      <altasTemp ref="noPassBanner" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('noPassBanner',$event)" @cancel="cancel('noPassBanner')"></altasTemp>
    </el-dialog>
    <el-dialog title="图册选择" :visible.sync="noPassBackgroundVisible">
      <altasTemp ref="noPassBackground" :delFlag="false" :footerFlag="true" :eventCode="eventCode" @handleOk="selectRowFn('noPassBackground',$event)" @cancel="cancel('noPassBackground')"></altasTemp>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import altasTemp from '@/views/frame/cmms/services/cms/atlas/components/altasTemp.vue'
import {mapState} from 'vuex'
export default {
  name: 'resultSet',
  components:{altasTemp},
  props:{
    isNeedApprove:{
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      theLanguage:'zh',
      eventCode:'',
      successBannerSelectRow:{},
      successBannerVisible:false,
      successBackgroundSelectRow:{},
      successBackgroundVisible:false,
      waitReviewBannerSelectRow:{},
      waitReviewBannerVisible:false,
      waitReviewBackgroundSelectRow:{},
      waitReviewBackgroundVisible:false,
      noPassBannerSelectRow:{},
      noPassBannerVisible:false,
      noPassBackgroundSelectRow:{},
      noPassBackgroundVisible:false,
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
      buttonCodeOptions: [], //按钮字典
      skipCodeOptions: [], //跳转页面字典
      theCertificateType:[],
      formUpdateStatus:false,
      getActiveObj: {},
      drawer: false,
      auditStatusDrawer: false,
      noPassDrawer: false,
      queryResult: {
        appFile: '', //手机文件
        backgroundFile: '', //背景图文件
        describe: '', //描述
        eventCode: '', //会议code
        isSkip: '', //是否跳过当前页(1是0否)
        resultButton: [], //结果页按钮表
        skipPage: '', //跳转页面(数据字典SKIP_PAGE)
        skipWebsite: '', //跳转网址
        theme: '', //提示主题
        type: '' //1、报名成功，2、待审核，3、不通过
      },
      resultSetForm: {
        isNeedApprove: '0', // 是否需要审核
        successTitle: '', // 报名成功提示主题
        successDescribe: '', // 报名成功描述
        successBanner: '', // 报名成功Banner
        successBackground: '', // 报名成功背景图
        successIsJumpCurrentPage: '0', // 是否跳过当前页面
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
        waitReviewIsJumpCurrentPage: '0', // 待审核 是否跳过当前页面
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
        noPassIsJumpCurrentPage: '0', // 不通过 是否跳过当前页面
        noPassJumpPage: '', // 不通过 选择跳转页面
        noPassOutPageUrl: '', // 不通过 站外页面URL
        noPassButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ]
      },
      successIsShow: true, // 报名成功是否显示
      waitReviewIsShow: true, // 报名成功是否显示
      noPassIsShow: true, // 报名成功是否显示
      isFormSetComplete: false, // 表单设置是否完成
      resultNoFrom: [{ appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }],
      resultFrom: [
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }
      ],
    }
  },
  created () {},
  mounted () {
      // 获取按钮下拉数据字典
    this.buttonCodeOptions = this.$t('datadict.resultSkipPage')
    // 获取跳转页面数据字典
    this.skipCodeOptions = this.$t('datadict.resultBtn')
  },
  watch: {
    language:{
      handler(newValue, oldValue) {
        if(newValue){
          this.theLanguage=newValue
          console.log(newValue,oldValue,'newValue,oldValue');
          this.findUrl('successBanner')
          this.findUrl('successBackground')
        }
      },
      immediate: true,
      deep: true
    },

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
    isNeedApprove(newVal, oldVal) {
      if (newVal) {
        this.resultSetForm.isNeedApprove=this.isNeedApprove
        this.$emit('update:isNeedApprove',this.resultSetForm.isNeedApprove)
      }
    },
    'resultSetForm.isNeedApprove'(newVal, oldVal) {
      if (newVal) {
        this.$emit('update:isNeedApprove',this.resultSetForm.isNeedApprove)
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
      if (newVal == 0) {
        // this.getAppearanceSet()
      }
    }
  },
  computed: {
    httpHeaders () {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    },
    ...mapState({language: state => state.app.language})
  },
  methods: {
    // 点击选择图册
    tempHandleFn(status){
      switch (status) {
        case 'successBanner':
          this.successBannerVisible=true
          this.$refs.successBanner.form.listQuery.data.eventCode=this.eventCode
          this.$refs.successBanner.reload()
          break;
        case 'successBackground':
          this.successBackgroundVisible=true
          this.$refs.successBackground.form.listQuery.data.eventCode=this.eventCode
          this.$refs.successBackground.reload()
          break;
        case 'waitReviewBanner':
          this.waitReviewBannerVisible=true
          this.$refs.waitReviewBanner.form.listQuery.data.eventCode=this.eventCode
          this.$refs.waitReviewBanner.reload()
          break;
        case 'waitReviewBackground':
          this.waitReviewBackgroundVisible=true
          this.$refs.waitReviewBackground.form.listQuery.data.eventCode=this.eventCode
          this.$refs.waitReviewBackground.reload()
          break;
        case 'noPassBanner':
          this.noPassBannerVisible=true
          this.$refs.noPassBanner.form.listQuery.data.eventCode=this.eventCode
          this.$refs.noPassBanner.reload()
          break;
        case 'noPassBackground':
          this.noPassBackgroundVisible=true
          this.$refs.noPassBackground.form.listQuery.data.eventCode=this.eventCode
          this.$refs.noPassBackground.reload()
          break;

        default:
          break;
      }
    },
    // 选择行
    selectRowFn(status,selectRow){
      switch (status) {
        case 'successBanner':
          this.successBannerVisible=false
          this.successBannerSelectRow=selectRow
          this.findUrl('successBanner')
          break;
        case 'successBackground':
          this.successBackgroundVisible=false
          this.successBackgroundSelectRow=selectRow
          this.findUrl('successBackground')
          break;
        case 'waitReviewBanner':
          this.waitReviewBannerVisible=false
          this.waitReviewBannerSelectRow=selectRow
          this.findUrl('waitReviewBanner')
          break;
        case 'waitReviewBackground':
          this.waitReviewBackgroundVisible=false
          this.waitReviewBackgroundSelectRow=selectRow
          this.findUrl('waitReviewBackground')
          break;
        case 'noPassBanner':
          this.noPassBannerVisible=false
          this.noPassBannerSelectRow=selectRow
          this.findUrl('noPassBanner')
          break;
        case 'noPassBackground':
          this.noPassBackgroundVisible=false
          this.noPassBackgroundSelectRow=selectRow
          this.findUrl('noPassBackground')
          break;

        default:
          break;
      }
    },
    // 取消图册弹窗
    cancel(status){
      switch (status) {
        case 'successBanner':
          this.successBannerVisible=false
          break;
        case 'successBackground':
          this.successBackgroundVisible=false
          break;
        case 'waitReviewBanner':
          this.waitReviewBannerVisible=false
          break;
        case 'waitReviewBackground':
          this.waitReviewBackgroundVisible=false
          break;
        case 'noPassBanner':
          this.noPassBannerVisible=false
          break;
        case 'noPassBackground':
          this.noPassBackgroundVisible=false
          break;

        default:
          break;
      }
    },
    // 删除当前图册
    delectFn(status){
      switch (status) {
        case 'successBanner':
        this.successBannerSelectRow={}
          break;
        case 'successBackground':
        this.successBackgroundSelectRow={}
          break;
        case 'waitReviewBanner':
        this.waitReviewBannerSelectRow={}
          break;
        case 'waitReviewBackground':
        this.waitReviewBackgroundSelectRow={}
          break;
        case 'noPassBanner':
        this.noPassBannerSelectRow={}
          break;
        case 'noPassBackground':
        this.noPassBackgroundSelectRow={}
          break;

        default:
          break;
      }
    },
    // 找当前要展示的url
    findUrl(status){
      switch (status) {
        case 'successBanner':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.successBannerSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.successBanner=v.url
              }
            })
          })
          break;
        case 'successBackground':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.successBackgroundSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.successBackground=v.url
              }
            })
          })
          break;
        case 'waitReviewBanner':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.waitReviewBannerSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.waitReviewBanner=v.url
              }
            })
          })
          break;
        case 'waitReviewBackground':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.waitReviewBackgroundSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.waitReviewBackground=v.url
              }
            })
          })
          break;
        case 'noPassBanner':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.noPassBannerSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.noPassBanner=v.url
              }
            })
          })
          break;
        case 'noPassBackground':
        request({
            url: '/api/cms/atlasDetail/page',
            method: 'POST',
            data:{
              current: 1,
              size: 20,
              isPage: true,
              funcModule: '图册图片',
              funcOperation: '查询',
              data:{
                atlasCode: this.noPassBackgroundSelectRow.code
              }
            }
          }).then((res) => {
            res.data.forEach(v=>{
              if(v.language==this.theLanguage){
                this.resultSetForm.noPassBackground=v.url
              }
            })
          })
          break;

        default:
          break;
      }

    },
    // 获取表单设置
    getEventInfo (eventCode) {
      this.eventCode=eventCode?eventCode:this.eventCode
      this.pageTotal=0
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
    drawerStatusHandle (status) {
      this.drawer = status
    },
    auditStatusDrawerStatusHandle (status) {
      this.auditStatusDrawer = status
    },
    noPassDrawerStatusHandle (status) {
      this.noPassDrawer = status
    },
    // 结果页设置 上一步(暂存)
    preStep () {
      this.$emit('stepIndex',1)
    },
    fileLimitCount (files, fileList) {
      this.$message.warning(this.$t('form.onlyonefileisallowedtoupload'))
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
      // let acceptType = ['.jpg', '.png', '.jpeg', '.bmp', '.webp']
      let acceptType = ['.jpg', '.png']

      // 判断后缀名是否允许上传
      isAllowUpload = acceptType.includes(extension)
      if (!isAllowUpload) {
        const errMsg = this.$t('form.uploadedNotice') + acceptType.join('、')
        this.$message.error(errMsg)
        return false
      }
      return isAllowUpload
    },
    clearResultFn () {
      var btnObj1 = { name: '', value: '' }
      this.resultSetForm.successBanner = ''
      this.resultSetForm.successBackground = ''
      this.resultSetForm.successDescribe = ''
      this.resultSetForm.successIsJumpCurrentPage = '0'
      this.resultSetForm.successJumpPage = ''
      this.resultSetForm.successOutPageUrl = ''
      this.resultSetForm.successTitle = ''
      this.resultSetForm.successButtonList = []
      this.resultSetForm.successButtonList.push(btnObj1)
      this.resultSetForm.waitReviewBanner = ''
      this.resultSetForm.waitReviewBackground = ''
      this.resultSetForm.waitReviewDescribe = ''
      this.resultSetForm.waitReviewIsJumpCurrentPage = '0'
      this.resultSetForm.waitReviewJumpPage = ''
      this.resultSetForm.waitReviewOutPageUrl = ''
      this.resultSetForm.waitReviewTitle = ''
      this.resultSetForm.waitReviewButtonList = []
      var btnObj2 = { name: '', value: '' }
      this.resultSetForm.waitReviewButtonList.push(btnObj2)
      this.resultSetForm.noPassBanner = ''
      this.resultSetForm.noPassBackground = ''
      this.resultSetForm.noPassDescribe = ''
      this.resultSetForm.noPassIsJumpCurrentPage = '0'
      this.resultSetForm.noPassJumpPage = ''
      this.resultSetForm.noPassOutPageUrl = ''
      this.resultSetForm.noPassTitle = ''
      this.resultSetForm.noPassButtonList = []
      var btnObj3 = { name: '', value: '' }
      this.resultSetForm.noPassButtonList.push(btnObj3)
      this.successBannerSelectRow={}
      this.successBackgroundSelectRow={}
      this.waitReviewBannerSelectRow={}
      this.waitReviewBackgroundSelectRow ={}
      this.noPassBannerSelectRow={}
      this.noPassBackgroundSelectRow={}
    },
     getResultFn (eventCode) {
      this.eventCode=eventCode?eventCode:this.eventCode
      request({
        url: '/api/register/signupResult/resultList',
        method: 'POST',
        data: {
          code: '',
          data: this.eventCode,
          funcModule: '结果页设置',
          funcOperation: '获取结果页'
        }
      }).then(res => {
        if (res.status) {
          res.data.length > 1 ? (this.resultSetForm.isNeedApprove = '1') : (this.resultSetForm.isNeedApprove = '0')
          this.clearResultFn()
          console.log(this.resultSetForm.noPassButtonList, 'this.resultSetForm.noPassButtonList')
          res.data.forEach(item => {
            switch (item.type) {
              case '1':
                this.successBannerSelectRow = {code:item.appFile,name:item.appFileName}
                this.findUrl('successBanner')
                this.successBackgroundSelectRow = {code:item.backgroundFile,name:item.backgroundFileName}
                this.findUrl('successBackground')
                this.resultSetForm.successDescribe = item.describeInfo
                this.resultSetForm.successIsJumpCurrentPage = item.isSkip
                this.resultSetForm.successJumpPage = item.skipPage
                this.resultSetForm.successOutPageUrl = item.skipWebsite
                this.resultSetForm.successTitle = item.theme
                if (item.resultButton.length == 0) {
                } else {
                  this.resultSetForm.successButtonList = []
                  this.resultSetForm.successButtonList = item.resultButton
                }
                break
              case '2'://waitReviewBanner
                this.waitReviewBannerSelectRow = {code:item.appFile,name:item.appFileName}
                this.findUrl('waitReviewBanner')
                this.waitReviewBackgroundSelectRow = {code:item.backgroundFile,name:item.backgroundFileName}
                this.findUrl('waitReviewBackground')
                this.resultSetForm.waitReviewDescribe = item.describeInfo
                this.resultSetForm.waitReviewIsJumpCurrentPage = item.isSkip
                this.resultSetForm.waitReviewJumpPage = item.skipPage
                this.resultSetForm.waitReviewOutPageUrl = item.skipWebsite
                this.resultSetForm.waitReviewTitle = item.theme
                if (item.resultButton.length == 0) {
                } else {
                  this.resultSetForm.waitReviewButtonList = []
                  this.resultSetForm.waitReviewButtonList = item.resultButton
                }
                break
              case '3':
                this.noPassBannerSelectRow = {code:item.appFile,name:item.appFileName}
                this.findUrl('noPassBanner')
                this.noPassBackgroundSelectRow = {code:item.backgroundFile,name:item.backgroundFileName}
                this.findUrl('noPassBackground')
                this.resultSetForm.noPassDescribe = item.describeInfo
                this.resultSetForm.noPassIsJumpCurrentPage = item.isSkip
                this.resultSetForm.noPassJumpPage = item.skipPage
                this.resultSetForm.noPassOutPageUrl = item.skipWebsite
                this.resultSetForm.noPassTitle = item.theme
                if (item.resultButton.length == 0) {
                } else {
                  this.resultSetForm.noPassButtonList = []
                  this.resultSetForm.noPassButtonList = item.resultButton
                }
                break
              default:
                break
            }
          })
        }
      })
    },
    // 保存结果设置
    resultSetSave (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('stepIndex',3)
          this.isFormSetComplete = true
          console.log(this.resultSetForm, 'resultSetFormresultSetForm')
          if (this.resultSetForm.isNeedApprove === '0') {
            this.resultNoFrom[0].appFile = this.successBannerSelectRow.code
            this.resultNoFrom[0].backgroundFile = this.successBackgroundSelectRow.code
            this.resultNoFrom[0].describeInfo = this.resultSetForm.successDescribe
            this.resultNoFrom[0].isSkip = this.resultSetForm.successIsJumpCurrentPage
            this.resultNoFrom[0].skipPage = this.resultSetForm.successJumpPage
            this.resultNoFrom[0].skipWebsite = this.resultSetForm.successOutPageUrl
            this.resultNoFrom[0].theme = this.resultSetForm.successTitle
            this.resultNoFrom[0].eventCode = this.eventCode
            this.resultNoFrom[0].resultButton = []
            this.resultSetForm.successButtonList.forEach(item => {
              if(item.value==''||item.name==''){
              }else{
                var v = { value: item.value, name: item.name }
                this.resultNoFrom[0].resultButton.push(v)
              }
            })
            console.log(this.resultNoFrom[0].resultButton, 'this.resultNoFrom[0].resultButton')
            this.resultNoFrom[0].type = '1'
            console.log(this.resultNoFrom, 'resultNoFrom')
          }
          if (this.resultSetForm.isNeedApprove === '1') {
            this.resultFrom[0].appFile = this.successBannerSelectRow.code
            this.resultFrom[0].backgroundFile = this.successBackgroundSelectRow.code
            this.resultFrom[0].describeInfo = this.resultSetForm.successDescribe
            this.resultFrom[0].isSkip = this.resultSetForm.successIsJumpCurrentPage
            this.resultFrom[0].skipPage = this.resultSetForm.successJumpPage
            this.resultFrom[0].skipWebsite = this.resultSetForm.successOutPageUrl
            this.resultFrom[0].theme = this.resultSetForm.successTitle
            this.resultFrom[0].eventCode = this.eventCode
            this.resultFrom[0].resultButton = []
            this.resultSetForm.successButtonList.forEach(item => {
              if(item.value==''||item.name==''){
              }else{
              var v = { value: item.value, name: item.name }
              this.resultFrom[0].resultButton.push(v)
              }
            })
            this.resultFrom[0].type = '1'
            this.resultFrom[1].appFile = this.waitReviewBannerSelectRow.code
            this.resultFrom[1].backgroundFile = this.waitReviewBackgroundSelectRow.code
            this.resultFrom[1].describeInfo = this.resultSetForm.waitReviewDescribe
            this.resultFrom[1].isSkip = this.resultSetForm.waitReviewIsJumpCurrentPage
            this.resultFrom[1].skipPage = this.resultSetForm.waitReviewJumpPage
            this.resultFrom[1].skipWebsite = this.resultSetForm.waitReviewOutPageUrl
            this.resultFrom[1].theme = this.resultSetForm.waitReviewTitle
            this.resultFrom[1].eventCode = this.eventCode
            this.resultFrom[1].resultButton = []
            this.resultSetForm.waitReviewButtonList.forEach(item => {
              if(item.value==''||item.name==''){
              }else{
              var v = { value: item.value, name: item.name }
              this.resultFrom[1].resultButton.push(v)
              }
            })
            this.resultFrom[1].type = '2'
            this.resultFrom[2].appFile = this.noPassBannerSelectRow.code
            this.resultFrom[2].backgroundFile = this.noPassBackgroundSelectRow.code
            this.resultFrom[2].describeInfo = this.resultSetForm.noPassDescribe
            this.resultFrom[2].isSkip = this.resultSetForm.noPassIsJumpCurrentPage
            this.resultFrom[2].skipPage = this.resultSetForm.noPassJumpPage
            this.resultFrom[2].skipWebsite = this.resultSetForm.noPassOutPageUrl
            this.resultFrom[2].theme = this.resultSetForm.noPassTitle
            this.resultFrom[2].eventCode = this.eventCode
            this.resultFrom[2].resultButton = []
            this.resultSetForm.noPassButtonList.forEach(item => {
              if(item.value==''||item.name==''){
              }else{
              var v = { value: item.value, name: item.name }
              this.resultFrom[2].resultButton.push(v)
              }
            })
            this.resultFrom[2].type = '3'
            console.log(this.resultFrom, 'resultFrom')
          }
          request({
            url: '/api/register/signupResult/save',
            method: 'POST',
            data: {
              data: this.resultSetForm.isNeedApprove === '0' ? this.resultNoFrom : this.resultFrom,
              funcModule: '结果页设置',
              funcOperation: '创建结果页'
            }
          }).then(res => {
            if (res.status) {
              this.$message({ message: this.$t('form.saveSuccess'), type: 'success' })
              console.log(this.eventCode,'this.eventCode');
              this.getResultFn(this.eventCode)
            }
          })
        } else {
          this.$message({ showClose: true, message: this.$t('result.missingTips'), type: 'warning' })
        }
      })
    },

    setResult () {
      this.isFormSetComplete = false
      this.$emit('stepIndex',2)
      this.resultSetForm.isNeedApprove = '1'
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