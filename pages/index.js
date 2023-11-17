import { useState, useEffect } from "react";
import {
  getActiveServiceRequestCount,
  getAllServiceRequests,
  getUnassignedServiceRequestCount, search
} from "../lib/service-request";
import { getDashboardHeaders } from "../lib/utils";
import CreateServiceRequest from '../components/create-service-request';
import ViewUpdateServiceRequest from "../components/view-update-service-request";
import { getCategoryAndType } from "../lib/utils";


let searchQuery;
const pageNo = 0
const pageSize = 5;

export default function Home({ colHeaders, totalRecordCount, unassignedRecordCount, initialResult, categoryType }) {

  const [currentPage, setCurrentPage] = useState(pageNo);
  const [rowData, setRowData] = useState(initialResult);
  const [createActive, setCreateActive] = useState(false)
  const [viewUpdateActive, setViewUpdateActive] = useState(false);
  const [id, setId] = useState(0);

  const handleOpenClick = async (id) => {
    setId(id);
    setViewUpdateActive(true);
  }

  const handleClick = async (pageNo) => {
    if (pageNo < 0) {
      pageNo = 0;
    }
    setCurrentPage(pageNo);
    const result = (searchQuery && searchQuery.length > 0)
      ? await search(searchQuery, pageNo, pageSize) : await getAllServiceRequests(pageNo, pageSize)
    setRowData(result);
  }

  const handleInput = async (event) => {
    searchQuery = event.target.value;
    setCurrentPage(pageNo);
    if (searchQuery.length >= 3) {
      setRowData(await search(searchQuery, pageNo, pageSize));
    } else if (searchQuery.length === 0) {
      setRowData(await getAllServiceRequests(pageNo, pageSize));
    }
  }


  return (
    <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 h-100 text-white py-6 overflow-y-auto overflow-x-auto">
      <CreateServiceRequest categoryType={categoryType} isOpen={createActive} onClose={() => setCreateActive(false)} />
      <ViewUpdateServiceRequest id={id} categoryType={categoryType} isOpen={viewUpdateActive} onClose={() => setViewUpdateActive(false)} />
      <main>
        <h1 className="text-xl mx-auto sm:px-6 lg:px-10 py-4 text-black underline">
          My Dashboard
        </h1>
        <div className="flex mx-auto lg:h-20 lg:px-10 py-3">
          <div className="flwx-row bg-white border-b-4 border-black rounded-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer" >
            <div className="bg-[#0a0a0a] flex h-14 items-center">
              <p className="ml-2 text-white text-left text-xs font-bold uppercase">Open Requests</p>
              <h1 className="flex ml-14 mr-2 shrink-0 grow-0 border-2 border-indigo-700 w-10 h-10 rounded-full items-center justify-center">{totalRecordCount}</h1>
            </div>
          </div>
          <div className="px-2"></div>
          <div className="bg-white border-b-4 border-black rounded-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer" >
            <div className="bg-[#0a0a0a] flex h-14 items-center">
              <p className="ml-2 text-white text-left text-xs font-bold uppercase">Unassigned Requests</p>
              <h1 className="flex ml-4 mr-2 shrink-0 grow-0 border-2 border-indigo-700 w-10 h-10 rounded-full items-center justify-center">{unassignedRecordCount}</h1>
            </div>
          </div>
        </div>

        <div className="relative mx-auto lg:max-w-[94%] sm:rounded-xl">
          <div className="pb-4 py-2 px-3 bg-[#0a0a0a] rounded-t-xl shadow-2xl">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search" className="block py-2 ps-10 text-sm text-white border border-indigo-700 rounded-full w-80 bg-[#121212] focus:ring-blue-500 focus:border-blue-500" placeholder="Search" onInput={handleInput} />
            </div>
            <div className="absolute top-0 right-0 py-3 px-3">
              <button type="submit" className="text-white inline-flex items-center bg-[#121212] border border-indigo-700 focus:outline-none focus:ring-black font-medium rounded-full text-xs px-3 py-2 text-center hover:bg-[#1a1a1a]" onClick={() => setCreateActive(true)}>
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                New Service Request
              </button>
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
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
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
                    {element.createDate}
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-bold py-1 px-2 rounded-full" onClick={() => handleOpenClick(element.id)}>Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-4 bg-[#0a0a0a] rounded-b-xl">
            <span className="text-sm font-normal text-white mb-4 md:mb-0 block w-full md:inline md:w-auto px-2 py-4">Showing <span className="font-semibold">{(currentPage * pageSize) + 1}-{(currentPage * pageSize) + pageSize}</span> of <span className="font-semibold">{totalRecordCount}</span></span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 bg-white focus:text-blue-600 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-500" onClick={() => handleClick(currentPage - 1)}>Previous</a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 0 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handleClick(0)}>1</a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 1 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handleClick(1)}>2</a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 2 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handleClick(2)}>3</a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 3 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handleClick(3)}>4</a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 4 ? 'text-blue-600 bg-gray-100' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-blue-700`} onClick={() => handleClick(4)}>5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white focus:text-blue-600 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => handleClick(currentPage + 1)}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </main >
    </div >
  );
}

export async function getStaticProps() {
  const colHeaders = await getDashboardHeaders();
  const totalRecordCount = await getActiveServiceRequestCount();
  const unassignedRecordCount = await getUnassignedServiceRequestCount();
  const initialResult = await getAllServiceRequests(pageNo, pageSize);
  const categoryType = await getCategoryAndType();
  return {
    props: { colHeaders, totalRecordCount, unassignedRecordCount, initialResult, categoryType },
  };
}