import React, { useState } from "react";
import "./card.css";

const Card = ({ firstItem, item, handleFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ xPos: 0, yPos: 0 });

    const onDragStart = (event) => {
        // event.preventDefault();
        console.log("start");
        setIsDragging(true);
    };
    const onDrag = (event) => {
        console.log("doing");
        // event.preventDefault();
        console.log(event);
        setPosition({ xPos: event.clientX, yPos: event.clientY });
    };
    const onDragEnd = (event) => {
        console.log("end");
        // event.preventDefault();
        setIsDragging(false);
        setPosition({ xPos: 0, yPos: 0 });
    };
    return (
        <div
            className={`card-container ${firstItem ? "card-first" : ""} ${
                item.selected ? "selected" : ""
            }`}
        >
            <div
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                className="card-inner"
                style={{
                    position: isDragging ? "absolute" : "relative",
                    top: position.yPos,
                    left: position.xPos,
                }}
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
        </div>
    );
};

export default Card;
