import CloseTaskButton from "@/components/CloseTaskButton";
import DropdownItem from "@/components/DropdownItem";
import FinishTaskButton from "@/components/FinishTaskButton";
import Header from "@/components/Header";
import ListOptionsButton from "@/components/ListOptionsButton";
import NewTaskButton from "@/components/NewTaskButton";
import PriorityTag from "@/components/PriorityTag";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-2">
      <NewTaskButton></NewTaskButton>
      <ListOptionsButton></ListOptionsButton>
      <FinishTaskButton state="default"></FinishTaskButton>
      <DropdownItem type="danger"></DropdownItem>
      <PriorityTag priority="super-high"></PriorityTag>
      <TaskCard></TaskCard>
    </div>
  );
}
