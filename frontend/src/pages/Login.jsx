import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 sm:py-12 flex items-center justify-center relative">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-[#0f172a]/60 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-6 sm:px-8 pt-10 pb-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-white/20">
              <span className="text-2xl drop-shadow-md">💧</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-cyan-100/60">Log in to your smart dashboard</p>
          </div>

          <div className="px-5 sm:px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                />
              </div>

              <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 border border-white/20 mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}