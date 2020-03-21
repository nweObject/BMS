<template>
<div class="box">
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="用户id"
      width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.userId}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="登记日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="还书日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.returnTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="书名"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.bookName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.status  == 0 ?'正常' : scope.row.status == 1 ? '延期中' : '遗失'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="backBook(scope.row.id, scope.row.bookId)">还书</el-button>
          <el-button
          size="mini"
          type="info"
          @click="moreTime(scope.row.id, scope.row.bookId)" >延期</el-button>    
         <el-button
          size="mini"
          type="warning"
          @click="lostRecorder(scope.row.id)">遗失登记</el-button>
            <el-button
          size="mini"
          type="danger"
          @click="compensation(scope.row.id, scope.row.userId, scope.row.bookId)" v-if="scope.row.status == 2">赔偿</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
           tableData: [], 
        }
    },
    methods: {
        init() {
            axios.get('api/borrower/detail').then(response => {
                // console.log(response.data.data);
                this.tableData = response.data.data;
            })
        },
        //归还书籍
        backBook(userBookId, bookId) {
            axios.delete('api/borrower/return', {
                params: {
                    userBookId: userBookId,
                    bookId: bookId
                }
            }).then(response => {
                console.log(response.data.data);
                this.init()
            })
        },
        //延期归还
        moreTime(userBookId, bookId) {
            console.log(userBookId,bookId)
            axios.put('api/borrower/update',{
                userbookId: userBookId,
                bookId: bookId
            }).then(response => {
                if(response.data.data) {
                    alert(response.data.data)
                }else {
                    alert(response.data.msg)
                }
                this.init()
            })
        },
        //遗失登记
        lostRecorder(userBookId) {
            axios.put('api/borrower/lost',{
                userBookId: userBookId,
            }).then(response => {
                console.log(response.data.data)
                this.init()
            })
        },
        //赔偿书籍
        compensation(userBookId, userId, bookId) {
            axios.post('api/borrower/compensation', {
                userBookId: userBookId,
                userId: userId,
                bookId: bookId
            }).then(response => {
                console.log(response.data.data)
                this.init()
            })
        }
    },
    mounted() {
        this.init();
    }
}
</script>
<style scoped>
   .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .imagetable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    }
    .imagetable th {

    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    }
    .imagetable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    }
    .header {
        margin-top: 50px;
    }
</style>