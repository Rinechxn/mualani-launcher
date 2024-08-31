import GenshinNews from "./widgets/genshinnewswidget";
import { getAllGameBasicInfo } from "../../core/hoyoapi";
import { useState, useEffect } from "react";
import PanelButton from "./widgets/panelbutton";

function GenshinLayout() {
    const [gamesData, setGamesData] = useState<any>(null);

    useEffect(() => {
        const apiUrl = getAllGameBasicInfo();

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setGamesData(data);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, []);

    const firstGame = gamesData?.data?.game_info_list?.[0];
    const backgroundUrl = firstGame?.backgrounds?.[0]?.background?.url || '/default-background.jpg';
    const btnicon = firstGame?.backgrounds?.[0]?.icon?.url || '/default-icon.png';
    const btnlink = firstGame?.backgrounds?.[0]?.icon?.link || '/default-link.png';
    return (
        <main
            className="flex min-h-screen flex-col bg-cover bg-center duration-200 animate-background-fade"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <div className="flex items-center pt-[290px] pl-32">
                <a href={btnlink} target="_blank" className="hover:scale-105 transition-all duration-300">
                    <img src={btnicon} alt="btnicon" className="w-28" />
                </a>
            </div>
            <GenshinNews />
            <PanelButton />
        </main>
    );
}

export default GenshinLayout;