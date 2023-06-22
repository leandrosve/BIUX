import SessionService from '../SessionService';

type APISuccessfulResponse<T> = {
  status: number;
  data: T;
  hasError: false;
};
type APIErrorResponse<T> = {
  status: number;
  data?: T;
  errorMessage?: string;
  hasError: true;
};
export type APIResponse<T> = APIErrorResponse<T> | APISuccessfulResponse<T>;

interface Options {
  preventSignOut?: boolean;
}

export default class APIService {
  protected static BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  protected static token?: string;

  public static initialize() {
    this.token = SessionService.getLocalSession()?.authToken;
  }

  protected static delay(ms: number) {
    console.log(this.BASE_URL);
    return new Promise((res) => setTimeout(res, ms));
  }

  // COMMON METHODS HERE
  private static async doFetch<T>(method: string, path: string, params?: string, body?: any, options?: Options): Promise<APIResponse<T>> {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');
    if (this.token) headers.set('token', this.token);

    const url = `${this.BASE_URL}${path || ''}${params ? '?' + params : ''}`;
    try {
      const res = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseBody = await res.json();
      if (res.ok) {
        return { status: res.status, data: responseBody as T, hasError: false } as APISuccessfulResponse<T>;
      }
      console.log(res);
      if (res.status == 401 && !options?.preventSignOut) {
        SessionService.destroyLocalSession();
        location.href = '/login?tokenExpired=true';
      }
      return { status: res.status, errorMessage: responseBody['message'], hasError: true } as APIErrorResponse<T>;
    } catch (err) {
      console.log(err);
      return { status: 400, hasError: true };
    }
  }

  protected static get<T>(path: string, params?: string) {
    return this.doFetch<T>('GET', path, params);
  }

  protected static post<T>(path: string, body?: any, options?: Options) {
    return this.doFetch<T>('POST', path, undefined, body, options);
  }
}
