<template>
  <div class="contianer-step">
    <el-steps :active="activeIndex" finish-status="success" align-center>
      <el-step
        v-for="(item, index) in stepsItem"
        :key="index"
        :title="item.title"
      />
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "NewSteps",
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      activeIndex: 0,
      stepsItem: [],
    };
  },

  created() {
    this.activeIndex = this.active;
    this.stepsItem = this.steps;
  },
  watch: {
    active(val) {
      this.activeIndex = val;
    },
  },
};
</script>

<style scoped>
.contianer-step {
  padding: 70px 0;
}
</style>