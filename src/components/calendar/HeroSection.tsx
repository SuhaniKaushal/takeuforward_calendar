"use client";

import Image from "next/image";
import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/constants";

type HeroSectionProps = {
    currentMonth: Date;
    direction: "left" | "right" | null;
    onPrevMonth: () => void;
    onNextMonth: () => void;
};

export function HeroSection({ currentMonth, direction, onPrevMonth, onNextMonth }: HeroSectionProps) {
    const monthIndex = currentMonth.getMonth();
    const monthName = MONTH_NAMES[monthIndex];
    const year = currentMonth.getFullYear();
    const imageSrc = MONTH_IMAGES[monthIndex];
    const isLocal = imageSrc.startsWith("/");

    return (
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-[280px] w-full shrink-0 overflow-hidden">
            {/* Hero image with flip animation */}
            <div
                key={`${monthIndex}-${year}`}
                className={`absolute inset-0 ${direction === "left" ? "animate-slide-left" : direction === "right" ? "animate-slide-right" : "animate-fade-in"
                    }`}
            >
                {isLocal ? (
                    <Image
                        src={imageSrc}
                        alt={`${monthName} calendar hero`}
                        fill
                        sizes="(max-width: 768px) 100vw, 65vw"
                        className="object-cover"
                        preload
                    />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={`${monthName} calendar hero`}
                        fill
                        sizes="(max-width: 768px) 100vw, 65vw"
                        className="object-cover"
                        unoptimized
                    />
                )}
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 z-[1]" />

            {/* Navigation & Month Label */}
            <div className="absolute inset-0 z-[2] flex flex-col justify-end p-4 sm:p-6 md:p-8 pb-5 sm:pb-6 md:pb-8">
                <div className="flex items-end justify-between">
                    <button
                        id="prev-month-btn"
                        onClick={onPrevMonth}
                        aria-label="Previous month"
                        className="p-2 sm:p-2.5 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all duration-300 transform hover:scale-110 active:scale-90 border border-white/20 shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="text-center flex flex-col items-center">
                        <h2
                            key={`month-${monthIndex}-${year}`}
                            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[0.1em] sm:tracking-[0.15em] leading-none drop-shadow-lg font-display ${direction ? "animate-scale-in" : ""
                                }`}
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {monthName}
                        </h2>
                        <div className="text-white/80 font-medium tracking-[0.3em] sm:tracking-[0.4em] mt-1 sm:mt-2 text-base sm:text-lg md:text-xl drop-shadow-sm ml-1">
                            {String(year).split("").join(" ")}
                        </div>
                    </div>

                    <button
                        id="next-month-btn"
                        onClick={onNextMonth}
                        aria-label="Next month"
                        className="p-2 sm:p-2.5 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all duration-300 transform hover:scale-110 active:scale-90 border border-white/20 shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
