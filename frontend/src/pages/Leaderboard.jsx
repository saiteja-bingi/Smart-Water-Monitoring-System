import { useEffect, useState } from "react";
import API from "../api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/leaderboard");
        // Assuming backend returns an array or an object with data array
        setLeaderboard(res.data.leaderboard || res.data || []);
      } catch (error) {
        console.log("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 sm:py-12 max-w-4xl mx-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 drop-shadow-md mb-3">
            Global Rankings
          </h1>
          <p className="text-cyan-100/70 text-lg">See who's saving the most water and earning points.</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-md">
            <p className="text-cyan-100/50">No leaderboard data available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((user, index) => {
              const isTop = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;
              
              return (
                <div 
                  key={user._id || index}
                  className={`relative flex items-center p-5 sm:p-6 rounded-2xl border backdrop-blur-xl transition-all hover:scale-[1.01] overflow-hidden ${
                    isTop ? "bg-yellow-500/10 border-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.15)]" : 
                    isSecond ? "bg-slate-300/10 border-slate-300/30" : 
                    isThird ? "bg-amber-700/10 border-amber-600/30" : 
                    "bg-white/5 border-white/10"
                  }`}
                >
                  {isTop && <div className="absolute left-0 top-0 w-1 bg-yellow-400 h-full shadow-[0_0_10px_rgba(250,204,21,1)]"></div>}
                  
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl font-bold text-xl mr-6 ${
                    isTop ? "bg-yellow-400/20 text-yellow-400" :
                    isSecond ? "bg-slate-300/20 text-slate-300" :
                    isThird ? "bg-amber-600/20 text-amber-500" :
                    "bg-white/5 text-cyan-200/50"
                  }`}>
                    #{index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{user.name}</h3>
                    <p className="text-sm text-cyan-100/50 truncate">Daily Saver</p>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-2xl font-black text-white flex items-center justify-end gap-1">
                      {user.points} <span className="text-yellow-400/80 text-lg">★</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}