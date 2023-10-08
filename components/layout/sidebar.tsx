import Icon from "../icon";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSidebar } from "@/store/useSidebar";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [showChildIndex, setShowChildIndex] = useState<number[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { menu, isCollapsed } = useSidebar();

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
    if (!showChildIndex.includes(index)) return null;
    const childMenu = menu[index].child;

    if (!childMenu) return null;

    if (!isCollapsed)
      return (
        <ul>
          {childMenu.map((child, index) => (
            <li key={index} className="marker:">
              <Link
                href={child.route}
                className={`flex gap-4 items-center font-normal text-sm p-4 h-[56px] ${isCollapsed ? "justify-center" : "px-7"
                  } text-sky-500 dark:text-sky-400`}
              >
                <span className="text-xs text-gray-300">
                  <Icon name="chevron-right" size={12} color="#3085C3" />
                </span>
                <span className={`${isCollapsed ? "hidden" : ""}`}>
                  {child.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      );
  };

  const renderMenu = () => {

    function isActive(pathname: string) {
      return pathname === routerPath ? 'font-semibold bg-sky-100 text-[#3085C3]' : ''
    }

    return menu.map((item, index) => {
      return (
        <li key={index} className="px-4 py-1">
          <Link
            onClick={(event) => handleClickMenu(event, index, item.route)}
            href={item.route}
            className={`flex gap-4 items-center font-normal p-3 rounded-xl  ${isActive(item.route)} ${isCollapsed ? "justify-center" : "px-7"
              } text-gray-500 hover:bg-sky-100 dark:text-sky-400 dark:hover:bg-sky-700`}
          >
            <Icon name={item.icon} size={20} color="#3085C3" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>{item.name}</span>
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
          {renderChildMenu(index)}
        </li>
      );
    });
  };

  return (
    <div
      id="default-sidebar"
      className={`flex flex-col bg-white transition-all mt-20 ${isCollapsed ? "w-[72px]" : "w-[260px]"
        }`}
      aria-label="Sidebar"
    >
      <div className="relative bg-white flex-1 flex flex-col dark:bg-gray-800">
        <ul className="font-medium flex flex-col flex-1">
          {renderMenu()}

          {/* <li className="mt-auto p-5">
            <button
              className={`flex gap-4 items-center text-base p-4 h-[56px] bg-primary-400 hover:bg-primary-300 rounded-lg ${isColapse ? "justify-center" : "px-7"
                } text-white`}
              onClick={() => signOut()}
            >
              <Icon name="sign-out" />
              <span className={`${isColapse ? "hidden" : ""}`}>Logout</span>
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
