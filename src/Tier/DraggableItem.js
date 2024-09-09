import React from "react";
// Hook to make an item draggable
import { useDrag } from "react-dnd";

const ItemTypes = {
    ITEM: "item", // Define the type for the draggable item
};

const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM, // Specify the type of the item
        item: { id: item.id }, // Data to pass to the drop target
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // Monitor the drag state
        }),
    });

    return (
        <img
            ref={drag} // Attach the drag behavior to this
            src={item.image} // Image of the character
            style={{
                opacity: isDragging ? 0.5 : 1, // Adjust opacity while dragging
                width: "50px", // Set image dimensions
                height: "50px",
                margin: "2px", // Space between items
                cursor: "move", // Change cursor to indicate drag action
            }}
            alt={item.name} // Alt text for the image
        />
    );
};

export default DraggableItem;
