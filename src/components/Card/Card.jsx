import React from "react";
import "./card.css";

const Card = ({ firstItem }) => {
    return (
        <div
            className={`card-container ${firstItem ? "card-first" : ""}`}
        ></div>
    );
};

export default Card;
