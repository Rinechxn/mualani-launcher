import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Assuming HoYoNewsGenshin is a function that returns the API URL
// If it's not, you'll need to replace it with the actual API URL
import { HoYoNewsGenshin } from "../../../core/hoyoapi";

interface Banner {
    id: string;
    image: {
        url: string;
        link: string;
    };
}

interface NewsPost {
    id: string;
    type: string;
    title: string;
    link: string;
    date: string;
}

interface ApiResponse {
    data: {
        content: {
            banners: Banner[];
            posts: NewsPost[];
        };
    };
}



function GenshinLayout() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const typeMapping: { [key: string]: string } = {
        POST_TYPE_ACTIVITY: t('activity'),
        POST_TYPE_ANNOUNCE: t('announce'),
        POST_TYPE_INFO: t('info')
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Use a proxy server to bypass CORS
                const targetUrl = HoYoNewsGenshin();
                const response = await axios.get<ApiResponse>(targetUrl);
                setData(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            setBanners(data.data.content.banners);
            setPosts(data.data.content.posts);
        }
    }, [data]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const uniqueTypes = useMemo(() => {
        return Array.from(new Set(posts.map(post => post.type)));
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (!selectedType) return posts;
        return posts.filter(post => post.type === selectedType);
    }, [posts, selectedType]);

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
        event.preventDefault();
        window.open(url, '_blank');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (banners.length === 0) {
        return <div>No banners available.</div>;
    }

    const currentBanner = banners[currentBannerIndex];

    return (
        <div className="fixed bottom-16 left-32 w-[400px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg" style={{ height: '320px' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentBannerIndex}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[180px]"
                >
                    <a href={currentBanner.image.link} onClick={(e) => handleLinkClick(e, currentBanner.image.link)}>
                        <img
                            src={currentBanner.image.url || '/default-image.jpg'}
                            alt={`Banner ${currentBanner.id}`}
                            className="w-full h-full object-cover"
                        />
                    </a>
                </motion.div>
            </AnimatePresence>
            <div className="p-4">
                <div className="flex space-x-4 mb-3">
                    {uniqueTypes.map(type => (
                        <button
                            key={type}
                            className={`${selectedType === type ? 'text-white font-bold border-b-2 border-blue-500' : 'text-gray-400'} pb-1 transition-all duration-200 ease-in-out`}
                            onClick={() => setSelectedType(type)}
                        >
                            {typeMapping[type] || type}
                        </button>
                    ))}
                </div>
                <div className="space-y-3 h-[80px] overflow-y-auto">
                    {filteredPosts.slice(0, 2).map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            className="block text-sm text-white hover:text-blue-300 transition-colors duration-200"
                            onClick={(e) => handleLinkClick(e, post.link)}
                        >
                            <div className="truncate font-medium">{post.title}</div>
                            <div className="text-xs text-gray-400 mt-1">{post.date}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GenshinLayout;