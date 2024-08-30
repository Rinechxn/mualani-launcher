import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                send: (channel: string, data?: any) => void;
                invoke: (channel: string, data?: any) => Promise<any>;
            };
        };
    }
}

const ControlOverlay: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGamePathInstalled, setIsGamePathInstalled] = useState(false);
    const { t } = useTranslation();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const findGameLocation = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('open-folder-dialog');
            if (result.filePaths && result.filePaths.length > 0) {
                setIsGamePathInstalled(true);
                // You might want to save this path or do something with it
                console.log('Selected path:', result.filePaths[0]);
            }
        } catch (error) {
            console.error('Failed to open folder dialog:', error);
        }
    };

    const startGame = () => {
        // Implement game start logic here
        console.log('Starting game...');
    };

    // const minimizeWindow = () => {
    //     window.electron.ipcRenderer.send('minimize-window');
    // };

    // const closeWindow = () => {
    //     window.electron.ipcRenderer.send('close-window');
    // };

    return (
        <div className='fixed bottom-16 right-16 flex flex-col items-end'>
            <div className='flex flex-col space-y-2 items-center'>
                <div className="">
                    {isGamePathInstalled ? (
                        <div className='flex space-x-4'>
                            <button onClick={startGame} className="bg-[#FFDB29] text-white font-bold p-4 rounded-full shadow hover:bg-black transition duration-150 flex space-x-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                                </svg>
                                <p>Start Game</p>
                            </button>
                            <div className="relative">
                                <button
                                    onClick={toggleMenu}
                                    className="bg-black text-white p-4 rounded-full shadow hover:bg-gray-600 transition duration-150"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <ul className="py-1">
                                            <li>
                                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    Repair
                                                </button>
                                            </li>
                                            <li>
                                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    Uninstall
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button className="bg-[#FFDB29] text-black font-bold p-3 w-64 rounded-full shadow hover:bg-black hover:text-[#FFDB29] transition duration-150 flex items-center justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                            </svg>
                            <p className=''>{t('downloadGame')}</p>
                            <div />
                        </button>
                    )}
                </div>
                {!isGamePathInstalled && (
                    <div className='flex space-x-1 text-sm'>
                        <p>{t('gameInstalled')}</p>
                        <button
                            className='cursor-pointer text-yellow-300'
                            onClick={findGameLocation}
                        >
                            {t('findGameLocation')}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ControlOverlay;