import { BsArrowBarRight } from "react-icons/bs";

export default function CloseTaskButton({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="cursor-pointer relative rounded-xl p-2 hover:bg-gray-700 active:bg-gray-600"
    >
      <BsArrowBarRight color="white" size={28} />
    </div>
  );
}
