import React, { useEffect } from 'react';
import Head from 'next/head';
import { PrismaClient } from "@prisma/client";
// import { useRouter } from 'next/router';
import safeJsonStringify from 'safe-json-stringify';
import User from '@/utils/user';
import Layout from '@/components/layout';

export default function Slug({ game }) {
  const user = User.getUser();
  const iframeRef = React.createRef();

  useEffect(() => {
    window.addEventListener('message', event => {
      if (event.data.hasOwnProperty('type') && event.data.type === 'window_resize') {
        iframeRef.current.setAttribute('height', `${event.data.data.height}px`);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>{game.title} | MetaMillions</title>
      </Head>
      {user ? (
        <iframe
          ref={iframeRef}
          id="game"
          src={`${game.url}?SST=${user.token}`}
          width="100%"
        />
      ) : null}

      <div>
        <h2>{game.title}</h2>
        <p>{game.content}</p>
      </div>
    </>
  );
}

Slug.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const prisma = new PrismaClient();
  const game = await prisma.game.findUnique({
    where: { slug: params.slug }
  });
  const stringified = safeJsonStringify(game);
  const data = JSON.parse(stringified);

  return {
    props: { game: data }
  };
}
