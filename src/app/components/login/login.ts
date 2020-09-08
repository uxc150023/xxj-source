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
import { PATTERN_REG } from "../../core/constants";

@Component({
  components: {},
})
export default class LoginComp extends Vue {
  showLogin: boolean = false;
  ruleForm: any = {
    checkPass: "",
    pass: "",
  };
  rules: any = {
    checkPass: [{ validator: this.isPawAvailable2, trigger: "change" }],
    pass: [{ validator: this.isPawAvailable, trigger: "change" }],
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

  isPawAvailable2(rule: any, password: any, callback: any) {
    const myreg = PATTERN_REG.password;
    if (!password) {
      callback(new Error("请输入新密码"));
    }
    if (!myreg.test(password)) {
      callback(new Error("8-20位、大小写字母+数据组合"));
    }
    if (this.ruleForm.pass !== this.ruleForm.checkPass) {
      callback(new Error("两次输入密码不一致"));
    } else {
      callback();
    }
  }

  submitForm() {
    (this.$refs.ruleForm as ElForm).validate((valid: any) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  /* 生命钩子 START */
  mounted() {}
}
