import LogoLoop from "../components/LogoLoop/LogoLoop";
import PhotoCard from "../components/PhotoCard/PhotoCard";
import { aboutParagraphs } from "../data/about";
import samiaPhoto from "../assets/samia.jpeg";
import {
    SiC,
    SiCplusplus,
    SiTypescript,
    SiReact,
    SiVite,
    SiSpringboot,
    SiFirebase,
    SiCss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import "./About.css";

function TechLogo({ icon, name }: { icon: React.ReactNode; name: string }) {
    return (
        <span className="tech-logo" tabIndex={0}>
            {icon}
            <span className="tech-logo-name">{name}</span>
        </span>
    );
}

const techLogos = [
    { node: <TechLogo icon={<SiC />} name="C" />, title: "C" },
    { node: <TechLogo icon={<SiCplusplus />} name="C++" />, title: "C++" },
    { node: <TechLogo icon={<FaJava />} name="Java" />, title: "Java" },
    { node: <TechLogo icon={<SiTypescript />} name="TypeScript" />, title: "TypeScript" },
    { node: <TechLogo icon={<SiReact />} name="React" />, title: "React" },
    { node: <TechLogo icon={<SiVite />} name="Vite" />, title: "Vite" },

    { node: <TechLogo icon={<SiFirebase />} name="Firebase" />, title: "Firebase" },
    { node: <TechLogo icon={<SiCss />} name="CSS" />, title: "CSS" },
    { node: <TechLogo icon={<SiSpringboot />} name="Spring Boot" />, title: "Spring Boot" },
];

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about-columns">
                <div className="about-left">
                    <h2 className="about-title">/about me</h2>

                    <div className="about-text">
                        {aboutParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                        <p className="about-tech-line">
                            Here are some technologies I have been working with:
                        </p>
                    </div>
                </div>

                <div className="about-right">
                    <PhotoCard src={samiaPhoto} alt="Samia" />
                </div>
            </div>

            <div className="about-logoloop">
                <LogoLoop
                    logos={techLogos}
                    speed={80}
                    direction="left"
                    logoHeight={40}
                    gap={90}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#120F17"
                    ariaLabel="Technologies I work with"
                    style={{ paddingBottom: "56px" }}
                />
            </div>
        </section>
    );
}