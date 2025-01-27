import { BsBellFill } from "react-icons/bs"

interface Props {
    HasNotification: boolean
}

export default function NotificationButton( {HasNotification} : Props )
{
    return <div className="relative rounded-xl p-2 hover:bg-hoverbgcolor active:bg-clickedbgcolor"> 
            <BsBellFill className="cursor-pointer color-blue font-semibold  " color="white" size={28} />
            {HasNotification && (
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
        </div>
}