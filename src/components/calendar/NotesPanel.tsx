"use client";

import { useState, useRef, useEffect } from "react";
import type { DateRange } from "@/hooks/useCalendar";
import { formatDateRange, daysBetween } from "@/lib/utils";
import { MONTH_NAMES, getHolidaysForMonth } from "@/lib/constants";

type NotesPanelProps = {
    currentMonth: Date;
    selectedRange: DateRange;
    monthNotes: string;
    dateNotes: { id: string; text: string; createdAt: string; rangeLabel?: string }[];
    isLoaded: boolean;
    onMonthNotesChange: (value: string) => void;
    onAddDateNote: (text: string, rangeLabel: string) => void;
    onDeleteDateNote: (id: string) => void;
};

export function NotesPanel({
    currentMonth,
    selectedRange,
    monthNotes,
    dateNotes,
    isLoaded,
    onMonthNotesChange,
    onAddDateNote,
    onDeleteDateNote,
}: NotesPanelProps) {
    const [newNote, setNewNote] = useState("");
    const [activeTab, setActiveTab] = useState<"monthly" | "dates">("monthly");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const monthName = MONTH_NAMES[currentMonth.getMonth()];
    const rangeLabel = formatDateRange(selectedRange.start, selectedRange.end);
    const holidays = getHolidaysForMonth(currentMonth.getMonth());
    const rangeLength = selectedRange.start && selectedRange.end
        ? daysBetween(selectedRange.start, selectedRange.end)
        : 0;

    // Focus textarea when switching to monthly tab
    useEffect(() => {
        if (activeTab === "monthly" && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [activeTab]);

    const handleSubmitNote = () => {
        if (!newNote.trim() || !rangeLabel) return;
        onAddDateNote(newNote, rangeLabel);
        setNewNote("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmitNote();
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full px-5 sm:px-6 md:px-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        <path d="M8 7h6" />
                        <path d="M8 11h8" />
                    </svg>
                </div>
                <h3 className="text-[10px] sm:text-xs font-bold text-[var(--text-secondary)] tracking-[0.12em] uppercase">
                    Monthly Agenda & Marginalia
                </h3>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-1 p-1 rounded-lg bg-gray-100 mb-4 sm:mb-5">
                <button
                    id="tab-monthly"
                    onClick={() => setActiveTab("monthly")}
                    className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md transition-all duration-200 tracking-wide ${activeTab === "monthly"
                            ? "bg-white text-[var(--text-primary)] shadow-sm"
                            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                >
                    MONTHLY
                </button>
                <button
                    id="tab-dates"
                    onClick={() => setActiveTab("dates")}
                    className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md transition-all duration-200 tracking-wide relative ${activeTab === "dates"
                            ? "bg-white text-[var(--text-primary)] shadow-sm"
                            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                >
                    DATE NOTES
                    {dateNotes.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                            {dateNotes.length > 9 ? "9+" : dateNotes.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Monthly Notes Tab */}
            {activeTab === "monthly" && (
                <div className="flex-1 flex flex-col animate-fade-in min-h-0">
                    {/* Lined paper textarea */}
                    <div className="flex-1 relative lined-paper min-h-[200px] md:min-h-0">
                        {isLoaded && (
                            <textarea
                                ref={textareaRef}
                                id="monthly-notes-textarea"
                                value={monthNotes}
                                onChange={(e) => onMonthNotesChange(e.target.value)}
                                placeholder={`Plan your ${monthName.toLowerCase()} goals...`}
                                className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none p-0 text-[var(--text-primary)] font-medium text-sm leading-[32px] overflow-y-auto placeholder:text-[var(--text-muted)] placeholder:italic"
                                spellCheck="false"
                            />
                        )}
                    </div>

                    {/* Holidays list */}
                    {holidays.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
                            <div className="text-[9px] sm:text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase mb-2">
                                Holidays & Markers
                            </div>
                            <div className="space-y-1.5 max-h-24 overflow-y-auto">
                                {holidays.map((h) => (
                                    <div key={`${h.month}-${h.day}`} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                        <span className="font-semibold text-[var(--text-primary)] w-5">{h.day}</span>
                                        <span className="truncate">{h.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Date Notes Tab */}
            {activeTab === "dates" && (
                <div className="flex-1 flex flex-col animate-fade-in min-h-0">
                    {/* Selected range indicator */}
                    {rangeLabel ? (
                        <div className="mb-3 p-2.5 sm:p-3 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/15">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[9px] sm:text-[10px] font-bold text-[var(--accent)] tracking-wider uppercase">
                                        Selected Range
                                    </div>
                                    <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                                        {rangeLabel}
                                        {rangeLength > 1 && (
                                            <span className="ml-2 text-[10px] font-medium text-[var(--text-muted)]">
                                                ({rangeLength} days)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Add note input */}
                            <div className="flex gap-2 mt-2.5">
                                <input
                                    ref={inputRef}
                                    id="date-note-input"
                                    type="text"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add a note for this range..."
                                    className="flex-1 text-xs sm:text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all placeholder:text-[var(--text-muted)]"
                                />
                                <button
                                    id="add-note-btn"
                                    onClick={handleSubmitNote}
                                    disabled={!newNote.trim()}
                                    className="px-3 sm:px-4 py-2 bg-[var(--accent)] text-white text-xs font-bold rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14" />
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-3 p-3 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-center">
                            <p className="text-xs text-[var(--text-muted)] italic">
                                Select a date range on the calendar to add notes
                            </p>
                        </div>
                    )}

                    {/* Notes list */}
                    <div className="flex-1 overflow-y-auto space-y-2 min-h-[120px] md:min-h-0">
                        {dateNotes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8 opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)] mb-3">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" x2="8" y1="13" y2="13" />
                                    <line x1="16" x2="8" y1="17" y2="17" />
                                    <line x1="10" x2="8" y1="9" y2="9" />
                                </svg>
                                <p className="text-xs text-[var(--text-muted)]">No date notes yet</p>
                            </div>
                        ) : (
                            dateNotes.map((note, i) => (
                                <div
                                    key={note.id}
                                    className="group p-2.5 sm:p-3 rounded-lg bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 animate-float-up"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            {note.rangeLabel && (
                                                <div className="text-[9px] sm:text-[10px] font-bold text-[var(--accent)] tracking-wide mb-1 uppercase">
                                                    {note.rangeLabel}
                                                </div>
                                            )}
                                            <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed break-words">
                                                {note.text}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => onDeleteDateNote(note.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 transition-all duration-200 shrink-0"
                                            aria-label="Delete note"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Footer branding */}
            <div className="mt-4 sm:mt-6 mb-2 sm:mb-3 flex items-center gap-2 opacity-30">
                <div className="w-4 h-4 rounded border border-current flex items-center justify-center text-[6px] font-black">
                    C
                </div>
                <span className="font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">Chronos</span>
            </div>
        </div>
    );
}
