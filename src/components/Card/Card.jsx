import React from "react";
import "./card.css";

const Card = ({ firstItem, item, handleFileSelect }) => {
    return (
        <div
            className={`card-container ${firstItem ? "card-first" : ""} ${
                item.selected ? "selected" : ""
            }`}
        >
            <input
                type="checkbox"
                className="card-select"
                onChange={() => handleFileSelect(item)}
                checked={item?.selected ? true : false}
            />
            <div className="card-overlay" />
            <img
                src={item ? URL.createObjectURL(item.file) : ""}
                className="card-img"
                alt="gallery-img"
            />
        </div>
    );
};

export default Card;
