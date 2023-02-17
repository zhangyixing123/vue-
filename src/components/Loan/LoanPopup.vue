<template>
  <el-dialog
    :visible.sync="isShow"
    center
    top="10%"
    width="630px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="loan-container"
  >
    <template v-if="loanStep === 0">
      <div class="loan-container-item">
        <el-row
          :gutter="20"
          type="flex"
          align="center"
          class="loan-row loan-row-item"
        >
          <el-col :span="22" :offset="1">放款申请</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >融资主体：{{ propsInfo.enterpriseName }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >申请人姓名：{{ propsInfo.userName }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >可用额度：<span class="blue-text">
              ￥{{ propsInfo.creditLimit }}</span
            ></el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">
            放款金额：<el-input
              placeholder="请输入放款金额"
              v-model="propsInfo.applyAmt"
              class="input-style"
              oninput="value=value.replace(/[^\d.]|^(0[0-9]*)$/g,'')"
            >
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">
            融资期限：<el-input
              placeholder="请输入融资期限"
              v-model="propsInfo.applyTnr"
              class="input-style"
              oninput="value=value.replace(/[^\d.]|^(0[0-9]*)$/g,'')"
            >
              <template slot="append">月</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyOpt">申请放款</el-button>
        <el-button type="warning" @click="closeHandle">取 消</el-button>
      </span>
    </template>

    <template v-else-if="loanStep === 1">
      <div class="loan-container-item">
        <el-row
          :gutter="20"
          type="flex"
          align="center"
          class="loan-row loan-row-item"
        >
          <el-col :span="22" :offset="1">确认放款</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >融资编号：{{ propsInfo.enterpriseCode }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >融资主体：{{ propsInfo.enterpriseName }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >申请人姓名：{{ propsInfo.userName }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >放款额度：￥{{ propsInfo.applyAmt }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >融资期限：{{ propsInfo.applyTnr }}个月</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >融资年化利率：{{ propsInfo.feeRate }}</el-col
          >
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">还款方式：随借随还</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            ><el-checkbox v-model="checked"
              ><span>已阅读并同意</span></el-checkbox
            >
            <span class="agreement">《技术服务协议》</span></el-col
          >
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmApl">确认放款</el-button>
        <el-button type="warning" @click="closeHandle">取消申请</el-button>
      </span>
    </template>

    <template v-else-if="loanStep === 2">
      <div class="loan-container-item">
        <el-row
          :gutter="20"
          type="flex"
          align="center"
          class="loan-row loan-row-item"
        >
          <el-col :span="22" :offset="1">转账支付服务费</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >技术服务费：<span class="red-text"
              >￥{{ propsInfo.applyAmt * 0.01 }}</span
            >
            <span class="small-text">(融资金额的年化1%)</span></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22" :offset="1"
            ><el-alert
              :closable="false"
              title="请复制以下账户信息进行转账支付，可通过网银、手机银行、银行柜台、ATM等方式转账，请务必备注融资企业信息。"
              type="error"
            >
            </el-alert
          ></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">公司名称：{{ company.name }}</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">账号：{{ company.account }}</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1">开户行：{{ company.bank }}</el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" class="loan-row">
          <el-col :span="22" :offset="1"
            >打款备注（融资企业）：{{ propsInfo.enterpriseName }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <p class="p-title">温馨提示：</p>
            <p class="p-text">
              1、转账时间: 工作日9点-17点(17点后顺延下一工作日处理)
            </p>
            <p class="p-text">
              2、转账请务必备注<span class="blue-text">融资主体</span>。
            </p>
            <p class="p-text">
              3、由于线下还款需要人工操作，建议您提前转账，如有任何疑问，请咨询<span
                class="blue-text"
                >客户经理</span
              >。
            </p>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="paid">已支付</el-button>
        <el-button type="warning" @click="closeHandle">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "LoanPopup",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      checked: false,
      loanStep: 0,
      isShow: true,

      company: {
        name: "民商数字科技(深圳)有限公司",
        account: "684008961",
        bank: "中国民生银行股份有限公司北京西长安街支行",
      },
      propsInfo: {
        enterpriseName: "",
        enterpriseCode: "",
        merNo: "",
        userName: "",
        creditLimit: 0,
        feeRate: 0,
        applyAmt: "",
        applyTnr: "",
      },
    };
  },
  created() {
    this.isShow = this.show;
    this.propsInfo = { ...this.propsInfo, ...this.info };
  },
  methods: {
    closeHandle() {
      this.$emit("close", true);
    },
    applyOpt() {
      if (!this.propsInfo.applyAmt || this.propsInfo.applyAmt == "0") {
        this.$message.error("请输入放款金额");
        return;
      }
      if (this.propsInfo.applyAmt > this.propsInfo.creditLimit) {
        this.$message.error("请输入可用额度之内额度");
        return;
      }
      if (!this.propsInfo.applyTnr || this.propsInfo.applyTnr == "0") {
        this.$message.error("请输入融资期限");
        return;
      }

      this.loanStep++;
    },
    confirmApl() {
      this.loanStep++;
    },
    paid() {
      this.$emit("paid", true);
    },
  },
};
</script>

<style scoped>
::v-deep .loan-container {
  border-radius: 10px !important;
}
.loan-container-item {
  font-size: 16px;
}
.loan-row-item {
  font-size: 22px;
  font-weight: 600;
}
.loan-row {
  line-height: 50px;
  height: 50px;
}
::v-deep .el-dialog__header {
  padding: 0;
}
.blue-text {
  color: blue;
}
.red-text {
  color: #f56c6c;
}
.small-text {
  font-size: 13px;
  margin-left: 5px;
  color: #9f9f9f;
}
.p-title {
  font-size: 18px;
  font-weight: 600;
}
.p-text {
  font-size: 14px;
  margin: 5px 0;
}
.input-style {
  width: 220px;
}
.agreement {
  color: blue;
  cursor: pointer;
  font-size: 14px;
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
::v-deep .el-checkbox__input .el-checkbox__label {
  font-size: 16px;
}
</style>