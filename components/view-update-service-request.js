import { useEffect, useState } from "react";
import { getServiceRequestById, updateServiceRequest } from "../lib/service-request";

export default function ViewUpdateServiceRequest({ id, categoryType, isOpen, onClose }) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [types, setTypes] = useState([]);
    const [serReqDetail, setSerReqDetail] = useState({ title: '' });
    
    useEffect(() => {
        async function fetchData() {
            const response = await getServiceRequestById(id);
            setSerReqDetail(response);
            if (response) {
                setTypes(categoryType
                    .filter(item => (item.key === response.category))
                    .map(item => item.value)[0]);
            }
        }
        fetchData();
    }, [id]);

    const handleOnChange = (event) => {
        if (event.target.value.length > 0) {
            setTypes(categoryType
                .filter(item => (item.key === event.target.value))
                .map(item => item.value)[0]);
        } else {
            setTypes([]);
        }
    }

    const handleOnClose = (e) => {
        setIsEditMode(false);
        onClose();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isEditMode) {
            setIsEditMode(true);
        } else {
            const formData = new FormData(e.currentTarget);
            const jsonRequest = Object.fromEntries(formData);
            await updateServiceRequest(id, jsonRequest);
            onClose();
        }
    }

    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`flex backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? '' : 'hidden'}`}>
            <div className="relative p-4 w-full lg:max-w-lg max-h-full">
                <div className="relative bg-white rounded-xl shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-xl bg-[#0a0a0a]">
                        <h3 className="text-md font-semibold text-white">
                            Service Request Details
                        </h3>
                        <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={handleOnClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form action="#" className="p-4 md:p-5" onSubmit={onSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-900">Id:</label>
                                <input type="text" name="id" id="id" defaultValue={serReqDetail && serReqDetail.id} className="bg-white text-gray-900 text-sm px-2" readOnly={true} required />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Title:</label>
                                <input type="text" name="title" id="title" defaultValue={serReqDetail && serReqDetail.title} onChange={() => { }} className={`bg-white valid:border-green-500 focus:outline-none ${isEditMode ? 'bg-gray-50 border' : ''} text-gray-900 text-sm rounded-lg block w-full py-2.5`} readOnly={!isEditMode} required />
                            </div>
                            <div className={`${!isEditMode ? 'flex' : ''} 'col-span-2 sm:col-span-1`}>
                                <label htmlFor="category" className={`${isEditMode ? 'block mb-2' : ''} text-sm font-medium text-gray-900`}>Category:</label>
                                {isEditMode ?
                                    <select name="category" id="category" defaultValue={serReqDetail && serReqDetail.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg valid:border-green-500 focus:outline-none block w-full p-2.5" onChange={handleOnChange} required>
                                        <option value="">Select Category</option>
                                        {categoryType && categoryType.map(item => (
                                            <option value={item.key} key={item.key}>{item.key}</option>
                                        ))}
                                    </select>
                                    : <input type="text" name="category" id="category" defaultValue={serReqDetail && serReqDetail.category} readOnly={!isEditMode} className="bg-white text-gray-900 text-sm px-2" required />
                                }
                            </div>
                            <div className={`${!isEditMode ? 'flex' : ''} 'col-span-2 sm:col-span-1`}>
                                <label htmlFor="type" className={`${isEditMode ? 'block mb-2' : ''} text-sm font-medium text-gray-900`}>Type:</label>
                                {isEditMode ?
                                    <select name="type" id="type" defaultValue={serReqDetail && serReqDetail.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg valid:border-green-500 focus:outline-none block w-full p-2.5" required>
                                        <option value="">Select Type</option>
                                        {types && types.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    : <input type="text" name="type" id="type" defaultValue={serReqDetail && serReqDetail.type} readOnly={!isEditMode} className="bg-white text-gray-900 text-sm px-2" required />
                                }
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                                <textarea name="description" id="description" defaultValue={serReqDetail && serReqDetail.description} readOnly={!isEditMode} onChange={() => { }} rows="3" className={`block py-2.5 w-full bg-white text-sm text-gray-900 rounded-lg ${isEditMode ? 'bg-gray-50 border' : 'resize-none bg-white'} valid:border-green-500 focus:outline-none`} placeholder="Description here" required></textarea>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className={`${isEditMode ? 'block mb-2' : ''} text-sm font-medium text-gray-900`}>Requester Name:</label>
                                <input type="text" name="userName" id="userName" defaultValue={serReqDetail && serReqDetail.userName} readOnly={!isEditMode} onChange={() => { }} className={`bg-white valid:border-green-500 focus:outline-none ${isEditMode ? 'bg-gray-50 border w-full p-2.5' : ''} text-gray-900 text-sm rounded-lg px-2.5`} required />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">Status:</label>
                                <input type="text" name="status" id="status" defaultValue={serReqDetail && serReqDetail.status} readOnly={!isEditMode} onChange={() => { }} className={`bg-white focus:outline-none text-gray-900 text-sm rounded-lg px-2.5`} required />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900">Create Date:</label>
                                <input type="text" name="createDate" id="createDate" defaultValue={serReqDetail && serReqDetail.createDate && serReqDetail.createDate.substring(0,10)} readOnly={!isEditMode} onChange={() => { }} className={`bg-white focus:outline-none text-gray-900 text-sm rounded-lg px-2.5`} required />
                            </div>
                        </div>

                        <div className="flex justify-end">
                        <div className="">
                                <button type="submit" className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-2 px-5 rounded-full">
                                    {isEditMode ? 'Save' : 'Edit'}
                                </button>
                            </div>
                            <div className="px-2">
                                <button type="button" className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-2 px-4 rounded-full" onClick={handleOnClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    );
}