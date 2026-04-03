import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

export default function Layout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden background md:flex-row">
      <Navbar />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
