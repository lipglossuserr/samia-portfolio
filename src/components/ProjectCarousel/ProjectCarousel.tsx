import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Project } from "../../data/projects";
import "./ProjectCarousel.css";

interface ProjectCarouselProps {
    projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
    const [index, setIndex] = useState(0);

    if (projects.length === 0) {
        return <p className="pc-empty">Projects coming soon...</p>;
    }

    const goPrev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
    const goNext = () => setIndex((i) => (i + 1) % projects.length);

    const project = projects[index];

    return (
        <div className="pc-wrapper">
            <div className="pc-card">
                <div
                    className="pc-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                >
                    <div className="pc-overlay" />
                </div>

                {projects.length > 1 && (
                    <>
                        <button className="pc-arrow pc-arrow-left" onClick={goPrev} aria-label="Previous project">
                            <FaChevronLeft />
                        </button>
                        <button className="pc-arrow pc-arrow-right" onClick={goNext} aria-label="Next project">
                            <FaChevronRight />
                        </button>
                    </>
                )}

                <div className="pc-info">
                    <h3 className="pc-title">{project.title}</h3>
                    <p className="pc-description">{project.description}</p>
                    <p className="pc-tech">{project.tech}</p>

                    <div className="pc-links">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                                <FaGithub />
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                                <FaExternalLinkAlt />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {projects.length > 1 && (
                <div className="pc-dots">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            className={`pc-dot${i === index ? " pc-dot--active" : ""}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to project ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}