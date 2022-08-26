<template>
  <div class="service_items_added">
    <el-form label-width="80px" :model="FormData" ref="ruleForm" :rules="rules">
      <el-form-item label="服务名称" prop="name">
        <el-input v-model="FormData.name" placeholder="服务名称"></el-input>
      </el-form-item>
      <el-form-item label="服务价格" prop="price">
        <el-input v-model="FormData.price" placeholder="服务价格"></el-input>
      </el-form-item>
      <el-form-item label="内容备注">
        <el-input
          type="textarea"
          v-model="FormData.content"
          placeholder="内容备注"
          rows="5"
        ></el-input>
      </el-form-item>
      <div class="btnGroup">
        <el-button type="primary" @click="add">{{
          itemData == null ? "立即添加" : "确认修改"
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    itemData: JSON | null,
  },
  data() {
    const checkPrice = (rule, value, callback) => {
      var reg =
        /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(value)) {
        return callback(new Error("金额输入有误"));
      }
      callback();
    };
    return {
      FormData: {
        name: "",
        price: "",
        content: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入服务名称", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入服务价格", trigger: "change" },
          { validator: checkPrice, trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    if (this.itemData != null)
      this.FormData = JSON.parse(JSON.stringify(this.itemData));
  },
  methods: {
    add() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 验证成功
          this.$emit("onColse", this.FormData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btnGroup {
  text-align: right;
}
</style>