<template>
  <div class="header">
    <el-table :data="tableData" style="width: 70%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="phoneNum" label="用户电话" width="180"></el-table-column>
      <el-table-column prop="username" label="用户姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="identify" label="身份"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    init() {
      axios.get("api/user/userInfo").then(Response => {
        console.log(Response.data.data);
        this.tableData = Response.data.data;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.header {
  margin-top: 40px;
}
</style>