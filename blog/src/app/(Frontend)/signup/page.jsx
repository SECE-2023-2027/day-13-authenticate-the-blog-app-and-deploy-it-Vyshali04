'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const handleRegister = (e) => {
    e.preventDefault()

    // Get existing users
    const stored = localStorage.getItem('users')
    const users = stored ? JSON.parse(stored) : []

    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      alert('User already registered!')
      return
    }

    // Add new user
    users.push({ email, password, role })
    localStorage.setItem('users', JSON.stringify(users))

    alert(`Registered successfully as ${role.toUpperCase()}`)
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Register as</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            className="text-green-600 hover:underline"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}
