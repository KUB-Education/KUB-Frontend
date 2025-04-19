export type AccessToken = string;

export type RefreshToken = string;

export type AuthenticatedSession = {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  firstLogin: boolean;
};
