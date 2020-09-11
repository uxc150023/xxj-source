import { BaseService } from "./base.serv";

export interface ISystemService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  login(userName: string, password: string): Promise<any>;
  loginDo(params: any): Promise<any>;
  backLearningName(params: any): Promise<any>;
  changeOrgMobile(params: any): Promise<any>;
  commitRegister(params: any): Promise<any>;
  commitRegisterOrg(params: any): Promise<any>;
  getVerificationCode(params: any): Promise<any>;
  getPicVerificationCode(params: any): Promise<any>;
  resetPersonalPassword(params: any): Promise<any>;
  resetOrgPassword(params: any): Promise<any>;
  changePersonalMobile(params: any): Promise<any>;
}

type ISystemServiceConstructor = new () => ISystemService;

export function createSystemService(
  ctor: ISystemServiceConstructor,
): ISystemService {
  return new ctor();
}

export class SystemService extends BaseService implements ISystemService {
  constructor() {
    super();
  }
  // SGV-BUILD-SERVICE-FUNCTION # NOT DELETE
  public login(userName: string, password: string): Promise<any> {
    return this.proxyHttp.post("login", { userName, password });
  }
  public loginDo(params: any): Promise<any> {
    const {
      autoLogin,
      learningName,
      newLinkerName,
      newPhoneNumbe,
      newVerifyCode,
      password,
      passwordCommit,
      personalOrOrg,
      phoneNumber,
      registType,
      sendBizNo,
      sendType,
      type,
      verifyCode,
      verifyType,
    } = params;
    return this.proxyHttp.post("loginDo", {
      autoLogin,
      learningName,
      newLinkerName,
      newPhoneNumbe,
      newVerifyCode,
      password,
      passwordCommit,
      personalOrOrg,
      phoneNumber,
      registType,
      sendBizNo,
      sendType,
      type,
      verifyCode,
      verifyType,
    });
  }
  public commitRegister(params: any): Promise<any> {
    const {
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
      verifyType,
    } = params;
    return this.proxyHttp.post("commitRegister", {
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
      verifyType,
    });
  }
  public commitRegisterOrg(params: any): Promise<any> {
    const {
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
      verifyType,
    } = params;
    return this.proxyHttp.post("commitRegisterOrg", {
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
      verifyType,
    });
  }
  public backLearningName(params: any): Promise<any> {
    const { phoneNumber, verifyCode } = params;
    return this.proxyHttp.post("backLearningName", {
      phoneNumber,
      verifyCode,
    });
  }

  public changeOrgMobile(params: any): Promise<any> {
    const {
      phoneNumber,
      verifyCode,
      newVerifyCode,
      newPhoneNumber,
      newLinkerName,
    } = params;
    return this.proxyHttp.post("changeOrgMobile", {
      newLinkerName,
      newPhoneNumber,
      newVerifyCode,
      phoneNumber,
      verifyCode,
    });
  }

  public getVerificationCode(params: any): Promise<any> {
    const { phoneNumber, sendType } = params;
    return this.proxyHttp.post("getVerificationCode", {
      phoneNumber,
      sendType,
    });
  }
  public getPicVerificationCode(params: any): Promise<any> {
    const { phoneNumber } = params;
    return this.proxyHttp.post("getPicVerificationCode", {
      phoneNumber,
    });
  }

  public resetPersonalPassword(params: any): Promise<any> {
    const { phoneNumber, verifyCode, password, passwordCommit } = params;
    return this.proxyHttp.post("resetPersonalPassword", {
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
    });
  }

  public resetOrgPassword(params: any): Promise<any> {
    const {
      phoneNumber,
      verifyCode,
      password,
      passwordCommit,
      learningName,
    } = params;
    return this.proxyHttp.post("resetOrgPassword", {
      learningName,
      password,
      passwordCommit,
      phoneNumber,
      verifyCode,
    });
  }

  public changePersonalMobile(params: any): Promise<any> {
    const { phoneNumber, verifyCode, newVerifyCode, newPhoneNumber } = params;
    return this.proxyHttp.post("changePersonalMobile", {
      newPhoneNumber,
      newVerifyCode,
      phoneNumber,
      verifyCode,
    });
  }
}
