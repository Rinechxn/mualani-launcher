import GenshinNews from "./widgets/genshinnewswidget";
import { HoYoBackground } from "../../core/hoyoapi";
import { useState, useEffect } from "react";

function GenshinLayout() {
    const [gamesData, setGamesData] = useState<any>(null);

    useEffect(() => {
        const apiUrl = HoYoBackground();

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

    // Extract the background URL from the first game object in HoYoPlay
    const firstGame = gamesData?.data?.games[2];
    const backgroundUrl = firstGame?.display?.background?.url || '/default-background.jpg';
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
           
            <GenshinNews />
        </main>
    );
}

export default GenshinLayout;