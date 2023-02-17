<template>
  <el-dialog
    :visible.sync="isShow"
    center
    top="10%"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="view-container"
  >
    <div class="view-container-item">
      <el-row
        :gutter="20"
        type="flex"
        align="center"
        class="view-row view-row-item"
      >
        <el-col :span="22" :offset="1">国行数e融</el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="center" class="view-row">
        <el-col :span="22" :offset="1"
          >融资状态：{{ data.status | FundStatusFilter }}</el-col
        >
      </el-row>
      <el-row
        :gutter="20"
        type="flex"
        align="center"
        class="view-row over-ellipsis"
      >
        <el-col :span="22" :offset="1">融资编号：{{ data.applySeq }}</el-col>
      </el-row>
      <el-row
        :gutter="20"
        type="flex"
        align="center"
        class="view-row view-row-txt"
      >
        <el-col :span="22" :offset="1" class="over-ellipsis"
          >融资主体：{{ data.enterpriseName }}</el-col
        >
      </el-row>
      <el-row :gutter="20" type="flex" align="center" class="view-row">
        <el-col :span="22" :offset="1">申请人姓名：{{ data.userName }}</el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="center" class="view-row">
        <el-col :span="22" :offset="1">申请金额：{{ data.applyAmt }}</el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="center" class="view-row">
        <el-col :span="22" :offset="1">融资期限：{{ data.applyTnr }}</el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="center" class="view-row">
        <el-col :span="22" :offset="1">融资日期：{{ data.applyTime }}</el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button plain type="primary" @click="closeHandle">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { FundStatusFilter } from "@/util";
export default {
  name: "ViewStatus",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    fundInfo: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    FundStatusFilter,
  },
  data() {
    return {
      isShow: true,
      data: {},
    };
  },
  created() {
    this.isShow = this.show;
    this.data = this.fundInfo;
  },
  methods: {
    closeHandle() {
      this.$emit("close", true);
    },
  },
};
</script>

<style scoped>
::v-deep .view-container {
  border-radius: 10px !important;
}
.view-container-item {
  font-size: 16px;
}
.view-row-item {
  font-size: 22px;
  font-weight: 600;
}
.view-row {
  line-height: 40px;
  height: 40px;
}
::v-deep .el-dialog__header {
  padding: 0;
}
.over-ellipsis {
  width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>