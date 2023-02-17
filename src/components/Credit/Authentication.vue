<template>
  <div class="auth-container">
    <div class="commit-btn" v-if="currentStep === 0">
      <div class="id-card-page">
        <div>身份证影像：</div>
        <div class="tips">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            accept="image/*"
            :before-upload="beforeAvatarUpload"
            :on-change="peopleImgChange"
            :auto-upload="false"
          >
            <img v-if="peopleImgUrl" :src="peopleImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="title-text">人像面</p>
        </div>
        <div class="tips" style="margin-left: 20px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            accept="image/*"
            :before-upload="beforeAvatarUpload"
            :on-change="nationImgChange"
            :auto-upload="false"
          >
            <img v-if="nationImgUrl" :src="nationImgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="title-text">国徽面</p>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
    <div class="ocr-info-page" v-if="currentStep === 1">
      <el-form
        class="idcard-info-list"
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        :rules="rulesIdcard"
        ref="formLabelAlign"
      >
        <el-form-item label="姓名：" prop="userName">
          <el-input v-model="formLabelAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="身份证：" prop="idCardNo">
          <el-input v-model="formLabelAlign.idCardNo"></el-input>
        </el-form-item>
        <el-form-item label="民族：" prop="nation">
          <el-input v-model="formLabelAlign.nation"></el-input>
        </el-form-item>
        <el-form-item label="住址：" prop="address">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="签发机关：" prop="signingOrganization">
          <el-input v-model="formLabelAlign.signingOrganization"></el-input>
        </el-form-item>
        <el-form-item label="有效期：" prop="validPeriod">
          <el-input v-model="formLabelAlign.validPeriod"></el-input>
        </el-form-item>
        <el-form-item label="身份证影像：">
          <div class="idcard-pic">
            <div class="demo-image__preview">
              <el-image
                style="width: 180px; height: 100px"
                :src="peopleImgUrl"
                :preview-src-list="srcList"
              >
              </el-image>
              <p class="idcard-pic-p">人像面</p>
            </div>
            <div class="demo-image__preview" style="margin-left: 20px">
              <el-image
                style="width: 180px; height: 100px"
                :src="nationImgUrl"
                :preview-src-list="srcList"
              >
              </el-image>
              <p class="idcard-pic-p">国徽面</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="foot-btn">
          <el-button @click="previousStep">上一步</el-button>
          <el-button type="primary" @click="next('formLabelAlign')"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import tools from "@/util/index";
export default {
  name: "Authentication",
  data() {
    var validate1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else {
        if (!tools.isIdCard(value)) {
          callback(new Error("请输入正确身份证号,注：X为大写字母"));
        } else {
          callback();
        }
      }
    };
    var validate2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入民族"));
      } else {
        if (!tools.isContent(value, "族")) {
          callback(new Error("请输入正确民族，如：汉族"));
        } else {
          callback();
        }
      }
    };
    var validate3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入有效期"));
      } else {
        const start = value.split("-")[0];
        const end = value.split("-")[1];
        if (!tools.isYMDformat(start) || !tools.isYMDformat(end)) {
          callback(new Error("请输入正确有效期，如：2000.01.01-2020.01.01"));
        } else {
          callback();
        }
      }
    };
    return {
      peopleImgUrl: "",
      nationImgUrl: "",
      formLabelAlign: {
        userName: "",
        idCardNo: "",
        nation: "",
        address: "",
        signingOrganization: "",
        validPeriod: "",
        validPeriodBegin: "",
        validPeriodEnd: "",
      },
      srcList: ["", ""],
      currentStep: 0,
      rulesIdcard: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCardNo: [
          {
            validator: validate1,
            trigger: "blur",
            required: true,
          },
        ],
        nation: [{ required: true, validator: validate2, trigger: "blur" }],
        address: [{ required: true, message: "请输入住址", trigger: "blur" }],
        signingOrganization: [
          { required: true, message: "请输入签发机关", trigger: "blur" },
        ],
        validPeriod: [
          { required: true, validator: validate3, trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 500kb!");
      }
      return isLt2M;
    },
    peopleImgChange(file) {
      this.peopleImgUrl = URL.createObjectURL(file.raw);
      this.srcList[0] = this.peopleImgUrl;
      this.isShowPicP = false;
    },
    nationImgChange(file) {
      this.nationImgUrl = URL.createObjectURL(file.raw);
      this.srcList[1] = this.nationImgUrl;
      this.isShowPicN = false;
    },
    nextStep() {
      if (!this.nationImgUrl || !this.peopleImgUrl) {
        this.$message.error("请先上传身份证照片");
        return;
      }
      this.currentStep = 1;
    },
    previousStep() {
      this.currentStep = 0;
    },
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("next", true);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.auth-container .id-card-page {
  display: flex;
  justify-content: center;
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
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
.title-text {
  text-align: center;
}
.commit-btn {
  text-align: center;
}
.idcard-info-list {
  min-width: 500px;
  width: 30%;
  margin: 0 auto;
}
.idcard-pic {
  display: flex;
}
.idcard-pic-p {
  line-height: 20px;
  height: 20px;
  margin: 0;
  text-align: center;
}
.foot-btn {
  text-align: center;
}
</style>