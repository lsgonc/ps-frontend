import { BsFillPencilFill } from "react-icons/bs";

interface Props {
    type: 'default' | 'danger'
}

export default function DropdownItem({type="default"} : Props)
{
    return <div className="flex gap-2 items-center cursor-pointer hover:bg-hoverbgcolor p-2 active:bg-clickedbgcolor h-fit">
        <BsFillPencilFill className={`${type === "danger" ? "text-danger" : "text-white" }`} size={24}  />
        <h3 className={`${type === "danger" ? "text-danger" : "text-white" }`} >Renomear lista</h3>
    </div>
}