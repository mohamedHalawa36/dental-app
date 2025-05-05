export enum REQUEST_METHODS {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type SuccessCallbackType = (data: any) => void;
export type ErrorCallbackType = (
  error: any,
  errResponse?: any,
  statusCode?: number,
) => void;

export interface BaseApiArgs {
  url: string;
  data?: any;
  onSuccess?: SuccessCallbackType[];
  onError?: ErrorCallbackType[];
}
export interface ApiMutationArgs extends BaseApiArgs {
  body: any;
  method?: REQUEST_METHODS;
}
export interface ApiQueryProps extends BaseApiArgs {
  signal?: AbortSignal;
}
