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
    const [isDragging, setIsDragging] = useState(false); // state to determine if a card-inner component is being dragged
    const [isDropping, setIsDropping] = useState(false); // state to determine if a card-inner component is being dropped

    // event handler for when a draggable element has started being dragged
    const onDragStart = (event) => {
        if (currentItem && isDragging) return; // if there is a current item and this item is being dragged then return
        setCurrentItem({ ...item, index });
        setIsDragging(true);
    };

    // event handler for when a draggable element has ended being dragged
    const onDragEnd = (event) => {
        // if there is a current item and this item is not being dragged then return
        if (!currentItem && !isDragging) return;
        setIsDragging(false);
        setCurrentItem(null);
    };

    // event handler for when a draggable element is entering a dragzone
    const onDragEnter = (event) => {
        // if no current item or this item is being dragged or current item is this item then return
        if (!currentItem || isDragging || currentItem.index === index) return;
        setIsDropping(true);
    };

    // event handler for when a draggable element is being dropped
    const onDrop = (event) => {
        // if no current item or this item is being dragged or current item is this item then return
        if (!currentItem || isDragging || currentItem.index === index) return;
        swapItems(currentItem.index, index); // swap the items
        setIsDropping(false);
    };

    // event handler for when a drag operation ends
    const onDragOver = (event) => {
        event.preventDefault();
    };

    // event handler for when a draggable element leaves a dragzone
    const onDragLeave = (event) => {
        if (!currentItem || isDragging || currentItem.index === index) return;
        setIsDropping(false);
    };

    return (
        <div
            className={`card-container ${index === 0 ? "card-first" : ""} ${
                item.selected ? "selected" : ""
            } ${isDropping ? "card-hollow" : ""}`}
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div
                className="card-inner"
                draggable
                onDragStart={onDragStart}
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
