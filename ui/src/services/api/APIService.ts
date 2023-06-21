type APISuccessfulResponse<T> = {
  status: number;
  data: T;
  hasError: false;
};
type APIErrorResponse<T> = {
  status: number;
  data?: T;
  errorMessage?: string ;
  hasError: true;
};
export type APIResponse<T> = APIErrorResponse<T> | APISuccessfulResponse<T>;

export default class APIService {
  protected static BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  protected static delay(ms: number) {
    console.log(this.BASE_URL);
    return new Promise((res) => setTimeout(res, ms));
  }

  // COMMON METHODS HERE
  private static async doFetch<T>(method: string, path: string, params?: string, body?: any): Promise<APIResponse<T>> {
    const res = await fetch(`${this.BASE_URL}${path || ''}${params ? '?' + params : ''}`, {
      method: method,
      headers: { Accept: 'application.json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const responseBody = await res.json();
    if (res.ok) {
      console.log('OK', res.ok, res);
      return { status: res.status, data: responseBody as T, hasError: false } as APISuccessfulResponse<T>;
    }
    console.log(responseBody);
    return { status: res.status, errorMessage: responseBody['message'], hasError: true } as APIErrorResponse<T>;
  }

  protected static get<T>(path: string, params?: string) {
    return this.doFetch<T>('GET', path, params);
  }

  protected static post<T>(path: string, body?: any) {
    return this.doFetch<T>('POST', path, undefined, body);
  }
}
