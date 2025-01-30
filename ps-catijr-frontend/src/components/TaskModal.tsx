import { useState, useEffect } from "react";
import { BsCalendarWeekFill, BsFillXCircleFill, BsPlusCircleFill } from "react-icons/bs";
import CloseTaskButton from "./CloseTaskButton";
import FinishTaskButton from "./FinishTaskButton";
import PriorityDropdown from "./PriorityDropdown";
import { AiOutlinePaperClip } from "react-icons/ai";
import useSWR from "swr";

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

interface FileData {
  id: string;
  name: string;
  url: string;
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

  const { data: attachedFiles, error, mutate } = useSWR<FileData[]>(
    `http://localhost:3333/tasks/${initialData?.id}/files`,
    async (url:string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch attached files");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.files || [];
    }
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.size <= 100 * 1024 * 1024) { // 100MB limit
      setFile(selectedFile);
      setUploadError(null);
      await handleFileUpload(selectedFile); // Automatically upload the file
    } else {
      setUploadError("O arquivo deve ter no máximo 100MB.");
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || uploading || !initialData?.id) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadError(null);

      const response = await fetch(`http://localhost:3333/tasks/${initialData.id}/files`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("File uploaded successfully:", result);
        mutate()
    } else {
        const error = await response.json();
        setUploadError(error.message || "Erro ao enviar o arquivo.");
      }
    } catch (err) {
      setUploadError("Erro ao enviar o arquivo.");
    } finally {
      setUploading(false);
    }
  };

  function truncate(input: string) {
    if (input.length > 15) {
       return input.substring(0, 15) + '...';
    }
    return input;
 };

 const handleDeleteFile = async (fileId: string) => {
    if (!initialData?.id) return;
  
    try {
      const response = await fetch(
        `http://localhost:3333/tasks/${initialData.id}/files/${fileId}`,
        {
          method: "DELETE",
        },
      );
  
      if (response.ok) {
        // Refresh the list of attached files
        mutate()
    } else {
        console.error("Failed to delete file");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-10 flex justify-end bg-black bg-opacity-50 cursor-default">
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
          <h3 className="font-semibold text-2xl mb-3">Arquivos</h3>
          <div className="flex">
          {/* Display Attached Files */}
            {attachedFiles?.length > 0 ? (
                <div className="flex cursor-pointer flex-wrap gap-4 h-3/4">
                {attachedFiles?.map((file) => (
                    <div key={file.id} className="flex mb-3 p-1 items-center gap-2  h-full text-white bg-transparent border border-[#4E4E4E] rounded-md">
                        <AiOutlinePaperClip size={24}></AiOutlinePaperClip>
                        <a
                        href={"http://localhost:3333/files/" + file.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                        >
                        {truncate(file.name)}
                        </a>
                        <BsFillXCircleFill onClick={async () => handleDeleteFile(file.id)} size={20}></BsFillXCircleFill>
                    </div>
                ))}

                <label className="mb-3 p-1 cursor-pointer gap-2 flex items-center text-white bg-transparent border border-[#4E4E4E] rounded-md">
                            <BsPlusCircleFill size={20}></BsPlusCircleFill>
                            Adicionar arquivo
                            <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden w-fit"
                            disabled={uploading}
                            />
                        </label>
                        {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                        {uploading && <p className="text-gray-500">Enviando arquivo...</p>}
                </div>
            ) : (initialData?.id ? (
                <div>
                <label className="mb-3 p-1 gap-2 cursor-pointer flex items-center text-white bg-transparent border border-[#4E4E4E] rounded-md">
                            <BsPlusCircleFill></BsPlusCircleFill>
                            Adicionar arquivo
                            <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden w-fit"
                            disabled={uploading}
                            />
                        </label>
                        {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                        {uploading && <p className="text-gray-500">Enviando arquivo...</p>}
                </div>)
                : 
                (<h3>Crie a lista antes de adicionar arquivos a ela</h3>)
            )}
            </div>
          

          
        </div>
      </div>
    </div>
  );
}