import { HttpRequestHeaders } from './HttpRequestHeaders.ts';

export type HttpRequestConfig = Partial<{
  url: string;
  headers: HttpRequestHeaders;
  params: unknown;
  data: unknown;
}>;
