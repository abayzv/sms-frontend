import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import Alert from "../alert";

export default function Layout({ children, title = "School Management System" }: { children: React.ReactNode, title?: string }) {
  return (
    <>
      <div className="flex">
        <Header title={title} />
        <Sidebar />
        <div className="min-h-[calc(100vh-4rem)] mt-16 w-[calc(100%-260px)] p-10">
          <Alert />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
