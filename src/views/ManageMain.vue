<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal" @select="handleSelect" background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
    <el-menu-item index="11">首页</el-menu-item>
    <el-menu-item index="22">用户中心</el-menu-item>
    <el-menu-item index="33">添加图书</el-menu-item> 
    <el-menu-item index="44" >遗失记录</el-menu-item>
    
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