export type AuthenticatedSessionDto = {
  access_token: string;
  refresh_token: string;
  first_login: boolean;
};
