import Icon from "../icon";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useMenu, useSidebar } from "@/store/useSidebar";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [showChildIndex, setShowChildIndex] = useState<number[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { isCollapsed } = useSidebar();
  const { menu } = useMenu();

  const router = useRouter();
  const routerPath = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickMenu = (event: any, index: number, route: string) => {
    event.preventDefault();
    // if menu not have child then push route
    if (!menu[index].child) router.push(route);

    // if menu have child then show child
    if (showChildIndex.includes(index)) {
      setShowChildIndex(showChildIndex.filter((item) => item !== index));
    } else {
      if (isCollapsed) {
        setShowChildIndex([index]);
      } else {
        setShowChildIndex([...showChildIndex, index]);
      }
    }
  };

  const renderChildMenu = (index: number) => {
    function isActive(pathname: string) {
      return pathname === routerPath ? 'font-semibold text-primary-500 marker:text-lg' : 'text-slate-600'
    }


    if (!showChildIndex.includes(index)) return null;
    const childMenu = menu[index].child;

    if (!childMenu) return null;

    if (!isCollapsed)
      return (
        <ul className="list-disc list-inside border-l border-l-gray-200 ml-9 text-sm">
          {childMenu.map((child, index) => (
            <li key={index} className={`marker:text-indigo-500 -ml-3 p-2 font-normal ${isActive(child.route)}`}>
              <Link
                href={child.route}
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      );
  };

  const renderMenu = () => {

    function isActive(pathname: string) {
      return routerPath?.split('/')[1] === pathname.replace('/', '') ? 'font-semibold bg-sky-100 text-[#3085C3]' : ''
    }

    return menu.map((item, index) => {
      return (
        <li key={index} className="px-4 py-1">
          <Link
            onClick={(event) => handleClickMenu(event, index, item.route)}
            href={item.route}
            className={`flex gap-4 items-center font-normal p-3 rounded-xl  ${isActive(item.route)} ${isCollapsed ? "justify-center" : "px-7"
              } text-slate-600 hover:bg-sky-100 dark:text-sky-400 dark:hover:bg-sky-700`}
          >
            <Icon name={item.icon} size={20} color="#3085C3" />
            <span className={`${isCollapsed ? "hidden" : ""} ${isActive(item.route)}`}>{item.name}</span>
            {item.child && (
              <span
                className={`${isCollapsed ? "hidden" : ""} text-gray-300 ml-auto`}
              >
                <Icon
                  name={
                    showChildIndex.includes(index)
                      ? "chevron-down"
                      : "chevron-right"
                  }
                  size={12}
                  color="#3085C3"
                />
              </span>
            )}
          </Link>
          {isCollapsed ? null : renderChildMenu(index)}
        </li>
      );
    });
  };

  return (
    <div
      id="default-sidebar"
      className={`flex flex-col bg-white transition-all mt-20 ${isCollapsed ? "w-[78px]" : "w-[260px]"}`}
      aria-label="Sidebar"
    >
      <div className="relative bg-white flex-1 flex flex-col dark:bg-gray-800">
        <ul className="font-medium flex flex-col flex-1 mt-10">
          {renderMenu()}
        </ul>
      </div>
    </div>
  );
}
