import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import "./HeroTimer.css";

function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Live local-time "little timer" for the bottom-right of the hero page.
// Edit here if you'd like a countdown instead of a live clock.
export default function HeroTimer() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hero-timer" aria-label="Current time">
            <FiClock className="hero-timer-icon" />
            <span className="hero-timer-text">{formatTime(now)}</span>
        </div>
    );
}