// components/web/settings.tsx
import { useState } from "react";
import { CloseIcon } from "./icon";
import { motion } from "framer-motion";
import SettingsPage from "./layouts/settings/page";
import { useTranslation } from "react-i18next";
import { FolderIcon, BellIcon, GlobeAltIcon, EyeIcon, Cog6ToothIcon, ArchiveBoxIcon, InformationCircleIcon, UserIcon } from "@heroicons/react/24/outline";


interface SettingPageProps {
    closeSettings: () => void;
}

const settingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const settingDialogVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
};

function SettingPage({ closeSettings }: SettingPageProps) {
    const [activePage, setActivePage] = useState('general');
    const { t } = useTranslation();

    const settingsOptions = [
        { id: 'general', label: t('general'), icon: <UserIcon /> },
        { id: 'notifications', label: t('notifications'), icon: <BellIcon /> },
        { id: 'language', label: t('language'), icon: <GlobeAltIcon /> },
        { id: 'appearance', label: t('displays'), icon: <EyeIcon /> },
        { id: 'filemanager', label: t('filemanagement'), icon: <FolderIcon /> },
        { id: 'advanced', label: t('advanced'), icon: <Cog6ToothIcon /> },
        { id: 'opensource', label: t('opensource'), icon: <ArchiveBoxIcon /> },
        { id: 'about', label: t('about'), icon: <InformationCircleIcon /> },
    ];

    return (
        <motion.div
            className="fixed w-screen h-screen backdrop-blur-md bg-black bg-opacity-30 flex items-center justify-center z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={settingVariants}
            transition={{ duration: 0.25, ease: "easeInOut" }}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={settingDialogVariants}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-[#f5f5f7] dark:bg-[#1e1e1e] w-[800px] h-[500px] rounded-xl shadow-lg flex overflow-hidden border border-[#3b3b3b]"
            >
                <div className="h-full w-[200px] bg-[#e8e8ed] dark:bg-[#2a2a2a] p-4">
                    <div className="flex flex-col gap-1 items-start">
                        {settingsOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 ${activePage === option.id
                                    ? 'bg-[#ffffff] text-black'
                                    : 'hover:bg-[#d8d8d8] dark:hover:bg-[#3a3a3a]'
                                    }`}
                                onClick={() => setActivePage(option.id)}
                            >
                                <div className="w-5 h-5">
                                    {option.icon}
                                </div>
                                <p> {option.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-10 flex items-center justify-between px-4   ">
                        <h2 className="font-semibold pl-2">{t('settings')}</h2>
                        <button className="p-1 w-6 text-[#ffffff]" onClick={closeSettings}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <SettingsPage activePage={activePage} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SettingPage;
