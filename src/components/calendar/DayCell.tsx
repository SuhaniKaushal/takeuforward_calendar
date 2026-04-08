"use client";

import { CalendarDay } from "@/hooks/useCalendar";
import { cn } from "@/lib/utils";
import { getHolidayForDate } from "@/lib/constants";
import { useState } from "react";

type DayCellProps = {
    day: CalendarDay;
    isStart: boolean;
    isEnd: boolean;
    isInRange: boolean;
    isPreviewing: boolean;
    onClick: (date: Date) => void;
    onHover: (date: Date) => void;
};

export function DayCell({
    day,
    isStart,
    isEnd,
    isInRange,
    isPreviewing,
    onClick,
    onHover,
}: DayCellProps) {
    const [isPressed, setIsPressed] = useState(false);
    const isSelected = isStart || isEnd;
    const showRangeBackground = isInRange || isPreviewing;
    const isSingleSelectedDay = isStart && isEnd;

    const holiday = day.isCurrentMonth
        ? getHolidayForDate(day.date.getMonth(), day.date.getDate())
        : undefined;

    return (
        <div
            className={cn(
                "relative flex items-center justify-center h-11 sm:h-12 w-full transition-colors duration-150",
                !day.isCurrentMonth && "opacity-20 pointer-events-none",
                showRangeBackground && !isSingleSelectedDay && "bg-[var(--accent-light)]",
                showRangeBackground && isStart && !isSingleSelectedDay && "range-start",
                showRangeBackground && isEnd && !isSingleSelectedDay && "range-end",
                isSingleSelectedDay && showRangeBackground && "range-both"
            )}
            onMouseEnter={() => onHover(day.date)}
        >
            <button
                id={`day-${day.date.getDate()}-${day.date.getMonth()}`}
                aria-label={`${day.date.toDateString()}${holiday ? ` (${holiday.name})` : ""}`}
                onClick={() => onClick(day.date)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold",
                    "transition-all duration-200 relative z-10 cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                    "select-none",
                    isSelected
                        ? "bg-[var(--accent)] text-white shadow-[var(--shadow-button)] scale-110 font-bold"
                        : "text-[var(--text-primary)] hover:bg-gray-100 hover:scale-105 active:scale-95",
                    isPressed && !isSelected && "scale-90 bg-gray-200",
                    day.isToday && !isSelected && "font-black text-[var(--accent)]"
                )}
            >
                {day.date.getDate()}

                {/* Today indicator dot */}
                {day.isToday && !isSelected && (
                    <span className="absolute -bottom-0.5 w-1 h-1 bg-[var(--today-dot)] rounded-full" />
                )}
                {day.isToday && isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
                )}

                {/* Holiday indicator */}
                {holiday && !isSelected && <span className="holiday-dot" />}
                {holiday && isSelected && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full" />
                )}
            </button>

            {/* Holiday tooltip on hover */}
            {holiday && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-lg transition-opacity">
                    {holiday.name}
                </div>
            )}
        </div>
    );
}
