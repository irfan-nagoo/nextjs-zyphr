import styles from "../styles/Home.module.css";

export default function Footer() {
    return (
        <nav className="bg-black">
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-64 flex flex-1 flex-shrink-0 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex  items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    <p className="text-white sm:px-3">
                        Copyright @ 2023 Next.js
                    </p>
                </div>
            </div>
        </nav>
    );
}