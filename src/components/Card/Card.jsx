import React, { useState } from "react";
import "./card.css";

const Card = ({
    index,
    item,
    handleFileSelect,
    currentItem,
    setCurrentItem,
    swapItems,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDropping, setIsDropping] = useState(false);

    const onDragStart = (event) => {
        if (currentItem && isDragging) return;
        setCurrentItem({ ...item, index });
        setIsDragging(true);
    };
    const onDrag = (event) => {
        if (!currentItem && !isDragging) return;
    };
    const onDragEnd = (event) => {
        if (!currentItem && !isDragging) return;
        setIsDragging(false);
        setCurrentItem(null);
    };

    const onDragEnter = (event) => {
        setIsDropping(true);
        if (!currentItem || isDragging || currentItem.index === index) return;
        swapItems(currentItem.index, index);
    };
    const onDragOver = (event) => {
        console.log('over');
        setIsDropping(false);
    };

    return (
        <div
            className={`card-container ${index === 0 ? "card-first" : ""} ${
                item.selected ? "selected" : ""
            }`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragOver}
        >
            <div
                className={`card-inner ${isDropping ? "card-hollow" : ""}`}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                style={{ opacity: isDragging ? 0 : 1 }}
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
