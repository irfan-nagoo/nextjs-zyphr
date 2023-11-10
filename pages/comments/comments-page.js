import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function Comments() {
    const router = useRouter();
    const handleClick = (e) => {
        router.push('/')
    };

    return (
        <div className={styles.container}>
            <div>
                <Head>
                    <title>Comments section</title>
                </Head>
                <main>
                    <h2 className={styles.title}>This is the comments page</h2>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-80">
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick}>Back</button>
                    </div>
                </main>
            </div>
        </div>
    );
}