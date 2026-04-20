import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
      isActive
        ? "bg-white/10 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-2xl text-sm font-medium transition ${
      isActive
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
        : "text-slate-300 hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-4 pt-4 pb-2">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#0f172a]/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 min-w-0 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-xl">💧</span>
            </div>

            <div className="min-w-0 leading-tight">
              <div className="text-[15px] sm:text-[18px] font-bold text-white truncate drop-shadow-md">
                Smart Water
              </div>
              <div className="hidden sm:block text-xs text-cyan-200/70">
                Liquid Glass Dashboard
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            
            {!token ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/leaderboard" className={linkClass}>
                  Leaderboard
                </NavLink>
                <NavLink to="/history" className={linkClass}>
                  History
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
              </>
            )}
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white shadow-sm hover:bg-white/10 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4">
            <div className="grid gap-2 rounded-3xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl p-3 shadow-2xl">
              <NavLink to="/" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
              
              {!token ? (
                <>
                  <NavLink to="/login" className={mobileLinkClass} onClick={() => setOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={mobileLinkClass} onClick={() => setOpen(false)}>
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/leaderboard"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Leaderboard
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    History
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={mobileLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}