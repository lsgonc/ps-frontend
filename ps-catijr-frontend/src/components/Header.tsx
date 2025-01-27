"use client"

import Image from "next/image"

import { BsBellFill } from "react-icons/bs"
import { MdAccountCircle } from "react-icons/md"
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import ProfileButton from "./ProfileButton";


export default function Header()
{
    return <header className="bg-header-gradient border-b py-[12px] px-[80px] border-headerbordercolor  ">
        <div className="desktop-header sm:flex hidden flex justify-between">
            <div className="logo sm:flex gap-2 hidden">
                <Image src="/peugeot-logo.png" alt="Logo da Peugeot" width={55} height={60}></Image>
                <h1 className="text-white text-xl font-semibold">Peugeot <br /> Tasks</h1>
            </div>
            
            <div className="flex gap-6 items-center">
                <BsBellFill className="cursor-pointer color-blue font-semibold" color="white" size={28} />
                <ProfileButton></ProfileButton>
            </div>
        </div>

        <div className="mobile-header sm:hidden">
            <div className="flex gap-6 items-center justify-between">
                <IoMdHome className="cursor-pointer" size={36} color="white" />
                <BsBellFill className="cursor-pointer color-blue font-semibold" color="white" size={28} />
                <IoMdPerson className="cursor-pointer" color="white" size={36}  />
            </div>
        </div>
    </header>
}
