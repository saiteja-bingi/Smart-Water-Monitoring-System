import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Immersive Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen mix-blend-mode"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen mix-blend-mode"></div>

      <div className="w-full max-w-5xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Hero Text */}
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-300">Next-Gen Water Tracking</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-blue-400 drop-shadow-sm leading-tight">
            Every Drop <br className="hidden md:block"/> Connects Us
          </h1>
          
          <p className="text-lg text-cyan-100/70 max-w-xl mx-auto md:mx-0">
            Monitor your household water consumption in real-time. Gain insights, earn points for saving water, and climb the leaderboard with our smart liquid glass dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95 border border-white/20 text-center"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md font-bold text-white transition-all hover:bg-white/10 text-center"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Graphic (Abstract Liquid Glass Card) */}
        <div className="relative mx-auto w-full max-w-md hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[3rem] blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative rounded-[3rem] border border-white/10 bg-[#0f172a]/60 backdrop-blur-3xl shadow-2xl p-8 overflow-hidden aspect-square flex flex-col justify-between">
            {/* Mock Header */}
            <div className="flex justify-between items-center opacity-80">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">💧</div>
              <div className="h-4 w-24 bg-white/10 rounded-full"></div>
            </div>
            
            {/* Mock Dial/Circle */}
            <div className="my-8 relative mx-auto w-48 h-48 rounded-full border-[8px] border-white/5 flex items-center justify-center shadow-[inset_0_0_30px_rgba(34,211,238,0.2)]">
              <div className="absolute inset-2 rounded-full border-[4px] border-transparent border-t-cyan-400 border-r-cyan-400 rotate-45"></div>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">82%</span>
                <p className="text-xs text-cyan-200/50 mt-1">Water Remaining</p>
              </div>
            </div>

            {/* Mock Bars */}
            <div className="space-y-3 opacity-80">
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </div>
              <div className="h-3 w-4/5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}