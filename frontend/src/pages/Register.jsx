import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tankCapacity: "",
    tankHeight: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        tankCapacity: Number(form.tankCapacity),
        tankHeight: Number(form.tankHeight)
      };
      const res = await API.post("/auth/register", payload);
      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 sm:py-12 flex items-center justify-center relative">
      {/* Decorative blurs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-[#0f172a]/60 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-6 sm:px-8 pt-10 pb-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-white/20">
              <span className="text-2xl drop-shadow-md">💧</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-cyan-100/60">Join the smart water network</p>
          </div>

          <div className="px-5 sm:px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="tankCapacity"
                  placeholder="Tank (L)"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                />

                <input
                  type="number"
                  name="tankHeight"
                  placeholder="Height (cm)"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                />
              </div>

              <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 border border-white/20 mt-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}