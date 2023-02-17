<template>
  <div class="table-container">
    <div v-if="currentStep === 0">
      <h2>上传企业授信资料<span>请上传融资企业的相关授信资料</span></h2>
      <el-alert
        title="【温馨提示】 1、上传文件需根据对应的材料名称上传; 2、法人和实控人如为同一人身份证可上传相同文件; 3、所有文件均支持上传zip压缩包"
        type="warning"
      >
      </el-alert>
      <!-- 基础资料列表 -->
      <el-table
        :data="baseData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="fileName" label="基础材料" min-width="80%">
        </el-table-column>
        <el-table-column label="上传状态" align="center" min-width="10%">
          <template slot-scope="scope">
            <p :class="scope.row.status == 1 ? 'text-green' : ''">
              {{ scope.row.status | statusFilter }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text" @click="upload(scope.$index, scope.row)"
              >上传</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 财务资料列表 -->
      <el-table
        :data="financeData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="fileName" label="财务类资料" min-width="80%">
        </el-table-column>
        <el-table-column label="上传状态" align="center" min-width="10%">
          <template slot-scope="scope">
            <p :class="scope.row.status == 1 ? 'text-green' : ''">
              {{ scope.row.status | statusFilter }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text" @click="upload(scope.$index, scope.row)"
              >上传</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="other-write-text">
        其他填写类资料<span
          >为确保您的借款申请尽快顺利通过，请尽快联系您的客户经理线下获取其他必填类材料。
        </span>
      </div>

      <div class="operation">
        <el-button @click="previous">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
      <div></div>
    </div>
    <div v-if="currentStep === 1">
      <h2>上传授信资料<span>请下载银行相关授信资料，盖章后上传扫描件</span></h2>
      <el-alert
        title="【温馨提示】 1、下载文件为Word格式，批量下为2p压包; 2、上传文件要求为pd格式，需根据对应的材料名称上传; 3、法人和实控人如为同一人个人征信授权书》可上传相同文件; 4、所有文件均支持上传2p压缩包;"
        type="warning"
      >
      </el-alert>
      <!-- 须先下载再上传资料列表 -->
      <el-table
        :data="bankData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="fileName" label="材料名称" min-width="80%">
        </el-table-column>
        <el-table-column align="center" label="上传状态" min-width="10%">
          <template slot-scope="scope">
            <p :class="scope.row.status == 1 ? 'text-green' : ''">
              {{ scope.row.status | statusFilter }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text" @click="down(scope.$index, scope.row)"
              >下载</el-button
            >
            <el-button type="text" @click="upload(scope.$index, scope.row)"
              >上传</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-button type="text" @click="bulkDown" style="width: 10%"
          >批量下载</el-button
        >
      </div>
      <div class="operation">
        <el-button @click="previousStep">上一步</el-button>
        <el-button type="primary" @click="next">提交</el-button>
      </div>
    </div>
    <!-- 确认上传弹窗 -->
    <el-dialog
      :visible.sync="DialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div>
        <header class="dialog-header">{{ DialogData.fileName }}</header>
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handlepChange"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png/zip/doc/pdf文件，且不超过50M
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirmDialog">上 传</el-button>
        <el-button type="warning" @click="DialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { downLoadFile, statusFilter } from "@/util/index";
export default {
  name: "UploadData",
  filters: {
    statusFilter,
  },
  data() {
    return {
      TYPE: [
        "yzw_enterprise_file_file_type_base", // 基础资料
        "yzw_enterprise_file_file_type_finance", // 财务资料
        "yzw_enterprise_file_file_type_bank", // 银行资料
      ],
      commonType: "",
      fileList: [],
      DialogVisible: false,
      DialogData: {
        fileName: "企业营业执照（正本）扫描件",
      },
      currentStep: 0,
      headerCellStyle: {
        backgroundColor: "#fafafa",
      },
      baseData: [
        {
          fileName: "1、企业营业执照（正本）扫描件：（JPG、PNG格式）",
          tempUrl: "#",
          status: "0",
          fileId: "",
        },
      ],
      financeData: [
        {
          fileName: "1、企业营业执照（正本）扫描件：（JPG、PNG格式）",
          tempUrl: "#",
          status: "1",
          fileId: "",
        },
      ],
      bankData: [
        {
          fileName: "1、企业营业执照（正本）扫描件：（JPG、PNG格式）",
          tempUrl: "#",
          status: "1",
          fileId: "",
        },
      ],
    };
  },
  methods: {
    upload(index, row) {
      console.log(row);
      this.DialogVisible = true;
    },
    down() {
      this.$message({
        showClose: true,
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },
    bulkDown() {
      const url =
        "https://web-xd.msyidai.com/gateway/document/download?fileId=1ea3222b-6f9a-456e-a627-11f268af12f0";
      downLoadFile(url);
    },
    next() {
      console.log("提交");
      this.$emit("next", true);
    },
    previous() {
      this.$emit("previous", true);
    },
    nextStep() {
      this.currentStep = 1;
    },
    previousStep() {
      this.currentStep = 0;
    },
    comfirmDialog() {},
    handlepChange(file, fileList, name) {
      console.log("file", file);
      console.log("fileList", fileList);
      console.log("name", name);
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 50M !");
        this.fileList = [];
      }
      return isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.warning("只支持上传1个文件");
    },
  },
};
</script>

<style scoped>
.table-container {
  padding: 0 10%;
}
.table-container h2 {
  margin: 0;
  margin-bottom: 20px;
}
.table-container h2 > span {
  font-size: 16px;
  font-weight: 500;
  margin-left: 15px;
}
.operation {
  text-align: center;
  margin-top: 10px;
}
.other-write-text {
  color: #909399;
  background: #fafafa;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
  font-size: 14px;
  padding-left: 10px;
}
.other-write-text > span {
  color: red;
  margin-left: 10px;
  font-weight: 100;
}
.dialog-header {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
::v-deep .el-dialog--center .el-dialog__body {
  padding: 0;
}
.upload-demo {
  padding: 20px;
}
.text-green {
  color: #67c23a;
}
</style>