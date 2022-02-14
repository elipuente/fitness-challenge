import prisma from "../../lib/prisma";

const verifyUser = (phoneNumber) =>
  prisma.fitness_user.findUnique({
    where: {
      phoneNumber,
    },
    select: {
      firstName: true,
      totalScore: true,
    },
  });

const getAllWorkoutsForUser = (phoneNumber) =>
  prisma.fitness_workout_log.findMany({
    where: {
      user: {
        phoneNumber,
      },
    },
    include: {
      likes: {
        select: {
          id: true,
          fitness_userId: true,
          user: {
            select: {
              firstName: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

const handler = async (req, res) => {
  const { user: phoneNumber } = req.query;

  if (!phoneNumber) {
    return res
      .status(500)
      .json({ error: true, message: "No user information provided." });
  }

  const user = await verifyUser(phoneNumber);

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found." });
  }

  const { firstName, totalScore } = user;

  const workouts = await getAllWorkoutsForUser(phoneNumber);

  return res.status(200).json({ firstName, totalScore, workouts });
};

export default handler;
