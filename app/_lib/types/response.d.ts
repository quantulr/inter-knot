declare interface BaseResponse<T> {
    hasNext: boolean;
    data: T
}