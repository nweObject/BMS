<template>
  <div>
    <div>
      <div class="box">
        <div class="searchBox">
          <input
            type="text"
            v-model="keywords"
            placeholder="请输入关键词进行搜索"
            class="searchInput"
            style="padding-left: 10px;"
          />
          <input type="button" value="搜索" class="searchButton" @click="searchBooks(keywords)" />
        </div>
      </div>
    </div>
    <div class="mainBox">
      <el-row>
        <el-col :span="5" v-for="(item, index) in data" :key="index" class="item">
          <el-card :body-style="{ padding: '0px' }">
            <span>
              <h4>{{'《'+ item.bookName}}》</h4>
            </span>
            <img :src="item.bookImg" class="image" />
            <div style="padding: 14px;">
              <span>{{item.description}}</span>
              <div class="bottom clearfix">
                <time class="time">价格:{{ item.price}}元</time>
                <el-button
                  type="danger"
                  class="button"
                  @click="borrowerBook(item.id)"
                  icon="el-icon-edit"
                  round
                >借书</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      keywords: "",
      message: ""
    };
  },
  methods: {
    searchBooks(keywords) {
      axios
        .get("api/book/find", {
          params: {
            keywords: keywords
          }
        })
        .then(response => {
          this.data = response.data.data;
        });
    },
    getBookList() {
      axios.get("api/book/all").then(response => {
        console.log(response.data.data);
        this.data = response.data.data;
      });
    },
    borrowerBook(id) {
      axios
        .get("api/borrower/book", {
          params: {
            bookId: id
          }
        })
        .then(response => {
          if (response.data.data != null) {
            this.message = response.data.data;
            alert(this.message);
          } else {
            this.message = response.data.msg;
            alert(this.message);
          }
        });
    }
  },
  mounted() {
    this.getBookList();
  },
  watch: {
    //监听路由是否发生变化
    $route(to, from) {
      console.log("watch $route");
      this.getBookList();
    }
  }
};
</script>
<style scoped>
.box {
  margin: 0 auto;
  padding-top: 80px;
  height: 50px;
  width: 100%;
}
.searchBox {
  margin: 0 auto;
  width: 60%;
  position: relative;
}
.searchInput {
  display: inline-block;
  width: 85%;
  height: 38px;
  border: 1px solid #cccccc;
  float: left;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.searchButton {
  display: inline-block;
  width: 15%;
  height: 38px;
  line-height: 40px;
  float: left;
  background-color: #00a0e9;
  font-size: 16px;
  cursor: pointer;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border: none;
  color: #fff;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.mainBox {
  margin-top: 50px;
  margin-left: 350px;
}
.image {
  height: 300px;
}
.item {
  margin-left: 7px;
  margin-bottom: 5px;
}
</style>>