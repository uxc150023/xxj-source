import { ElForm } from "element-ui/types/form";
import Component, { mixins } from "vue-class-component";
import { WebsiteService } from "../../../app/core/services/website.serv";
import { AutowiredService } from "../../../lib/sg-resource/decorators";
import BasePage from "../BasePage";

interface IWebsitePage {
  /**
   * 当前激活tab
   */
  activeName: string;
  /**
   * 首页Url List
   */
  firstPageList: any[];
  /**
   * 接口请求中
   */
  loading: boolean;
  /**
   * 离学网只差5分钟
   */
  createForm: any;
  /**
   * 学网类型
   */
  webmoldOptions: any[];
  /**
   * 学网型号
   */
  webmtypeOptions: any[];
  /**
   * 学网类型和价格
   */
  typeAndPriceTable: any[];
  /**
   * 新学名更新form
   */
  changeForm: any;
  /**
   * 神器内容
   */
  bandContant: string;
  /**
   * 学网升级form
   */
  upgradeForm: any;
  /**
   * 学网类型与价格弹窗
   */
  dialogVisible: boolean;
  /**
   *
   */
  changeFormOld: any[];
  /**
   * 获取页面展示所需的远程数据
   */
  fetchData(): void;

  /**
   * 学网升级 - 获取所有的新学名
   */
  // getLearningName(): void;
}

@Component({
  components: {},
  name: "website",
})
export default class WebsitePage extends mixins(BasePage)
  implements IWebsitePage {
  @AutowiredService
  websiteService: WebsiteService;
  firstPageList: any[] = [];
  activeName: string = "";
  loading: boolean = false;
  bandContant: string = "";
  createForm: any = {
    learningAddress: "", // 新网址
    learningNet: "", // 新网名
    model: "", // 型号
    price: 0, // 价格
    websiteType: "", // 类型
  };
  webmoldOptions: any[] = [];
  webmtypeOptions: any[] = [];
  typeAndPriceTable: any[] = [];
  changeFormOld: any[] = [];
  changeForm: any = {
    applyLearningName: "",
    applyNetAddress: "",
    applyNetName: "",
    oldLearningName: "444",
    oldNetAddress: "",
    oldNetName: "",
  };
  websiteType: string = "";

  upgradeForm: any = {
    learningNet: "",
    model: "",
    newModel: "",
    price: 0,
    websiteType: "",
  };
  dialogVisible: boolean = false;
  rules: any = {
    learningAddress: [
      { required: true, message: "请输入新网址", trigger: "blur" },
    ],
    learningName: [
      { required: true, message: "请输入新学名", trigger: "blur" },
    ],
    learningNet: [{ required: true, message: "请输入新网名", trigger: "blur" }],
    model: [{ required: true, message: "选择学网型号", trigger: "change" }],
    websiteType: [
      { required: true, message: "选择学网类型", trigger: "change" },
    ],
  };

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
        this.getFirstPageUrl();
        break;
      case "2":
        this.getListArtifact();
        break;
      case "3":
        break;
      case "4":
        // if (!this.typeAndPriceTable.length) {
        //   this.getModelAndPrice();
        // }
        break;
      case "5":
        this.getLearnNameUpdate();
        // this.getLearningName();
        break;
      case "6":
        break;
      case "7":
        break;

      default:
        break;
    }
  }

  /**
   * click抢建新一代智能互联网
   */
  commit() {
    switch (this.activeName) {
      case "1":
        break;
      case "2":
        this.commitSaveArtifact();
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
  /**
   * 获取首页图片
   */
  async getFirstPageUrl() {
    try {
      this.loading = true;
      const res = await this.websiteService.getFirstPageUrl({});
      this.firstPageList = res;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.messageError(error);
    }
  }
  /**
   * 这款神器 - 保存
   */
  async commitSaveArtifact() {
    try {
      await this.websiteService.saveArtifact(this.bandContant);
      this.$message.success("保存成功");
    } catch (error) {
      this.messageError(error);
    }
  }
  /**
   * 这款神器 - 查询
   */
  async getListArtifact() {
    try {
      const res = await this.websiteService.listArtifact();
      this.bandContant = res[0].bandContant;
      (this.$refs.editor as any).setContent(this.bandContant);
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 查询价格
   */
  async getProductionByPT() {
    try {
      const res = await this.websiteService.getProductionByPT(this.createForm);
      this.createForm.price = res.length ? res[0].price : 0;
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 只差5分钟 - 提交
   */
  async submitMinute() {
    try {
      await (this.$refs.createForm as ElForm).validate();
      await this.websiteService.submitMinute(this.createForm);
      this.$message.success("成功提交");
    } catch (error) {
      this.messageError(error);
    }
  }
  /**
   * 获取学网价格和类型
   */
  async getModelAndPrice() {
    try {
      const res = await this.websiteService.showPrice();
      this.typeAndPriceTable = res;
    } catch (error) {
      this.messageError(error);
    }
  }
  /**
   * 学网升级 - 获取学名
   */
  async getLearnNameUpgrade() {
    try {
      const res = await this.websiteService.upgradeGetMH({
        model: "",
        websiteType: "",
      });
    } catch (error) {
      this.messageError(error);
    }
  }

  // async getLearningName() {
  //   try {
  //     const res = await this.websiteService.getLearningName();
  //   } catch (error) {
  //     this.messageError(error);
  //   }
  // }

  /**
   * 新学名号更新 - 获取新学名号
   */
  async getLearnNameUpdate() {
    try {
      const res = await this.websiteService.modifyGetMH({
        model: "",
        websiteType: "",
      });
      this.changeFormOld = res;
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 学网升级
   */
  async upgradeMH() {
    try {
      // const res = await this.websiteService.upgradeMH();
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 新学名号更新 - 更新新学名号
   */
  async setLearnNameUpdate() {
    if (
      !this.changeForm.applyLearningName &&
      !this.changeForm.applyNetAddress &&
      !this.changeForm.applyNetName
    ) {
      this.$message.error("请填写相关信息");
      return;
    }
    try {
      await (this.$refs.changeForm as ElForm).validate();
      await this.websiteService.modifySetMH(this.changeForm);
      this.$message.success("更新成功");
      this.getLearnNameUpdate();
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 获取学网类型和型号
   */
  async getModelAndType() {
    try {
      const res = await this.websiteService.getCodeByType({
        code: "",
        codeName: "",
        codeType: "xh,lx",
      });
      this.webmoldOptions = res.lx ? res.lx : [];
      this.webmtypeOptions = res.xh ? res.xh : [];
    } catch (error) {
      this.messageError(error);
    }
  }

  /**
   * 获取编辑器内容
   */
  contentChange(html: any) {
    this.bandContant = html;
  }

  created() {
    this.activeName = this.$route.params.step ? this.$route.params.step : "1";
    this.beforeLeave(this.activeName);
    this.getModelAndType();
    this.getModelAndPrice();
  }
  mounted() {
    console.log(this.accountInfo);
  }
}
