import { useRouter } from "next/router";

export default function Comments() {
    const router = useRouter();
    const handleClick = (e) => {
        router.push('/')
    };

    return (
        <div className="mx-auto max-w-8xl h-full py-2">
            <main>
                <h2 className="text-xl flex justify-center text-indigo-500">This is the comments page</h2>
                <div className="flex justify-start bottom-0 max-w-7xl px-2 sm:px-6 lg:px-10 lg:py-60">
                    <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick}>Back</button>
                </div>
            </main>
        </div>
    );
}