import CloseTaskButton from "@/components/CloseTaskButton";
import Header from "@/components/Header";
import ListOptionsButton from "@/components/ListOptionsButton";
import NewTaskButton from "@/components/NewTaskButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <NewTaskButton></NewTaskButton>
      <ListOptionsButton></ListOptionsButton>
    </div>
  );
}
