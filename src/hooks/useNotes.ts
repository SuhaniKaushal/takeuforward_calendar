"use client";

import { useState, useEffect, useCallback } from "react";
import type { DateRange } from "./useCalendar";

type NoteEntry = {
    id: string;
    text: string;
    createdAt: string;
    rangeLabel?: string; // e.g. "Jan 10 – Jan 14"
};

export function useNotes(currentMonth: Date, selectedRange: DateRange) {
    const [monthNotes, setMonthNotes] = useState("");
    const [dateNotes, setDateNotes] = useState<NoteEntry[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const monthKey = `cal-notes-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
    const dateNotesKey = `cal-date-notes-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;

    // Load notes from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedMonthNotes = localStorage.getItem(monthKey);
        setMonthNotes(savedMonthNotes || "");

        const savedDateNotes = localStorage.getItem(dateNotesKey);
        if (savedDateNotes) {
            try {
                setDateNotes(JSON.parse(savedDateNotes));
            } catch {
                setDateNotes([]);
            }
        } else {
            setDateNotes([]);
        }
        setIsLoaded(true);
    }, [monthKey, dateNotesKey]);

    const handleMonthNotesChange = useCallback((value: string) => {
        setMonthNotes(value);
        if (typeof window !== "undefined") {
            localStorage.setItem(monthKey, value);
        }
    }, [monthKey]);

    const addDateNote = useCallback((text: string, rangeLabel: string) => {
        if (!text.trim()) return;

        const newNote: NoteEntry = {
            id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            text: text.trim(),
            createdAt: new Date().toISOString(),
            rangeLabel,
        };

        setDateNotes(prev => {
            const updated = [newNote, ...prev];
            if (typeof window !== "undefined") {
                localStorage.setItem(dateNotesKey, JSON.stringify(updated));
            }
            return updated;
        });
    }, [dateNotesKey]);

    const deleteDateNote = useCallback((id: string) => {
        setDateNotes(prev => {
            const updated = prev.filter(n => n.id !== id);
            if (typeof window !== "undefined") {
                localStorage.setItem(dateNotesKey, JSON.stringify(updated));
            }
            return updated;
        });
    }, [dateNotesKey]);

    return {
        monthNotes,
        dateNotes,
        isLoaded,
        handleMonthNotesChange,
        addDateNote,
        deleteDateNote,
    };
}
