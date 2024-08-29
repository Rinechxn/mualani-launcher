import { GameItems } from "../data/game";
// import GameLayout from "./games/layout";
function SideBar() {
    return (
        <>
            <div className="w-16 bg-[#42424291] h-screen fixed z-[999] border border-r border-[#444444] backdrop-blur-lg flex flex-col justify-between pt-16 px-2">
                <div className="space-y-2 w-full">
                    {GameItems.map((v, i) => (
                        <div key={i} className="relative group">
                            <a
                                href={"/games/" + v.path}
                                className="w-12 h-12 border-[#9b9b9b] border-2 flex items-center justify-center rounded-lg bg-[#ffffff27] hover:stroke-black hover:scale-75 duration-150"
                            >
                                <img src={v.image} className="rounded-lg" alt={v.name} />
                            </a>
                            <span className="absolute top-1/2 left-full ml-2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                {v.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <hr className="my-4 border-[#727272] border-2 rounded-full" />
                    <a href="/" className="border-[#9b9b9b] border-2 w-12 h-12 flex items-center justify-center rounded-lg bg-[#ffffff27] hover:stroke-black stroke-white hover:bg-white duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}

export default SideBar;