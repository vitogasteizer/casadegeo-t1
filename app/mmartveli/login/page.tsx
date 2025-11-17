'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/mmartveli')
        router.refresh()
      } else {
        setError(data.error || 'არასწორი პაროლი')
      }
    } catch (err) {
      setError('შეცდომა, სცადეთ თავიდან')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            მმართველის პანელი
          </CardTitle>
          <CardDescription className="text-center">
            შეიყვანეთ პაროლი შესასვლელად
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="პაროლი"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 text-center">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'შემოწმება...' : 'შესვლა'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
