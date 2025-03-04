"use client";

import FinishTaskButton from "./FinishTaskButton";
import PriorityTag from "./PriorityTag";
import { BsCalendarWeekFill } from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import { BsPencilFill } from "react-icons/bs";
import { BsPlusSquareDotted } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import useSWR, { mutate, useSWRConfig } from "swr";
import TaskModal, { TaskData } from "./TaskModal";
import useNotificationStore from "@/store/notificationStore";

interface Props {
  date: "onTime" | "late";
  priority: "low" | "medium" | "high" | "super-high";
  title: string;
  description: string;
  taskDate: Date;
  isFinished: boolean;
  id: string;
  listId: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void; // Add this prop
  onDragEnd: () => void; // Add this prop
}

interface FileData {
  id: string;
  name: string;
  url: string;
}

export default function TaskCard({
  date,
  priority,
  title,
  description,
  taskDate,
  isFinished,
  id,
  listId,
  onDragStart,
  onDragEnd,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const { showNotification } = useNotificationStore();

  const { mutate } = useSWRConfig();

  const { data: attachedFiles, error } = useSWR<FileData[]>(
    `http://localhost:3333/tasks/${id}/files`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch attached files");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.files || [];
    }
  );

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const taskPriority = priority;
  const taskTitle = title;
  const taskDesc = description;
  const tDate = taskDate;
  const taskIsFinished = isFinished != null ? true : false;
  const taskId = id;
  const lId = listId;

  const handleFinishTask = async () => {
    try {
      // Call the API to create the list
      const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority: priority,
          finishAt: taskDate,
          listId,
          isFinished: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the task");
      }

      mutate("http://localhost:3333/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async (task: TaskData) => {
    try {
      // Call the API to create the list
      const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          priority: task.priority,
          finishAt: new Date(task.finishAt),
          listId: task.listId,
          isFinished: taskIsFinished,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the task");
      }

      setIsOpen(false);

      mutate("http://localhost:3333/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDuplicateTask = async () => {
    try {
      const response = await fetch(`http://localhost:3333/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority,
          finishAt: taskDate,
          listId,
          isFinished: false, // As duplicatas geralmente começam como "não concluídas"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate the task");
      }

      showNotification("Task duplicada com sucesso!");
      mutate("http://localhost:3333/tasks"); // Atualize os dados para refletir a nova tarefa
    } catch (error) {
      console.error("Error duplicating task:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3333/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }

      showNotification("Task deletada com sucesso!");
      // Mutate SWR cache to refresh data
      mutate("http://localhost:3333/tasks");
    } catch (error) {
      console.error("Task deleting list:", error);
    }
  };

  return (
    <div
      data-testid="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragEnd={onDragEnd}
      onContextMenu={(e) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
      }}
      className={`flex relative flex-col gap-2 border text-white py-[12px] px-[8px] max-w-[460px] cursor-move ${
        !isFinished &&
        (date === "late"
          ? "hover:bg-taskcard-late-hover-gradient"
          : "hover:bg-taskcard-hover-gradient")
      } ${
        isFinished ? "text-[#ACACAC] border-[#4E4E4E] hover:bg-transparent" : ""
      }`}
    >
      <div className="flex justify-between">
        <PriorityTag priority={priority}></PriorityTag>
        <FinishTaskButton
          onFinish={handleFinishTask}
          state={taskIsFinished ? "finished" : "default"}
        ></FinishTaskButton>
      </div>
      <div className="flex flex-col">
        <h2 data-testid="task-card-title"  className="font-semibold text-xl">{title}</h2>
        <h3 className="font-regular text-md">{description} </h3>
      </div>
      <div className="flex gap-2">
        <div
          className={`flex font-semibold items-center gap-2 w-fit py-[4px] px-[8px] rounded-md text-[#646570] bg-[#E0E0E0] ${
            date === "late" ? "bg-[#DDA9A9] text-danger" : ""
          }`}
        >
          <BsCalendarWeekFill></BsCalendarWeekFill>
          <span className="mt-0.5">
            {new Date(taskDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex font-semibold items-center gap-2 w-fit py-[4px] px-[8px] rounded-md  border border-[#4E4E4E]">
          <AiOutlinePaperClip></AiOutlinePaperClip>
          <span className="mt-0.5">{attachedFiles?.length} arquivos</span>
        </div>
      </div>

      {clicked && (
        <div className="absolute bg-[#252628] text-white py-[8px] px-[4px] border border-[#4E4E4E] bottom-[-15] right-[-15]">
          <ul className="flex flex-col gap-2">
            <li
              data-testid="edit-task-button"
              onClick={() => setIsOpen(true)}
              className="flex gap-2 items-center p-1 cursor-pointer hover:bg-hoverbgcolor"
            >
              <BsPencilFill></BsPencilFill> Editar
            </li>
            <li
              data-testid="duplicate-task-button"
              onClick={handleDuplicateTask}
              className="flex gap-2 items-center p-1 cursor-pointer hover:bg-hoverbgcolor"
            >
              <BsPlusSquareDotted></BsPlusSquareDotted> Duplicar
            </li>
            <li
              data-testid="delete-task-button"
              onClick={handleDeleteTask}
              className="flex gap-2 items-center text-danger p-1 cursor-pointer hover:bg-hoverbgcolor"
            >
              <AiFillDelete></AiFillDelete> Deletar
            </li>
          </ul>
        </div>
      )}

      <TaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleUpdateTask}
        initialData={{
          id: taskId,
          title: taskTitle,
          description: taskDesc,
          priority: taskPriority,
          finishAt: new Date(tDate).toString(),
          listId: lId,
        }}
      />
    </div>
  );
}
