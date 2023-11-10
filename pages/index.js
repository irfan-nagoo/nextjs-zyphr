import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';



export default function Home() {
  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to World of React (Next.js)
        </h1>

        <p className={styles.description}>Get started by nagvigating <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            href='/comments/comments-page'>Comments Section</Link>
        </p>
      </main>
    </div >
  );
}
