"use client";

import useNotificationStore from "@/store/notificationStore";
import { useState } from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { BsPencilFill, BsThreeDots } from "react-icons/bs";
import { mutate } from "swr";

export default function ListOptionsButton({ onRename, id, listName }: any) {
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { showNotification } = useNotificationStore();


  const deleteList = async () => {
    try {
      const response = await fetch(`http://localhost:3333/lists/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the list");
      }

      showNotification("Lista deletada com sucesso!")
      setShowModal(false);

      // Mutate SWR cache to refresh data
      mutate("http://localhost:3333/lists");
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setClicked(!clicked)}
        className="flex rounded-xl p-2 hover:bg-hoverbgcolor active:bg-clickedbgcolor items-center h-fit cursor-pointer"
      >
        <BsThreeDots color="white" size={28} />
      </div>
      {clicked && (
        <div className="absolute bg-[#252628] text-white py-2 px-4 w-fit border border-[#4E4E4E] md:left-0 right-0   rounded-md z-10">
          <ul className="flex flex-col gap-2">
            <li
              className="flex gap-2 items-center p-1 cursor-pointer hover:bg-hoverbgcolor"
              onClick={() => {
                onRename();
                setClicked(false);
              }}
            >
              <BsPencilFill /> Renomear
            </li>
            <li
              onClick={() => setShowModal(true)}
              className="flex gap-2 items-center text-danger p-1 cursor-pointer hover:bg-hoverbgcolor"
            >
              <AiFillDelete /> Deletar
            </li>
          </ul>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#252628] text-white border-white rounded-md bg-opacity-50 z-50">
          <div className="relative bg-[#252628] p-6 rounded-lg shadow-lg w-[300px] text-white">
          <button
              onClick={() => {setShowModal(false); setClicked(false)}}
              className="absolute top-2 right-2 p-1 rounded-full bg-white text-black hover:bg-hoverbgcolor"
            >
              <AiOutlineClose size={18} />
            </button>
            <h2 className="text-lg font-semibold">Tem certeza que deseja deletar a lista {listName}?</h2>
            <p className="text-sm text-gray-300 my-4">Essa ação não é reversível.</p>
            <div className="flex justify-start ">
            
              <button
                onClick={deleteList}
                className="flex flex-1 rounded-md gap-2 items-center text-danger p-1 cursor-pointer hover:bg-hoverbgcolor"
              >
                  <AiFillDelete /> Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
