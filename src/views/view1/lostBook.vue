<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="登记日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.recorderTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="书名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.bookName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 0 ? '未审核' : '已审核'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="review(scope.row.id)"
            v-if="scope.row.status == 0"
          >审核</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBook(scope.row.bookId, scope.row.id)"
            v-if="scope.row.status == 1"
          >下架</el-button>
        </template>
      </el-table-column>
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
    init() {
      this.$http.get("api/borrower/lostBooks").then(Response => {
        this.tableData = Response.data.data;
      })
      axios;
    },
    review(lostRecorderId) {
      axios
        .put("api/borrower/review", {
          lostBookId: lostRecorderId
        })
        .then(Response => {
          this.init();
        });
    },
    deleteBook(bookId, lostBookId) {
      axios
        .delete("api/book/delete", {
          params: {
            bookId: bookId,
            lostBookId: lostBookId
          }
        })
        .then(Response => {
          this.init();
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.box {
  margin-top: 50px;
}
</style>