import { useEffect, useRef } from "react";
import "./PixelBlastReveal.css";

interface PixelBlastRevealProps {
    src: string;
    alt?: string;
    pixelSize?: number;   // size of each pixel block in px
    color?: string;       // base pixel color
    brushRadius?: number; // hover erase radius in px
}

interface Cell {
    col: number;
    row: number;
    shade: number;      // brightness variation for pixel-art look
    triggerAt: number;  // timestamp (ms) when this cell starts disappearing, Infinity = still covered
    dx: number;         // blast scatter direction
    dy: number;
}

const REVEAL_DURATION = 420; // ms for one pixel to blast away

export default function PixelBlastReveal({
                                             src,
                                             alt = "",
                                             pixelSize = 14,
                                             color = "#B497CF",
                                             brushRadius = 36,
                                         }: PixelBlastRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellsRef = useRef<Cell[]>([]);
    const sizeRef = useRef({ w: 0, h: 0, cols: 0, rows: 0 });

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const base = hexToRgb(color);

        const buildGrid = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            canvas.width = w;
            canvas.height = h;
            const cols = Math.ceil(w / pixelSize);
            const rows = Math.ceil(h / pixelSize);
            sizeRef.current = { w, h, cols, rows };

            const cells: Cell[] = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const seed = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
                    const rand = seed - Math.floor(seed);
                    const angle = rand * Math.PI * 2;
                    cells.push({
                        col: c,
                        row: r,
                        shade: (rand - 0.5) * 0.3, // -0.15 .. +0.15 brightness
                        triggerAt: Infinity,
                        dx: Math.cos(angle),
                        dy: Math.sin(angle),
                    });
                }
            }
            cellsRef.current = cells;
        };

        buildGrid();
        const ro = new ResizeObserver(buildGrid);
        ro.observe(container);

        // --- interactions ---
        const getPos = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const eraseAround = (x: number, y: number, radius: number, blast: boolean) => {
            const now = performance.now();
            const { cols } = sizeRef.current;
            const cells = cellsRef.current;
            const minC = Math.max(0, Math.floor((x - radius) / pixelSize));
            const maxC = Math.min(cols - 1, Math.ceil((x + radius) / pixelSize));
            const minR = Math.max(0, Math.floor((y - radius) / pixelSize));
            const maxR = Math.min(sizeRef.current.rows - 1, Math.ceil((y + radius) / pixelSize));

            for (let r = minR; r <= maxR; r++) {
                for (let c = minC; c <= maxC; c++) {
                    const cell = cells[r * cols + c];
                    if (!cell || cell.triggerAt !== Infinity) continue;
                    const cx = c * pixelSize + pixelSize / 2;
                    const cy = r * pixelSize + pixelSize / 2;
                    const dist = Math.hypot(cx - x, cy - y);
                    if (dist > radius) continue;
                    // blast: outer pixels go later => expanding ring; hover: tiny random stagger
                    const delay = blast ? dist * 1.1 : Math.random() * 60;
                    cell.triggerAt = now + delay;
                }
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            const { x, y } = getPos(e.clientX, e.clientY);
            eraseAround(x, y, brushRadius, false);
        };
        const onPointerDown = (e: PointerEvent) => {
            const { x, y } = getPos(e.clientX, e.clientY);
            eraseAround(x, y, Math.max(sizeRef.current.w, sizeRef.current.h) * 0.35, true);
        };

        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerdown", onPointerDown);

        // --- render loop ---
        let raf = 0;
        const draw = () => {
            const now = performance.now();
            const { w, h } = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            for (const cell of cellsRef.current) {
                let p = 0; // 0 = fully covered, 1 = gone
                if (cell.triggerAt !== Infinity) {
                    p = Math.min(1, Math.max(0, (now - cell.triggerAt) / REVEAL_DURATION));
                }
                if (p >= 1) continue; // pixel fully blasted away

                const ease = p * p * (3 - 2 * p); // smoothstep
                const size = pixelSize * (1 - ease);
                const offset = (pixelSize - size) / 2;
                const scatter = ease * pixelSize * 1.5; // fly outward while shrinking

                const shade = 1 + cell.shade;
                ctx.fillStyle = `rgba(${clamp255(base.r * shade)}, ${clamp255(base.g * shade)}, ${clamp255(base.b * shade)}, ${1 - ease})`;
                ctx.fillRect(
                    cell.col * pixelSize + offset + cell.dx * scatter,
                    cell.row * pixelSize + offset + cell.dy * scatter,
                    size,
                    size
                );
            }
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerdown", onPointerDown);
        };
    }, [src, pixelSize, color, brushRadius]);

    return (
        <div ref={containerRef} className="pbr">
            <img className="pbr-img" src={src} alt={alt} draggable={false} />
            <canvas ref={canvasRef} className="pbr-canvas" />
        </div>
    );
}

function hexToRgb(hex: string) {
    const n = parseInt(hex.replace("#", ""), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function clamp255(v: number) {
    return Math.round(Math.min(255, Math.max(0, v)));
}