import { ReactNode, useState } from 'react';
// import WuwaLayout from './wuwa';
import GenshinLayout from './genshin';
// import ZzzLayout from './zzz';
// import HsrLayout from './hsr';
// import Hi3Layout from './hi3';
// import BaLayout from './ba';
// import NikkeLayout from './nikke';
// import SnowbrakeLayout from './snowbrake';

interface GameLayoutProps {
    game: string;
    children: ReactNode;
}

function GameLayout({ game, children }: GameLayoutProps) {
    const renderGameLayout = () => {
        switch (game) {
            // case 'wuwa':
            //     return <WuwaLayout>{children}</WuwaLayout>;
            case 'genshin':
                return <GenshinLayout />;
            // case 'zzz':
            //     return <ZzzLayout>{children}</ZzzLayout>;
            // case 'hsr':
            //     return <HsrLayout>{children}</HsrLayout>;
            // case 'hi3':
            //     return <Hi3Layout>{children}</Hi3Layout>;
            // case 'ba':
            //     return <BaLayout>{children}</BaLayout>;
            // case 'nikke':
            //     return <NikkeLayout>{children}</NikkeLayout>;
            // case 'snowbrake':
            //     return <SnowbrakeLayout>{children}</SnowbrakeLayout>;
            default:
                return <>{children}</>;
        }
    };

    return renderGameLayout();
}

export default GameLayout;
