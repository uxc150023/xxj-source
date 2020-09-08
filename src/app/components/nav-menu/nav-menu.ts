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
export default class NavMenuComp extends Vue {
  activeMenu: string = "home";
  tabs: any[] = [
    { label: "首页", index: "/home" },
    { label: "我读", index: "/read" },
    { label: "我写", index: "/write" },
    { label: "课程", index: "/course" },
    { label: "讲座", index: "/chair" },
    { label: "会议", index: "/meeting" },
    { label: "新学联盟", index: "/alliance" },
    { label: "新学人物", index: "/personage" },
  ];

  @Watch("$route.path")
  routrChange(valueNew: string, valueOld: string) {
    const m = valueNew.match(/^\/\w+/);
    if (m != null) {
      this.activeMenu = this.$route.path || valueNew;
    } else {
      this.activeMenu = "/home";
    }
  }

  /* 生命钩子 START */
  mounted() {
    const path = this.$route.path;
    const m = path.match(/^\/\w+/);
    if (m != null) {
      this.activeMenu = this.$route.path || path;
    } else {
      this.activeMenu = "/home";
    }
  }
}
