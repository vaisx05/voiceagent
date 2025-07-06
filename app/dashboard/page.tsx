"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PhoneCall,
  History,
  Package,
  Settings,
  Users,
  FileText,
  LogOut,
  Phone,
  CheckCircle,
  Trash2,
  Plus,
} from "lucide-react"

interface User {
  FirstName: string
  LastName: string
  role: string
}

interface Product {
  pid: string
  productname: string
  productdescription: string
  productkeydetails: string
}

interface CallHistory {
  id: string
  mobilenumber: string
  productname: string
  call_sid: string
  status: string
  timestamp: string
  transferred_to_agent: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("makeCall")
  const [user, setUser] = useState<User>({ FirstName: "John", LastName: "Doe", role: "Agent" })
  const [products, setProducts] = useState<Product[]>([
    {
      pid: "1",
      productname: "Premium CRM Software",
      productdescription: "Advanced customer relationship management solution with AI-powered insights",
      productkeydetails: "Cloud-based, 24/7 support, Advanced analytics, Mobile app",
    },
    {
      pid: "2",
      productname: "Marketing Automation Suite",
      productdescription: "Complete marketing automation platform for lead generation and nurturing",
      productkeydetails: "Email campaigns, Lead scoring, Social media integration, ROI tracking",
    },
  ])
  const [callHistory, setCallHistory] = useState<CallHistory[]>([
    {
      id: "1",
      mobilenumber: "+1234567890",
      productname: "Premium CRM Software",
      call_sid: "CA1234567890abcdef",
      status: "completed",
      timestamp: "2024-01-07 14:30:00",
      transferred_to_agent: "y",
    },
    {
      id: "2",
      mobilenumber: "+1987654321",
      productname: "Marketing Automation Suite",
      call_sid: "CA0987654321fedcba",
      status: "completed",
      timestamp: "2024-01-07 13:15:00",
      transferred_to_agent: "n",
    },
  ])
  const [callForm, setCallForm] = useState({ phone_number: "", product_id: "" })
  const [productForm, setProductForm] = useState({ productname: "", productdescription: "", productkeydetails: "" })
  const [callResult, setCallResult] = useState("")
  const [isAdmin] = useState(true) // For demo purposes

  useEffect(() => {
    // Check if user is logged in
    const username = sessionStorage.getItem("username")
    if (!username) {
      window.location.href = "/login"
    }
  }, [])

