import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import Alert from "../alert";

export default function Layout({ children, title = "Mahestore" }: { children: React.ReactNode, title?: string }) {
  return (
    <>
      <div className="flex bg-white">
        <Header title={title} />
        <Sidebar />
        <div className="min-h-[calc(100vh-4rem)] mt-20 w-[calc(100%-260px)] p-10 rounded-tl-xl rounded-tr-xl bg-neutral-100">
          <Alert />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
