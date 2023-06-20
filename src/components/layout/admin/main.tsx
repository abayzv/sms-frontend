import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

export default function Main({ children, title }: { children: React.ReactNode, title:  string }) {
  return (
    <>
      <div className="flex items-start">
        <Sidebar />
        <div className="w-full max-h-screen overflow-hidden">
          <Header title={title}  />
          <div className="p-10 flex flex-col h-screen overflow-y-auto">
            {children}
            <Footer />  
          </div>
        </div>
      </div>
    </>
  );
}
