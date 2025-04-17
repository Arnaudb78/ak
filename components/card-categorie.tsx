"use client"
import { Plus } from "lucide-react"

const data = [
    {
        by: "Re_store",
        name: "Astuces",
        color: "#FF6135",
    },
    {
        by: "Re_store",
        name: "Ateliers",
        color: "#D2EDFF",
    },
    {
        by: "Re_store",
        name: "Formations",
        color: "#FF6135",
    },
    {
        by: "Re_store",
        name: "Adresses",
        color: "#D2EDFF",
    },
    {
        by: "Re_store",
        name: "Anecdotes",
        color: "#FF6135",
    },
]

export default function CardCategorie() {
    return (
        <div className="flex flex-col items-start justify-start gap-4 rounded-2xl p-4 w-full">
            {data.map((categorie) => (
                <div key={categorie.name} className={`flex flex-col items-start justify-start pt-13 rounded-2xl p-4 w-full`} style={{ backgroundColor: categorie.color }}>
                    <p>{categorie.by}</p>
                    <div className="flex flex-row items-end justify-between w-full">
                        <h1 className="text-2xl font-bold">{categorie.name}</h1>
                        <Plus className="w-8 h-8" />
                    </div>
                </div>
            ))}
        </div>
    )
}
