import { BaseService } from "./base.serv";

export interface ISystemService {
  // SGV-BUILD-SERVICE-INTERFACE # NOT DELETE
  login(userName: string, password: string): Promise<any>;
  loginDo(any: {
    autoLogin: string;
    learningName: string;
    newLinkerName: string;
    newPhoneNumber: string;
    newVerifyCode: string;
    password: string;
    passwordCommit: string;
    personalOrOrg: string;
    phoneNumber: string;
    registType: string;
    sendBizNo: string;
    sendType: string;
    type: string;
    verifyCode: string;
    verifyType: string;
  }): Promise<any>;
  backLearningName(any: {
    autoLogin: string;
    learningName: string;
    newLinkerName: string;
    newPhoneNumber: string;
    newVerifyCode: string;
    password: string;
    passwordCommit: string;
    personalOrOrg: string;
    phoneNumber: string;
    registType: string;
    sendBizNo: string;
    sendType: string;
    type: string;
    verifyCode: string;
    verifyType: string;
  }): Promise<any>;
  changeOrgMobile(any: {
    autoLogin: "string";
    learningName: "string";
    newLinkerName: "string";
    newPhoneNumber: "string";
    newVerifyCode: "string";
    password: "string";
    passwordCommit: "string";
    personalOrOrg: "string";
    phoneNumber: "string";
    registType: "string";
    sendBizNo: "string";
    sendType: "string";
    type: "string";
    verifyCode: "string";
    verifyType: "string";
  }): Promise<any>;
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
    return this.proxyHttp.post("login", params);
  }
}
