import ProjectCarousel from "../components/ProjectCarousel/ProjectCarousel";
import { projects } from "../data/projects";
import "./Projects.css";

export default function Projects() {
    return (
        <section className="projects" id="projects">
            <h2 className="projects-title">/projects</h2>
            <ProjectCarousel projects={projects} />
        </section>
    );
}