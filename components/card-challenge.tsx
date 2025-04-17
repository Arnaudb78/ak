import Challenge from "@/models/challenge";

interface Challenge {
    _id: string;
    title: string;
    description: string;
    image: string;
    month: string;
}

export default function CardChallenge({ challenge }: { challenge: Challenge }) {
    return (
        <div className="flex flex-col items-start justify-center gap-4 bg-[#FFC9BA] rounded-2xl p-4 w-full h-full">
            <div className="w-full flex justify-end">
                {challenge.image && (
                    <div className="w-24 h-24">
                        <img src={challenge.image} alt={challenge.title} className="w-full h-full rounded-tr-lg" />
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start justify-start">
                <p>Challenge de {challenge.month}</p>
                <h1 className="text-2xl font-bold">{challenge.title}</h1>
            </div>
        </div>
    );
}
