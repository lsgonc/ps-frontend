import { BsCheck2 } from "react-icons/bs"

interface Props {
    state: 'default' | 'finished',
    onFinish: () => void;
}

export default function FinishTaskButton( {state='default',onFinish} : Props )
{
    const isFinished = state === 'finished';

    return <div data-testid="save-task-button" onClick={onFinish} className={`flex gap-2 items-center group ${isFinished ? "text-hoverbggreen" : "text-white cursor-pointer"} h-fit`}>
            <div className={`rounded-full p-2 border border-dashed group-hover:border-hoverbggreen ${isFinished ? "border-hoverbggreen" : ""}`}>
                <BsCheck2  className={`${isFinished ? "text-hoverbggreen" : "text-white"} group-hover:text-hoverbggreen`} size={24}  />
            </div>
            <h3 className="group-hover:text-hoverbggreen">{isFinished ? "Finalizado" : "Finalizar"}</h3>
        </div>
}