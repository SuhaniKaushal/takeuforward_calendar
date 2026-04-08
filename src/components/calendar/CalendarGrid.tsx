"use client";

import { CalendarDay } from "@/hooks/useCalendar";
import { DayCell } from "./DayCell";
import { WEEKDAYS } from "@/lib/constants";

type CalendarGridProps = {
    days: CalendarDay[];
    direction: "left" | "right" | null;
    handleDateClick: (date: Date) => void;
    handleDateHover: (date: Date | null) => void;
    isStart: (date: Date) => boolean;
    isEnd: (date: Date) => boolean;
    isInRange: (date: Date) => boolean;
    isPreviewing: (date: Date) => boolean;
};

export function CalendarGrid({
    days,
    direction,
    handleDateClick,
    handleDateHover,
    isStart,
    isEnd,
    isInRange,
    isPreviewing,
}: CalendarGridProps) {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-6 sm:pb-8 pt-4 sm:pt-6">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-4 sm:mb-5">
                {WEEKDAYS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-[10px] sm:text-[11px] font-black text-[var(--text-muted)] tracking-[0.15em] uppercase"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days grid */}
            <div
                key={days[10]?.date.getMonth()} // Re-mount on month change for animation
                className={`grid grid-cols-7 gap-y-1.5 sm:gap-y-2 ${direction === "left" ? "animate-slide-left" : direction === "right" ? "animate-slide-right" : "animate-fade-in"
                    }`}
                onMouseLeave={() => handleDateHover(null)}
            >
                {days.map((day, index) => (
                    <DayCell
                        key={`${day.date.toISOString()}-${index}`}
                        day={day}
                        onClick={handleDateClick}
                        onHover={(date) => handleDateHover(date)}
                        isStart={isStart(day.date)}
                        isEnd={isEnd(day.date)}
                        isInRange={isInRange(day.date)}
                        isPreviewing={isPreviewing(day.date)}
                    />
                ))}
            </div>
        </div>
    );
}
