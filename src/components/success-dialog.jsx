import { CheckCircle2, PartyPopper, ArrowRight, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function SuccessDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-[40px] border-0 p-0 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.25)] sm:max-w-md dark:bg-slate-900">
        <div className="relative overflow-hidden p-10 text-center">
          
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />

          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
            className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[32px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]"
          >
            <CheckCircle2 className="h-12 w-12 text-white" />
            
            {/* Kichik dekorativ uchqun */}
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-2 -top-2"
            >
              <PartyPopper className="h-8 w-8 text-amber-400" />
            </motion.div>
          </motion.div>

          {/* Matn qismi */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-[1000] tracking-tight text-slate-900 dark:text-white">
              Tabriklaymiz!
            </h3>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Arizangiz muvaffaqiyatli qabul qilindi. Bizning HR jamoamiz uni ko'rib chiqib, 
              <span className="font-bold text-emerald-600 dark:text-emerald-400"> 24 soat ichida </span> 
              siz bilan bog'lanishadi.
            </p>
          </motion.div>

          {/* Tugmalar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 space-y-4"
          >
            <Button 
              asChild 
              className="group h-14 w-full rounded-2xl bg-slate-950 text-base font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-white"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="h-5 w-5" />
                Bosh sahifaga qaytish
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm font-bold tracking-widest text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
            >
              YOPISH
            </button>
          </motion.div>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500" />
      </DialogContent>
    </Dialog>
  )
}