<template>
  <div class="loan-container">
    <Header />
    <NewSteps :steps="steps" :active="active" v-if="active !== 2"></NewSteps>
    <LoanList @paid="paidOpt" v-if="active !== 2" />
    <!-- 放款审批状态 -->
    <Status @previous="previousHandle" type="loan" v-if="active === 2" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import NewSteps from "@/components/NewSteps";
import LoanList from "@/components/Loan/LoanList";
import Status from "@/components/Status";
export default {
  name: "LoanApply",
  components: {
    NewSteps,
    Header,
    LoanList,
    Status,
  },
  data() {
    return {
      steps: [
        { title: "放款申请" },
        { title: "完善信息" },
        { title: "银行放款" },
      ],
      active: 0,
      showStatus: false,
    };
  },
  methods: {
    previousHandle() {
      this.active = 0;
    },
    paidOpt() {
      this.active = 2;
    },
  },
};
</script>

<style scoped>
.loan-container {
  min-width: 1200px;
}
</style>