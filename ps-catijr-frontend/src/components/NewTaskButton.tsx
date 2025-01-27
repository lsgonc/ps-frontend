import { BsFillPlusCircleFill } from "react-icons/bs";


export default function NewTaskButton()
{
    return <div className="flex gap-2 items-center cursor-pointer hover:bg-hoverbgcolor rounded-xl p-2 active:bg-clickedbgcolor">
        <BsFillPlusCircleFill color="white" size={36}  />
        <h3 className="text-white">Nova tarefa</h3>
    </div>
}