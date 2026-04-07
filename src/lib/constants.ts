// Month hero images (using Unsplash for variety, with fallback to local)
export const MONTH_IMAGES: Record<number, string> = {
    0: "/hero-january.png", // January - Mountain climbing
    1: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&auto=format&fit=crop&q=80", // February - Snow
    2: "/hero-march.png", // March - Spring
    3: "/hero-april.png", // April - Cherry blossoms
    4: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop&q=80", // May - Green landscape
    5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", // June - Beach
    6: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&auto=format&fit=crop&q=80", // July - Sunset
    7: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80", // August - Mountains
    8: "/hero-september.png", // September - Autumn
    9: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&auto=format&fit=crop&q=80", // October - Fall leaves
    10: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&auto=format&fit=crop&q=80", // November - Foggy
    11: "/hero-december.png", // December - Winter
};

export const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

export const MONTH_NAMES = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
] as const;

// Public holidays (month 0-indexed, day 1-indexed)
export type Holiday = {
    month: number;
    day: number;
    name: string;
};

export const HOLIDAYS: Holiday[] = [
    { month: 0, day: 1, name: "New Year's Day" },
    { month: 0, day: 15, name: "Martin Luther King Jr. Day" },
    { month: 0, day: 26, name: "Republic Day (India)" },
    { month: 1, day: 14, name: "Valentine's Day" },
    { month: 2, day: 8, name: "International Women's Day" },
    { month: 2, day: 17, name: "St. Patrick's Day" },
    { month: 3, day: 14, name: "Ambedkar Jayanti" },
    { month: 4, day: 1, name: "May Day" },
    { month: 5, day: 21, name: "International Yoga Day" },
    { month: 6, day: 4, name: "Independence Day (US)" },
    { month: 7, day: 15, name: "Independence Day (India)" },
    { month: 8, day: 5, name: "Teachers' Day (India)" },
    { month: 9, day: 2, name: "Gandhi Jayanti" },
    { month: 9, day: 31, name: "Halloween" },
    { month: 10, day: 14, name: "Children's Day (India)" },
    { month: 11, day: 25, name: "Christmas" },
    { month: 11, day: 31, name: "New Year's Eve" },
];

export function getHolidaysForMonth(month: number): Holiday[] {
    return HOLIDAYS.filter(h => h.month === month);
}

export function getHolidayForDate(month: number, day: number): Holiday | undefined {
    return HOLIDAYS.find(h => h.month === month && h.day === day);
}
