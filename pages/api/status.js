// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
  });
}

export default handler;
