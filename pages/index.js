import { getCategoryAndType, getDashboardHeaders } from "../lib/dashboard";
import {
  getActiveServiceRequestCount,
  getAllServiceRequests,
  getUnassignedServiceRequestCount
} from "../lib/service-request";

import CountBar from "../components/count-bar";
import Dashboard from "../components/dashboard";

export default function Home({ colHeaders, categoryType }) {

  const totalRecordCount =  getActiveServiceRequestCount();
  const unassignedRecordCount =  getUnassignedServiceRequestCount();
  const initialServiceRequests = getAllServiceRequests(0, 10);
  return (
    <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 h-100 text-white py-6 overflow-y-auto overflow-x-auto">
      <main>
        <h1 className="text-xl mx-auto sm:px-6 lg:px-10 py-4 text-black underline">
          My Dashboard
        </h1>
        <div className="flex mx-auto lg:h-20 lg:px-10 py-3">
          <CountBar title="Total Requests" count={totalRecordCount} marginLeft="ml-14" />
          <div className="px-2"></div>
          <CountBar title="Unassigned Requests" count={unassignedRecordCount} marginLeft="ml-4" />
        </div>
        {initialServiceRequests && <Dashboard colHeaders={colHeaders} totalRecordCount={totalRecordCount} initialServiceRequests={initialServiceRequests} categoryType={categoryType} />
        }
      </main >
    </div >
  );
}

export async function getStaticProps() {
  const colHeaders =  await getDashboardHeaders();
  const categoryType = await getCategoryAndType();
  return {
    props: { colHeaders, categoryType },
  };
}