import { useState } from "react";
import { saveServiceRequest } from "../lib/service-request";

export default function CreateServiceRequest({ categoryType, isOpen, onClose }) {

    const [types, setTypes] = useState([]);
    const handleOnChange = (event) => {
        if (event.target.value.length > 0) {
            setTypes(categoryType
                .filter(item => (item.key === event.target.value))
                .map(item => item.value)[0]);
        } else {
            setTypes([]);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const jsonRequest = Object.fromEntries(formData);
        await saveServiceRequest(jsonRequest);
        onClose();
        window.location.reload();
    }

    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`flex backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? '' : 'hidden'}`}>
            <div className="relative p-4 w-full lg:max-w-lg max-h-full">
                <div className="relative bg-white rounded-xl shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-xl bg-[#0a0a0a]">
                        <h3 className="text-md font-semibold text-white">
                            Create New Service Request
                        </h3>
                        <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form action="#" className="p-4 md:p-5" onSubmit={onSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Title:</label>
                                <input type="text" name="title" id="title" className="valid:border-green-500 focus:outline-none bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Title here" required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
                                <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg valid:border-green-500 focus:outline-none block w-full p-2.5" onChange={handleOnChange} required>
                                    <option value="">Select Category</option>
                                    {categoryType && categoryType.map(item => (
                                        <option value={item.key} key={item.key}>{item.key}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type:</label>
                                <select name="type" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg valid:border-green-500 focus:outline-none block w-full p-2.5" required>
                                    <option value="">Select Type</option>
                                    {types && types.map(item => (
                                        <option value={item} key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <textarea name="description" id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 valid:border-green-500 focus:outline-none" placeholder="Description here" required></textarea>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Requester Name:</label>
                                <input type="text" name="userName" id="userName" className="valid:border-green-500 focus:outline-none bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Requester Name here" required />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="px-2">
                                <button type="button" className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-2 px-4 rounded-full" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                            <div className="">
                                <button type="submit" className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-2 px-5 rounded-full">
                                    Save
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}