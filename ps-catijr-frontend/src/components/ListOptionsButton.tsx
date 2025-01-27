import { BsThreeDots } from "react-icons/bs"


export default function ListOptionsButton()
{
    return <div className="flex rounded-xl p-2 hover:bg-hoverbgcolor active:bg-clickedbgcolor items-center"> 
            <BsThreeDots className="cursor-pointer color-blue font-semibold  " color="white" size={28} />
        </div>
}