


export default function CountBar({title, count, marginLeft}) {

    return (
        <div className="flwx-row bg-white border-b-4 border-black rounded-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer" >
            <div className="bg-[#0a0a0a] flex h-14 items-center">
              <p className="ml-2 text-white text-left text-xs font-bold uppercase">{title}</p>
              <h1 className={`flex ${marginLeft} mr-2 shrink-0 grow-0 border-2 border-indigo-700 w-10 h-10 rounded-full items-center justify-center`}>{count}</h1>
            </div>
          </div>
    );
}