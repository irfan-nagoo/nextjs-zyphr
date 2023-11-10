import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function Layout({children}) {
    return (
        <>
        <Header />
        <main>{children}</main>
        <Footer />
        </>
    )
}