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

@Component({
  components: {},
})
export default class HeadbarComp extends Vue {
  changeBindPhoneDialog: boolean = false; // 更换绑定手机
  findResetPswDialog: boolean = false; // 找回重置密码
  handleCommand() {}

  /**
   * 显示dialog
   */
  showDialog(type: string, status: boolean) {
    switch (type) {
      case "changeBindPhoneDialog":
        this.changeBindPhoneDialog = status;
        break;
      case "findResetPswDialog":
        this.findResetPswDialog = status;
        break;
      default:
        break;
    }
  }
  /* 生命钩子 START */
  mounted() {}
}
