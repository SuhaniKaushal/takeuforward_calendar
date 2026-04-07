import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Normalize date to strictly start of day (midnight)
export function startOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

// Format date for storage key
export function formatDateKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Format date range for display
export function formatDateRange(start: Date | null, end: Date | null): string {
    if (!start) return '';
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const startStr = start.toLocaleDateString('en-US', opts);
    if (!end || start.getTime() === end.getTime()) return startStr;
    const endStr = end.toLocaleDateString('en-US', opts);
    return `${startStr} – ${endStr}`;
}

// Get number of days between two dates
export function daysBetween(start: Date, end: Date): number {
    const diffMs = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1;
}
