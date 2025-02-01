"use client";

import { useState } from "react";
import ListOptionsButton from "./ListOptionsButton";
import { mutate } from "swr";

interface Props {
    listTitle: string
    listId: string
}


export default function ListTitle({listTitle, listId} : Props) {
  const [isEditing, setIsEditing] = useState(false); // State to toggle between input and text
  const [title, setTitle] = useState(listTitle); // State to store the title

  const id = listId

  const handleUpdateList = async () => {
    if (title.trim() === "") return; // Prevent creating an empty list

    try {
      // Call the API to create the list
      const response = await fetch(`http://localhost:3333/lists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload the list");
      }

      setIsEditing(false); // Switch back to the button
      mutate("http://localhost:3333/lists");
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleRename = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = () => {
    handleUpdateList()
    setIsEditing(false); // Disable editing mode
  };

  return (
    <div  data-testid="list-title" className={`flex relative text-white justify-between min-w-full items-center h-fit ${isEditing ? "border border-white rounded-md" : ""}`}>
      {isEditing ? (
        <input
          className="bg-transparent text-xl pl-2 font-semibold text-white focus:outline-none h-[44px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title as the user types
          onBlur={handleSave} // Save when the input loses focus
          autoFocus // Automatically focus the input when editing
        />
      ) : (
        <h3 onClick={() => setIsEditing(!isEditing)} className="text-xl pl-2 cursor-pointer font-semibold">{title}</h3>
      )}
      {!isEditing ? (<ListOptionsButton listName={title} id={id} onRename={handleRename} />) : ("")}
      
    </div>
  );
}
