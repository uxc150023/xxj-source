import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import BasePage from "../BasePage";

interface IHomePage {}

@Component({
  components: {},
  name: "home",
})
export default class HomePage extends mixins(BasePage) implements IHomePage {
  title: string = "首页";
  activeName: "用户管理";
  // tabs: any[] = [
  //   { label: "新学鱼雁", index: "/home" },
  //   { label: "我读", index: "/read" },
  //   { label: "我写", index: "/write" },
  //   { label: "课程", index: "/course" },
  //   { label: "讲座", index: "/chair" },
  //   { label: "会议", index: "/meeting" },
  //   { label: "新学联盟", index: "/alliance" },
  //   { label: "新学人物", index: "/personage" },
  // ];
  fetchData() {
    //
  }
  /* 生命钩子 START */
  mounted() {
    //
  }
}
