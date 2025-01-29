import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

interface Props {
  priority: "low" | "medium" | "high" | "super-high";
  onChange: (priority: "low" | "medium" | "high" | "super-high") => void;
}

const priorities = [
  { value: "low", label: "Baixa prioridade", color: "bg-lowpriority text-[#096343]" },
  { value: "medium", label: "Média prioridade", color: "bg-mediumpriority text-[#653408]" },
  { value: "high", label: "Alta prioridade", color: "bg-highpriority text-[#702D08]" },
  { value: "super-high", label: "Altíssima prioridade", color: "bg-superhighpriority text-[#5F0F0B]" },
];

export default function PriorityDropdown({ priority, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedPriority = priorities.find((p) => p.value === priority);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="bg-transparent cursor-pointer py-[4px] px-[8px] flex items-center gap-6 rounded-md border border-[#4E4E4E]">
        <button
        className={`flex justify-between items-center w-full p-2 rounded-md  ${selectedPriority?.color} cursor-pointer`}
        >
        {selectedPriority?.label}
        </button>
        <BsFillCaretDownFill size={28} />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#252628] p shadow-lg overflow-hidden">
          {priorities.map((p) => (
            <div key={p.value} className="w-full hover:bg-[#4E4E4E] rounded-md">
                <div
                key={p.value}
                className={`p-2 cursor-pointer w-3/4 rounded-md mb-2 text-[20px] hover:border-l-[4px]  ${p.color}`}
                onClick={() => {
                    onChange(p.value as "low" | "medium" | "high" | "super-high");
                    setIsOpen(false);
                }}
                >
                {p.label}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
