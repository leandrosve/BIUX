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
  protected static delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
  // COMMON METHODS HERE
}
