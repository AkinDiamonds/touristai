import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Parentview() {
  return (
    <div className="flex h-screen w-full bg-[#f8f7f4]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Parentview;