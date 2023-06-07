export default class APIService {
  protected static delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
  // COMMON METHODS HERE
}
