import InterestFolder from "../components/InterestFolder/InterestFolder";
import { experienceText } from "../data/experience";
import "./Interests.css";

export default function Interests() {
    return (
        <section className="interests" id="interests">
            <div className="interests-columns">
                <div className="interests-left">
                    <h2 className="interests-title">/interests</h2>
                    <InterestFolder />
                </div>

                <div className="interests-right">
                    <h2 className="experience-title">/experience</h2>
                    <p className="experience-text">{experienceText}</p>
                </div>
            </div>
        </section>
    );
}