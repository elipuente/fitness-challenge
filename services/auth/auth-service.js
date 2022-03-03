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
  } catch (err) {
    console.error(
      `Error: An error occurred while trying to verify access token for ${user.firstName} ${user.lastName} (userId: ${user.id}).`,
      err,
      accessToken
    );
    return { verifiedUser: false };
  }

  if (!(user.id === token.id && user.phoneNumber === token.phoneNumber)) {
    console.error(
      `Error: An error occurred while validating user information for ${user.firstName} ${user.lastName} (userId: ${user.id}).`
    );
    return { verifiedUser: false };
  }

  return {
    verifiedUser: true,
  };
};
