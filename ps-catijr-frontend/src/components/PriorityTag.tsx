import { BsFillPencilFill } from "react-icons/bs";

interface Props {
    priority: 'low' | 'medium' | 'high' | 'super-high'
}

export default function PriorityTag({priority} : Props)
{
    return <div className={`flex font-semibold items-center rounded-md py-[4px] px-[16px] ${priority === 'low' ? 
        'bg-lowpriority text-[#096343]' : (priority === "medium" ? "bg-mediumpriority text-[#653408]" 
            : (priority === "high" ? "bg-highpriority text-[#702D08]" : "bg-superhighpriority text-[#5F0F0B]") )
    } `}>
        <h3>{ priority === 'low' ? 
        'Baixa prioridade' : (priority === "medium" ? "Média prioridade" 
            : (priority === "high" ? "Alta prioridade" : "Altíssima prioridade")) }</h3>
    </div>
}