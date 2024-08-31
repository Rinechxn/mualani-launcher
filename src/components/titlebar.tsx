// components/web/titlebar.tsx
import React, { useState, useEffect } from "react";
import { GearIcon } from "./icon";
import { motion } from "framer-motion";

interface TitlebarProps {
  toggleSettings: () => void;
}

function Titlebar({ toggleSettings }: TitlebarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <div className="w-screen h-12 fixed flex items-center justify-between px-4 z-[999]" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
        <div className="pl-16">
          <p className="text-sm font-semibold">{time.toLocaleTimeString()}</p>
        </div>
        <div className="flex space-x-4 pr-14" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
          <motion.button
            onClick={toggleSettings}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
            className="p-1 w-6"
          >
            <GearIcon />
          </motion.button>
          <button></button>
          <button></button>
        </div>
      </div>
    </>
  );
}

export default Titlebar;
