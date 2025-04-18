import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const britanica = localFont({
    src: "./fonts/Britanica.ttf",
    variable: "--font-britanica",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Re_store",
    description: "Réparez, recyclez, réusez, réduisez votre impact sur la planète !",
    icons: {
        icon: [{ url: "/favicon.ico" }],
        apple: [{ url: "/favicon.ico" }],
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr-FR">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${britanica.variable} font-britanica antialiased pb-16`}
                cz-shortcut-listen="true">
                {children}
                <Toaster richColors position="top-center" />
            </body>
        </html>
    );
}
