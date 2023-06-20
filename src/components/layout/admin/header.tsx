import Avatar from "@/components/avatar";
import Icon from "@/components/icon";

export default function Header({title} : {title: string}) {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4 px-10">
          <div>{title}</div>
          <div className="flex gap-3 items-center md:order-2">
            <button className="text-neutral-500 p-2 rounded-full bg-gray-200 hover:bg-gray-100 relative">
              <Icon name="envelope" />
              <span className="absolute bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full -top-2 -right-2 text-white">1</span>
            </button>
            <button className="text-neutral-500 p-2 rounded-full bg-gray-200 hover:bg-gray-100 mr-4 relative">
              <Icon name="bell" />
              <span className="absolute bg-yellow-300 text-xs w-5 h-5 flex items-center justify-center rounded-full -top-2 -right-2 text-white">5</span>
            </button>
            <Avatar />
          </div>
        </div>
      </nav>
    </>
  );
}
