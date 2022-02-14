import { verifyRefreshToken } from "../../utils/token";
import { parseCookie } from "../../utils/cookie";

export const authUser = (user, req) => {
  let userToken;
  const { __rfx: token } = parseCookie(req);

  if (!token) {
    return { verifiedUser: false };
  }

  try {
    userToken = verifyRefreshToken(token);
  } catch {
    return { verifiedUser: false };
  }

  if (!(user.id === userToken.id && user.phoneNumber === userToken.ph)) {
    return { verifiedUser: false };
  }

  return {
    verifiedUser: true,
  };
};
