"use client";

import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import { HeroSection } from "./HeroSection";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { SpiralBinding } from "./SpiralBinding";
import { SelectionBar } from "./SelectionBar";

export default function CalendarContainer() {
    const {
        currentMonth,
        days,
        selectedRange,
        direction,
        goToNextMonth,
        goToPrevMonth,
        handleDateClick,
        handleDateHover,
        clearSelection,
        isStart,
        isEnd,
        isInRange,
        isPreviewing,
    } = useCalendar();

    const {
        monthNotes,
        dateNotes,
        isLoaded,
        handleMonthNotesChange,
        addDateNote,
        deleteDateNote,
    } = useNotes(currentMonth, selectedRange);

    return (
        <div
            id="calendar-container"
            className="w-full max-w-[1100px] mx-auto rounded-xl shadow-[var(--shadow-card)] bg-white relative flex flex-col lg:flex-row mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden"
        >
            {/* Spiral Binding at the top */}
            <SpiralBinding />

            {/* Left Side: Notes Panel (Desktop only) */}
            <div className="w-full lg:w-[38%] pt-10 sm:pt-12 pb-4 bg-[var(--notes-bg)] hidden lg:flex border-r border-gray-100 z-0">
                <NotesPanel
                    currentMonth={currentMonth}
                    selectedRange={selectedRange}
                    monthNotes={monthNotes}
                    dateNotes={dateNotes}
                    isLoaded={isLoaded}
                    onMonthNotesChange={handleMonthNotesChange}
                    onAddDateNote={addDateNote}
                    onDeleteDateNote={deleteDateNote}
                />
            </div>

            {/* Right Side: Calendar & Hero */}
            <div className="w-full lg:w-[62%] flex flex-col pt-7 sm:pt-8 lg:pt-0 bg-white z-10">
                <HeroSection
                    currentMonth={currentMonth}
                    direction={direction}
                    onPrevMonth={goToPrevMonth}
                    onNextMonth={goToNextMonth}
                />
                <CalendarGrid
                    days={days}
                    direction={direction}
                    handleDateClick={handleDateClick}
                    handleDateHover={handleDateHover}
                    isStart={isStart}
                    isEnd={isEnd}
                    isInRange={isInRange}
                    isPreviewing={isPreviewing}
                />
                <SelectionBar
                    selectedRange={selectedRange}
                    onClear={clearSelection}
                />
            </div>

            {/* Mobile only Notes Panel stacked at bottom */}
            <div className="w-full bg-[var(--notes-bg)] flex lg:hidden pb-6 pt-4 border-t border-gray-200">
                <NotesPanel
                    currentMonth={currentMonth}
                    selectedRange={selectedRange}
                    monthNotes={monthNotes}
                    dateNotes={dateNotes}
                    isLoaded={isLoaded}
                    onMonthNotesChange={handleMonthNotesChange}
                    onAddDateNote={addDateNote}
                    onDeleteDateNote={deleteDateNote}
                />
            </div>
        </div>
    );
}
