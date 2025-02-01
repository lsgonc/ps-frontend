"use client";

import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import TaskModal, { TaskData } from "./TaskModal";
import Notification from "./Notification";
import { mutate } from "swr";
import useNotificationStore from "@/store/notificationStore";

export default function NewTaskButton({ listId }: { listId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { showNotification } = useNotificationStore();

  const handleCreateTask = async (task: TaskData) => {
    if (!task.title.trim()) return;

    try {
      const response = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority,
          finishAt: new Date(task.finishAt),
          listId: task.listId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar a tarefa");

      // Show a global notification
      showNotification("Task criada com sucesso!");
      setIsOpen(false);
      mutate("http://localhost:3333/tasks");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <>
      <div
        data-testid="new-task-button"
        onClick={() => setIsOpen(true)}
        className="flex gap-2 items-center cursor-pointer hover:bg-gray-700 rounded-xl p-2 active:bg-gray-600 h-fit"
      >
        <BsFillPlusCircleFill color="white" size={36} />
        <h3 className="text-white">Nova tarefa</h3>
      </div>

      <TaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleCreateTask}
        initialData={{
          title: "Nova Tarefa",
          description: "Descrição da tarefa",
          priority: "medium",
          finishAt: "2024-12-31",
          listId,
        }}
      />
    </>
  );
}