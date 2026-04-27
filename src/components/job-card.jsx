import { ArrowRight, BriefcaseBusiness, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function JobCard({ job }) {
  return (
    <Card className="rounded-[24px] border-0 bg-card/80 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.2)] backdrop-blur">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {job.department}
            </p>
            <h3 className="text-xl font-bold">{job.title}</h3>
          </div>
          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {job.type}
          </div>
        </div>

        <p className="mb-5 text-sm leading-6 text-muted-foreground">
          {job.shortDescription}
        </p>

        <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4" />
            {job.department}
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {job.salary}
          </div>
        </div>

        <Button asChild className="w-full rounded-full">
          <Link to={`/ariza/${job.branchId}/${job.id}`}>
            Ariza topshirish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}