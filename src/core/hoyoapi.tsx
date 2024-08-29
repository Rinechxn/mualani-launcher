// src/core/hoyoapi.tsx
const BASE_URL = "/api/getGameContent";
const BANNER_URL = "/api/getGames";
const LAUNCHER_ID = "VYTpXlbWo8";
const GAME_ID = "gopR6Cufr3";

const getLanguage = (): string => {
    return typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en-us';
};

export const HoYoApi = (): string => {
    const language = getLanguage();
    return `${BASE_URL}?launcher_id=${LAUNCHER_ID}&game_id=${GAME_ID}&language=${language}`;
};

export const resBackground = (): string => {
    const language = getLanguage();
    return `${BANNER_URL}?launcher_id=${LAUNCHER_ID}&language=${language}`;
};

export const HoYoBackground = (): string => {
   return resBackground();
};

export const HoYoNewsGenshin = (): string => {
    return HoYoApi(); // Since they're the same in this context
};