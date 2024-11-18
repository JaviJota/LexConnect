import { PowerIcon } from "@heroicons/react/16/solid";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  
} from "@heroicons/react/24/outline";
import { createContext, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../store/userDataStore";

const SidebarContext = createContext();

export const Sidebar = ({ children }) => {
  const logoutFunc = useUserStore((state) => state.logoutUser)
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("lexigest_user_data"));
  const userData = localData?.user || "";

  const logout = async () => {
    try {
      await logoutFunc();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message || error);
    }
  };

  return (
    <aside >
      <nav className="sticky top-0 h-screen flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
          >
            <span className="text-cyan-800 text-2xl font-bold">LexConnect</span>
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {expanded ? (
              <ChevronDoubleLeftIcon
                aria-hidden="false"
                className="h-5 w-5 flex-none text-gray-800"
              />
            ) : (
              <ChevronDoubleRightIcon
                aria-hidden="false"
                className="h-5 w-5 flex-none text-gray-800"
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div>
          <ul className="px-3">
            <li onClick={() => logout()}
              className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors hover:bg-gray-100 text-gray-600
              `}
            >
              <PowerIcon className="size-5"/>
              <span
                className={`overflow-hidden transition-all
                ${expanded ? "w-52 ml-3" : "hidden"}`}
              >
                Cerrar sesión
              </span>
            </li>
          </ul>
        </div>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=0D8ABC&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semilbold">
                {userData?.first_name + " " + userData?.last_name}
              </h4>
              <span className="text-xs text-gray-600">{userData?.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export const SidebarItem = ({ icon, text, active, alert }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={`/${text}`}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors
        ${active ? "bg-gray-200" : "hover:bg-gray-100 text-gray-600"}
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all
          ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute rounded right-2 w-2 h-2 bg-cyan-600 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </li>
    </Link>
  );
};
