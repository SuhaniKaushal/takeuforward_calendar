# Interactive Wall Calendar Component

## Overview
This project is a Frontend Engineering Challenge implementation of an interactive wall calendar. It meticulously translates a static UX/UI design concept into a highly functional, responsive web component. Utilizing a clean frontend architecture, the app achieves an authentic "wall calendar" aesthetic while providing robust interactivity including multi-day range selection and a persistent note-taking system.

## Live Demo
https://takeuforward-calendar-theta.vercel.app/

## Features
- **Wall Calendar Aesthetic:** Dynamic layout featuring a large hero image section, standard monthly grid, and spiral-binding UI elements.
- **Day Range Selector:** Intuitively select date ranges with visual feedback for start, end, and in-between dates.
- **Dynamic Preview:** Real-time visual highlight preview trailing the user's cursor before confirming an end date.
- **Integrated Note Taking:** Split-panel tabbed interface for recording both general Monthly Agendas and strictly localized Date Notes based on ranges.
- **Holiday Integration:** Automatic detection and visual tagging of standard holidays on the calendar view with tooltip details.
- **Responsive Layout:** Automatically shifts from a side-by-side desktop view to a vertically stacked layout on mobile without sacrificing functionality.

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router)
- **Library:** React 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Utilities:** `clsx`, `tailwind-merge`

## Architecture & Code Structure
The application cleanly separates visual presentation from business logic using the Custom Hook pattern.

### Component Structure
All core UI pieces live in `src/components/calendar/`:
- **`CalendarContainer.tsx`:** The root layout shell handling the responsive grid (`flex-col lg:flex-row`) and rendering child components.
- **`HeroSection.tsx`:** Manages the dynamic monthly imagery and next/prev navigational controls.
- **`CalendarGrid.tsx`:** Renders the 42-day grid layout map.
- **`DayCell.tsx`:** Pure UI component representing a single day, handling localized visual styling (selected, hovering, today indicator).
- **`NotesPanel.tsx`:** Provides an interactive interface for reading and writing synced monthly/range-specific memos.
- **`SelectionBar.tsx`:** Floating UI control to clear current date selections.
- **`SpiralBinding.tsx`:** Purely aesthetic component achieving the physical calendar look.

### Custom Hooks (Logic Layer)
- **`useCalendar.ts`:** Centralizes all calendar logic. Returns memoized grid generation, specific handler actions, and derived booleans (`isStart`, `isInRange`).
- **`useNotes.ts`:** Manages local persistence for user inputs, tying data keys directly to the current viewed month.

## Key Implementation Details
- **Grid Generation Logic:** Evaluates the `startOfDay` for the first day of the selected month, steps back to the most recent Sunday, and generates exactly 42 standard days (`6x7` grid) using a simple `Date` iterator loop wrapped in `useMemo`.
- **Date Range Selection Logic:** A finite-state logic engine operating on `prev` states. It handles 1st click (start), 2nd click (end), and intelligently swaps timestamps if the second click is chronologically earlier than the first click. A 3rd click automatically resets selection.
- **State Management Approach:** Strictly controlled via local React state (`useState`, `useCallback`) injected down to presentation components, avoiding arbitrary global state libraries.
- **Notes Persistence Strategy:** All agenda inputs immediately sync to `localStorage` relying on stringified JSON. Keys are specifically formatted by month (`cal-notes-YYYY-M`) isolating data views safely.
- **Helper Utilities:** `startOfDay` ensures safe strict-midnight comparisons to prevent time-zone overlap bugs.

## UX Decisions
- **Range Selection Behavior:** A live hover-state algorithm evaluates the user's mouse position and dynamically calculates the tentative selection path using `isPreviewing`.
- **Visual States:** Employs explicit styling keys via `clsx/twMerge` for `range-start`, `range-end`, and generic `bg-[var(--accent-light)]` to group ranges seamlessly visually.
- **Responsiveness Behavior:** Desktop mode (`lg`) allocates a static `38%` width for a persistent edge `NotesPanel`. Mobile sizes collapse the UI into an endlessly scrolling column for touch usability while maintaining context.
- **Interaction Feedback:** Utilizes micro-interactions (`active:scale-95`, `hover:scale-105`) and staggered CSS slide-in animations when notes dynamically load to enforce crisp spatial feedback.

## Edge Cases Handled
- **Hydration Mismatches:** Safe rendering (`isLoaded` flag) delays the mount of the `NotesPanel` textarea data payload to prevent Next.js SSR vs `localStorage` mismatch exceptions.
- **Chronological Swapping:** Automatic detection and correction logic when an aggressive user selects an "end" date strictly prior to a registered "start" date.
- **Same-Day Ranges:** Allows the user to click the exact same date twice to lock in a single-day range explicitly without breaking visual feedback constraints.

## Performance Considerations
- **Memoization:** Derived matrix views (`days` array layout) are evaluated using `useMemo` strictly tied to the `currentMonth` dependency, deliberately avoiding array re-allocations on individual keystrokes recorded in the Notes textarea.
- All dynamic handlers evaluating highly recurrent mouse-over functionality (`handleDateHover`, `handleDateClick`) are strictly cached via `useCallback` to prevent aggressive React re-renders deep in the tree.

## Setup Instructions
Ensure you have Node 20+ installed.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── calendar/
│       ├── CalendarContainer.tsx
│       ├── CalendarGrid.tsx
│       ├── DayCell.tsx
│       ├── HeroSection.tsx
│       ├── NotesPanel.tsx
│       ├── SelectionBar.tsx
│       └── SpiralBinding.tsx
├── hooks/
│   ├── useCalendar.ts
│   └── useNotes.ts
└── lib/
    ├── constants.ts
    └── utils.ts
```

## Future Improvements
- **Keyboard Navigation:** Implementation of ADA-compliant ARIA arrow key date traversal across the 6x7 grid.
- **Drag-to-Select Functionality:** Enabling fluid mobile touch-and-drag mechanics to select vast date ranges continuously without strict discrete multi-clicks.
- **Multi-Month View:** Exposing standard two-month panel layouts for expansive panoramic desktop layouts traversing complex quarter deadlines.
