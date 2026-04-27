import { Link } from "react-router-dom"
import { ArrowRight, Building2, MapPin, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BranchCard({ branch }) {
  return (
    <Card className="group overflow-hidden rounded-[32px] border-0 bg-white/90 shadow-[0_20px_80px_-28px_rgba(16,185,129,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_100px_-30px_rgba(14,165,233,0.35)] dark:bg-slate-900/90 dark:shadow-[0_20px_80px_-28px_rgba(14,165,233,0.18)] dark:hover:shadow-[0_28px_100px_-30px_rgba(16,185,129,0.22)]">
      <div className="relative h-72 overflow-hidden">
        <img
          src={branch.image}
          alt={branch.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/20" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <MapPin className="mr-2 h-4 w-4" />
            {branch.city}
          </div>

          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Sparkles className="mr-2 h-4 w-4" />
            Faol filial
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
            <Building2 className="h-6 w-6" />
          </div>

          <h3 className="text-3xl font-black tracking-tight text-white">
            {branch.name}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
            {branch.description}
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-6 rounded-[24px] bg-gradient-to-r from-emerald-50 to-sky-50 p-4 dark:from-slate-800 dark:to-slate-900">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            AslTa'lim filiali
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Ushbu filialdagi ochiq vakansiyalarni ko‘rib chiqing va o‘zingizga mos
            lavozim uchun ariza topshiring.
          </p>
        </div>

        <Button
          asChild
          className="h-12 w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600"
        >
          <Link
            to={`/vakansiyalar/${branch.id}`}
            className="group/link flex items-center justify-center"
          >
            Vakansiyalarni ko‘rish
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}