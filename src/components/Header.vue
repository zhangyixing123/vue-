<template>
  <div>
    <el-row class="row">
      <el-col class="row-l" :span="12"
        ><span>国行数e融</span>
        <span v-if="titleItem" class="apply-fk">{{ titleItem }}</span></el-col
      >
      <el-col class="row-r" :span="12" v-if="token">
        <el-popover placement="bottom" width="160" v-model="visible">
          <p>确认退出？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false"
              >不了</el-button
            >
            <el-button type="primary" size="mini" @click="loginOut"
              >确定</el-button
            >
          </div>
          <el-button class="login-out" slot="reference" type="text"
            >退出登录</el-button
          >
        </el-popover></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      titleItem: "",
      visible: false,
    };
  },
  created() {
    this.titleItem = this.title;
  },

  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    loginOut() {
      this.$store.dispatch("LogOut");
      this.visible = false;
      this.$router.replace("./Login");
    },
  },
};
</script>

<style scoped>
.row {
  height: 100px;
  background: #181f3f;
  color: white;
  padding-top: 30px;
}
.row .row-l {
  font-size: 40px;
  padding-left: 10%;
}
.row .row-r {
  text-align: right;
  padding-right: 10%;
}
.row .login-out {
  color: white;
  font-size: 17px;
  margin-top: 20px;
}
.row .apply-fk {
  font-size: 25px;
}
</style>