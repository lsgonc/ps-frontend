"use client"

import FinishTaskButton from "./FinishTaskButton"
import PriorityTag from "./PriorityTag"
import { BsCalendarWeekFill, BsFillCalendarWeekFill } from "react-icons/bs"
import { AiOutlinePaperClip } from "react-icons/ai"
import { useState, useEffect } from "react"

import { BsPencilFill } from "react-icons/bs"
import { BsPlusSquareDotted } from "react-icons/bs"
import { AiFillDelete } from "react-icons/ai"

interface Props {
    date: "onTime" | "late"
}

export default function TaskCard({ date }: Props) {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);


    return <div onContextMenu={(e) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
            x: e.pageX,
            y: e.pageY,
        })
    }} className="flex relative flex-col gap-2 border border-white py-[12px] px-[8px] max-w-[460px] hover:bg-taskcard-hover-gradient">
        <div className="flex justify-between">
            <PriorityTag priority="low"></PriorityTag>
            <FinishTaskButton state="default"></FinishTaskButton>
        </div>
        <div className="flex flex-col">
            <h2 className="text-white font-semibold text-xl">Título</h2>
            <h3 className="text-white font-regular text-md">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years o...</h3>
        </div>
        <div className="flex gap-2">
            <div className="flex font-semibold items-center gap-2 w-fit py-[4px] px-[8px] rounded-md text-[#646570] bg-[#E0E0E0]">
                <BsCalendarWeekFill></BsCalendarWeekFill>
                <span className="mt-0.5">2024, Jan 12</span>
            </div>
            <div className="flex font-semibold items-center gap-2 w-fit py-[4px] px-[8px] rounded-md text-white border border-[#4E4E4E]">
                <AiOutlinePaperClip></AiOutlinePaperClip>
                <span className="mt-0.5">3 arquivos</span>
            </div>
        </div>

        {clicked && (
        <div className="absolute bg-[#252628] text-white py-[8px] px-[4px] border border-[#4E4E4E] bottom-[-15] right-[-15]">
          <ul className="flex flex-col gap-2">
            <li className="flex gap-2 items-center p-1 cursor-pointer hover:bg-hoverbgcolor"><BsPencilFill></BsPencilFill> Editar</li>
            <li className="flex gap-2 items-center p-1 cursor-pointer hover:bg-hoverbgcolor"><BsPlusSquareDotted></BsPlusSquareDotted> Duplicar</li>
            <li className="flex gap-2 items-center text-danger p-1 cursor-pointer hover:bg-hoverbgcolor"><AiFillDelete></AiFillDelete> Deletar</li>
          </ul>
        </div>
      )}
    </div>
}