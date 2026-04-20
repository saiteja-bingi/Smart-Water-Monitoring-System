import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
      </div>
    );
  }

  const { user, latest, alert } = data;

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 max-w-7xl mx-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-sm">
              Welcome, {user.name}
            </h1>
            <p className="text-cyan-100/60 mt-1">Here is your live water usage dashboard</p>
          </div>
          
          <button
            onClick={fetchDashboard}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-105 active:scale-95 border border-white/20 whitespace-nowrap"
          >
            Refresh Data
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                💧
              </div>
              <p className="text-sm font-medium text-cyan-100/70">Water Remaining</p>
            </div>
            <h2 className="text-4xl font-black text-white drop-shadow-md">
              {latest?.waterPercent || 0}<span className="text-2xl text-cyan-400">%</span>
            </h2>
          </div>

          {/* Card 2 */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
                📏
              </div>
              <p className="text-sm font-medium text-cyan-100/70">Remaining Vol</p>
            </div>
            <h2 className="text-4xl font-black text-white drop-shadow-md">
              {latest?.remainingLiters || 0}<span className="text-2xl text-cyan-400">L</span>
            </h2>
          </div>

          {/* Card 3 */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                📉
              </div>
              <p className="text-sm font-medium text-cyan-100/70">Used Vol</p>
            </div>
            <h2 className="text-4xl font-black text-white drop-shadow-md">
              {latest?.usedLiters || 0}<span className="text-2xl text-cyan-400">L</span>
            </h2>
          </div>

          {/* Card 4 */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-[40px]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 group-hover:bg-yellow-500/30 transition-colors">
                  ⭐
                </div>
                <p className="text-sm font-medium text-cyan-100/70">Total Points</p>
              </div>
              <h2 className="text-4xl font-black text-white drop-shadow-md">
                {user.points || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          {/* Alert Status Card */}
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${alert.includes("Low") ? "bg-red-500 animate-ping" : "bg-green-500 animate-pulse"}`}></div>
              <h3 className="text-xl font-bold text-white">System Status</h3>
            </div>
            <div className={`p-5 rounded-2xl border ${
              alert.includes("Low") 
                ? "bg-red-500/10 border-red-500/30 text-red-200" 
                : "bg-green-500/10 border-green-500/30 text-green-200"
            }`}>
              <p className="font-semibold">{alert}</p>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0f172a]/40 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <span>💡</span> Smart Recommendations
            </h3>
            <ul className="space-y-4">
              {["Turn off tap while brushing to save 15L daily.",
                "Reuse RO waste water for cleaning or gardening.",
                "Check for minor bathroom leaks regularly."].map((rec, i) => (
                <li key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span className="text-cyan-100/80 text-sm leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}