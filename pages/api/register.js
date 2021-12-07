const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const saltRounds = 10;
  const body = JSON.parse(req.body);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      password: hash,
      email: body.email,
      wallets: {
        create: { address: body.wallet }
      },
      profile: {
        create: { bio: '' }
      }
    },
  });

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
