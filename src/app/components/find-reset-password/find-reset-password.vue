<template>
  <div class="comp-module">
    <el-dialog
      title="xxxxxxx"
      width="700px"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      custom-class="common-dialog"
      :before-close="handleClose"
      center
    >
      <el-radio-group v-model="type" style="margin-bottom: 30px;">
        <el-radio-button label="1">个人登录</el-radio-button>
        <el-radio-button label="2">机构或社团等登录</el-radio-button>
      </el-radio-group>

      <el-tabs v-model="type" class="login-tabs">
        <el-tab-pane label="" name="1">
          <el-form :model="perForm" ref="perForm" :rules="rules">
            <el-form-item label="" prop="phoneNumber">
              <el-input
                type="tel"
                v-model="perForm.phoneNumber"
                placeholder="请输入个人手机号"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="verifyCode">
              <div class="flex">
                <el-input
                  type="text"
                  v-model="perForm.verifyCode"
                  placeholder="手机验证码"
                  size="large"
                  style="width: 260px"
                ></el-input>
                <div class="sms-btn">
                  <el-button
                    ref="msgBtn"
                    size="large"
                    class="smsCode-button"
                    :disabled="!allowSendMsgPer"
                    @click="sendMsg($event)"
                    >获取验证码</el-button
                  >
                </div>
              </div>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="perForm.password"
                placeholder="请用8-20位数字加字母设置新密码"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="passwordCommit">
              <el-input
                type="password"
                v-model="perForm.passwordCommit"
                placeholder="请再次输入新密码"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="" name="2">
          <el-form :model="orgForm" ref="orgForm" :rules="rules">
            <el-form-item label="" prop="learningName">
              <el-input
                type="text"
                v-model="orgForm.learningName"
                placeholder="新学名"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="phoneNumber">
              <el-input
                type="tel"
                v-model="orgForm.phoneNumber"
                placeholder="请输入个人手机号"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="verifyCode">
              <div class="flex">
                <el-input
                  type="text"
                  v-model="orgForm.verifyCode"
                  placeholder="手机验证码"
                  size="large"
                  style="width: 260px"
                ></el-input>
                <div class="sms-btn">
                  <el-button
                    ref="msgBtn"
                    size="large"
                    class="smsCode-button"
                    :disabled="!allowSendMsgPer"
                    @click="sendMsg($event)"
                    >获取验证码</el-button
                  >
                </div>
              </div>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="orgForm.password"
                placeholder="请用8-20位数字加字母设置新密码"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="passwordCommit">
              <el-input
                type="password"
                v-model="orgForm.passwordCommit"
                placeholder="请再次输入新密码"
                size="large"
                style="width: 512px"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer">
        <el-button type="primary" size="medium" @click="commit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./find-reset-password.ts"></script>
<style lang="scss" scoped>
$color: #333;

.comp-module {
  color: $color;
  font-size: 0.6rem;
}
.login-tabs {
  /deep/ {
    .el-tabs__header {
      display: none;
    }
  }
}
.sms-btn {
  width: 253px;
  button {
    font-size: 22px;
  }
}
.el-icon-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000;
  font-size: 17px;
}
.login-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 28px;
  white-space: nowrap;
  a {
    cursor: pointer;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4b87ff;
    line-height: 14px;
    margin-left: 34px;
  }
}
</style>
