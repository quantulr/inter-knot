declare interface BasePageResponse<T> {
  hasNext: boolean;
  data: T;
}
