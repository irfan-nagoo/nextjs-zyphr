import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function Layout({ children }) {
    return (
        <div className="container max-w-screen-2xl mx-auto flex flex-col h-screen justify-between">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}