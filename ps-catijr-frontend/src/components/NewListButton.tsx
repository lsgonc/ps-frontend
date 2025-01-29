"use client"

import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { mutate } from "swr";

export default function NewListButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleCreateList = async () => {
    if (inputValue.trim() === "") return; // Prevent creating an empty list

    try {
      // Call the API to create the list
      const response = await fetch("http://localhost:3333/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to create the list");
      }

      setInputValue(""); // Clear the input
      setIsEditing(false); // Switch back to the button

      // Mutate SWR cache to refresh data 
      mutate("http://localhost:3333/lists");
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      handleCreateList();
    }
  };

  return (
    <div className={`flex relative text-white cursor-pointer justify-between min-w-[300px] active:bg-clickedbgcolor hover:bg-hoverbgcolor  items-center h-fit ${isEditing ? "border border-white rounded-md" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          className="bg-transparent text-xl pl-2 font-semibold text-white focus:outline-none h-[44px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyPress}
          onBlur={() => setIsEditing(false)} // Optional: switch back if input loses focus
          autoFocus
        />
      ) : (
        <div
          className="flex gap-2 items-center rounded-xl p-2 "
          onClick={() => setIsEditing(true)}
        >
          <BsFillPlusCircleFill color="white" size={36} />
          <h3 className="text-white">Nova lista</h3>
        </div>
      )}
    </div>
  );
}
