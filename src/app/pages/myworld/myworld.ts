import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import BasePage from "../BasePage";

interface IMyworldPage {
  /**
   * 获取页面展示所需的远程数据
   */
  fetchData(): void;
}

@Component({
  components: {},
  name: "myworld",
})
export default class MyworldPage extends mixins(BasePage)
  implements IMyworldPage {
  title: string = "Myworld";
  activeName: string = "1";
  loading: any;

  fetchData() {
    //
  }

  /**
   * 切换tab
   * @param activeName
   * @param oldActiveName
   */
  beforeLeave(activeName: string) {
    if (this.loading) {
      this.$message.warning("数据获取中，请稍后再试");
      return false;
    }
    this.$router.push({ params: { step: activeName } });
    switch (activeName) {
      case "1":
        break;
      case "2":
        break;
      case "3":
        break;
      case "4":
        break;
      case "5":
        break;
      case "6":
        break;
      case "7":
        break;

      default:
        break;
    }
  }
  /* 生命钩子 START */
  mounted() {
    //
  }
}
