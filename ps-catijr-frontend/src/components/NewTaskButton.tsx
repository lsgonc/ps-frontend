"use client";

import { useState } from "react";
import { BsCalendarWeekFill, BsFillPlusCircleFill } from "react-icons/bs";
import CloseTaskButton from "./CloseTaskButton";
import FinishTaskButton from "./FinishTaskButton";
import PriorityDropdownItem from "./PriorityDropdownItem";
import PriorityDropdown from "./PriorityDropdown";
import { mutate } from "swr";

export default function NewTaskButton({ listId }: { listId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Nova Tarefa");
  const [description, setDescription] = useState("Descrição da tarefa");
  const [priority, setPriority] = useState("medium");
  const [finishAt, setFinishAt] = useState("2024-12-31");
  const [editingField, setEditingField] = useState<string | null>(null);

  const priorityMap: Record<string, number> = {
    low: 0,
    medium: 1,
    high: 2,
    "super-high": 3,
  };

  const handleCreateTask = async () => {
    if (!title.trim()) return alert("O título é obrigatório!");

    const formattedFinishAt = finishAt ? new Date(finishAt) : null;

    try {
      console.log(title,description,priority,formattedFinishAt,listId)

      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority: priority,
          finishAt: new Date(finishAt),
          listId,
        }),
      });

      console.log(response.json())

      if (!response.ok) throw new Error("Erro ao criar a tarefa");

      alert("Tarefa criada com sucesso!");
      setIsOpen(false);

      mutate("http://localhost:3333/tasks")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-2 items-center cursor-pointer hover:bg-gray-700 rounded-xl p-2 active:bg-gray-600 h-fit"
      >
        <BsFillPlusCircleFill color="white" size={36} />
        <h3 className="text-white">Nova tarefa</h3>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-10 flex justify-end bg-opacity-50">
          <div className="w-[608px] border-l bg-background p-6 h-full shadow-lg">
            <div className="flex justify-between mb-6">
              <CloseTaskButton onClose={() => setIsOpen(false)} />
              <FinishTaskButton onFinish={handleCreateTask} state="default" />
            </div>

            {/* Editable Fields */}
            {editingField === "title" ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="w-full text-4xl font-bold rounded-md bg-transparent border-none text-white outline-none"
              />
            ) : (
              <p
                onClick={() => setEditingField("title")}
                className="cursor-pointer text-white text-4xl font-bold rounded-md"
              >
                {title}
              </p>
            )}

            <hr className="my-6 border-[#4E4E4E]"></hr>

            {editingField === "finishAt" ? (
              <input
                type="date"
                value={finishAt}
                onChange={(e) => setFinishAt(e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="w-full p-2 mb-3 rounded-md text-white bg-transparent border border-white"
              />
            ) : (
              <div className="flex tems-center justify-between text-2xl mb-6">
                <h3 className="font-semibold">Data de conclusão</h3>
                <p
                  onClick={() => setEditingField("finishAt")}
                  className="flex gap-3 items-center cursor-pointer text-white"
                >
                  <BsCalendarWeekFill className="text-white"></BsCalendarWeekFill>
                  {finishAt}
                </p>
              </div>
            )}
            <div className="flex tems-center justify-between text-2xl">
              <h3 className="font-semibold">Prioridade</h3>
              <PriorityDropdown priority={priority} onChange={setPriority} />
            </div>
            
            <hr className="my-6 border-[#4E4E4E]"></hr>

            <h3 className="font-semibold text-2xl mb-2">Descrição</h3>

            {editingField === "description" ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="w-full p-2 mb-3 rounded-md bg-transparent text-white border border-[#4E4E4E] outline-none"
              />
            ) : (
              <div className="flex">
                <p
                  onClick={() => setEditingField("description")}
                  className="cursor-pointer text-white text-justify rounded-md p-[10px] w-full bg-transparent text-white border border-[#4E4E4E]"
                >
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
