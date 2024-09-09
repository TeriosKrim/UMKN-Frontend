import React from "react";
// Hook to make a component a drop target
import { useDrop } from "react-dnd";
// Import the DraggableItem component
import DraggableItem from "./DraggableItem";

const ItemTypes = {
    ITEM: "item", // Define the type of items this drop target accepts
};

const DropTarget = ({ items, onDrop }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.ITEM, // Accept only items of the specified type
        drop: (item) => onDrop(item.id), // Handle the drop event
        collect: (monitor) => ({
            isOver: monitor.isOver(), // Monitor if an item is currently over the target
            canDrop: monitor.canDrop(), // Monitor if the target can accept the item
        }),
    });

    return (
        <div
            ref={drop} // Attach the drop behavior to this element
            style={{
                minHeight: "50px", // Minimum height for the drop area
                width: "100%", // Full width of the parent container
                padding: "10px", // Padding inside the drop area
                border: "2px border #ccc", // Dashed border to indicate a drop area
                backgroundColor: isOver ? "white" : "transparent", // Change background on hover
                transition: "background-color 0.3s ease", // Smooth transition for the background color
            }}
        >
            {items.map((item) => (
                <DraggableItem key={item.id} item={item} />
            ))}
            {!items.length && <p></p>}
        </div>
    );
};

export default DropTarget;
