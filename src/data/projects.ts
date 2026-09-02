// ✏️ Add a new project anytime by copying an object below and filling it in.
// image: put your screenshot in src/assets/projects/ and import it at the top of this file.

export interface Project {
    title: string;
    description: string;
    tech: string;       // e.g. "C# (Unity)" or "React, TypeScript"
    image: string;       // imported image, or a plain URL string
    github?: string;     // repo link — omit if not public
    live?: string;       // optional live/demo link
}

export const projects: Project[] = [
    {
        title: "Photobooth",
        description: "A retro-inspired webcam photobooth experience with live camera preview, countdown capture, photo review, and downloadable memories.",
        tech: "Java, HTML, CSS, JavaScript",
        image: `${import.meta.env.BASE_URL}photobooth.png`,// ← replace with your real screenshot import
        github: "https://github.com/lipglossuserr/retro-love-photobooth",
    },
    {
        title: "Academic Apocalypse\n",
        description: "A gaming-focused project featuring interactive gameplay elements, organized game resources, and a structured application built with a clean user experience.",
        tech: "C,Raylib",
        image: `${import.meta.env.BASE_URL}game.png`, // ← replace with your real screenshot import
        github: "https://github.com/lipglossuserr/academic-apocalypse",
    },
    {
        title: "Mochi Can't Study\n",
        description: "will upload soon on git.",
        tech: "React,Springboot.",
        image: `${import.meta.env.BASE_URL}mochi.png`, // ← replace with your real screenshot import
        github: "https://github.com/lipglossuserr/mochi-can-t-study",
    },
    {
        title: "MovieScout\n",
        description: "My very own 'letterboxd' i guess?.",
        tech: "JavaFX,mySQL.",
        image: `${import.meta.env.BASE_URL}movie.png`, // ← replace with your real screenshot import
        github: "https://github.com/lipglossuserr/MovieScout",
    },
    // {
    //     title: "Next Project",
    //     description: "One or two sentences about what it does",
    //     tech: "React, TypeScript",
    //     image: nextProjectImg,
    //     github: "https://github.com/lipglossuserr/...",
    //     live: "https://...",
    // },
];