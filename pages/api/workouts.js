import prisma from "../../lib/prisma";

const verifyUser = (id) =>
  prisma.fitness_user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      totalScore: true,
    },
  });

const getAllWorkoutsForUser = (id) =>
  prisma.fitness_workout_log.findMany({
    where: {
      user: {
        id,
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
  const { user: id } = req.query;

  if (!id) {
    return res
      .status(500)
      .json({ error: true, message: "No user information provided." });
  }

  const user = await verifyUser(id);

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found." });
  }

  const { firstName, totalScore } = user;

  const workouts = await getAllWorkoutsForUser(id);

  return res.status(200).json({ firstName, totalScore, workouts });
};

export default handler;
