import PixelBlastReveal from "../PixelBlastReveal/PixelBlastReveal";
import "./PhotoCard.css";

interface PhotoCardProps {
    src: string;
    alt?: string;
}

export default function PhotoCard({ src, alt = "" }: PhotoCardProps) {
    return (
        <div className="photo-card">
            <PixelBlastReveal
                src={src}
                alt={alt}
                pixelSize={14}
                color="#B497CF"
                brushRadius={36}
            />
        </div>
    );
}