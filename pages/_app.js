import '../styles/global.css';
import Layout from '../components/layout.js';

export default function HelloWorld({ Component, pageProps }) {
    return (
        <Layout>    
            <Component {...pageProps} />
        </Layout>
    );
}
