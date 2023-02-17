<template>
  <div class="loginbox-container">
    <template v-if="!token">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="phone">
          <el-input
            class="form-input"
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneVerify">
          <el-input
            class="form-input"
            type="text"
            v-model="ruleForm.phoneVerify"
            placeholder="请输入验证码"
            autocomplete="off"
            clearable
            ><template slot="append">
              <el-button @click="sendMsg" class="sendmsg-btn"
                >{{ times
                }}{{ typeof times == "number" ? "秒" : "" }}</el-button
              >
            </template></el-input
          >
        </el-form-item>
        <el-form-item
          class="read-agree"
          style="margin-top: -10px"
          prop="checked"
        >
          <el-checkbox v-model="ruleForm.checked"
            ><span>已阅读并同意</span></el-checkbox
          >
          <span class="agreement">《平台服务协议》</span>
          <span class="agreement">《平台隐私协议》</span>
        </el-form-item>
        <el-form-item style="margin-top: -10px">
          <el-button
            @click="applyClick('ruleForm')"
            class="apply-btn"
            type="primary"
            round
            >立即申请</el-button
          >
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <div>
        <h3>欢迎！{{ data.phone }}</h3>
        <p>暂未获得授信额度</p>
        <el-button @click="applyNow" class="apply-btn" type="primary" round
          >立即申请</el-button
        >
        <el-button
          @click="loginOut"
          class="apply-btn"
          style="margin: 0"
          type="text"
          round
          >退出登录</el-button
        >
      </div>
    </template>
    <!-- <div ref="popup"></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { appId } from "@/util/config";
import tools, { throttle, downTime } from "../util/index";
export default {
  name: "LoginBox",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!tools.isPhoneNumber(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          callback();
        }
      }
    };
    var validatephoneVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var validatechecked = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请先阅读并勾选协议"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        phoneVerify: "",
        checked: false,
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        phoneVerify: [{ validator: validatephoneVerify, trigger: "blur" }],
        checked: [{ validator: validatechecked, trigger: "change" }],
      },
      times: "获取验证码",
      data: {
        phone: "159****1753",
      },
      myCaptcha: "",
    };
  },
  methods: {
    applyClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apply();
        } else {
          return false;
        }
      });
    },
    apply: throttle(function () {
      console.log(2222);
    }),
    sendMsg() {
      downTime(this, 60);
    },
    applyNow() {},
    loginOut() {
      this.$store.dispatch("LogOut");
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {
    // this.myCaptcha = _dx.Captcha(this.$refs.popup, {
    //   // appId, 在控制台应用管理或应用配置模块获取
    //   appId,
    //   success: (token) => {
    //     console.log(token);
    //     this.myCaptcha.hide();
    //     // _this.myCaptcha.reload();
    //     // _this.myCaptcha.show();
    //   },
    // });
  },
};
</script>

<style scoped>
.loginbox-container {
  width: 20%;
  min-width: 350px;
  height: 30%;
  padding: 30px 30px 10px;
  box-shadow: 1px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.agreement {
  color: blue;
  cursor: pointer;
}
.read {
  margin-left: 5px;
}
.apply-btn {
  width: 100%;
}
.sendmsg-btn {
  width: 135px;
}
::v-deep .read-agree .el-form-item__error {
  margin-top: -12px !important;
  border-radius: 50%;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #409eff !important;
  border: 1px solid #409eff !important;
  border-radius: 50%;
}
::v-deep .el-checkbox .el-checkbox__input .el-checkbox__inner {
  border-radius: 50%;
}
::v-deep .el-checkbox__inner:hover {
  border-radius: 50%;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  border-radius: 50%;
  color: #606266;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-radius: 50%;
}
</style>