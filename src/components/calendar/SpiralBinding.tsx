"use client";

export function SpiralBinding() {
    const coilCount = 14;

    return (
        <div className="absolute -top-1 left-0 w-full h-6 sm:h-8 flex justify-evenly items-center z-50 pointer-events-none px-6 sm:px-8 md:px-10">
            {Array.from({ length: coilCount }).map((_, i) => (
                <div key={i} className="relative w-2 h-8 sm:h-10 -mt-3 sm:-mt-4">
                    {/* The hole punched through the paper */}
                    <div className="absolute top-4 sm:top-5 w-2 h-2 spiral-hole rounded-full left-1/2 -translate-x-1/2" />
                    {/* The wire coil */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 sm:h-7 rounded-sm spiral-coil border border-gray-300/50 transform -rotate-[18deg] z-10" />
                </div>
            ))}
        </div>
    );
}
