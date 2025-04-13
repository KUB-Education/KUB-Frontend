export type HttpRequestConfig = Partial<{
  headers: Record<string, string>;
  params: unknown;
  data: unknown;
}>;
