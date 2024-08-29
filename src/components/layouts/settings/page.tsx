import React from 'react';
import General from './general';
// import Account from './account';
// import Security from './security';
// import Privacy from './privacy';
// import Notifications from './notifications';
// import Language from './language';
// import Appearance from './appearance';
// import Advanced from './advanced';

interface SettingsPageProps {
    activePage: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ activePage }) => {
    const renderPage = () => {
        switch (activePage) {
            case 'general':
                return <General />;
            // case 'account':
            //     return <Account />;
            // case 'security':
            //     return <Security />;
            // case 'privacy':
            //     return <Privacy />;
            // case 'notifications':
            //     return <Notifications />;
            // case 'language':
            //     return <Language />;
            // case 'appearance':
            //     return <Appearance />;
            // case 'advanced':
            //     return <Advanced />;
            default:
                return <General />;
        }
    };

    return (
        <div className="w-full h-full">
            {renderPage()}
        </div>
    );
};

export default SettingsPage;
