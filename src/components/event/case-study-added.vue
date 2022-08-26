<template>
  <div class="case-study-added">
    <el-form
      label-width="110px"
      :model="FormData"
      ref="ruleForm"
      :rules="rules"
    >
      <el-form-item label="案例名称" prop="name">
        <el-input v-model="FormData.name" placeholder="案例名称"></el-input>
      </el-form-item>
      <el-form-item label="案例介绍" prop="content">
        <el-input
          type="textarea"
          v-model="FormData.content"
          placeholder="案例介绍"
          rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传案例图片" prop="picture">
        <el-upload
          ref="upload"
          action=""
          :on-change="handleChangeAttach"
          :on-remove="handleRemoveAttach"
          :auto-upload="false"
          :file-list="this.waitUpload"
          :multiple="false"
          accept=".jpg,.jpeg,.png"
        >
          <el-button slot="trigger" size="small" type="primary"
            >从电脑选择文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件,大小不超过2M (可上传多张)
          </div>
          <div class="yl" v-if="FormData.picture">
            <img
              v-for="(item, key) in FormData.picture"
              :key="`image_${key}`"
              :src="item"
              alt=""
            />
          </div>
        </el-upload>
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
import upload from "@/utils/upload";
export default {
  props: {
    itemData: JSON | null,
  },
  data() {
    return {
      FormData: {
        name: "",
        picture: [],
        content: "",
      },
      // 等待上传
      waitUpload: [],
      rules: {
        name: [
          { required: true, message: "请输入案例名称", trigger: "change" },
        ],
        content: [{ required: true, message: "请输入介绍", trigger: "change" }],
      },
    };
  },
  mounted() {
    if (this.itemData != null) {
      this.FormData = JSON.parse(JSON.stringify(this.itemData));
      this.FormData.picture = this.FormData.picture.split(",");
    }
  },
  methods: {
    add() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 验证成功
          let images = [];
          this.waitUpload.forEach((item, key) => {
            const obj = {
              key,
              file: item.raw,
            };
            images.push(obj);
          });
          upload(images).then((res) => {
            let picture=[];
            for (let item in res) {
              picture.push(res[item].FilePath);
            }
            this.FormData.picture = picture.toString();
            this.$emit("onColse", this.FormData);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传文件
    handleChangeAttach(file,fileList) {
        //保存消息图片
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if ((!isJPG && !isPNG)  || !isLt2M) {
          if(!isJPG || !isPNG)
            this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
          else
            this.$message.error('上传图片大小不能超过 2MB!');
          // 取消时在文件列表中删除该文件
          this.$refs.upload.handleRemove(file);
          return;
        }
        this.waitUpload =fileList;
      //console.log(this.fileList)
    },
    handleRemoveAttach(file, fileList){
      this.waitUpload=fileList;
      //console.log(this.fileList);
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