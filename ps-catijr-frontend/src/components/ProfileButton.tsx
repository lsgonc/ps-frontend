import { MdAccountCircle } from "react-icons/md";


export default function ProfileButton()
{
    return <div className="flex gap-2 items-center cursor-pointer hover:bg-hoverbgcolor rounded-xl p-2">
        <MdAccountCircle color="white" size={36}  />
        <h3 className="text-white">Lucas</h3>
    </div>
}