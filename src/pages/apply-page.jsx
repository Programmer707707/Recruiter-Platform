import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import SiteNavbar from "../components/site-navbar"
import SuccessDialog from "../components/success-dialog"
import {
  getBranches,
  getPositions,
  createApplication,
  createExperience,
  createCertificate,
} from "../lib/baserow"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const createExperienceItem = () => ({
  workplace: "",
  role: "",
  from: "",
  to: "",
})

const createCertificateItem = () => ({
  name: "",
  result: "",
  certificateId: "",
})

export default function ApplyPage() {
  const { branchId, positionId } = useParams()

  const [branches, setBranches] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [successOpen, setSuccessOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    telegram: "",
    phone: "",
    address: "",
    about: "",
    experiences: [createExperienceItem()],
    certificates: [createCertificateItem()],
  })

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        setLoading(true)
        setPageError("")

        const [branchesData, positionsData] = await Promise.all([
          getBranches(),
          getPositions(),
        ])

        if (!isMounted) return

        setBranches(
          (branchesData || []).map((branch) => ({
            id: String(branch.id),
            name: branch.name || "",
            city: branch.city || "",
            description: branch.description || "",
            image:
              branch.image ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
          }))
        )

        setPositions(
          (positionsData || []).map((job) => ({
            id: String(job.id),
            title: job.title || "",
            department: job.department || "",
            type: job.type || "",
            salary: job.salary || "",
            shortDescription: job.shortDescription || "",
          }))
        )
      } catch (error) {
        if (!isMounted) return
        setPageError("Ma'lumotlarni yuklashda xatolik yuz berdi.")
      } finally {
        if (!isMounted) return
        setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const branch = useMemo(
    () => branches.find((item) => String(item.id) === String(branchId)),
    [branches, branchId]
  )

  const position = useMemo(
    () => positions.find((item) => String(item.id) === String(positionId)),
    [positions, positionId]
  )

  const steps = [
    { id: 1, label: "Shaxsiy", icon: User },
    { id: 2, label: "Tajriba", icon: Briefcase },
    { id: 3, label: "Sertifikat", icon: GraduationCap },
    { id: 4, label: "Yakuniy", icon: Sparkles },
  ]

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "F.I.Sh kiritilishi shart"
      if (!formData.phone.trim()) newErrors.phone = "Telefon raqam majburiy"
      if (!formData.telegram.trim()) newErrors.telegram = "Telegram username majburiy"
      if (!formData.address.trim()) newErrors.address = "Manzilni kiriting"
    }

    if (step === 2) {
      formData.experiences.forEach((exp, i) => {
        if (!exp.workplace.trim()) newErrors[`exp-${i}-workplace`] = "Ish joyi majburiy"
        if (!exp.role.trim()) newErrors[`exp-${i}-role`] = "Lavozim majburiy"
        if (!exp.from) newErrors[`exp-${i}-from`] = "Boshlanish sanasi majburiy"
        if (!exp.to) newErrors[`exp-${i}-to`] = "Tugash sanasi majburiy"
      })
    }

    if (step === 3) {
      formData.certificates.forEach((cert, i) => {
        if (!cert.name.trim()) newErrors[`cert-${i}-name`] = "Nomi majburiy"
        if (!cert.result.trim()) newErrors[`cert-${i}-result`] = "Natija majburiy"
        if (!cert.certificateId.trim()) newErrors[`cert-${i}-certificateId`] = "Sertifikat ID majburiy"
      })
    }

    if (step === 4) {
      if (!formData.about.trim()) {
        newErrors.about = "Bu maydon majburiy"
      } else if (formData.about.trim().length < 20) {
        newErrors.about = "Kamida 20 ta belgi yozishingiz kerak"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1)
    setErrors({})
  }

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const updateExperience = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.experiences]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, experiences: updated }
    })

    const errorKey = `exp-${index}-${field}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }))
    }
  }

  const updateCertificate = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.certificates]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, certificates: updated }
    })

    const errorKey = `cert-${index}-${field}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }))
    }
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, createExperienceItem()],
    }))
  }

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, idx) => idx !== index),
    }))
  }

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, createCertificateItem()],
    }))
  }

  const removeCertificate = (index) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, idx) => idx !== index),
    }))
  }

  const handleSubmit = async () => {
    if (!validateStep(4) || !branch || !position) return

    try {
      setSubmitting(true)
      setPageError("")

      const applicationRow = await createApplication({
        full_name: formData.fullName,
        telegram: formData.telegram,
        phone: formData.phone,
        address: formData.address,
        about: formData.about,
        branch: [Number(branch.id)],
        position: [Number(position.id)],
        status: "new",
        created_at: new Date().toISOString().slice(0, 10),
      })

      const applicationId = Number(applicationRow.id)

      await Promise.all(
        formData.experiences.map((exp) =>
          createExperience({
            application: [applicationId],
            workplace: exp.workplace,
            role: exp.role,
            from: exp.from,
            to: exp.to,
          })
        )
      )

      await Promise.all(
        formData.certificates.map((cert) =>
          createCertificate({
            application: [applicationId],
            name: cert.name,
            result: cert.result,
            certificate_id: cert.certificateId,
          })
        )
      )

      setSuccessOpen(true)
    } catch (error) {
      setPageError("Arizani yuborishda xatolik yuz berdi.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
        <SiteNavbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="rounded-[32px] border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
              Sahifa yuklanmoqda...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (pageError && (!branch || !position)) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
        <SiteNavbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="rounded-[32px] border border-red-200 bg-white/80 px-8 py-6 text-center shadow-sm dark:border-red-900 dark:bg-slate-900/80">
            <p className="text-lg font-bold text-red-500">{pageError}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!branch || !position) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <SiteNavbar />

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <Link
          to={`/vakansiyalar/${branch.id}`}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-emerald-600"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white group-hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900">
            <ArrowLeft className="h-4 w-4" />
          </div>
          VAKANSIYALARGA QAYTISH
        </Link>

        <header className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> {branch.name}
            </div>
            <h1 className="mt-2 text-4xl font-[1000] tracking-tight text-slate-900 md:text-5xl dark:text-white">
              {position.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {steps.map((s) => (
              <div key={s.id} className="relative flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                    currentStep >= s.id
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </header>

        {pageError && branch && position && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-500/10">
            <p className="text-sm font-semibold text-red-500">{pageError}</p>
          </div>
        )}

        <Card className="overflow-hidden rounded-[40px] border-0 bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)] dark:bg-slate-900/50">
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepWrapper
                  key="1"
                  title="Shaxsiy ma'lumotlar"
                  desc="Aloqa ma'lumotlaringizni kiriting"
                >
                  <div className="grid gap-6">
                    <FormInput
                      label="To'liq F.I.Sh"
                      value={formData.fullName}
                      onChange={(v) => updateField("fullName", v)}
                      error={errors.fullName}
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormInput
                        label="Telefon"
                        value={formData.phone}
                        onChange={(v) => updateField("phone", v)}
                        error={errors.phone}
                        placeholder="+998"
                      />
                      <FormInput
                        label="Telegram"
                        value={formData.telegram}
                        onChange={(v) => updateField("telegram", v)}
                        error={errors.telegram}
                        placeholder="@"
                      />
                    </div>
                    <FormTextarea
                      label="Yashash manzili"
                      value={formData.address}
                      onChange={(v) => updateField("address", v)}
                      error={errors.address}
                    />
                  </div>
                </StepWrapper>
              )}

              {currentStep === 2 && (
                <StepWrapper
                  key="2"
                  title="Ish tajribasi"
                  desc="Oldingi ish joylaringiz haqida"
                >
                  <div className="space-y-6">
                    {formData.experiences.map((exp, i) => (
                      <div
                        key={i}
                        className="relative rounded-[32px] border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/20"
                      >
                        {formData.experiences.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperience(i)}
                            className="absolute right-6 top-6 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                          <FormInput
                            label="Ish joyi"
                            value={exp.workplace}
                            onChange={(v) => updateExperience(i, "workplace", v)}
                            error={errors[`exp-${i}-workplace`]}
                          />
                          <FormInput
                            label="Lavozim"
                            value={exp.role}
                            onChange={(v) => updateExperience(i, "role", v)}
                            error={errors[`exp-${i}-role`]}
                          />
                          <FormInput
                            type="month"
                            label="Dan"
                            value={exp.from}
                            onChange={(v) => updateExperience(i, "from", v)}
                            error={errors[`exp-${i}-from`]}
                          />
                          <FormInput
                            type="month"
                            label="Gacha"
                            value={exp.to}
                            onChange={(v) => updateExperience(i, "to", v)}
                            error={errors[`exp-${i}-to`]}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addExperience}
                      className="h-14 w-full rounded-2xl border-2 border-dashed"
                    >
                      <Plus className="mr-2 h-4 w-4" /> TAJRIBA QO'SHISH
                    </Button>
                  </div>
                </StepWrapper>
              )}

              {currentStep === 3 && (
                <StepWrapper
                  key="3"
                  title="Sertifikatlar"
                  desc="Yutuqlaringizni kiriting"
                >
                  <div className="space-y-6">
                    {formData.certificates.map((cert, i) => (
                      <div
                        key={i}
                        className="relative rounded-[32px] border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/20"
                      >
                        {formData.certificates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCertificate(i)}
                            className="absolute right-6 top-6 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}

                        <div className="grid gap-4 md:grid-cols-3">
                          <FormInput
                            label="Nomi"
                            value={cert.name}
                            onChange={(v) => updateCertificate(i, "name", v)}
                            error={errors[`cert-${i}-name`]}
                          />
                          <FormInput
                            label="Natija"
                            value={cert.result}
                            onChange={(v) => updateCertificate(i, "result", v)}
                            error={errors[`cert-${i}-result`]}
                          />
                          <FormInput
                            label="Sertifikat ID"
                            value={cert.certificateId}
                            onChange={(v) => updateCertificate(i, "certificateId", v)}
                            error={errors[`cert-${i}-certificateId`]}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addCertificate}
                      className="h-14 w-full rounded-2xl border-2 border-dashed"
                    >
                      <Plus className="mr-2 h-4 w-4" /> SERTIFIKAT QO'SHISH
                    </Button>
                  </div>
                </StepWrapper>
              )}

              {currentStep === 4 && (
                <StepWrapper
                  key="4"
                  title="Yakuniy bosqich"
                  desc="O'zingiz haqingizda qo'shimcha yozing"
                >
                  <FormTextarea
                    label="Nima uchun sizni tanlashimiz kerak?"
                    value={formData.about}
                    onChange={(v) => updateField("about", v)}
                    error={errors.about}
                    className="min-h-[250px]"
                  />
                </StepWrapper>
              )}
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8 dark:border-slate-800">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 1 || submitting}
                className="h-14 rounded-2xl px-8 font-bold disabled:opacity-30"
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> ORQAGA
              </Button>

              {currentStep === 4 ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="h-14 rounded-2xl bg-emerald-600 px-12 font-black text-white shadow-xl transition-all hover:bg-emerald-700 disabled:opacity-50"
                >
                  {submitting ? "YUBORILMOQDA..." : "ARIZANI TOPSHIRISH"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={submitting}
                  className="h-14 rounded-2xl bg-slate-950 px-12 font-black text-white shadow-xl dark:bg-white dark:text-black"
                >
                  KEYINGISI <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      <SuccessDialog open={successOpen} onOpenChange={setSuccessOpen} />
    </div>
  )
}

function StepWrapper({ children, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{title}</h2>
        <p className="text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
      {children}
    </motion.div>
  )
}

function FormInput({ label, error, onChange, ...props }) {
  return (
    <div className="space-y-2">
      <Label className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </Label>
      <Input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 rounded-2xl border-slate-200 bg-white px-5 font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 ${
          error ? "border-red-500 ring-1 ring-red-500" : ""
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  )
}

function FormTextarea({ label, error, onChange, className = "", ...props }) {
  return (
    <div className="space-y-2">
      <Label className="ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </Label>
      <Textarea
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-[24px] border-slate-200 bg-white p-5 font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 ${
          error ? "border-red-500 ring-1 ring-red-500" : ""
        } ${className}`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Vakansiya topilmadi</h1>
      <Link to="/" className="mt-4 text-emerald-600 underline">
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}