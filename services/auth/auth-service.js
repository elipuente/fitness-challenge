import { verifyAccessToken, verifyRefreshToken } from "../../utils/token";
import { parseCookie } from "../../utils/cookie";

const UNABLE_TO_VERIFY_USER = { verifiedUser: false };

const getTokenFromHeaders = (req) =>
  req?.headers?.authorization?.split(" ")?.[1];

export const authUser = (user, req) => {
  let token;
  const accessToken = getTokenFromHeaders(req);

  if (!accessToken) {
    return UNABLE_TO_VERIFY_USER;
  }

  try {
    token = verifyAccessToken(accessToken);
  } catch (err) {
    console.error(
      `Error: An error occurred while trying to verify access token for ${user.firstName} ${user.lastName} (userId: ${user.id}).`,
      err,
      accessToken
    );

    const { __rfx: refreshToken } = parseCookie(req);

    if (!refreshToken) {
      return UNABLE_TO_VERIFY_USER;
    }

    token = verifyRefreshToken(refreshToken);

    if (!token) {
      return UNABLE_TO_VERIFY_USER;
    }
  }

  if (!(user.id === token.id && user.phoneNumber === token.phoneNumber)) {
    console.error(
      `Error: An error occurred while validating user information for ${user.firstName} ${user.lastName} (userId: ${user.id}).`
    );
    return UNABLE_TO_VERIFY_USER;
  }

  return {
    verifiedUser: true,
  };
};
