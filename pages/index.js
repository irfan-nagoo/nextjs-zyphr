import { useState } from "react";
import { getAllServiceRequests } from "../lib/service-request";
import { getDashboardHeaders } from "../lib/utils";

export default function Home() {

  const pageSize = 3;
  let [currentPage, setCurrentPage] = useState(0);
  const colHeaders = getDashboardHeaders();
  let [rowData, setRowData] = useState(getAllServiceRequests(currentPage, pageSize));
  const maxLength = rowData.length;
  const handleClick = (pageNo) => {
    if (pageNo < 0) {
      pageNo = 0;
    }
    setCurrentPage(pageNo);
    rowData = getAllServiceRequests(pageNo, pageSize);
    setRowData(rowData)
  }
  return (
    <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 h-100 text-white py-6 overflow-y-auto overflow-x-auto">
      <main>
        <h1 className="text-lg mx-auto sm:px-6 lg:px-10 py-4 text-black">
          My Dashboard
        </h1>

        <div className="relative mx-auto lg:max-w-[94%] sm:rounded-xl">
          <div className="pb-4 py-2 px-3 bg-[#0a0a0a] rounded-t-xl shadow-2xl">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search" className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for tickets" />
            </div>
          </div>
          <table className="w-full  text-sm text-left rtl:text-right text-gray-700 shadow-2xl">
            <thead className="text-xs text-gray-700 uppercase bg-[#0a0a0a] text-white">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                {colHeaders.map(element => (
                  <th scope="col" className="px-6 py-3" key={element}>
                    {element}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody aria-labelledby="table-navigation">
              {rowData.map(ticket => (
                <tr className="bg-white border-b hover:bg-gray-50" key={ticket.id}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {ticket.id}
                  </th>
                  <td className="px-6 py-4">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.category}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.userName}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.assignedAgent}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.createDate}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-4 bg-[#0a0a0a] rounded-b-xl">
            <span className="text-sm font-normal text-white mb-4 md:mb-0 block w-full md:inline md:w-auto px-2 py-4">Showing <span className="font-semibold">{(currentPage * pageSize) + 1}-{(currentPage * pageSize) + pageSize}</span> of <span className="font-semibold">{maxLength}</span></span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-500" onClick={() => handleClick(currentPage - 1)}>Previous</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700" onClick={() => handleClick(0)}>1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" aria-label="table-navigation" onClick={() => handleClick(1)}>2</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => handleClick(2)}>3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => handleClick(3)}>4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => handleClick(4)}>5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => handleClick(currentPage + 1)}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div >
  );
}
