"use client";

import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function NewTaskButton({ listId }: { listId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [finishAt, setFinishAt] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim()) return alert("O título é obrigatório!");

    try {
      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority, finishAt, listId }),
      });

      if (!response.ok) throw new Error("Erro ao criar a tarefa");

      alert("Tarefa criada com sucesso!");
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setFinishAt("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <>
      {/* Botão de Criar Nova Tarefa */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-2 items-center cursor-pointer hover:bg-gray-700 rounded-xl p-2 active:bg-gray-600 h-fit"
      >
        <BsFillPlusCircleFill color="white" size={36} />
        <h3 className="text-white">Nova tarefa</h3>
      </div>

      {/* Right-Side Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50">
          <div className="w-[400px] bg-gray-800 p-6 h-full shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Criar Nova Tarefa</h2>

            {/* Inputs */}
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 rounded-md bg-gray-900 text-white border border-gray-600"
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-3 rounded-md bg-gray-900 text-white border border-gray-600"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 mb-3 rounded-md bg-gray-900 text-white border border-gray-600"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
            <input
              type="date"
              value={finishAt}
              onChange={(e) => setFinishAt(e.target.value)}
              className="w-full p-2 mb-3 rounded-md bg-gray-900 text-white border border-gray-600"
            />

            {/* Botões */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Criar Tarefa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
