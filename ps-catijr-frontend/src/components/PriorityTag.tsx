import { BsFillPencilFill } from "react-icons/bs";

interface Props {
    type: 'low' | 'medium' | 'high' | 'super-high'
}

export default function PriorityTag({type} : Props)
{
    return <div className={`flex font-semibold gap-2 items-center rounded-md p-2 ${type === 'low' ? 
        'bg-lowpriority text-[#096343]' : (type === "medium" ? "bg-mediumpriority text-[#653408]" 
            : (type === "high" ? "bg-highpriority text-[#702D08]" : "bg-superhighpriority text-[#5F0F0B]") )
    } `}>
        <h3>{ type === 'low' ? 
        'Baixa prioridade' : (type === "medium" ? "Média prioridade" 
            : (type === "high" ? "Alta prioridade" : "Altíssima prioridade")) }</h3>
    </div>
}