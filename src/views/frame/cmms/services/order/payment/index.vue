<template>
  <!-- bs-new-container  -->
  <div class="contentBody bs-new-container app-container">
    <el-card class="box-card" style="overflow: auto; width: 100%; height: 90vh">
      <!-- 公 -->
      <div style="width: 240px; float: right">
        <el-select @change="handelSelect" size="mini" v-model="value_" :placeholder="$t('order.payment.pleaseSelect')">
          <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"> </el-option>
        </el-select>
      </div>
      <div>
        <span class="sp_one">{{$t('order.payment.accountSettings')}}：</span>
        <div class="individual" v-for="(item, index) in individualType" :key="index">
          <div style="display: inline-block; width: 20%">
            <el-checkbox :disabled="item.disabled" v-model="item.checked">{{ item.name }}</el-checkbox>
          </div>
          <div style="display: inline-block">
            <el-select :disabled="item.disabled" clearable size="mini" v-model="item.value" :placeholder="$t('order.payment.selectAccount')">
              <el-option v-for="item_ in item.options" :key="item_.value" :label="item_.label" :value="item_.value"> </el-option>
            </el-select>
          </div>
          <div style="display: inline-block; margin-left: 10px; width: 5%">
            <el-button :disabled="item.disabled" size="mini" type="text" @click="install(item)">{{$t('order.payment.setting')}}</el-button>
          </div>
          <div style="display: inline-block; margin-left: 10px; width: 25%">
            <span class="sp_two">{{$t('order.payment.MERCHANT_NO')}}：</span><span style="font-size: 13px">{{ item.num ? item.num : '-' }}</span>
          </div>
          <div style="display: inline-block; width: 25%">
            <span class="sp_two">{{$t('order.payment.PDK')}}：</span><span class="sp_three">{{ item.psd ? item.psd : '-' }}</span>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <!-- 私 -->
      <div>
        <span class="sp_one">{{$t('order.payment.paymentAccountSettings')}}:</span>
        <div class="individual" v-for="(item, index) in individualPrivateType" :key="index">
          <div style="display: inline-block; width: 20%">
            <el-checkbox :disabled="item.disabled" v-model="item.checked">{{ item.name }}</el-checkbox>
          </div>
          <div style="display: inline-block">
            <el-select :disabled="item.disabled" clearable size="mini" v-model="item.value" :placeholder="$t('order.payment.selectAccount')">
              <el-option v-for="item_ in item.options" :key="item_.code" :label="item_.companyAccount" :value="item_.code"> </el-option>
            </el-select>
          </div>
          <div style="display: inline-block; margin-left: 10px; width: 5%">
            <el-button :disabled="item.disabled" size="mini" type="text" @click="install(item)">{{$t('order.payment.setting')}}</el-button>
          </div>
          <div style="display: inline-block; margin-left: 10px; width: 25%">
            <span class="sp_two">{{$t('order.payment.MERCHANT_NO')}}：</span><span style="font-size: 13px">{{ item.num ? item.num : '-' }}</span>
          </div>
          <div style="display: inline-block; width: 25%">
            <span class="sp_two">{{$t('order.payment.PDK')}}：</span><span class="sp_three">{{ item.psd ? item.psd : '-' }}</span>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <div>
        <span class="sp_one">{{$t('order.payment.creditAccountSettings')}}:</span>
        <div>
          <div style="width: 15%; display: inline-block">
            <el-select size="mini" v-model="account" :placeholder="$t('order.payment.selectAccount')">
              <el-option v-for="item in accountName" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div style="display: inline-block; margin-left: 72px"><span>{{$t('order.payment.totalAccountAmount')}}：</span><span>-</span></div>
          <span style="margin-left: 80px"><span style="color: #f56c6c; margin-right: 4px">*</span>{{$t('order.payment.allocateProjectQuota')}}：</span>
          <div style="display: inline-block; width: 15%">
            <el-input size="mini" v-model="currentVal" :placeholder="$t('order.payment.enterProjectQuota')"></el-input>
          </div>
          <span style="margin-left: 80px">{{$t('order.payment.warningWarningQuota')}}：</span>
          <div style="display: inline-block; width: 15%">
            <el-input size="mini" v-model="warningVal" :placeholder="$t('order.payment.enterWarningAmount')+'：'"></el-input>
          </div>
        </div>
      </div>
    </el-card>
    <div style="height: 6vh; width: 100%; background-color: white; display: flex; align-items: center; justify-content: center">
      <el-button @click="cancel">{{$t('order.payment.canel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('order.payment.save')}}</el-button>
    </div>
    <el-dialog :title="$t('order.payment.setting')" :visible.sync="editShow_" width="800px">
      <div style="padding-top: 30px">
        <div style="float: right; margin-right: 10px">
          <el-button type="primary" @click="addAccount">{{$t('order.payment.addNewAccount')}}</el-button>
        </div>
        <template>
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="aaa" :label="$t('order.payment.accountName')"> </el-table-column>
            <el-table-column prop="bbb" :label="$t('order.payment.MERCHANT_NO')"> </el-table-column>
            <el-table-column prop="ccc" :label="$t('order.payment.PDK')"> </el-table-column>
          </el-table>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShow_ = false">{{$t('order.payment.canel')}}</el-button>
        <el-button type="primary" @click="editShow_ = false">{{$t('order.payment.confirm')}}</el-button>
      </span>
    </el-dialog>
    <!-- addUser -->
    <el-dialog destroy-on-close :modal-append-to-body="true" :title="$t('order.payment.addNewAccount')" :visible.sync="addUser" width="800px">
      <div style="min-height: 300px; padding-top: 10px">
        <!-- st -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="$t('order.payment.accountNa')" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.payment.MERCHANT_NO')" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.payment.PDK')" prop="psd">
            <el-input v-model="ruleForm.psd"></el-input>
          </el-form-item>
        </el-form>
        <!-- end -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUser = false">{{$t('order.payment.canel')}}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('order.payment.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import request from '@/utils/frame/base/request'
import {mapState} from 'vuex'
export default {
  name: 'paymentManagement',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '人保寿险第十四届高峰会'
        }
      ],
      value_: '选项1',
      // 公
      individualType: [
        {
          name: this.$t('order.payment.WeChat'),
          type: '0',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: this.$t('order.payment.alipay'),
          type: '1',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: this.$t('order.payment.unionPay'),
          type: '2',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: 'PayPal',
          type: '3',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        }
      ],
      // 私
      individualPrivateType: [
        {
          name: this.$t('order.payment.WeChat'),
          type: '0',
          checked: true,
          value: '',
          disabled: true,
          num: '321',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: this.$t('order.payment.alipay'),
          type: '1',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: this.$t('order.payment.unionPay'),
          type: '2',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        },
        {
          name: 'PayPal',
          type: '3',
          checked: false,
          value: '',
          disabled: true,
          num: '',
          psd: '',
          options: [
            {
              value: '选项1',
              label: '中旅会展微信账户'
            },
            {
              value: '选项2',
              label: '备用微信账户'
            }
          ]
        }
      ],
      accountName: [
        {
          value: '选项1',
          label: '中旅会展通用账户'
        },
        {
          value: '选项2',
          label: '中旅会展上海分公司通用账户'
        },
        {
          value: '选项3',
          label: '中旅会展上海分公司通用账户'
        },
        {
          value: '选项4',
          label: '中旅会展上海分公司通用账户'
        },
        {
          value: '选项5',
          label: '中旅会展上海分公司通用账户'
        }
      ],
      account: '',
      // 当前
      currentVal: '',
      // 预警
      warningVal: '',
      // 微信支付设置弹窗
      editShow_: false,
      addUser: false,
      tableData: [
        {
          aaa: '中旅会展微信账户',
          bbb: '11213',
          ccc: '******'
        },
        {
          aaa: '备用微信账号',
          bbb: '22123',
          ccc: '******'
        }
      ],
      ruleForm: {
        name: '',
        num: '',
        psd: ''
      },
      rules: {
        name: [{ required: true, message: this.$t('order.payment.enterActivityName') }],
        num: [{ required: true, message: this.$t('order.payment.enterActivityName') }],
        psd: [{ required: true, message: this.$t('order.payment.enterActivityName') }]
      }
    }
  },
  created() {
    this.getList()
  },
  watch:{
    language:{
      handler(newValue, oldValue) {
        if(newValue){
          console.log(newValue,oldValue);
          this.$set(this.individualType[0],'name',this.$t('order.payment.WeChat'))
          this.$set(this.individualType[1],'name',this.$t('order.payment.alipay'))
          this.$set(this.individualType[2],'name',this.$t('order.payment.unionPay'))
          this.$set(this.individualPrivateType[0],'name',this.$t('order.payment.WeChat'))
          this.$set(this.individualPrivateType[1],'name',this.$t('order.payment.alipay'))
          this.$set(this.individualPrivateType[2],'name',this.$t('order.payment.unionPay'))
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed:{
    ...mapState({language: state => state.app.language})
  },
  methods: {
    install(item) {
      console.log(item)
      if (item.type == 0) {
        this.editShow_ = true
      }
    },
    cancel() {
      this.$router.go(-1)
    },
    save() {
      // 分配当前项目额度验证
      if (!this.currentVal) {
        this.$message.warning(this.$t('order.payment.fillCurrentProject'))
        return
      }
      // 公验证
      this.individualType.forEach(item => {
        if (item.checked && item.value == '') {
          this.$message.warning(this.$t('order.payment.selectPaymentMethod'))
          return
        } else if (!item.checked && item.value) {
          this.$message.warning(this.$t('order.payment.checkPaymentMethod'))
          return
        }
      })
      // 私验证
      this.individualPrivateType.forEach(item => {
        if (item.checked && item.value == '') {
          this.$message.warning(this.$t('order.payment.selectPaymentMethod'))
          return
        } else if (!item.checked && item.value) {
          this.$message.warning(this.$t('order.payment.checkPaymentMethod'))
          return
        }
      })
    },
    addAccount() {
      this.addUser = true
    },
    // addUser = false
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList() {
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          data: {
            queryParams: {},
            type: 'EVENT_INFO'
          },
          funcModule: '支付设置',
          funcOperation: '查询'
        }
      }).then(res => {
        console.log(res)
        // debugger
        this.options = res.data
        this.value_ = res.data[0].code
        this.getBusinessInfo(this.value_)
      })
    },
    getBusinessInfo(code) {
      request({
        url: '/api/pay/businessInfo/page',
        method: 'POST',
        data: {
          data: {
            evenCode: code
          },
          current: 1,
          size: 20,
          isPage: false,
          defaultSortString: 'createDate.desc',
          bsQueryExtras: [],
          funcModule: '支付设置列表',
          funcOperation: '查询'
        }
      }).then(res => {
        // debugger
        console.log(res.data)
        this.individualPrivateType[0].options = res.data
        this.individualPrivateType[0].value = res.data[0].code
        this.individualPrivateType[0].num = res.data[0].appId
        this.individualPrivateType[0].psd = res.data[0].apiKey
      })
    },
    handelSelect(item) {
      // debugger
      this.value_ = item
      this.getBusinessInfo(this.value_)
    }
  }
}
</script>

<style lang="scss">
.sp_one {
  font-size: 15px;
  display: inline-block;
  margin-bottom: 15px;
}
.sp_two {
  font-size: 14px;
  margin-left: 100px;
}
.sp_three {
  font-size: 13px;
  font-weight: 600;
}
.individual {
  margin-bottom: 10px;
}
// 改变默认滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
.bs-new-container .el-dialog .el-dialog__header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  background: #265588;
  color: #fff;
  color: #ccc;
  padding: 0 12px;
  overflow: hidden;
}
.bs-new-container .el-dialog .el-dialog__header .el-dialog__title {
  font-size: 14px !important;
  color: white !important;
}
.bs-new-container .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 14px !important;
}
.bs-new-container .el-dialog .el-dialog__footer {
  width: 100%;
  height: 40px;
  line-height: 42px;
  text-align: right;
  background: #f1f3f6;
  padding: 0px 15px;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>