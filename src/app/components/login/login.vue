<template>
  <div class="login-page">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click"
      popper-class="login-popper"
      v-model="showLogin"
    >
      <p><span>新学界</span> <span>我世界</span></p>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="per">个人注册</el-radio-button>
        <el-radio-button label="org">机构或社团等注册</el-radio-button>
      </el-radio-group>

      <el-tabs v-model="tabPosition" class="login-tabs">
        <el-tab-pane label="" name="per">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="demo-loginForm"
          >
            <el-form-item label="" prop="phoneNumber">
              <el-input
                type="tel"
                v-model="loginForm.phoneNumber"
                placeholder="请输入手机号"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="verifyCode">
              <el-input
                type="text"
                v-model="loginForm.verifyCode"
                placeholder="手机验证码"
                size="medium"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="请用8-20位数字加字母设置密码"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="passwordCommit">
              <el-input
                type="password"
                v-model="loginForm.passwordCommit"
                placeholder="请再次输入密码"
                size="medium"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="autoLogin">
              <el-checkbox-group v-model="loginForm.autoLogin">
                <el-checkbox label="1">同意新学界注册协议</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form></el-tab-pane
        >
        <el-tab-pane label="" name="org">配置管理</el-tab-pane>
      </el-tabs>

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
.login-tabs {
  /deep/ {
    .el-tabs__header {
      display: none;
    }
  }
}
</style>
