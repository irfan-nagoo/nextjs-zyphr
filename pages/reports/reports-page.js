

export default function Reports({ categoryType, isOpen, onClose, mode }) {
    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`flex backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? '' : 'hidden'}`}>
            <div className="relative p-4 w-full lg:max-w-lg max-h-full">

            </div>
        </div>
    );
}
