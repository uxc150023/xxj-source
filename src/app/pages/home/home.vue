<template>
  <div class="page-module">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" src="./home.ts"></script>
<style lang="scss" scoped>
$color: #333;

.page-module {
  color: $color;
  font-size: 0.6rem;
}
</style>
