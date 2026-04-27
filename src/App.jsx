import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home-page"
import VacanciesPage from "./pages/vacancies-page"
import ApplyPage from "./pages/apply-page"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vakansiyalar/:branchId" element={<VacanciesPage />} />
      <Route path="/ariza/:branchId/:positionId" element={<ApplyPage />} />
    </Routes>
  )
}