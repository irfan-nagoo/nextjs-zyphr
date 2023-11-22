
export default function Alert({ message, isOpen, onClose }) {

    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`flex backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? '' : 'hidden'}`}>
            <div className="relative p-4 w-full lg:max-w-lg max-h-full">
                <div className="relative bg-white rounded-xl shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-xl bg-[#0a0a0a]">
                        <h3 className="text-md font-semibold text-white">
                            Alert
                        </h3>
                        <button type="button" onClick={onClose} className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5" >
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="close" className="block mb-2 text-sm font-medium text-gray-900">{message}</label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="px-2">
                                <button type="button" onClick={onClose} className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-2 px-4 rounded-full">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}