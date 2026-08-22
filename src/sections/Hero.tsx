import PixelBlast from "../components/PixelBlast/PixelBlast";
import HeroTimer from "../components/HeroTimer/HeroTimer";
import { FiMail, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { heroName, heroSubtitle } from "../data/hero";
import "./Hero.css";

const socials = [
    { icon: <FiMail />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=samiatasmim@iut-dhaka.edu", label: "Email" },
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

            <div className="hero-social-bar">
                <span className="hero-contact-hint" aria-hidden="true">
                    contact me
                    <span className="hero-contact-arrow">---&gt;</span>
                </span>

                <nav className="hero-socials">
                    {socials.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                            {s.icon}
                        </a>
                    ))}
                </nav>
            </div>

            <a
                className="hero-resume-download"
                href="/Samia_Tasmim_Resume.pdf"
                download="Samia_Tasmim_Resume.pdf"
                aria-label="Download my resume (PDF)"
            >
                <span className="hero-resume-text">download resume</span>
                <span className="hero-resume-icon-wrap">
                    <FiDownload className="hero-resume-icon" />
                </span>
            </a>

            <div className="hero-content">
                <h1 className="hero-name">{heroName}</h1>
                <p className="hero-subtitle">{heroSubtitle}</p>
            </div>

            <HeroTimer />
        </section>
    );
}