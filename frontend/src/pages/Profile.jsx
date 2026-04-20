import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 sm:py-12 flex justify-center relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-[#0f172a]/60 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Header area */}
          <div className="bg-gradient-to-br from-white/5 to-transparent px-8 py-10 border-b border-white/10 text-center relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(34,211,238,0.4)] mb-4 border border-white/20 transform rotate-3">
              <span className="-rotate-3 text-white">👤</span>
            </div>
            <h1 className="text-3xl font-black text-white">{profile.name}</h1>
            <p className="text-cyan-100/60 mt-1">{profile.email}</p>
            
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 font-bold shadow-[inset_0_0_10px_rgba(250,204,21,0.1)]">
              ⭐ {profile.points} Total Points
            </div>
          </div>

          {/* Details area */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-cyan-400">⚙️</span> Tank Configuration
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/5">
                <p className="text-sm text-cyan-100/50 mb-1">Total Capacity</p>
                <p className="text-2xl font-bold text-white">{profile.tankCapacity} <span className="text-cyan-400 text-lg">L</span></p>
              </div>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/5">
                <p className="text-sm text-cyan-100/50 mb-1">Tank Height</p>
                <p className="text-2xl font-bold text-white">{profile.tankHeight} <span className="text-cyan-400 text-lg">cm</span></p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl border border-red-500/30 bg-red-500/10 font-bold text-red-400 transition-all hover:bg-red-500/20 active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}