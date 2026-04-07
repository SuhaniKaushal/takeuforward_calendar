import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Chronos — Interactive Wall Calendar",
    description: "A beautifully crafted interactive wall calendar with date range selection, integrated notes, and responsive design. Built with Next.js and React.",
    keywords: ["calendar", "wall calendar", "interactive", "date picker", "range selector", "notes"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${outfit.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
        </html>
    );
}

