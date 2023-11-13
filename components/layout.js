import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function Layout({children}) {
    return (
        <div className="flex flex-col h-screen justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
        </div>
    )
}