<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal" @select="handleSelect" background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="3" >借阅中心</el-menu-item>
  </el-menu>
  <div>
    <router-view/>
  </div>
</div>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
