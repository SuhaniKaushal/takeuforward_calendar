"use client";

import type { DateRange } from "@/hooks/useCalendar";
import { formatDateRange, daysBetween } from "@/lib/utils";

type SelectionBarProps = {
    selectedRange: DateRange;
    onClear: () => void;
};

export function SelectionBar({ selectedRange, onClear }: SelectionBarProps) {
    const rangeLabel = formatDateRange(selectedRange.start, selectedRange.end);
    const rangeLength = selectedRange.start && selectedRange.end
        ? daysBetween(selectedRange.start, selectedRange.end)
        : 0;

    if (!selectedRange.start) return null;

    return (
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-4 sm:mb-6 animate-float-up">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/15">
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Calendar icon */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                            {rangeLabel}
                        </div>
                        {selectedRange.end && rangeLength > 0 && (
                            <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-medium">
                                {rangeLength} {rangeLength === 1 ? "day" : "days"} selected
                            </div>
                        )}
                        {!selectedRange.end && (
                            <div className="text-[9px] sm:text-[10px] text-[var(--accent)] font-medium italic">
                                Click another date to complete range
                            </div>
                        )}
                    </div>
                </div>

                <button
                    id="clear-selection-btn"
                    onClick={onClear}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-95"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
