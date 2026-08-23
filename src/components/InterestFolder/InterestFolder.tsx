import { useState } from "react";
import type { CSSProperties } from "react";
import { interests } from "../../data/interests";
import "./InterestFolder.css";

// fixed scatter of sparkle positions so they don't jump around on re-render
const sparkles = [
    { top: "6%", left: "48%", size: 4, delay: "0s" },
    { top: "14%", left: "14%", size: 3, delay: "0.3s" },
    { top: "10%", left: "82%", size: 5, delay: "0.6s" },
    { top: "38%", left: "-4%", size: 3, delay: "0.9s" },
    { top: "34%", left: "96%", size: 4, delay: "1.2s" },
    { top: "62%", left: "6%", size: 5, delay: "1.5s" },
    { top: "58%", left: "90%", size: 3, delay: "0.15s" },
    { top: "86%", left: "30%", size: 4, delay: "0.75s" },
    { top: "90%", left: "68%", size: 3, delay: "1.05s" },
    { top: "78%", left: "50%", size: 5, delay: "1.8s" },
];

export default function InterestFolder() {
    const [open, setOpen] = useState(false);

    return (
        <div className="interest-wrap">
            {open && <div className="interest-backdrop" onClick={() => setOpen(false)} />}

            <button
                type="button"
                className={`interest-file ${open ? "is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Toggle my interests"
            >
                <span className="interest-file-glow" aria-hidden="true" />

                <span className="interest-sparkles" aria-hidden="true">
                    {sparkles.map((s, i) => (
                        <span
                            key={i}
                            className="spark"
                            style={{
                                top: s.top,
                                left: s.left,
                                width: s.size,
                                height: s.size,
                                animationDelay: s.delay,
                            }}
                        />
                    ))}
                </span>

                <span className="interest-file-shape" aria-hidden="true" />
                <span className="interest-file-label">Interest</span>
            </button>

            <div className={`interest-ring ${open ? "is-open" : ""}`}>
                {interests.map((item, i) => {
                    const angle = (360 / interests.length) * i;
                    return (
                        <span
                            key={item}
                            className="interest-bubble"
                            style={
                                {
                                    "--angle": `${angle}deg`,
                                    transitionDelay: open ? `${i * 0.05}s` : "0s",
                                } as CSSProperties
                            }
                        >
                            {item}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}