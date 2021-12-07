const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@metamillions.com' },
    update: {},
    create: {
      email: 'admin@metamillions.com',
      name: 'Admin',
      password: hash,
      role: 'ADMIN',
      wallets: {
        create: { address: process.env.ADMIN_WALLET }
      }
    },
  });

  console.log(admin);

  /**
   * title     String   @db.VarChar(255)
     content   String?
     published Boolean  @default(false)
   */
  const roulette = await prisma.game.upsert({
    where: { title: 'MetaMillions Mega Roulette' },
    update: {},
    create: {
      title: 'MetaMillions Mega Roulette',
      slug: 'metamillions-mega-roulette',
      content: 'Incredible roulette game',
      url: '/internal/roulette',
      published: true
    }
  });

  console.log(roulette);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
