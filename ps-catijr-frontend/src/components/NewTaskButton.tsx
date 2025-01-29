"use client";

import { useState } from "react";
import { BsCalendarWeekFill, BsFillPlusCircleFill } from "react-icons/bs";
import CloseTaskButton from "./CloseTaskButton";
import FinishTaskButton from "./FinishTaskButton";
import PriorityDropdownItem from "./PriorityDropdownItem";
import PriorityDropdown from "./PriorityDropdown";
import { mutate } from "swr";
import TaskModal, { TaskData } from "./TaskModal";

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

  const handleCreateTask = async (task: TaskData) => {
    if (!task.title.trim()) return alert("O título é obrigatório!");

    try {
      console.log(task)

      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority,
          finishAt: new Date(task.finishAt),
          listId: task.listId
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar a tarefa");

      alert("Tarefa criada com sucesso!");
      setIsOpen(false);
      mutate("http://localhost:3333/tasks");
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

      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleCreateTask} initialData={{ title: "Nova Tarefa", description: "Descrição da tarefa", priority: "medium", finishAt: "2024-12-31", listId }} />
    </>
  );
}
