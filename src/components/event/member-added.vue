<template>
  <div class="case-study-added">
    <el-form label-width="80px" :model="FormData" ref="ruleForm" :rules="rules">
      <!-- <el-form-item label="登录名" prop="login_name">
        <el-input v-model="FormData.login_name" placeholder="登录名"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="登录密码" prop="login_password">
        <el-input
          v-model="FormData.login_password"
          placeholder="至少6位，区分大小写"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="FormData.real_name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone_number">
        <el-input v-model.number="FormData.phone_number" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="contact_email">
        <el-input v-model="FormData.contact_email" placeholder="邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="是否默认" prop="isdefault">
        <el-radio-group v-model.number="FormData.isdefault">
          <el-radio :label=1 border>默认接待员</el-radio>
          <el-radio :label=0 border>接待员</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="FormData.roleIds">
          <el-checkbox
            v-for="item in roleList"
            :key="item.code"
            :label="item.code"
            :name="item.code"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item> -->
      <div class="btnGroup">
        <el-button type="primary" @click="add">{{
          itemData == null ? "立即添加" : "确认修改"
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validatePhone,validateEMail } from '../assets/js/validator'
export default {
  props: {
    itemData: JSON | null,
  },
  data() {
    return {
      FormData: {
        login_name: "",
        login_password: "",
        real_name: "",
        phone_number: "",
        contact_email: "",
        isdefault:0,
        roleIds:[]
      },
      roleIds: [],
      roleList: [],
      rules: {
        login_name: [
          { required: true, message: "登录名不能为空", trigger: "change" },
        ],
        login_password: [
          { required: true, message: "登录密码不能为空", trigger: "change" },
        ],
        real_name: [
          { required: true, message: "真实姓名不能为空", trigger: "change" },
        ],
        phone_number: [
          { required: true, message: "电话号码不能为空", trigger: "change" },{validator:validatePhone, trigger: "blur"}
        ],
        contact_email: [
          {validator:validateEMail, trigger: "blur"}
        ],
        // roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.requestApi({
      url: '/member/info',
      method: 'POST',
      data: { id: this.itemData == null ? "" : this.itemData.id }
    }).then((res) => {
      this.roleList = res.roles_list;
      if (this.itemData != null) {
        this.FormData = res.member;
        this.$set(this.FormData,"roleIds",res.roleIds);
      }
    });
  },
  methods: {
    add() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 验证成功
          this.FormData.roleIds = this.FormData.roleIds.toString();
          this.$emit("onColse", this.FormData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 图片
    handlePreviewImage(e) {
      this.waitUpload.push(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.btnGroup {
  text-align: right;
}
.waitUploadList .item {
  display: flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 3px;
  transition: 0.3s;
  cursor: pointer;
  p {
    flex: 1;
  }
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}

.yl {
  margin-top: 5px;
  img {
    width: 100px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
</style>