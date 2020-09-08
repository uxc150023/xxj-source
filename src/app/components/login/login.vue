<template>
  <div class="login-page">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click"
      v-model="showLogin"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="请输入注册手机/新学名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="密码 或 手机验证码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <span slot="reference" class="btn">登录</span>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./login.ts"></script>
<style lang="scss" scoped>
$color: #333;

.login-page {
  color: $color;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  /deep/ {
    .el-form-item__content {
      text-align: center;
    }
  }
  .btn {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
