import { useState, useEffect } from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import CloseTaskButton from "./CloseTaskButton";
import FinishTaskButton from "./FinishTaskButton";
import PriorityDropdown from "./PriorityDropdown";
import { mutate } from "swr";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskData) => Promise<void>;
  initialData?: TaskData | null;
}

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "super-high";
  finishAt: string;
  listId: string;
}

export default function TaskModal({ isOpen, onClose, onSave, initialData }: TaskModalProps) {
  const [title, setTitle] = useState(initialData?.title || "Nova Tarefa");
  const [description, setDescription] = useState(initialData?.description || "Descrição da tarefa");
  const [priority, setPriority] = useState(initialData?.priority || "medium");
  const [finishAt, setFinishAt] = useState(initialData?.finishAt || "2024-12-31");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      setFinishAt(initialData.finishAt);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.size <= 100 * 1024 * 1024) { // 100MB limit
      setFile(selectedFile);
      setUploadError(null);
    } else {
      setUploadError("O arquivo deve ter no máximo 100MB.");
    }
  };

  const handleFileUpload = async () => {
    if (!file || uploading) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadError(null);

      const response = await fetch(`http://localhost:3333/tasks/${initialData?.id}/files`, {
        method: "POST",
        body: formData,
      });


      if (response.ok) {
        // Handle successful upload (e.g., update state or show success message)
        const result = await response.json();
        console.log(result)
        console.log("File uploaded successfully:", result);
      } else {
        const error = await response.json();
        console.log(error)
        setUploadError(error.message || "Erro ao enviar o arquivo.");
      }
    } catch (err) {
      setUploadError("Erro ao enviar o arquivo.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex justify-end bg-black bg-opacity-50">
      <div className="w-[608px] border-l bg-background p-6 h-screen overflow-y-auto shadow-lg custom-scrollbar">
        <div className="flex justify-between mb-6">
          <CloseTaskButton onClose={onClose} />
          <FinishTaskButton
            onFinish={() =>
              onSave({
                id: initialData?.id,
                title,
                description,
                priority,
                finishAt,
                listId: initialData?.listId || "",
              })
            }
            state="default"
          />
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

        <hr className="my-6 border-[#4E4E4E]" />

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
          <div className="flex items-center justify-between text-2xl mb-6">
            <h3 className="font-semibold">Data de conclusão</h3>
            <p
              onClick={() => setEditingField("finishAt")}
              className="flex gap-3 items-center cursor-pointer text-white"
            >
              <BsCalendarWeekFill className="text-white" />
              {new Date(finishAt).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-2xl">
          <h3 className="font-semibold">Prioridade</h3>
          <PriorityDropdown priority={priority} onChange={setPriority} />
        </div>

        <hr className="my-6 border-[#4E4E4E]" />

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

        {/* File Upload Section */}
        <hr className="my-6 border-[#4E4E4E]" />
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-2xl mb-3">Upload de Arquivo</h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-3 p-2 text-white bg-transparent border border-[#4E4E4E] rounded-md"
          />
          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
          <button
            onClick={handleFileUpload}
            disabled={uploading || !file}
            className={`mt-3 p-2 bg-blue-500 text-white rounded-md ${uploading && "opacity-50"}`}
          >
            {uploading ? "Enviando..." : "Enviar Arquivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
