<template>
  <div>
    <div class="status-container" v-if="currentType == 'credit'">
      <img v-if="currentStatus == '03'" src="../assets/approvaling.png" />
      <img v-else src="../assets/refuse.png" />
      <p>{{ switchOpertion(currentStatus) }}</p>
      <div v-if="currentStatus == '03'">
        <el-button type="primary" plain @click="previous"
          >编辑上传资料</el-button
        >
      </div>
    </div>
    <div class="status-container" v-else>
      <img src="../assets/approvaling.png" />
      <p>{{ switchOpertion(currentStatus) }}</p>
      <div>
        <el-button type="primary" @click="previous">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: {
    status: {
      type: String,
      default: "03",
      //credit-> 03审批中 99审批拒绝
      //loan-> 01放款中
    },
    type: {
      type: String,
      default: "credit", // 授信=>credit, 放款=>loan
    },
  },
  data() {
    return {
      currentStatus: "",
      currentType: "",
    };
  },
  created() {
    this.currentStatus = this.status;
    this.currentType = this.type;
  },
  methods: {
    previous() {
      this.$emit("previous", true);
    },
    switchOpertion(status) {
      if (this.currentType == "credit") {
        if (status == "03") {
          return "授信审批中";
        } else {
          return "抱歉，您的授信申请未通过。";
        }
      } else {
        return "放款审批中";
      }
    },
  },
};
</script>

<style scoped>
.status-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 250px;
  text-align: center;
}
.status-container > img {
  width: 150px;
  height: 150px;
}
.status-container > p {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.status-container > div {
  text-align: center;
}
</style>