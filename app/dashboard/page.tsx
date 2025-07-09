"use client"

import { useState, useEffect, useRef } from "react"
import {
  PhoneCall, Phone, History, Package, Settings, Users, FileText, LogOut, Plus, CheckCircle, Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import * as XLSX from "xlsx"

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
  const [callError, setCallError] = useState("")
  const [productForm, setProductForm] = useState({ productname: "", productdescription: "", productkeydetails: "" })
  const [callResult, setCallResult] = useState("")
  const [isAdmin] = useState(true) // For demo purposes

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Batch call state
  const [batchProductId, setBatchProductId] = useState("")
  const [batchFile, setBatchFile] = useState<File | null>(null)
  const [batchRows, setBatchRows] = useState<any[]>([])
  const [batchError, setBatchError] = useState("")
  const [batchUploading, setBatchUploading] = useState(false)
  const [batchInitMsg, setBatchInitMsg] = useState("")

  // Snackbar state
  const [snackbarMsg, setSnackbarMsg] = useState("")

  // Ref for batch file input
  const batchFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const username = sessionStorage.getItem("username")
    if (!username) {
      window.location.href = "/login"
    }
  }, [])

  // Add this helper for US phone validation and formatting
  const formatUSPhone = (value: string) => {
    // Remove all non-digit except +
    let digits = value.replace(/[^\d+]/g, "")
    // Always start with +1
    if (!digits.startsWith("+1")) {
      digits = "+1" + digits.replace(/^\+?1?/, "")
    }
    // Limit to +1 and 10 digits
    digits = digits.slice(0, 12)
    return digits
  }

  // Format as +1 (XXX) XXX-XXXX while typing
  const formatUSPhonePretty = (value: string) => {
    // Remove all non-digit except +
    let digits = value.replace(/[^\d]/g, "")
    if (digits === "") return ""
    if (digits.startsWith("1")) digits = digits.slice(1)
    digits = digits.slice(0, 10)
    let formatted = "+1"
    if (digits.length > 0) formatted += " ("
    if (digits.length >= 1) formatted += digits.slice(0, 3)
    if (digits.length >= 3) formatted += ") "
    if (digits.length >= 4) formatted += digits.slice(3, 6)
    if (digits.length >= 6) formatted += "-"
    if (digits.length >= 7) formatted += digits.slice(6, 10)
    return formatted
  }

  // US phone input: always starts with +1, only digits after
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/[^\d]/g, "")
    // Remove leading 1 if present (to avoid +11...)
    if (digits.startsWith("1")) digits = digits.slice(1)
    digits = digits.slice(0, 10)
    let formatted = digits.length > 0 ? `+1${digits}` : ""
    setCallForm({ ...callForm, phone_number: formatted })
    setCallError("")
  }

  const handleMakeCall = (e: React.FormEvent) => {
    e.preventDefault()
    // US number validation: must be +1 and 12 chars (+1XXXXXXXXXX)
    if (!/^\+1\d{10}$/.test(callForm.phone_number)) {
      setCallError("Please enter a valid US phone number (+1XXXXXXXXXX).")
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

  // Update handleBatchFileUpload to support Name and Phone Number columns:
  const handleBatchFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatchError("")
    setBatchInitMsg("")
    const file = e.target.files?.[0]
    if (!file) return
    setBatchFile(file)
    setBatchUploading(true)
    setBatchRows([])

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        // Find header indices
        const header = rows[0] as string[]
        const nameIdx = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("name"))
        const phoneIdx = header.findIndex((h) => typeof h === "string" && h.toLowerCase().includes("phone"))
        if (nameIdx === -1 || phoneIdx === -1) {
          setBatchError("File must have 'Name' and 'Phone Number' columns.")
          setBatchUploading(false)
          return
        }
        const dataRows = rows.slice(1)
          .filter((row: any) => row[phoneIdx]) // skip empty rows
          .map((row: any) => ({
            name: row[nameIdx],
            phone: row[phoneIdx],
          }))
        setTimeout(() => {
          setBatchRows(dataRows)
          setBatchUploading(false)
        }, 1200)
      } catch (err) {
        setBatchError("Failed to parse file. Please upload a valid Excel or CSV file.")
        setBatchRows([])
        setBatchUploading(false)
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleBatchCall = (e: React.FormEvent) => {
    e.preventDefault()
    setBatchError("")
    if (!batchProductId || !batchRows.length) {
      setBatchError("Please select a product and upload a file with phone numbers.")
      return
    }
    setBatchRows([])
    setBatchFile(null)
    if (batchFileInputRef.current) batchFileInputRef.current.value = ""

    // Show snackbar message
    setSnackbarMsg(`Batch call initiated for ${batchRows.length} numbers.`)
    setTimeout(() => setSnackbarMsg(""), 3000) // Hide after 3 seconds
  }

  const tabs = [
    { id: "makeCall", label: "Make Call", icon: <Phone className="w-4 h-4" /> },
    { id: "callHistory", label: "Call History", icon: <History className="w-4 h-4" /> },
    { id: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    ...(isAdmin
      ? [
        // { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
        { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
        { id: "logs", label: "System Logs", icon: <FileText className="w-4 h-4" /> },
      ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar and overlay (full screen, covers header and content) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white rounded-r-xl shadow-md p-4 flex flex-col gap-2
          transition-transform duration-200 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ maxHeight: "100vh" }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-all w-full text-left ${activeTab === tab.id
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1"> {/* reduced gap from 2 to 1 */}
            {/* Hamburger menu at the absolute left edge */}
            <button
              className="p-2 ml-0" // ensure no margin left
              style={{ marginLeft: 0, paddingLeft: 0 }} // extra safety for left edge
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-7 h-7" />
            </button>
            <PhoneCall className="w-8 h-8" />
            <h1 className="text-2xl font-bold ml-2">Voice Agent Dashboard</h1>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 flex gap-8">
        <main className="flex-1 space-y-6">
          {/* Tab Content */}
          <div className="space-y-6">
            {/* Make Call Tab */}
            {activeTab === "makeCall" && (
              <>
                {/* Single Call */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      Make a Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleMakeCall} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number (US only)</Label>
                        <Input
                          id="phone_number"
                          type="tel"
                          placeholder="+1XXXXXXXXXX"
                          value={callForm.phone_number}
                          onChange={handlePhoneChange}
                          required
                          className="h-12 w-64"
                          maxLength={12}
                        />
                        {callError && (
                          <div className="text-red-600 text-xs mt-1">{callError}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product_id" className="block mb-1 font-medium">
                          Select Product
                        </Label>
                        <select
                          id="product_id"
                          value={callForm.product_id}
                          onChange={(e) => setCallForm({ ...callForm, product_id: e.target.value })}
                          required
                          className="h-12 w-64 border border-gray-300 rounded-lg px-3"
                        >
                          <option value="">Select a product</option>
                          {products.map((product) => (
                            <option key={product.pid} value={product.pid}>
                              {product.productname}
                            </option>
                          ))}
                        </select>
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
                          <span>{callResult}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Batch Call */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-purple-600" />
                      Batch Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleBatchCall}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="batch_product_id">Select Product</Label>
                          <select
                            id="batch_product_id"
                            value={batchProductId}
                            onChange={(e) => setBatchProductId(e.target.value)}
                            required
                            className="h-12 w-full border border-gray-300 rounded-lg px-3"
                          >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                              <option key={product.pid} value={product.pid}>
                                {product.productname}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="batch_file" className="font-semibold text-gray-700">
                            Upload Excel File (.xlsx or .csv)
                          </Label>
                          <div className="flex items-center gap-4">
                            <label
                              htmlFor="batch_file"
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow cursor-pointer hover:from-purple-700 hover:to-blue-700 transition"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                              </svg>
                              {batchFile ? batchFile.name : "Choose File"}
                              <input
                                ref={batchFileInputRef}
                                id="batch_file"
                                type="file"
                                accept=".xlsx,.csv"
                                onChange={handleBatchFileUpload}
                                className="hidden"
                              />
                            </label>
                            {batchFile && (
                              <span className="text-xs text-gray-500">{batchFile.name}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">Accepted formats: .xlsx, .csv</p>
                        </div>
                      </div>
                      {/* Loading bar */}
                      {batchUploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: "80%" }} />
                        </div>
                      )}
                      {/* Error */}
                      {batchError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {batchError}
                        </div>
                      )}
                      {/* Show upload button if no file or no rows */}
                      {(!batchFile || batchUploading || batchRows.length === 0) && (
                        <Button
                          type="button"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          disabled
                        >
                          Upload File
                        </Button>
                      )}
                      {/* Show Start Batch Call if file uploaded and parsed */}
                      {batchRows.length > 0 && !batchUploading && (
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <PhoneCall className="w-4 h-4 mr-2" />
                          Start Batch Call
                        </Button>
                      )}
                      {/* Show batch init message */}
                      {batchInitMsg && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                          {batchInitMsg}
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>

                {/* Batch File Table */}
                {batchRows.length > 0 && !batchUploading && (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-600" />
                        Uploaded Batch Numbers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm bg-white">
                          <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                                #
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                Phone Number
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {batchRows.map((row, idx) => (
                              <tr
                                key={idx}
                                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                              >
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4">{row.name}</td>
                                <td className="px-6 py-4 font-mono">{row.phone}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
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
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm bg-white">
                      <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                            Phone Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Transferred
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                            Call SID
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {callHistory.map((call, idx) => (
                          <tr
                            key={call.id}
                            className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-blue-50 transition`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-800">
                              {call.mobilenumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {call.productname}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${call.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                                  }`}
                              >
                                {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${call.transferred_to_agent === "y"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-500"
                                  }`}
                              >
                                {call.transferred_to_agent === "y" ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                              {call.timestamp}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono">
                              {call.call_sid}
                            </td>
                          </tr>
                        ))}
                        {callHistory.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                              No call history found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm bg-white">
                        <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                              Key Details
                            </th>
                            {isAdmin && (
                              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {products.map((product, idx) => (
                            <tr
                              key={product.pid}
                              className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-blue-50 transition`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                                {product.productname}
                              </td>
                              <td className="px-6 py-4 whitespace-pre-line text-gray-700 text-sm">
                                {product.productdescription}
                              </td>
                              <td className="px-6 py-4 whitespace-pre-line text-gray-500 text-xs">
                                {product.productkeydetails}
                              </td>
                              {isAdmin && (
                                <td className="px-6 py-4">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product.pid)}
                                    className="rounded-full px-4"
                                  >
                                    Delete
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))}
                          {products.length === 0 && (
                            <tr>
                              <td colSpan={isAdmin ? 4 : 3} className="px-6 py-8 text-center text-gray-400">
                                No products found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {isAdmin && (
                  <Card className="shadow-lg border-0 max-w-xl mx-auto">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-green-600" />
                        Add New Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddProduct}
                        className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-inner"
                        autoComplete="off"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="productname" className="font-semibold text-gray-700">
                            Product Name
                          </Label>
                          <Input
                            id="productname"
                            value={productForm.productname}
                            onChange={(e) => setProductForm({ ...productForm, productname: e.target.value })}
                            required
                            className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            placeholder="Enter product name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productdescription" className="font-semibold text-gray-700">
                            Description
                          </Label>
                          <Textarea
                            id="productdescription"
                            value={productForm.productdescription}
                            onChange={(e) => setProductForm({ ...productForm, productdescription: e.target.value })}
                            required
                            className="min-h-[80px] border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            placeholder="Briefly describe the product"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productkeydetails" className="font-semibold text-gray-700">
                            Key Details
                          </Label>
                          <Textarea
                            id="productkeydetails"
                            value={productForm.productkeydetails}
                            onChange={(e) => setProductForm({ ...productForm, productkeydetails: e.target.value })}
                            className="min-h-[60px] border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            placeholder="Key features, separated by commas"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-full px-8 py-2 text-base font-semibold shadow-md"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

              </div>
            )}

            {/* Settings Tab */}
            {/* {activeTab === "settings" && isAdmin && (
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
                        +1234567890
                      </p>
                    </div>
                    <form className="space-y-4">
                      <div className="space-y-2">
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
            )} */}


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
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm bg-white">
                      <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Role
                          </th>
                          {/* Add more columns if needed */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-gray-50 hover:bg-blue-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                            John Doe
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                              Agent
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-white hover:bg-blue-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                            Jane Smith
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                              Admin
                            </span>
                          </td>
                        </tr>
                        {/* Add more users as needed */}
                        {/* Example empty state */}
                        {/* 
                        {users.length === 0 && (
                          <tr>
                            <td colSpan={2} className="px-6 py-8 text-center text-gray-400">
                              No users found.
                            </td>
                          </tr>
                        )} 
                        */}
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
        </main>
      </div>

      {snackbarMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in font-semibold">
          {snackbarMsg}
        </div>
      )}
    </div>
  )
}
