export type JwtPayload = {
  userId: string;
  userName: string;
  iat?: number;
  exp?: number;
};
