import { useState } from "react";
import Action from "../components/action";
import {
    getAllServiceRequests,
    search
} from "../lib/service-request";


export default function Dashboard({ colHeaders, totalRecordCount, initialServiceRequests, categoryType }) {

    const pageNo = 0
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(pageNo);
    const [rowData, setRowData] = useState(initialServiceRequests);
    const [searchQuery, setSearchQuery] = useState(undefined);
    const [id, setId] = useState(0);

    const handlePaginationClick = async (pageNo) => {
        if (pageNo < 0) {
            pageNo = 0;
        }
        setCurrentPage(pageNo);
        const result = (searchQuery && searchQuery.length > 0)
            ? await search(searchQuery, pageNo, pageSize) : await getAllServiceRequests(pageNo, pageSize)
        setRowData(result);
    }

    const handleSearchInput = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(pageNo);
        if (query.length >= 3) {
            setRowData(await search(query, pageNo, pageSize));
        } else if (query.length === 0) {
            setRowData(await getAllServiceRequests(pageNo, pageSize));
        }
    }

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setId(event.target.value);
        } else {
            setId(0);
        }
    }

    return (
        <div className="relative mx-auto lg:max-w-[94%] sm:rounded-xl">
            <div className="pb-4 py-2 px-3 bg-[#0a0a0a] rounded-t-xl shadow-2xl">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" onInput={handleSearchInput} className="block py-2 ps-10 text-sm text-white border border-indigo-700 rounded-full w-80 bg-[#121212] focus:ring-blue-500 focus:border-blue-500" placeholder="Search" />
                </div>
                <div className="absolute top-0 right-0 py-3 px-3">
                    <Action id={id} categoryType={categoryType} />
                </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-700 shadow-2xl">
                <thead className="text-xs text-gray-700 uppercase bg-[#0a0a0a] text-white">
                    <tr>
                        <th scope="col" className="p-4"></th>
                        {colHeaders && colHeaders.map(element => (
                            <th scope="col" className="px-6 py-3" key={element}>
                                {element}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody aria-labelledby="table-navigation">
                    {rowData && rowData.map(element => (
                        <tr className="bg-white border-b hover:bg-gray-100" key={element.id}>
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search" type="checkbox" value={element.id} onChange={handleCheckboxChange} checked={element.id === id ? 'checked' : ''} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {element.id}
                            </th>
                            <td className="px-6 py-4">
                                {element.title}
                            </td>
                            <td className="px-6 py-4">
                                {element.category}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${element.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {element.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {element.userName}
                            </td>
                            <td className="px-6 py-4">
                                {element.assignedAgent}
                            </td>
                            <td className="px-6 py-4">
                                {element.createDate && element.createDate.substring(0, 10)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-4 bg-[#0a0a0a] rounded-b-xl">
                <span className="text-sm font-normal text-white mb-4 md:mb-0 block w-full md:inline md:w-auto px-2 py-4">Showing <span className="font-semibold">{(currentPage * pageSize) + 1}-{(currentPage * pageSize) + pageSize}</span> of <span className="font-semibold">{totalRecordCount}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 bg-white focus:text-blue-600 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-500" onClick={() => handlePaginationClick(currentPage - 1)}>Previous</a>
                    </li>
                    <li>
                        <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 0 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handlePaginationClick(0)}>1</a>
                    </li>
                    <li>
                        <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 1 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handlePaginationClick(1)}>2</a>
                    </li>
                    <li>
                        <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 2 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handlePaginationClick(2)}>3</a>
                    </li>
                    <li>
                        <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 3 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handlePaginationClick(3)}>4</a>
                    </li>
                    <li>
                        <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 4 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handlePaginationClick(4)}>5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white focus:text-blue-600 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => handlePaginationClick(currentPage + 1)}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}