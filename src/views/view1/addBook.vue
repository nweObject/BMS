<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="书籍名称">
        <el-input v-model="form.bookName"></el-input>
      </el-form-item>
      <el-form-item label="书籍描述 ">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="书籍价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="书籍图片">
        <el-input v-model="form.bookImg"></el-input>
        <div>
          <el-upload
            class="avatar-uploader"
            action="api/oss/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.bookImg" :src="form.bookImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        bookName: null,
        description: null,
        price: null,
        bookImg: null
      },
      imageUrl: ""
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("api/book/add", {
          bookName: this.form.bookName,
          description: this.form.description,
          price: this.form.price,
          bookImg: this.form.bookImg
        })
        .then(Response => {
          console.log(Response.data.data);
        });
    },
    handleAvatarSuccess(res, file) {
      this.form.bookImg = res.data.url;
      console.log(this.form.bookImg);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.box {
  width: 70%;

  margin: auto;
  margin-top: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>