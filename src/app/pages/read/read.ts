import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import BasePage from "../BasePage";

interface IReadPage {
  /**
   * 获取页面展示所需的远程数据
   */
  fetchData(): void;
}

@Component({
  components: {},
  name: "read",
})
export default class ReadPage extends mixins(BasePage) implements IReadPage {

  title: string = "Read";

  fetchData() {
    //
  }
  /* 生命钩子 START */
  mounted() {
    //
  }
}