  const handleMakeCall = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!callForm.phone_number.startsWith("+")) {
      setCallResult("Phone number must start with + (country code)")
      return
    }

    if (!callForm.product_id) {
      setCallResult("Please select a product")
      return
    }

    setCallResult("Initiating call...")

    // Simulate API call
    setTimeout(() => {
      const newCall: CallHistory = {
        id: (callHistory.length + 1).toString(),
        mobilenumber: callForm.phone_number,
        productname: products.find((p) => p.pid === callForm.product_id)?.productname || "Unknown",
        call_sid: `CA${Math.random().toString(36).substr(2, 16)}`,
        status: "completed",
        timestamp: new Date().toLocaleString(),
        transferred_to_agent: Math.random() > 0.5 ? "y" : "n",
      }

      setCallHistory([newCall, ...callHistory])
      setCallResult(`Call initiated successfully! Call SID: ${newCall.call_sid}`)
      setCallForm({ phone_number: "", product_id: "" })
    }, 2000)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct: Product = {
      pid: (products.length + 1).toString(),
      productname: productForm.productname,
      productdescription: productForm.productdescription,
      productkeydetails: productForm.productkeydetails,
    }

    setProducts([...products, newProduct])
    setProductForm({ productname: "", productdescription: "", productkeydetails: "" })
    alert("Product added successfully!")
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.pid !== productId))
      alert("Product deleted successfully!")
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    window.location.href = "/login"
  }

  const tabs = [
    { id: "makeCall", label: "Make Call", icon: <Phone className="w-4 h-4" /> },
    { id: "callHistory", label: "Call History", icon: <History className="w-4 h-4" /> },
    { id: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    ...(isAdmin
      ? [
          { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
          { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
          { id: "logs", label: "System Logs", icon: <FileText className="w-4 h-4" /> },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Call Agent Dashboard</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-medium">
                Welcome, {user.FirstName} {user.LastName}
              </p>
              <p className="text-blue-100 text-sm">Role: {user.role}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Make Call Tab */}
          {activeTab === "makeCall" && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Make a Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMakeCall} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone Number (with country code)</Label>
                      <Input
                        id="phone_number"
                        type="tel"
                        placeholder="+1234567890"
                        value={callForm.phone_number}
                        onChange={(e) => setCallForm({ ...callForm, phone_number: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product_id">Select Product</Label>
                      <Select
                        value={callForm.product_id}
                        onValueChange={(value) => setCallForm({ ...callForm, product_id: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="-- Select a Product --" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.pid} value={product.pid}>
                              {product.productname} (ID: {product.pid})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Make Call
                  </Button>
                </form>

                {callResult && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <p className="text-blue-800">{callResult}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Call History Tab */}
          {activeTab === "callHistory" && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Call History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-700">ID</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Phone Number</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Product</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Call SID</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Timestamp</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Transferred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callHistory.map((call) => (
                        <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">{call.id}</td>
                          <td className="p-3">{call.mobilenumber}</td>
                          <td className="p-3">{call.productname}</td>
                          <td className="p-3 font-mono text-sm">{call.call_sid}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {call.status}
                            </span>
                          </td>
                          <td className="p-3">{call.timestamp}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                call.transferred_to_agent === "y"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {call.transferred_to_agent === "y" ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.pid} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">{product.productname}</h3>
                            <p className="text-gray-700 mb-3">{product.productdescription}</p>
                            <div className="text-sm text-gray-600">
                              <strong>Key Details:</strong> {product.productkeydetails}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">ID: {product.pid}</div>
                          </div>
                          {isAdmin && (
                            <Button
                              onClick={() => handleDeleteProduct(product.pid)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {isAdmin && (
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-600" />
                      Add New Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProduct} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="productname">Product Name</Label>
                        <Input
                          id="productname"
                          value={productForm.productname}
                          onChange={(e) => setProductForm({ ...productForm, productname: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productdescription">Product Description</Label>
                        <Textarea
                          id="productdescription"
                          value={productForm.productdescription}
                          onChange={(e) => setProductForm({ ...productForm, productdescription: e.target.value })}
                          required
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productkeydetails">Key Details</Label>
                        <Textarea
                          id="productkeydetails"
                          value={productForm.productkeydetails}
                          onChange={(e) => setProductForm({ ...productForm, productkeydetails: e.target.value })}
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && isAdmin && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800">
                      <strong>Current Agent Forwarding Number:</strong> +1234567890
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent_phone_number">Agent Phone Number (for call transfers)</Label>
                      <Input
                        id="agent_phone_number"
                        type="tel"
                        placeholder="+1234567890"
                        defaultValue="+1234567890"
                        className="h-12"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Update Settings
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Tab */}
          {activeTab === "users" && isAdmin && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Registered Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-700">ID</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Phone Number</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">1</td>
                        <td className="p-3">John Doe</td>
                        <td className="p-3">+1234567890</td>
                        <td className="p-3">john.doe@example.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Admin
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">2</td>
                        <td className="p-3">Jane Smith</td>
                        <td className="p-3">+1987654321</td>
                        <td className="p-3">jane.smith@example.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Agent
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Logs Tab */}
          {activeTab === "logs" && isAdmin && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View Detailed Logs
                  </Button>

                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>[2024-01-07 14:30:15] INFO: Call initiated to +1234567890</div>
                    <div>[2024-01-07 14:30:16] INFO: AI agent connected successfully</div>
                    <div>[2024-01-07 14:32:45] INFO: Interest detected, transferring to agent</div>
                    <div>[2024-01-07 14:32:46] INFO: Call transferred successfully</div>
                    <div>[2024-01-07 14:35:12] INFO: Call completed, duration: 4m 57s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
