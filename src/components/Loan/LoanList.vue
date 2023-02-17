<template>
  <div class="loan-list">
    <el-row type="flex" class="row-item" justify="center">
      <el-col :span="6"
        ><div class="col-content">
          融资主体：{{ info.enterpriseName }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="col-content">授信机构：{{ info.merNo }}</div></el-col
      >
    </el-row>
    <el-row type="flex" class="row-item" justify="center">
      <el-col :span="6"
        ><div class="col-content">申请人姓名：{{ info.userName }}</div></el-col
      >
      <el-col :span="6"
        ><div class="col-content">
          可用额度：<span class="col-money">￥{{ info.creditLimit }}</span>
        </div></el-col
      >
    </el-row>

    <div>
      <h3>融资进度</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column
          prop="applyTime"
          label="时间"
          align="center"
          min-width="20%"
        >
        </el-table-column>
        <el-table-column
          prop="applyAmt"
          label="融资金额（元）"
          align="center"
          min-width="20%"
        >
        </el-table-column>
        <el-table-column
          prop="applyTnr"
          label="融资期限（月）"
          align="center"
          min-width="20%"
        >
        </el-table-column>
        <el-table-column label="融资状态" align="center" min-width="20%">
          <template slot-scope="scope">
            <p>
              {{ scope.row.status | FundStatusFilter }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text" @click="viewOpt(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="operation">
        <el-button type="primary" @click="LoanAplOpt">放款申请</el-button>
      </div>
    </div>

    <!-- 融资进度查看弹窗 -->
    <ViewStatus
      v-if="isViewStatus"
      @close="closeViewStatus"
      :show="isViewStatus"
      :fundInfo="fundInfo"
    />

    <!-- 放款申请 -->
    <LoanPopup
      v-if="isLoanPopup"
      @close="closeLoanPopup"
      :show="isLoanPopup"
      :info="info"
      @paid="paid"
    />
  </div>
</template>

<script>
import ViewStatus from "./ViewStatus";
import LoanPopup from "./LoanPopup";
import { FundStatusFilter } from "@/util";
export default {
  name: "LoanList",
  components: {
    ViewStatus,
    LoanPopup,
  },
  filters: { FundStatusFilter },
  data() {
    return {
      isLoanPopup: false,
      isViewStatus: false,
      headerCellStyle: {
        backgroundColor: "#fafafa",
      },
      info: {
        enterpriseName: "腾讯控股股份有限公司",
        enterpriseCode: "12345678",
        merNo: "中国银行有限公司",
        userName: "张三",
        creditLimit: 10000,
        feeRate: "3.3%",
      },
      tableData: [
        {
          applySeq: "",
          userid: "",
          userName: "",
          enterpriseName: "",
          enterpriseCode: "",
          applyAmt: "10000",
          applyTnr: 6,
          status: "01",
          applyTime: "2016-05-03",
        },
      ],
      fundInfo: {
        applySeq: "12345678912345678912",
        userName: "张三",
        enterpriseName: "腾讯控股股份有限公司",
        applyAmt: 10000,
        applyTnr: 6,
        status: "01",
        applyTime: "2016-05-03",
      },
    };
  },
  created() {
    console.log("first");
  },
  methods: {
    viewOpt() {
      this.isViewStatus = true;
    },
    LoanAplOpt() {
      this.isLoanPopup = true;
    },
    closeViewStatus() {
      this.isViewStatus = false;
    },
    closeLoanPopup() {
      this.isLoanPopup = false;
    },
    paid() {
      this.isLoanPopup = false;
      this.$emit("paid", true);
    },
  },
};
</script>

<style scoped>
.col-content {
  text-align: left;
  font-size: 18px;
}
.row-item {
  height: 50px;
  line-height: 50px;
}
.col-money {
  color: red;
}
.loan-list {
  padding: 0 10%;
}
.operation {
  text-align: center;
  margin-top: 40px;
}
</style>