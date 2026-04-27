import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Wallet,
  Clock,
  Sparkles,
  Building2,
} from "lucide-react"
import SiteNavbar from "../components/site-navbar"
import { getBranches, getPositions } from "../lib/baserow"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function extractLinkedRowId(value) {
  if (Array.isArray(value) && value.length > 0) {
    const first = value[0]

    if (typeof first === "number" || typeof first === "string") {
      return String(first)
    }

    if (typeof first === "object" && first !== null) {
      if (first.id) return String(first.id)
      if (first.value?.id) return String(first.value.id)
    }
  }

  if (typeof value === "number" || typeof value === "string") {
    return String(value)
  }

  if (typeof value === "object" && value !== null && value.id) {
    return String(value.id)
  }

  return null
}

export default function VacanciesPage() {
  const { branchId } = useParams()

  const [branches, setBranches] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadPageData() {
      try {
        setLoading(true)
        setError("")

        const [branchesData, positionsData] = await Promise.all([
          getBranches(),
          getPositions(),
        ])

        if (!isMounted) return

        const normalizedBranches = (branchesData || []).map((branch) => ({
          id: String(branch.id),
          name: branch.name || "",
          city: branch.city || "",
          description: branch.description || "",
          image:
            branch.image ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
        }))

        const normalizedPositions = (positionsData || []).map((job) => ({
          id: String(job.id),
          title: job.title || "",
          department: job.department || "",
          type: job.type || "",
          salary: job.salary || "",
          shortDescription: job.shortDescription || "",
          is_open: job.is_open === true,
          branchId: extractLinkedRowId(job.branch),
        }))

        setBranches(normalizedBranches)
        setPositions(normalizedPositions)
      } catch (err) {
        setError("Vakansiyalarni yuklashda xatolik yuz berdi.")
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    loadPageData()

    return () => {
      isMounted = false
    }
  }, [])

  const branch = useMemo(() => {
    return branches.find((item) => String(item.id) === String(branchId))
  }, [branches, branchId])

  const branchJobs = useMemo(() => {
    return positions.filter(
      (item) =>
        String(item.branchId) === String(branchId) &&
        item.is_open === true
    )
  }, [positions, branchId])

  if (!loading && !error && !branch) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-emerald-100 dark:bg-slate-950">
      <SiteNavbar />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-emerald-600"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Orqaga qaytish
          </Link>
        </motion.div>

        {loading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="rounded-[32px] border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
                Vakansiyalar yuklanmoqda...
              </p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="rounded-[32px] border border-red-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-red-900 dark:bg-slate-900/80">
              <p className="text-lg font-bold text-red-500">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && branch && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-20 overflow-hidden rounded-[48px] border border-white bg-white/40 p-4 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="relative h-[400px] overflow-hidden rounded-[40px]">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="flex flex-col justify-center p-4 lg:p-8">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <Badge className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <MapPin className="mr-1.5 h-3 w-3" />
                      {branch.city}
                    </Badge>

                    <Badge className="rounded-full bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                      <Sparkles className="mr-1.5 h-3 w-3" />
                      {branchJobs.length} ta vakansiya
                    </Badge>
                  </div>

                  <h1 className="text-5xl font-[1000] tracking-tighter text-slate-900 md:text-6xl dark:text-white">
                    {branch.name}
                  </h1>

                  <p className="mt-8 text-xl font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                    {branch.description}
                  </p>

                  <div className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-8 dark:border-slate-800">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-bold uppercase tracking-tight text-slate-400">
                      Jamoamizga qo'shiling
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Ochiq pozitsiyalar
              </h2>
              <div className="mx-8 hidden h-px flex-1 bg-slate-100 dark:bg-slate-800 md:block" />
            </div>

            {branchJobs.length === 0 ? (
              <div className="rounded-[36px] border border-slate-200 bg-white/80 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                  Hozircha bu filial uchun ochiq vakansiyalar yo‘q.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2">
                {branchJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden rounded-[40px] border-0 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] dark:bg-slate-900/80">
                      <div className="relative z-10">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-500 dark:bg-slate-800">
                            <BriefcaseBusiness className="h-7 w-7" />
                          </div>

                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 px-4 py-1 font-bold text-slate-500 dark:border-slate-700"
                          >
                            <Clock className="mr-1.5 h-3 w-3" />
                            {job.type}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                            {job.department}
                          </p>
                          <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                            {job.title}
                          </h3>
                        </div>

                        <p className="mb-8 line-clamp-2 text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                          {job.shortDescription}
                        </p>

                        <div className="mb-10 flex flex-wrap gap-6 border-t border-slate-50 pt-8 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-500 dark:bg-sky-500/10">
                              <Wallet className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                              {job.salary}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-500 dark:bg-amber-500/10">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                              {job.department}
                            </span>
                          </div>
                        </div>

                        <Button
                          asChild
                          className="h-16 w-full rounded-[24px] bg-slate-950 text-lg font-bold text-white shadow-xl transition-all hover:bg-emerald-600 hover:shadow-emerald-500/20 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-white"
                        >
                          <Link to={`/ariza/${branch.id}/${job.id}`}>
                            Ariza topshirish
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 rounded-full bg-red-50 p-6 dark:bg-red-500/10">
        <Building2 className="h-12 w-12 text-red-500" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white">
        Filial topilmadi
      </h1>
      <p className="mt-4 text-slate-500">
        Kechirasiz, siz qidirayotgan filial bazada mavjud emas.
      </p>
      <Button
        asChild
        className="mt-8 h-14 rounded-2xl bg-emerald-500 px-8 font-bold text-white"
      >
        <Link to="/">Bosh sahifaga qaytish</Link>
      </Button>
    </div>
  )
}