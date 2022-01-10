import prisma from "../../lib/prisma";

const verifyUser = async (phoneNumber) =>
  await prisma.fitness_user.findUnique({
    where: {
      phoneNumber,
    },
    select: {
      firstName: true,
      totalScore: true,
    },
  });

const getAllWorkoutsForUser = async (phoneNumber) =>
  await prisma.fitness_workout_log.findMany({
    where: {
      user: {
        phoneNumber,
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
