import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('admin_authenticated')?.value === 'true'

  if (!isAuthenticated) {
    redirect("/mmartveli/login")
  }

  return <AdminDashboard />
}
