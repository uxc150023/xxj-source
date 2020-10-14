<template>
  <div class="comp-module">
    <div class="create-website">
      <div class="create-net">
        <div class="head-icon"></div>
        <p>新一代智能互联学网</p>
      </div>
    </div>

    <span class="vard-edit">编辑</span>
  </div>
</template>
<script lang="ts" src="./visit-card.ts"></script>
<style lang="scss" scoped>
$color: #333;

.comp-module {
  color: $color;
  position: relative;
  .create-website {
    height: 230px;
    background: mediumaquamarine;
    display: flex;
    align-items: center;
    .create-net {
      font-size: 72px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .head-icon {
        width: 118px;
        height: 118px;
        background: #d9d9d9;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 118px;
        margin-right: 40px;
      }
    }
  }
  .vard-edit {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    border: 1px solid #333333;
    padding: 3px 15px;

    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 33px;
    position: absolute;
    right: 28px;
    bottom: 23px;
    cursor: pointer;
    display: none;
  }
}
.comp-module:hover {
  .vard-edit {
    display: inline-block;
  }
}
</style>
