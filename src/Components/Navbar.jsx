import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaClock, FaHistory, FaHome, FaStopwatch, FaTasks } from "react-icons/fa";
import { ArrowRight, Menu, User, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <FaHome className="shrink-0" />,
  },
  {
    to: "/timer",
    label: "Timer",
    icon: <FaClock className="shrink-0" />,
  },
  {
    to: "/stopwatch",
    label: "Stopwatch",
    icon: <FaStopwatch className="shrink-0" />,
  },
  {
    to: "/task",
    label: "Task",
    icon: <FaTasks className="shrink-0" />,
  },
  {
    to: "/history",
    label: "History",
    icon: <FaHistory className="shrink-0" />,
  },
];

const navLinkClassName = ({ isActive }) =>
  [
    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200",
    isActive
      ? "bg-slate-800 text-white shadow-sm ring-1 ring-slate-700"
      : "text-slate-300 hover:bg-slate-800/70 hover:text-white",
  ].join(" ");

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      setIsMobileMenuOpen(false);
      logout();
      navigate("/login");
    }
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <nav className="border-b border-slate-700 bg-slate-900/95 px-4 py-4 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/dashboard"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-bold text-sky-300 ring-1 ring-sky-400/20">
              F
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-white">FocusFlow</p>
              <p className="truncate text-sm text-slate-400">
                {user?.username ? `Signed in as ${user.username}` : "Stay focused"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-950/70 md:hidden"
        />
      ) : null}

      <nav
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-slate-700 bg-slate-900 text-white shadow-2xl transition-transform duration-300 md:static md:z-auto md:w-72 md:shrink-0 md:translate-x-0 md:shadow-none lg:h-dvh",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-5">
          <Link
            to="/dashboard"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-bold text-sky-300 ring-1 ring-sky-400/20">
              F
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">FocusFlow</p>
              <p className="truncate text-sm text-slate-400">Productivity that keeps moving</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="rounded-xl border border-slate-700 p-2 text-slate-300 transition-colors hover:border-slate-500 hover:text-white md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <main className="flex flex-1 flex-col justify-between gap-6 px-4 py-5">
          <section>
            <ul className="space-y-2">
              {navItems.map(({ to, label, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={navLinkClassName}
                    onClick={closeMobileMenu}
                  >
                    {icon}
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-700/80 text-slate-100">
                <User size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">{user?.username ?? "Guest"}</p>
                <p className="text-sm text-slate-400">Ready for your next focus block</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-600 px-3 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-sky-400 hover:bg-sky-500/10"
            >
              Logout
              <ArrowRight size={18} />
            </button>
          </section>
        </main>
      </nav>
    </>
  );
}
