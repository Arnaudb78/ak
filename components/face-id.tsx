"use client";

import { useState, useEffect } from "react";

interface FaceIDProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function FaceID({ onSuccess, onCancel }: FaceIDProps) {
    const [scanningState, setScanningState] = useState<"initial" | "scanning" | "success" | "error">("initial");

    useEffect(() => {
        if (scanningState === "initial") {
            const timer = setTimeout(() => {
                setScanningState("scanning");
            }, 500);
            return () => clearTimeout(timer);
        }

        if (scanningState === "scanning") {
            const timer = setTimeout(() => {
                setScanningState("success");
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (scanningState === "success") {
            const timer = setTimeout(() => {
                onSuccess();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [scanningState, onSuccess]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                {/* Only show user credentials after successful authentication */}
                {scanningState === "success" && (
                    <div className="mb-6 text-white animate-fadeIn">
                        <h2 className="text-xl font-semibold text-center">Paul D</h2>
                        <p className="text-white/60 text-sm text-center">pauld@gmail.com</p>
                    </div>
                )}

                {/* iPhone Face ID animation */}
                <div className="w-36 h-36 mb-6 relative flex items-center justify-center">
                    {scanningState === "initial" && (
                        <div className="absolute">
                            <svg viewBox="0 0 100 100" width="100%" height="100%" className="text-white">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M50,20 v60" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M20,50 h60" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    )}

                    {scanningState === "scanning" && (
                        <div className="absolute animate-pulse">
                            {/* Face ID dots pattern */}
                            <svg viewBox="0 0 100 100" width="100%" height="100%" className="text-white">
                                <pattern id="dotPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                                    <circle cx="4" cy="4" r="1" fill="currentColor" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#dotPattern)" />

                                {/* Face outline */}
                                <rect
                                    x="25"
                                    y="20"
                                    width="50"
                                    height="60"
                                    rx="25"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="2,2"
                                />

                                {/* Scanning animation */}
                                <rect className="animate-faceid-scan" x="25" y="20" width="50" height="0" fill="rgba(255,255,255,0.15)" />
                            </svg>
                        </div>
                    )}

                    {scanningState === "success" && (
                        <div className="animate-fadeIn">
                            <svg viewBox="0 0 100 100" width="100%" height="100%" className="text-white">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path
                                    d="M30,50 L45,65 L70,35"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Status text */}
                <div className="text-white text-center mb-10">
                    {scanningState === "initial" && <p className="text-lg font-light">Face ID</p>}
                    {scanningState === "scanning" && <p className="text-lg font-light">Regardez directement votre téléphone</p>}
                    {scanningState === "success" && <p className="text-lg font-light">Authentifié</p>}
                </div>

                {/* Cancel button - styled like iPhone */}
                <button
                    onClick={onCancel}
                    className="bg-white/10 backdrop-blur-md text-white font-medium rounded-full py-3 px-10 border border-white/30">
                    Annuler
                </button>
            </div>
        </div>
    );
}
