"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneCall, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    if (!formData.mobile_number.startsWith("+")) {
      setError("Mobile number must include country code (e.g., +1234567890)")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, accept the signup
      alert("Account created successfully! Please log in.")
      window.location.href = "/login"
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Call Agent AI</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <p className="text-gray-600 mt-2">Create an employee account for the Call Agent system</p>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                  <p className="text-xs text-gray-500">3-20 characters, alphanumeric and underscore only</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile_number" className="text-sm font-medium text-gray-700">
                  Mobile Number (with country code) *
                </Label>
                <Input
                  id="mobile_number"
                  name="mobile_number"
                  type="tel"
                  required
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+1234567890"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-12 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Minimum 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      className="h-12 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
