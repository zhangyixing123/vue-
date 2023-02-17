<template>
  <div>
    <el-empty description="404...页面被怪兽抓了!!!">
      <p>页面 {{ time }} 秒后自动跳转...</p>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "NotFound",

  data() {
    return {
      time: 3,
    };
  },
  created() {
    const timer = setInterval(() => {
      if (this.time === 1) {
        clearInterval(timer);
        this.$router.replace("/Login");
      }
      this.time--;
    }, 1000);
  },

  methods: {},
};
</script>

<style scoped>
.not-found-container {
  height: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 30px;
  color: #3e3e3e;
}
</style>
