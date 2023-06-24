import Icon from "../icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [isColapse, setIsColapse] = useState(false);
  const [showChildIndex, setShowChildIndex] = useState<number[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsColapse(false);
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
      if (isColapse) {
        setShowChildIndex([index]);
      } else {
        setShowChildIndex([...showChildIndex, index]);
      }
    }
  };

  const handleClickColapse = () => {
    // if colapse false, hide child menu
    if (!isColapse) {
      setIsColapse(true);
      setShowChildIndex([]);
    } else {
      setIsColapse(false);
      setShowChildIndex([]);
    }
  };

  const menu = [
    {
      name: "Dashboard",
      route: "/",
      icon: "home",
    },
    {
      name: "Users",
      route: "/users",
      icon: "users",
      child: [
        {
          name: "All Users",
          route: "/users",
        },
      ],
    },
  ];

  const renderChildMenu = (index: number) => {
    if (!showChildIndex.includes(index)) return null;
    const childMenu = menu[index].child;

    if (!childMenu) return null;

    if (!isColapse)
      return (
        <ul className=" border-gray-200 bg-gray-50">
          {childMenu.map((child, index) => (
            <li key={index} className="marker:">
              <Link
                href={child.route}
                className={`flex gap-4 items-center text-sm p-4 h-[56px] ${
                  isColapse ? "justify-center" : "px-7"
                } text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`}
              >
                <span className="text-xs text-gray-300">
                  <Icon name="chevron-right" />
                </span>
                <span className={`${isColapse ? "hidden" : ""}`}>
                  {child.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      );
  };

  const renderChilColapseMenu = () => {
    const childIndex = showChildIndex[0];
    const childMenu = menu[childIndex]?.child;

    if (!childMenu) return null;
    if (!isColapse) return null;

    return (
      <ul className="absolute w-64 top-0 right-0 min-h-screen translate-x-full bg-white">
        {childMenu.map((child, index) => (
          <li key={index}>
            <Link
              href={child.route}
              className={`flex gap-4 items-center text-sm p-4 h-[56px] text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 border-b border-gray-200`}
            >
              <span>{child.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderMenu = () => {
    return menu.map((item, index) => {
      return (
        <li key={index}>
          <Link
            onClick={(event) => handleClickMenu(event, index, item.route)}
            href={item.route}
            className={`flex gap-4 items-center text-base p-4 h-[56px] ${
              isColapse ? "justify-center" : "px-7"
            } text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`}
          >
            <Icon name={item.icon} />
            <span className={`${isColapse ? "hidden" : ""}`}>{item.name}</span>
            {item.child && (
              <span
                className={`${isColapse ? "hidden" : ""} text-gray-300 ml-auto`}
              >
                <Icon
                  name={
                    showChildIndex.includes(index)
                      ? "chevron-down"
                      : "chevron-right"
                  }
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
      className={`z-40 h-screen flex flex-col bg-white transition-all ${
        isColapse ? "w-18" : "w-64"
      }`}
      aria-label="Sidebar"
    >
      <div
        className={`flex items-center ${
          isColapse ? "justify-center" : "justify-between"
        } relative bg-primary-400 h-[56px] p-9 font-bold text-white`}
      >
        <div className={`${isColapse ? "hidden" : ""}`}>Mahesadev</div>
        <button
          onClick={() => {
            handleClickColapse();
          }}
          className="text-xl"
        >
          <Icon name="menu" />
        </button>
      </div>
      <div className="relative bg-white flex-1 flex flex-col dark:bg-gray-800">
        <ul className="font-medium flex flex-col flex-1">
          {renderMenu()}

          <li className="mt-auto p-5">
            <button
              className={`flex gap-4 items-center text-base p-4 h-[56px] bg-primary-400 hover:bg-primary-300 rounded-lg ${
                isColapse ? "justify-center" : "px-7"
              } text-white`}
              onClick={()=> signOut()}
            >
              <Icon name="sign-out" />
              <span className={`${isColapse ? "hidden" : ""}`}>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
