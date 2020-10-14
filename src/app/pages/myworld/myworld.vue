<template>
  <div class="page-module">
    <visit-card />
    <div class="world-top">
      <div class="">
        <p>钻级 <span>888</span></p>
        <p>学粉 <span>888</span></p>
      </div>
      <div class="">
        <p style="font-size: 20px;">今日反响</p>
        <p>读 <span>888</span></p>
        <p>赞 <span>888</span></p>
        <p>想 <span>888</span></p>
        <p>转 <span>888</span></p>
        <p>摘 <span>888</span></p>
        <p>赏 <span>888</span></p>
        <p style="margin-right: 0;">粉 <span>888</span></p>
      </div>
    </div>

    <div class="world-content">
      <el-tabs v-model="activeName" :before-leave="beforeLeave">
        <el-tab-pane label="新学鱼雁" name="1"> </el-tab-pane>
        <el-tab-pane label="新学浪潮" name="2"> </el-tab-pane>
        <el-tab-pane label="新学峰峦" name="3"> </el-tab-pane>
        <el-tab-pane label="新学专列" name="4"> </el-tab-pane>
        <el-tab-pane label="我的作品" name="5"> </el-tab-pane>
        <el-tab-pane label="我的评论" name="6"> </el-tab-pane>
        <el-tab-pane label="我的读品" name="7"> </el-tab-pane>
      </el-tabs>

      <p class="world-sort">排序<i class="el-icon-sort"></i></p>
    </div>
  </div>
</template>
<script lang="ts" src="./myworld.ts"></script>
<style lang="scss" scoped>
.page-module {
  background-color: #fafafa;
  .world-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    background-color: #fff;
    div {
      display: flex;
      height: 56px;
      line-height: 56px;
    }
    p {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8d8d8d;
      line-height: 56px;
      margin-right: 40px;
      span {
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2284db;
        line-height: 56px;
        margin-left: 8px;
      }
    }
  }
  .world-content {
    background-color: #fff;
    position: relative;
    .world-sort {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3377ff;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      line-height: 40px;
    }
    /deep/ {
      .el-tabs {
        .el-tabs__item {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .el-tabs__item.is-active {
          color: #0092ff;
        }
        .el-tabs__item:hover {
          color: #0092ff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
