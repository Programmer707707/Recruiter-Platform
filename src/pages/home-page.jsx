import { useEffect, useMemo, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import SiteNavbar from "../components/site-navbar"
import BranchCard from "../components/branch-card"
import { Button } from "@/components/ui/button"
import {
  BadgeCheck,
  Building2,
  Sparkles,
  Users2,
  ArrowRight,
  ChevronRight,
  Star,
  Globe,
  Zap,
} from "lucide-react"
import { getBranches } from "../lib/baserow"
import asltalimLogo from "../assets/asltalim.jpg" 

const stats = [
  {
    icon: Building2,
    label: "Filiallar",
    value: "3 ta",
    desc: "Toshkent markazida",
    boxClass:
      "bg-emerald-50 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400",
    lineClass: "bg-emerald-500",
  },
  {
    icon: Users2,
    label: "Xodimlar",
    value: "30+",
    desc: "Professional ustozlar",
    boxClass:
      "bg-sky-50 text-sky-600 dark:bg-slate-800 dark:text-sky-400",
    lineClass: "bg-sky-500",
  },
  {
    icon: BadgeCheck,
    label: "Imtiyozlar",
    value: "Premium",
    desc: "KPI va bonuslar",
    boxClass:
      "bg-amber-50 text-amber-600 dark:bg-slate-800 dark:text-amber-400",
    lineClass: "bg-amber-500",
  },
  {
    icon: Zap,
    label: "O'sish",
    value: "Fast-Track",
    desc: "Karyera lifti",
    boxClass:
      "bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400",
    lineClass: "bg-indigo-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadBranches() {
      try {
        setLoading(true)
        setError("")
        const data = await getBranches()

        if (!isMounted) return

        const normalized = (data || []).map((branch) => ({
          id: branch.id,
          name: branch.name || "",
          city: branch.city || "",
          description: branch.description || "",
          image:
            branch.image ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
        }))

        setBranches(normalized)
      } catch (err) {
        if (!isMounted) return
        setError("Filiallarni yuklashda xatolik yuz berdi.")
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    loadBranches()

    return () => {
      isMounted = false
    }
  }, [])

  const branchCountLabel = useMemo(() => {
    if (loading) return "..."
    return `${branches.length} ta`
  }, [branches.length, loading])

  const dynamicStats = useMemo(() => {
    return stats.map((item) =>
      item.label === "Filiallar"
        ? { ...item, value: branchCountLabel }
        : item
    )
  }, [branchCountLabel])

  return (
    <div className="relative min-h-screen bg-[#fafafa] selection:bg-emerald-200 dark:bg-slate-950">
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-emerald-500" style={{ scaleX }}/>

      <SiteNavbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-600/5" />
          <div className="absolute -right-[5%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/5" />
          <div className="absolute left-[40%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-400/5 blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/50 px-6 py-2 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Star className="h-3 w-3 fill-current" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
              O'zbekistondagi eng innovatsion o'quv markazi
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto max-w-5xl text-6xl font-[1000] leading-[0.95] tracking-tight text-slate-900 sm:text-7xl md:text-9xl dark:text-white"
          >
            Sizning{" "}
            <span className="relative inline-block text-emerald-600">
              Karyerangiz
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 20"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <path
                  d="M5 15C50 5 150 5 295 15"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>{" "}
            <br /> Shu Yerdan Boshlanadi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto mt-12 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl dark:text-slate-400"
          >
            Biz nafaqat bilim beramiz, balki professional jamoa va kelajakni
            quramiz. AslTa'lim oilasida o'z o'rningizni toping.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              size="xl"
              asChild
              className="h-20 rounded-[30px] bg-slate-950 px-12 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:bg-emerald-600 dark:bg-white dark:text-black dark:hover:bg-emerald-500 dark:hover:text-white"
            >
              <a href="#filiallar">Vakansiyalarni ko'rish</a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              asChild
              className="h-20 rounded-[30px] border-2 border-slate-200 bg-transparent px-12 text-xl font-black transition-all hover:border-emerald-500 hover:bg-white hover:text-black dark:border-slate-800"
            >
              <a href="#afzalliklar" className="flex items-center gap-2">
                Nega biz? <ChevronRight className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-20 left-20 hidden text-emerald-300 opacity-20 lg:block"
        >
          <Globe size={120} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute right-20 top-40 hidden text-blue-300 opacity-20 lg:block"
        >
          <Sparkles size={100} />
        </motion.div>
      </section>

      <section id="afzalliklar" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {dynamicStats.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-[48px] bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:bg-slate-900"
            >
              <div
                className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl ${item.boxClass}`}
              >
                <item.icon className="h-10 w-10 transition-transform group-hover:rotate-12" />
              </div>

              <h3 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <p className="mt-4 text-base font-medium text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>

              <div
                className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${item.lineClass}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section
        id="filiallar"
        className="relative overflow-hidden bg-slate-100/50 py-32 dark:bg-slate-900/20"
      >
        <div className="container mx-auto px-6">
          <div className="mb-24 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6 inline-block rounded-full bg-emerald-100 px-6 py-2 text-sm font-black uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              Bizning manzillar
            </motion.div>

            <h2 className="text-6xl font-[1000] tracking-tighter text-slate-900 md:text-8xl dark:text-white">
              Sizga Yaqin{" "}
              <span className="text-emerald-500 underline decoration-slate-300 underline-offset-8">
                Filialni
              </span>{" "}
              Tanlang
            </h2>
          </div>

          {loading && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                  Filiallar yuklanmoqda...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="rounded-3xl border border-red-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-red-900 dark:bg-slate-900/80">
                <p className="text-base font-semibold text-red-500">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && branches.length === 0 && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
                  Hozircha filiallar mavjud emas.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && branches.length > 0 && (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch, idx) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="transform transition-all duration-500 hover:-translate-y-4">
                    <BranchCard branch={branch} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="relative overflow-hidden rounded-[60px] bg-slate-950 px-8 py-24 text-center dark:bg-slate-900"
        >
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative z-10 space-y-10">
            <h2 className="text-6xl font-black leading-none tracking-tight text-white md:text-8xl">
              Keling, birga <br /> <span className="text-emerald-500">yuksalamiz!</span>
            </h2>
            <p className="mx-auto max-w-xl text-xl font-medium text-slate-400">
              AslTa'lim jamoasi doim eng iqtidorli va g'ayratli xodimlarni qidiradi.
              Muvaffaqiyatli karyerangizga birinchi qadamni tashlang.
            </p>
            <Button className="group h-24 rounded-full bg-white px-16 text-2xl font-[1000] text-slate-950 transition-all hover:bg-emerald-500 hover:text-white">
              HOZIROQ ARIZA TOPSHIRISH
              <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-3" />
            </Button>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-slate-200 pt-10 dark:border-slate-800 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-100 shadow-sm transition-all group-hover:scale-110 dark:border-slate-800">
            <img 
              src={asltalimLogo} 
              alt="Logo" 
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=AT" }}
            />
          </div>
            <span className="text-xl font-black dark:text-white">AslTa'lim</span>
          </div>
          <p className="text-sm font-bold text-slate-400">
            © 2026 Barcha huquqlar himoyalangan.
          </p>
        </div>
      </section>
    </div>
  )
}