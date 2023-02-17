<template>
  <div class="login-container">
    <Header />
    <div class="login-container-item">
      <div>
        <p>国行数e融</p>
        <p>
          银行基于上游供应商信用情况为基础，结合中建集团与上游供应商的交易记录，进行线下评审审批，为
        </p>
        <p>
          符合条件的供应商提供日常生产经营周转所需的人民币流动资金贷款业务。
        </p>
      </div>
      <LoginBox />
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import LoginBox from "@/components/LoginBox";

export default {
  name: "Login",
  components: {
    Header,
    LoginBox,
  },
  data() {
    return {
      input: "",
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.login-container {
}
.login-container-item {
  display: flex;
  align-items: center;
  padding: 10% 5%;
}
</style>