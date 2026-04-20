import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/water/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (error) {
        toast.error("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 sm:py-12 max-w-5xl mx-auto relative">
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-sm mb-2">
            Usage History
          </h1>
          <p className="text-cyan-100/60">Your recent water consumption logs</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-md">
            <p className="text-cyan-100/50">No history data available.</p>
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0f172a]/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-5 font-semibold text-cyan-200/80">Date</th>
                    <th className="p-5 font-semibold text-cyan-200/80">Water Level</th>
                    <th className="p-5 font-semibold text-cyan-200/80">Remaining (L)</th>
                    <th className="p-5 font-semibold text-cyan-200/80">Used (L)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((log) => (
                    <tr key={log._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 text-white/90">
                        {new Date(log.createdAt).toLocaleDateString()} <span className="text-sm text-cyan-100/40 ml-2">{new Date(log.createdAt).toLocaleTimeString()}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-full max-w-[100px] h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              style={{ width: `${log.waterPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-medium">{log.waterPercent}%</span>
                        </div>
                      </td>
                      <td className="p-5 text-white font-medium">{log.remainingLiters}L</td>
                      <td className="p-5 text-cyan-400 font-medium">-{log.usedLiters}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}