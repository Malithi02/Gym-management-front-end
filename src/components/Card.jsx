import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell, FaRunning, FaClock, FaCalendarAlt } from "react-icons/fa";

const Card = ({ data }) => {
    const {
        _id,
        workoutName,
        workoutLogo,
        minDuration,
        maxDuration,
        durationType,
        difficultyLevel,
        sessionType,
        postedDate,
        description,
        trainerName,
    } = data;

    return (
        <section
            className="card"
            style={{
                background: "linear-gradient(45deg, #e96443, #904e95)", // Dark orange to purple gradient
                padding: "2px", // Creates the gradient border effect
                borderRadius: "8px", // Rounded corners
                margin: "1rem", // Space between cards
            }}
        >
            <Link
                to={`/trainer/plan/${_id}`}
                className="flex gap-4 sm:flex-row items-start"
                style={{
                    background: "#ffffff", // White background for content
                    borderRadius: "6px", // Slightly smaller than outer radius
                    padding: "1rem", // Inner padding
                }}
            >
                {/*} <img src={workoutLogo} alt="Workout Logo" />*/}
                <div>
                    <h3 className="text-lg font-semibold mb-2">{workoutName}</h3>
                    <h4 className="text-primary mb-1">{trainerName || "Unknown Trainer"}</h4>
                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                        <span className="flex items-center gap-2">
                            <FaDumbbell /> {difficultyLevel}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaRunning /> {sessionType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaClock /> {minDuration}-{maxDuration} {durationType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt /> {postedDate}
                        </span>
                    </div>
                    <p className="text-base text-primary/70">{description}</p>
                </div>
            </Link>
        </section>
    );
};

export default Card;
