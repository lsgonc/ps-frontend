import { BsArrowBarRight } from "react-icons/bs"


export default function CloseTaskButton()
{
    return <div className="relative rounded-xl p-2 hover:bg-hoverbgcolor active:bg-clickedbgcolor"> 
            <BsArrowBarRight className="cursor-pointer color-blue font-semibold  " color="white" size={28} />
        </div>
}