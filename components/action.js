
import { useState } from "react";
import { SELECT_SERVICE_REQUEST } from "../lib/messaging/messaging";
import Alert from "./alert";
import AssignAgent from "./assign-agent";
import CloseServiceRequest from "./close-request";
import CreateServiceRequest from "./create-service-request";
import ViewUpdateServiceRequest from "./view-update-service-request";

export default function Action({ id, categoryType }) {

    const [createActive, setCreateActive] = useState(false)
    const [viewUpdateActive, setViewUpdateActive] = useState(false);
    const [assignAgentActive, setAssignAgentActive] = useState(false);
    const [closeActive, setCloseActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleViewUpdateClick = (event) => {
        if (id) {
            setViewUpdateActive(true)
        } else {
            setShowAlert(true);
        }
    }

    const handleAssignAgentClick = (event) => {
        if (id) {
            setAssignAgentActive(true)
        } else {
            setShowAlert(true);
        }
    }

    const handleCloseClick = (event) => {
        if (id) {
            setCloseActive(true)
        } else {
            setShowAlert(true);
        }
    }

    return (
        <>
            {showAlert &&
                <Alert message={SELECT_SERVICE_REQUEST} isOpen={showAlert} onClose={() => setShowAlert(false)} />
            }
            {createActive &&
                <CreateServiceRequest categoryType={categoryType} isOpen={createActive} onClose={() => setCreateActive(false)} />
            }
            {viewUpdateActive &&
                <ViewUpdateServiceRequest id={id} categoryType={categoryType} isOpen={viewUpdateActive} onClose={() => setViewUpdateActive(false)} />
            }
            {assignAgentActive &&
                <AssignAgent id={id} isOpen={assignAgentActive} onClose={() => setAssignAgentActive(false)} />
            }
            {closeActive &&
                <CloseServiceRequest id={id} isOpen={closeActive} onClose={() => setCloseActive(false)} />
            }
            <button id="dropdownMenuIconButton" type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-[#0a0a0a] rounded-lg hover:bg-[#121212] focus:outline-none focus:ring-gray-900">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>
            <div id="dropdownDots" className={`${isOpen ? '' : 'hidden'} absolute right-7 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setCreateActive(true)}>New Service Request</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleViewUpdateClick}>Open Service Request</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleAssignAgentClick}>Assign Agent</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleCloseClick}>Close Service Request</a>
                    </li>
                </ul>
            </div>
        </>);
}