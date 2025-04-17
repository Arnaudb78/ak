'use client'

import AppBar from "@/components/app-bar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PodiumPage = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<'month' | 'history'>('month');
    const [selectedPosition, setSelectedPosition] = useState<number>(1);

    const handlePositionClick = (position: number) => {
        setSelectedPosition(position);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/");
        }   
    }, []);

    const getPositionColor = (position: number) => {
        switch(position) {
            case 1: return 'bg-[#FF6135]';
            case 2: return 'bg-[#D2EDFF]';
            case 3: return 'bg-[#2BB673]';
            default: return 'bg-gray-300';
        }
    };

    const getPositionData = (position: number) => {
        return {
            name: `User ${position}`,
            points: position * 1000,
            achievements: ['Achievement 1', 'Achievement 2'],
            rank: position
        };
    };
    
    return (
        <>
        <div className="px-4">
            <div className="flex items-center justify-center w-full px-4 pt-20">
                <h1 className="text-xl font-bold">Re_store</h1>
            </div>
            <div className="flex flex-col items-center w-full px-4 gap-4 pt-6">
                <div className="w-full px-8">
                    <div className="flex items-center justify-between w-full p-1 rounded-3xl bg-[#F4F4F4]">
                        <p 
                            className={`cursor-pointer w-[48%] text-center py-3 rounded-2xl ${
                                selectedTab === 'month' ? 'bg-black text-white font-bold' : ''
                            }`}
                            onClick={() => setSelectedTab('month')}
                        >
                            Ce mois
                        </p>
                        <p 
                            className={`cursor-pointer w-[48%] text-center py-3 rounded-2xl ${
                                selectedTab === 'history' ? 'bg-black text-white font-bold' : ''
                            }`}
                            onClick={() => setSelectedTab('history')}
                        >
                            Historique
                        </p>
                    </div>
                </div>
                <div className="w-full px-8 bg-[#D2EDFF] rounded-2xl">
                    <div className="flex items-center justify-start px-2 py-6 gap-4">
                        <div className="flex items-center justify-center bg-black rounded-2xl w-12 h-12">
                            <p className="text-white font-bold text-lg">#5</p>
                        </div>
                        <div>
                            <p className="font-bold">Continue comme ça !</p>
                            <p className="text-sm">Fin dans 17 jours</p>
                        </div>
                    </div>
                </div>
                <div className="w-full px-8 pt-10">
                    <div className="flex items-end justify-center h-[300px]">
                        {/* Second Place */}
                        <div 
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handlePositionClick(2)}
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-300 mb-2 overflow-hidden">
                                <img src="/profile-placeholder.png" alt="Second place" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[#D2EDFF] w-24 h-40 rounded-t-2xl flex items-center justify-center">
                                <p className=" font-bold text-2xl">2</p>
                            </div>
                        </div>

                        {/* First Place */}
                        <div 
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handlePositionClick(1)}
                        >
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gray-300 mb-2 overflow-hidden">
                                    <img src="/profile-placeholder.png" alt="First place" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -top-2 -left-2 text-3xl rotate-[-15deg]">♛</div>
                            </div>
                            <div className="bg-[#FF6135] w-28 h-48 rounded-t-2xl flex items-center justify-center">
                                <p className="font-bold text-2xl">1</p>
                            </div>
                        </div>

                        {/* Third Place */}
                        <div 
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handlePositionClick(3)}
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-300 mb-2 overflow-hidden">
                                <img src="/profile-placeholder.png" alt="Third place" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[#2BB673] w-24 h-32 rounded-t-2xl flex items-center justify-center">
                                <p className="font-bold text-2xl">3</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Square */}
                {selectedPosition && (
                    <div className={`w-full px-8 ${getPositionColor(selectedPosition)} rounded-2xl p-4`}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">👑</span>
                                <h2 className="text-2xl font-bold">Détails</h2>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                                    <img src="/profile-placeholder.png" alt={`Position ${selectedPosition}`} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{getPositionData(selectedPosition).name}</h3>
                                    <p className="text-gray-600">Points: {getPositionData(selectedPosition).points}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Achievements</h4>
                                <ul className="list-disc list-inside">
                                    {getPositionData(selectedPosition).achievements.map((achievement, index) => (
                                        <li key={index} className="text-gray-700">{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
                <AppBar />
            </div>
        </>
    )
}

export default PodiumPage;