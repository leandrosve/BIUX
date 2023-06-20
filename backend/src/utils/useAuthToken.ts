import { IAuthTokenResult, IUseToken } from "src/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useAuthToken = (token: string): IUseToken | string => {
  try {
    const authToken  = jwt.decode(token)  as jwt.JwtPayload;
    const decode:IAuthTokenResult= {
      role: (authToken.role),
      sub:  Number(authToken.sub),
      iat:  authToken.iat,
      exp: authToken.exp
    }

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};