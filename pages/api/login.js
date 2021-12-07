const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    },
    include: {
      profile: true,
      wallets: true
    }
  });

  if (user === null) {
    return res.status(400).send('User not found');
  }

  const match = await bcrypt.compare(body.password, user.password);

  if (match === false) {
    return res.status(400).send('User not found');
  }

  delete user.password;
  delete user.role;

  await prisma.$disconnect();

  const token = jwt.sign(
    { user_id: user.id, email: body.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  user.token = token;

  res.status(200).send(user);
}
