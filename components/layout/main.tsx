import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import Alert from "../alert";
import PopUp from "../popup";
import DeletePopUp from "../popup/delete-popup";
import { usePopup } from "@/store/usePopup";

export default function Layout({ children, title = "Mahestore" }: { children: React.ReactNode, title?: string }) {
  const { message } = usePopup();

  return (
    <>
      <div className="flex bg-white">
        <Header title={title} />
        <Sidebar />
        <div className="min-h-[calc(100vh-5rem)] mt-20 w-full p-10 rounded-tl-xl rounded-tr-xl bg-neutral-100">
          <Alert />
          <PopUp showButton={false} trigger="">
            <p className="w-2/3 text-center mt-5 text-gray-500">
              {message}
            </p>
          </PopUp>
          <DeletePopUp />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
