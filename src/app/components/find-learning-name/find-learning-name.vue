<template>
  <div class="comp-module">
    <el-dialog
      title="找回新学名"
      width="660px"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      custom-class="common-dialog"
      :before-close="handleClose"
      center
    >
      <el-form :model="baseForm" ref="baseForm" :rules="rules">
        <el-form-item label="" prop="phoneNumber">
          <el-input
            type="tel"
            v-model="baseForm.phoneNumber"
            placeholder="联系手机"
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
      </el-form>

      <div slot="footer">
        <el-button type="primary" size="medium" @click="commit('changeForm')"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./find-learning-name.ts"></script>
<style lang="scss" scoped>
$color: #333;

.comp-module {
  color: $color;
  font-size: 0.6rem;
}
</style>
