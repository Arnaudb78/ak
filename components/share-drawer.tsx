import { FormEvent } from "react";

interface ShareDrawerProps {
    isOpen: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    pictureBefore: string | null;
    pictureAfter: string | null;
}

export default function ShareDrawer({ isOpen, onSubmit}: ShareDrawerProps) {
    return (
        <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-[1px] bg-black rounded-full"></div>
                </div>
                
                <div className="flex justify-center mb-4">
                    <h2 className="text-xl font-bold">Partage de publications</h2>
                </div>


                <div className="flex justify-center mb-4 gap-2 w-full">
                    <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </div>
                    <p className="text-sm">Tout le monde peut donc découvrir vos publications et vous suivre.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={(e) => onSubmit(e as unknown as FormEvent<HTMLFormElement>)}
                        className="w-full py-3 text-base font-medium text-white bg-black rounded-2xl hover:bg-gray-800 transition-colors duration-200"
                    >
                        OK
                    </button>
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                       <p className="text-sm font-bold">Gérer les paramètres</p>
                       <p className="text-xs opacity-50">En savoir plus sur les publications</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 