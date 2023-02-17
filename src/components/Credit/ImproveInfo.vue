<template>
  <el-form
    class="improve-info-list"
    label-position="right"
    label-width="150px"
    :model="formLabelAlign"
    :rules="rules"
    ref="formLabelAlign"
  >
    <el-form-item label="企业名称：" prop="enterpriseName">
      <el-input v-model="formLabelAlign.enterpriseName"></el-input>
    </el-form-item>
    <el-form-item label="统一社会信用代码：" prop="enterpriseCode">
      <el-input v-model="formLabelAlign.enterpriseCode"></el-input>
    </el-form-item>
    <el-form-item label="法人姓名：">
      &nbsp; &nbsp; {{ formLabelAlign.legalPersonName }}
    </el-form-item>
    <el-form-item label="法人联系电话：" prop="legalPersonMobile">
      <el-input v-model="formLabelAlign.legalPersonMobile"></el-input>
    </el-form-item>
    <el-form-item label="申请人姓名：" prop="applyName">
      <el-input v-model="formLabelAlign.applyName"></el-input>
    </el-form-item>
    <el-form-item label="申请人联系电话：" prop="applyMobile">
      <el-input v-model="formLabelAlign.applyMobile"></el-input>
    </el-form-item>
    <el-form-item label="期望借款金额：" prop="expectMoney">
      <el-input
        v-model="formLabelAlign.expectMoney"
        oninput="value=value.replace(/[^\d.]|^(0[0-9]*)$/g,'')"
      >
        <template slot="append">万元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="期望借款期限：" prop="expectTnr">
      <el-input
        v-model="formLabelAlign.expectTnr"
        oninput="value=value.replace(/[^\d.]|^(0[0-9]*)$/g,'')"
      >
        <template slot="append">月</template>
      </el-input>
    </el-form-item>
    <el-form-item class="foot-btn">
      <el-button @click="previous">上一步</el-button>
      <el-button type="primary" @click="next('formLabelAlign')"
        >下一步</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import tools from "@/util/index";
export default {
  name: "ImproveInfo",
  data() {
    var validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系电话"));
      } else {
        if (!tools.isPhoneNumber(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          callback();
        }
      }
    };

    return {
      formLabelAlign: {
        enterpriseName: "",
        enterpriseCode: "",
        legalPersonName: "马化腾",
        legalPersonMobile: "",
        applyName: "",
        applyMobile: "",
        expectMoney: "",
        expectTnr: "",
        creditApplySeq: "",
      },
      rules: {
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        enterpriseCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
        ],
        legalPersonMobile: [
          { required: true, validator: validate, trigger: "blur" },
        ],
        applyName: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" },
        ],
        applyMobile: [{ required: true, validator: validate, trigger: "blur" }],
        expectMoney: [
          { required: true, message: "请输入期望借款金额", trigger: "blur" },
        ],
        expectTnr: [
          { required: true, message: "请输入期望借款期限", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    previous() {
      this.$emit("previous", true);
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
.improve-info-list {
  min-width: 500px;
  width: 30%;
  margin: 0 auto;
}
.foot-btn {
  text-align: center;
}
</style>