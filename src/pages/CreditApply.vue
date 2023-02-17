<template>
  <div>
    <!-- 头部导航栏 -->
    <Header />
    <!-- 步骤条 -->
    <NewSteps :steps="steps" :active="active" v-if="active !== 3"></NewSteps>
    <!-- 实名认证 -->
    <keep-alive>
      <Authentication @next="nextHandle" v-if="active === 0" />
    </keep-alive>
    <!-- 完善信息 -->
    <keep-alive>
      <ImproveInfo
        @next="nextHandle"
        @previous="previousHandle"
        v-if="active === 1"
      />
    </keep-alive>
    <!-- 资料上传 -->
    <UploadData
      @next="nextHandle"
      @previous="previousHandle"
      v-if="active === 2"
    />

    <!-- 授信审批状态 -->
    <Status
      v-if="active === 3"
      @next="nextHandle"
      @previous="previousHandle"
      :status="status"
      type="credit"
    />

  </div>
</template>

<script>
import Header from "@/components/Header";
import NewSteps from "../components/NewSteps";
import Authentication from "../components/Credit/Authentication";
import ImproveInfo from "../components/Credit/ImproveInfo";
import UploadData from "../components/Credit/UploadData";
import Status from "../components/Status";
export default {
  name: "CreditApply",
  components: {
    NewSteps,
    Header,
    Authentication,
    ImproveInfo,
    UploadData,
    Status,
  },
  data() {
    return {
      steps: [
        { title: "实名认证" },
        { title: "完善信息" },
        { title: "上传资料" },
      ],
      active: 2,
      status: "03",
    };
  },
  methods: {
    nextHandle() {
      this.active++;
    },
    previousHandle() {
      this.active--;
    },
  },
};
</script>

<style scoped>
</style>