/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse<T = any> = {
  data: T;
  status: number;
};
