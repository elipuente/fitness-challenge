import { verifyAccessToken } from "../../utils/token";

const getTokenFromHeaders = (req) =>
  req?.headers?.authorization?.split(" ")?.[1];

export const authUser = (user, req) => {
  let token;
  const accessToken = getTokenFromHeaders(req);

  if (!accessToken) {
    return { verifiedUser: false };
  }

  try {
    token = verifyAccessToken(accessToken);
  } catch {
    return { verifiedUser: false };
  }

  if (!(user.id === token.id && user.phoneNumber === token.phoneNumber)) {
    return { verifiedUser: false };
  }

  return {
    verifiedUser: true,
  };
};
