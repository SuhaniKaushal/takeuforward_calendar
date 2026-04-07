import CalendarContainer from "@/components/calendar/CalendarContainer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--background)] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
            <CalendarContainer />
        </main>
    );
}
