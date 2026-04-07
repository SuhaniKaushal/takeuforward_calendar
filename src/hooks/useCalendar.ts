"use client";

import { useState, useMemo, useCallback } from "react";
import { startOfDay } from "@/lib/utils";

export type CalendarDay = {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
};

export type DateRange = {
    start: Date | null;
    end: Date | null;
};

export function useCalendar(initialMonth?: Date) {
    const [currentMonth, setCurrentMonth] = useState(() => startOfDay(initialMonth || new Date()));
    const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [direction, setDirection] = useState<"left" | "right" | null>(null);

    // Generate the 6x7 days grid
    const days = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfWeek);

        const generatedDays: CalendarDay[] = [];
        const today = startOfDay(new Date());

        // Always 42 days (6 weeks * 7 days)
        for (let i = 0; i < 42; i++) {
            const currentIterDate = new Date(startDate);
            currentIterDate.setDate(startDate.getDate() + i);
            const iterStartDate = startOfDay(currentIterDate);

            generatedDays.push({
                date: iterStartDate,
                isCurrentMonth: iterStartDate.getMonth() === month,
                isToday: iterStartDate.getTime() === today.getTime()
            });
        }

        return generatedDays;
    }, [currentMonth]);

    const goToNextMonth = useCallback(() => {
        setDirection("right");
        setCurrentMonth(prev => {
            const nextMonth = new Date(prev);
            nextMonth.setMonth(prev.getMonth() + 1);
            return nextMonth;
        });
    }, []);

    const goToPrevMonth = useCallback(() => {
        setDirection("left");
        setCurrentMonth(prev => {
            const prevMonth = new Date(prev);
            prevMonth.setMonth(prev.getMonth() - 1);
            return prevMonth;
        });
    }, []);

    const handleDateClick = useCallback((date: Date) => {
        const clickedDate = startOfDay(date);

        setSelectedRange(prev => {
            // Third click or reset logic: if both exist, start new selection
            if (prev.start && prev.end) {
                return { start: clickedDate, end: null };
            }

            // First click
            if (!prev.start) {
                return { start: clickedDate, end: null };
            }

            // Second click - if same date, select single day
            if (clickedDate.getTime() === prev.start.getTime()) {
                return { start: clickedDate, end: clickedDate };
            }

            // If selected date is before start date, swap
            if (clickedDate.getTime() < prev.start.getTime()) {
                return { start: clickedDate, end: prev.start };
            }

            return { start: prev.start, end: clickedDate };
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedRange({ start: null, end: null });
        setHoverDate(null);
    }, []);

    const handleDateHover = useCallback((date: Date | null) => {
        if (date) {
            setHoverDate(startOfDay(date));
        } else {
            setHoverDate(null);
        }
    }, []);

    // Derived helpers
    const isStart = useCallback((date: Date) => {
        return selectedRange.start?.getTime() === startOfDay(date).getTime();
    }, [selectedRange.start]);

    const isEnd = useCallback((date: Date) => {
        return selectedRange.end?.getTime() === startOfDay(date).getTime();
    }, [selectedRange.end]);

    const isInRange = useCallback((date: Date) => {
        if (!selectedRange.start || !selectedRange.end) return false;
        const time = startOfDay(date).getTime();
        return time >= selectedRange.start.getTime() && time <= selectedRange.end.getTime();
    }, [selectedRange.start, selectedRange.end]);

    const isPreviewing = useCallback((date: Date) => {
        if (!selectedRange.start || selectedRange.end || !hoverDate) return false;
        const time = startOfDay(date).getTime();
        const startTime = selectedRange.start.getTime();
        const hoverTime = hoverDate.getTime();

        if (hoverTime < startTime) {
            return time >= hoverTime && time <= startTime;
        }
        return time >= startTime && time <= hoverTime;
    }, [selectedRange.start, selectedRange.end, hoverDate]);

    return {
        currentMonth,
        days,
        selectedRange,
        hoverDate,
        direction,
        goToNextMonth,
        goToPrevMonth,
        handleDateClick,
        handleDateHover,
        clearSelection,
        isStart,
        isEnd,
        isInRange,
        isPreviewing
    };
}
