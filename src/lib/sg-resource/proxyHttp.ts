// tslint:disable-next-line:no-var-requires
const MockAdapter = require("axios-mock-adapter");
import Axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import NProgress from "nprogress";
import { ICommon } from "./common";
import { IConfigAdapter, IMockData } from "./config";
import { SGVFactory } from "./factory";

export const HEADER_TOKEN = "HEADER_TOKEN_SSU";
export const PRODUCT_CODE = "PRODUCT_CODE";

export interface IProxyHttp {
  /**
   * 代理get请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  get<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理put请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  put<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理post请求
   * @param api config定义的接口
   * @param params 请求参数
   */
  post<T, K>(api: string, params: K, path?: string[]): Promise<T>;
  /**
   * 代理delete请求
   * @param api config定义的接口
   * @param pathParams 请求参数
   */
  delete<T, K>(api: string, pathParams?: string[], data?: K | any): Promise<T>;
  form<T>(api: string, form: FormData): Promise<T>;
  getFile(url: string, headers?: any): Promise<{ data: Blob; type: any }>;
  /**
   * 初始化代理
   */
  initInterceptors(): void;
}

export type IProxyHttpConstructor = new () => IProxyHttp;

export function createProxyHttp(ctor: IProxyHttpConstructor): IProxyHttp {
  return new ctor();
}

export class ProxyHttp implements IProxyHttp {
  private configAdapter: IConfigAdapter;

  private common: ICommon;
  private reqInterceptor: any;
  private resInterceptor: any;
  private pending: Array<{ path: string; cancel: any }> = [];

  constructor() {
    this.common = SGVFactory.createCommon();
    this.configAdapter = SGVFactory.createConfigAdapter();
    if (!!this.configAdapter.isMock) {
      this.addMockData(this.configAdapter.mockData);
    }
    this.initInterceptors();
  }

  public get<T, K>(api: string, params: K, path?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "GET");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    return Axios.get(url, { params }).then<T>(this.fulfilled);
  }

  put<T, K>(api: string, data?: K, pathParams?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "PUT");
    if (pathParams) {
      const path = pathParams.join("/");
      url = url + "/" + path;
    }
    return Axios.put(url, data).then<T>(this.fulfilled);
  }

  public post<T, K>(api: string, data: K, path?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "POST");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    return Axios.post(url, data).then<T>(this.fulfilled);
  }

  delete<T, K>(
    api: string,
    pathParams?: string[],
    data: K | any = {},
  ): Promise<T> {
    let url = this.common.dealPath(api, "DELETE");
    if (pathParams) {
      url = url + "/" + pathParams.join("/");
    }
    return Axios.delete(url, {
      params: data,
    }).then<T>(this.fulfilled);
  }

  public form<T>(api: string, form: FormData): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    return Axios.post(url, form, {
      headers: { "Content-Type": undefined },
    }).then<T>(this.fulfilled);
  }

  getFile(url: string, headers: any = {}): Promise<{ data: Blob; type: any }> {
    return Axios.get(url, {
      headers,
      responseType: "blob",
    }).then((res: AxiosResponse) => {
      return new Promise<{ data: Blob; type: any }>((resolve, reject) => {
        resolve({ data: res.data, type: res.headers["content-type"] });
      });
    });
  }

  initInterceptors() {
    // console.log("initInterceptors");
    Axios.interceptors.request.eject(this.reqInterceptor);
    this.reqInterceptor = Axios.interceptors.request.use(
      (config) => {
        // console.log("request", JSON.stringify(config));
        NProgress.start();
        this.removePending(config);
        config.cancelToken = new Axios.CancelToken((c) => {
          this.pending.push({
            cancel: c,
            path: [
              config.url,
              config.method,
              JSON.stringify(config.params),
              JSON.stringify(config.data),
            ].join(","),
          });
        });
        // const headerToken = localStorage.getItem(HEADER_TOKEN);
        const productCode = localStorage.getItem(PRODUCT_CODE);
        const headerToken = JSON.stringify({
          token:
            "WKERVhkY3kCWrGUrwL/bLIWo7cNOhAs/3/ToWaeKhqMVq3WFO4CHughLd73bVU9z1StebNJFR4M=",
        });
        config.headers["access-token"] =
          config.headers["access-token"] || headerToken || "";
        config.headers["xxj-user-token"] =
          config.headers["xxj-user-token"] || headerToken || "";
        config.headers["product-code"] =
          config.headers["product-code"] || productCode || "ssu-service";
        config.headers.version = config.headers.version || "1.0.0";
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
    Axios.interceptors.response.eject(this.resInterceptor);
    this.resInterceptor = Axios.interceptors.response.use(
      (response) => {
        // console.log("response", JSON.stringify(response.config));
        this.removePending(response.config);
        NProgress.done();
        return response;
      },
      (error) => {
        // console.log(error);
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        } else if (error instanceof Axios.Cancel) {
          const cancelError = new Error();
          cancelError.name = "Simultaneous Request";
          cancelError.message = "重复请求了接口 " + error.message;
          return Promise.reject(cancelError);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve, reject) => {
      if (
        // res.data.hasOwnProperty("status") &&
        // res.data.status + "" === this.configAdapter.successCode
        res.data.success
      ) {
        resolve(res.data.data);
      } else {
        if (this.configAdapter.failCallback) {
          this.configAdapter.failCallback(res.data, resolve, reject);
        } else {
          reject(res.data);
        }
      }
    });
    return promise;
  };

  private addMockData(mockData: IMockData): void {
    const mock = new MockAdapter(Axios);
    for (const key in mockData.get) {
      if (mockData.get.hasOwnProperty(key)) {
        let url = this.common.dealPath(key, "GET");
        if (mockData.get[key].params) {
          url += "/" + mockData.get[key].params.join("/");
        }
        mock.onGet(url).reply(200, mockData.get[key]);
      }
    }
    for (const key in mockData.post) {
      if (mockData.post.hasOwnProperty(key)) {
        let url = this.common.dealPath(key, "POST");
        if (typeof mockData.post[key] === "function") {
          mock.onPost(url).reply(mockData.post[key]);
        } else {
          // console.log(url, mockData.post[key]);
          if (mockData.post[key].params) {
            url += "/" + mockData.post[key].params.join("/");
          }
          mock.onPost(url).reply(200, mockData.post[key]);
        }
      }
    }
    mock.onPost().reply(404);
  }

  private removePending(config: AxiosRequestConfig) {
    for (let i = 0; i < this.pending.length; i++) {
      const p = this.pending[i];
      if (
        p.path ===
        [
          config.url,
          config.method,
          JSON.stringify(config.params),
          JSON.stringify(config.data),
        ].join(",")
      ) {
        p.cancel(config.url);
        this.pending.splice(i--, 1);
      }
    }
  }
}
