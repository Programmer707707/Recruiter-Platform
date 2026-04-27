import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Shaxsiy ma'lumot" },
  { id: 2, title: "Tajriba va sertifikatlar" },
  { id: 3, title: "Yakunlash" }
]

export default function ApplicationStepper({ currentStep }) {
  return (
    <div className="rounded-[28px] border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ariza topshirish</h2>
          <p className="text-sm text-muted-foreground">AslTa'lim nomzodlar portali</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {currentStep} / 3 bosqich
          </p>
          <p className="text-sm text-muted-foreground">
            {Math.round((currentStep / 3) * 100)}% bajarildi
          </p>
        </div>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm font-medium transition",
              currentStep >= step.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-muted/40 text-muted-foreground"
            )}
          >
            {step.id}. {step.title}
          </div>
        ))}
      </div>
    </div>
  )
}