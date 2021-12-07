import Head from 'next/head';
import { PrismaClient } from "@prisma/client";
import { useRouter } from 'next/router';
import safeJsonStringify from 'safe-json-stringify';
import Layout from '@/components/layout';

export default function Home({ games }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Homepage | MetaMillions</title>
      </Head>

      <h2>Check out our latest games</h2>

      <div className="cards">
        {games.map(game => (
          <div key={game.id} className="card" onClick={() => router.push(`/game/${game.slug}`)}>
            <img
              alt={game.title}
              src={game.thumbnailUrl ? game.thumbnailUrl : 'http://placehold.it/300/300'}
            />
            <h2>{game.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany({
    where: { published: true }
  });
  const stringified = safeJsonStringify(games);
  const data = JSON.parse(stringified);

  return {
    props: { games: data }
  };
}
