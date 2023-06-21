type APISuccessfulResponse<T> = {
  status: number;
  data: T;
  hasError: false;
};
type APIErrorResponse = {
  status: number;
  error: { message?: string };
  hasError: true;
};
export type APIResponse<T> = APIErrorResponse | APISuccessfulResponse<T>;

export default class APIService {
  protected static BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  protected static delay(ms: number) {
    console.log(this.BASE_URL);
    return new Promise((res) => setTimeout(res, ms));
  }

  // COMMON METHODS HERE
  private static doFetch<T>(method: string, params?: string, body?: any) {
    return fetch(`${this.BASE_URL}${params || ''}`, {
      method: method,
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: body,
    });
  }

  protected static get(params: string) {
    return this.doFetch('GET', params);
  }

  protected static post(body?: any, params?: string) {
    return this.doFetch('POST', params, body);
  }
}
