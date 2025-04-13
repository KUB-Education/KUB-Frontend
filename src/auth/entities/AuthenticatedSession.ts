export type AuthenticatedSession = {
  accessToken: string;
  refreshToken: string;
  firstLogin: boolean;
};
