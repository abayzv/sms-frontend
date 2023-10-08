import Image from "next/image";
import Avatar from "../avatar";
import Icon from "../icon";
import { useSidebar } from "@/store/useSidebar";

export default function Header({ title }: { title: string }) {
  const { collapse, expand, isCollapsed } = useSidebar();

  const handleCollapse = () => {
    if (isCollapsed) expand();
    else collapse();
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full flex-shrink-0 fixed top-0 left-0 z-50">
        <div className="flex items-center h-20">
          <div className="w-[260px] px-5 flex items-center justify-center">
            <Image src="https://api-mahestore.mahesadev.com/media-service/assets/dac28e29a5f581746fc9a.png" width={200} height={200} alt="logo sms" className="object-cover object-center w-[150px] h-[70px]" />
            {/* <div className="font-bold uppercase">{title}</div> */}
          </div>
          <button className="p-3 bg-sky-100 hover:bg-sky-200 rounded-xl ml-10" onClick={handleCollapse}>
            <Icon name="menu" color="#3085C3" />
          </button>
          {/* <div className="border border-gray-200 rounded-lg ml-5 overflow-clip">
            <input type="text" placeholder="Search here" className="border-none outline-none w-[500px] p-3 placeholder:text-sm" />
          </div> */}
          <div className="flex gap-5 items-center md:order-2 ml-auto px-5">
            <button className="text-neutral-500 p-2 rounded-xl bg-sky-100 hover:bg-sky-200 relative">
              <Icon name="envelope" color="#3085C3" />
              <span className="absolute bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full -top-2 -right-2 text-white">1</span>
            </button>
            <button className="text-neutral-500 p-2 rounded-xl bg-sky-100 hover:bg-sky-200 mr-4 relative">
              <Icon name="bell" color="#3085C3" />
              <span className="absolute bg-yellow-300 text-xs w-5 h-5 flex items-center justify-center rounded-full -top-2 -right-2 text-white">5</span>
            </button>
            <Avatar />
          </div>
        </div>
      </nav>
    </>
  );
}
