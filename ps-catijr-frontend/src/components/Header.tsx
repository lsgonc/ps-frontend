"use client"

import Image from "next/image"

import { BsBellFill } from "react-icons/bs"
import { MdAccountCircle } from "react-icons/md"
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import ProfileButton from "./ProfileButton";
import NotificationButton from "./NotificationButton";


export default function Header()
{
    return <header className="bg-header-gradient border-b py-[12px] px-[80px] border-headerbordercolor sm:mb-10  ">
        <div className="desktop-header sm:flex hidden flex justify-between">
            <div className="logo sm:flex gap-2 hidden">
                <Image src="/peugeot-logo.png" alt="Logo da Peugeot" width={55} height={60}></Image>
                <h1 className="text-white text-xl font-semibold">Peugeot <br /> Tasks</h1>
            </div>
            
            <div className="flex gap-6 items-center">
                <NotificationButton HasNotification={true}></NotificationButton>
                <ProfileButton></ProfileButton>
            </div>
        </div>

        <div className="mobile-header sm:hidden max-sm:sticky">
            <div className="flex gap-6 items-center justify-between">
                <IoMdHome className="cursor-pointer text-white hover:text-[#646570] active:bg-clickedbgcolor" size={36} />
                <BsBellFill className="cursor-pointer text-white hover:text-[#646570] active:bg-clickedbgcolor" size={28} />
                <IoMdPerson className="cursor-pointer text-white hover:text-[#646570] active:bg-clickedbgcolor" size={36}  />
            </div>
        </div>
    </header>
}
