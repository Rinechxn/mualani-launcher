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
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
           
            <GenshinNews />
            <PanelButton />
        </main>
    );
}

export default GenshinLayout;