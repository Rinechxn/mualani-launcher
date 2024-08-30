// src/core/hoyoapi.tsx
import { getGlobalLanguage } from '../utils/languageUtils';

const BASE_URL = "/api/getGameContent";
const BANNER_URL = "/api/getGames";
const BASICINFO_URL = "/api/getAllGameBasicInfo";
const LAUNCHER_ID = "VYTpXlbWo8";
const GAME_ID = "gopR6Cufr3";

export const HoYoApi = (): string => {
    const language = getGlobalLanguage();
    return `${BASE_URL}?launcher_id=${LAUNCHER_ID}&game_id=${GAME_ID}&language=${language}`;
};

export const resBackground = (): string => {
    const language = getGlobalLanguage();
    return `${BANNER_URL}?launcher_id=${LAUNCHER_ID}&language=${language}`;
};

export const resBasicInfo = (): string => {
    const language = getGlobalLanguage();
    return `${BASICINFO_URL}?launcher_id=${LAUNCHER_ID}&language=${language}&game_id=${GAME_ID}`;
};
console.log(resBasicInfo());

export const getAllGameBasicInfo = (): string => {
    return resBasicInfo();
};

export const HoYoBackground = (): string => {
   return resBackground();
};

export const HoYoNewsGenshin = (): string => {
    return HoYoApi();
};