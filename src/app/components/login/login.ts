import { ElForm } from "element-ui/types/form";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from "vue-property-decorator";
import { LoginInfo } from "../../../app/core/domain/loginInfo";
import Common from "../../core/common";
import { PATTERN_REG } from "../../core/constants";

@Component({
  components: {},
})
export default class LoginComp extends Vue {
  showLogin: boolean = false;
  tabPosition: string = "per"; // per个人  org社团
  loginForm: LoginInfo = new LoginInfo();
  rules: any = {
    autoLogin: [
      { required: true, message: "请先阅读并同意协议", trigger: "change" },
    ],
    password: [{ validator: this.isPawAvailable, trigger: "change" }],
    passwordCommit: [
      { validator: this.passwordCommitAvailable, trigger: "change" },
    ],
    phoneNumber: [{ validator: this.validateMobile, trigger: "change" }],
    verifyCode: [
      { required: true, message: "请输入验证码", trigger: "change" },
    ],
  };
  /**
   * 密码正则校验
   * @param rule
   * @param phone
   * @param callback
   */
  isPawAvailable(rule: any, password: any, callback: any) {
    const myreg = PATTERN_REG.password;
    if (!password) {
      // 8-20位大小写字母和数字组合密码
      callback(new Error("请输入密码"));
    }
    if (!myreg.test(password)) {
      callback(new Error("8-20位、大小写字母+数据组合"));
    } else {
      callback();
    }
  }

  passwordCommitAvailable(rule: any, password: any, callback: any) {
    const myreg = PATTERN_REG.password;
    if (!password) {
      callback(new Error("请输入新密码"));
    }
    if (!myreg.test(password)) {
      callback(new Error("8-20位、大小写字母+数据组合"));
    }
    if (this.loginForm.password !== this.loginForm.passwordCommit) {
      callback(new Error("两次输入密码不一致"));
    } else {
      callback();
    }
  }

  /**
   * 手机号校验
   * @param rule
   * @param value
   * @param callback
   */
  validateMobile(rule: any, value: string, callback: any) {
    if (value) {
      if (Common.isValidateMobile(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    } else {
      callback(new Error("请输入手机号"));
    }
  }

  submitForm() {
    try {
      (this.$refs.loginForm as ElForm).validate((valid: any) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    } catch (error) {
      //
    }
  }

  /* 生命钩子 START */
  mounted() {}
}
