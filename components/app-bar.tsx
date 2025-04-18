import Link from "next/link";
import { Home, Plus, Medal, User, ClipboardList } from "lucide-react";

export default function AppBar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xs rounded-t-2xl border-t border-gray-200 p-4 w-full">
            <div className="grid grid-cols-5 items-center h-16 w-full">
                <Link href="/community" className="flex flex-col items-center">
                    <Home className="h-6 w-6" />
                    <span className="text-xs">Accueil</span>
                </Link>

                <Link href="/podium" className="flex flex-col items-center">
                    <Medal className="h-6 w-6" />
                    <span className="text-xs">Podium</span>
                </Link>

                <Link href="/add" className="flex flex-col items-center justify-center">
                    <div className="bg-black rounded-2xl p-4 shadow-lg">
                        <Plus className="h-6 w-6 text-white" />
                    </div>
                </Link>

                <Link href="/act" className="flex flex-col items-center">
                    <ClipboardList className="h-6 w-6" />
                    <span className="text-xs">Agir</span>
                </Link>

                <Link href="/profil" className="flex flex-col items-center">
                    <User className="h-6 w-6" />
                    <span className="text-xs">Profil</span>
                </Link>
            </div>
        </nav>
    );
}
