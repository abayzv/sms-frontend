import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import Alert from "../alert";

export default function Layout({ children, title = "School Management System" }: { children: React.ReactNode, title?:  string }) {
  return (
    <>
      <div className="flex items-start">
        <Sidebar />
        <div className="w-full max-h-screen overflow-hidden">
          <Header title={title}  />
          <div className="p-10 flex flex-col h-screen overflow-y-auto">
            <Alert message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, accusantium?" type="success" />
            {children}
            <Footer />  
          </div>
        </div>
      </div>
    </>
  );
}
