import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

export default function Layout() {
  return (
    <div className="background flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden md:flex-row">
      <Navbar />
      <div className="flex-1 md:min-w-0 lg:min-h-0 lg:overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
