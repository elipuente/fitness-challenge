import prisma from "../../../lib/prisma";
import * as token from "../../../utils/token";
import { setCookie } from "../../../utils/cookie";

const compareIgnoreCase = (c) =>
  c[0].localeCompare(c[1], undefined, { sensitivity: "accent" }) === 0;

const createUsername = (first, last) => first.concat(last).toLowerCase();

const getUser = (prisma, phoneNumber) =>
  prisma.fitness_user.findUnique({
    where: {
      phoneNumber,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      totalScore: true,
    },
  });

const verifyUser = (user, first, last) =>
  compareIgnoreCase([user?.firstName, first.trim()]) &&
  compareIgnoreCase([user?.lastName, last.trim()]);

const handler = async (req, res) => {
  const { first, last, number } = req.body;

  const user = await getUser(prisma, number);

  if (!(user && verifyUser(user, first, last))) {
    return res.status(200).json({ error: true, message: "Invalid login" });
  }

  const username = createUsername(first, last);

  const accessToken = token.createAccessToken({
    ...user,
    username: username,
  });

  const refreshToken = token.createRefreshToken({
    id: user.id,
    ph: number,
    username: username,
  });

  setCookie(res, "__rfx", refreshToken);

  return res.status(200).json({ accessToken, user });
};

export default handler;
