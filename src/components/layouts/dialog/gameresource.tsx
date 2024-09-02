import { useState, useEffect } from 'react';
import { DownloadIcon, LinkIcon } from '@heroicons/react/24/outline';
import { resGameResources } from '../../../core/hoyoapi';
import { GenshinImpactGame, HonkaiStarRailGame, ZenlessGame } from '../../../data/gameitems';

export const GameResources = {
    [GenshinImpactGame]: 'GenshinResource',
    [HonkaiStarRailGame]: 'HonkaiResource',
    [ZenlessGame]: 'ZenlessResource'
};

interface GamePackage {
    [key: string]: any;
}

const GameDataApi = () => {
    const [gamesData, setGamesData] = useState<any>(null);

    useEffect(() => {
        const apiUrl = resGameResources();
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

    const GenshinResource = gamesData?.data?.game_packages?.[2];
    const HonkaiResource = gamesData?.data?.game_packages?.[1];
    const ZenlessResource = gamesData?.data?.game_packages?.[0];

    return { GenshinResource, HonkaiResource, ZenlessResource };
}

const fileUi = () => {
    return (
        <section className="flex items-center justify-between">
            <div>
                <p>Filename.zip</p>
                <div>
                    <p>Size: 1.2GB</p>
                    <p>MD5: 1234567890</p>
                </div>
            </div>
            <div>
                <LinkIcon className="w-4 h-4" />
            </div>
        </section>
    );
}

const dataUi = () => {
    return (
        <div>

        </div>
    );
}
function GameResource(game: GamePackage) {
    const [currentVersion, setCurrentVersion] = useState('0.0.0');
    const [preInstallUpdate, setPreInstallUpdate] = useState('0.0.0');
    const { GenshinResource, HonkaiResource, ZenlessResource } = GameDataApi();
    return (
        <div className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-30 flex items-center justify-center z-10 p-16">
            <div className="w-full h-full pl-16">
                <div>
                    <p className="text-2xl font-bold">Game Resource</p>
                    <p className="text-sm text-gray-400">Manage your game resources here</p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-400">Game</p>
                        <p className="text-sm text-gray-400">0.0.0</p>
                    </div>
                </div>
                <div className="pt-4">
                    <div className="flex items-center gap-2">
                        <button className="text-white/50 hover:text-white active:text-white/70 active:font-bold">Current Version {currentVersion}</button>
                        <button className="text-white/50 hover:text-white active:text-white/70 active:font-bold">Pre-Install Update {preInstallUpdate}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameResource;