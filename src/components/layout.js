import Head from 'next/head';
import Navigation from '@/components/navigation';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <Navigation />
        {children}
      </div>
    </>
  );
}
