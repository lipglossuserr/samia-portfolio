import PixelBlast from "../components/PixelBlast/PixelBlast";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { heroText } from "../data/hero";
import "./Hero.css";

const socials = [
    { icon: <FiMail />, url: "mailto:samia04t@gmail.com", label: "Email" },
    { icon: <FaDiscord />, url: "https://discord.com/users/samiatasmim", label: "Discord" },
    { icon: <FaGithub />, url: "https://github.com/lipglossuserr", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/samia-tasmim-3850aa38a", label: "LinkedIn" },
];

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg">
                <PixelBlast
                    variant="square"
                    pixelSize={4}
                    color="#B497CF"
                    patternScale={2}
                    patternDensity={1}
                    enableRipples
                    rippleSpeed={0.3}
                    rippleThickness={0.1}
                    rippleIntensityScale={1}
                    speed={0.5}
                    transparent
                    edgeFade={0.25}
                />
            </div>

            <nav className="hero-socials">
                {socials.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                        {s.icon}
                    </a>
                ))}
            </nav>

            <div className="hero-content">
                <h1>{heroText}</h1>
            </div>
        </section>
    );
}