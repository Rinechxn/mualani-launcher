import  { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import SideBar from '../components/sidebar';
import Titlebar from '../components/titlebar';
import SettingPage from '../components/settings';
// import GameLayout from '../components/games/layout';
import GenshinLayout from '../components/games/genshin';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <div className="app">
      <Titlebar toggleSettings={toggleSettings} />
      {showSettings && <SettingPage closeSettings={() => setShowSettings(false)} />}
      <div className="main-content">
        <SideBar />
        {/* <Outlet /> */}
        <GenshinLayout />
      </div>
    </div>
  );
}

export default App;
