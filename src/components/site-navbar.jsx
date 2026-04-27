import { Link, NavLink } from "react-router-dom"
import asltalimLogo from "../assets/asltalim.jpg" 
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle" 

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        <Link to="/" className="group flex items-center gap-4">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-100 shadow-sm transition-all group-hover:scale-110 dark:border-slate-800">
            <img 
              src={asltalimLogo} 
              alt="Logo" 
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=AT" }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-[1000] leading-none tracking-tighter text-slate-900 dark:text-white">
              AslTa'lim
            </h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
              Karyera
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <NavLink to="/" className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 dark:text-slate-300"}`}>
            Bosh sahifa
          </NavLink>
          <a href="#filiallar" className="text-sm font-bold text-slate-600 hover:text-emerald-500 dark:text-slate-300">Filiallar</a>
          <a href="#afzalliklar" className="text-sm font-bold text-slate-600 hover:text-emerald-500 dark:text-slate-300">Nega biz?</a>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="hidden h-11 rounded-full bg-slate-950 px-8 font-bold text-white hover:bg-emerald-600 sm:flex dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-white">
            <a href="#filiallar">A'zo bo'lish</a>
          </Button>
        </div>
      </div>
    </header>
  )
}