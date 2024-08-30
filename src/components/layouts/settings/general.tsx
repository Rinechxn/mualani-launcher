import  { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setGlobalLanguage, getGlobalLanguage } from '../../../utils/languageUtils';

function General() {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(getGlobalLanguage());
    const [closeAppBehavior, setCloseAppBehavior] = useState('minimize');

    useEffect(() => {
        setLanguage(getGlobalLanguage());
    }, []);

    const changeLanguage = (newLanguage: string) => {
        setGlobalLanguage(newLanguage);
        setLanguage(newLanguage);
    };
    
    return (
        <div className="w-full h-full flex flex-col p-6 space-y-6 text-gray-200">
            <div>
                <label htmlFor="language" className="block text-sm mb-2 font-semibold">{t('language')}</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="w-full border-2 border-[#5f5f5f] rounded-md p-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#2b2b2b]"
                >
                    <option className='text-sm' value="th-TH">{t('thai')}</option>
                    <option className='text-sm' value="en-US">{t('english')}</option>
                    <option className='text-sm' value="ja-JP">{t('japanese')}</option>
                    <option className='text-sm' value="id-ID">{t('indonesia')}</option>
                    <option className='text-sm' value="ru-RU">{t('russian')}</option>
                    <option className='text-sm' value="zh-CN">{t('chinese')}</option>
                </select>
            </div>

            <div>
                <h2 className="text-sm font-semibold mb-3 text-white">{t('closeAppBehavior')}</h2>
                <div className="space-y-2">
                    {['minimize', 'exit'].map((behavior) => (
                        <label key={behavior} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="closeAppBehavior"
                                value={behavior}
                                checked={closeAppBehavior === behavior}
                                onChange={() => setCloseAppBehavior(behavior)}
                                className="form-radio h-3 w-3 text-blue-500 bg-gray-800 border-gray-600"
                            />
                            <span className="capitalize text-sm">
                                {behavior === 'minimize' ? t('minimizeToTray') : t('exitApp')}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default General;