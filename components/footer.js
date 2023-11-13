
export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t-2 border-gray-700">
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 h-40  lg:px-8 flex flex-1 flex-shrink-0 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    <p className="text-gray-400 sm:px-3">
                        Copyright @ 2023 Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}