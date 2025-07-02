"use client"

import type React from "react"
import { CheckCircle } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronDown,
  Phone,
  Calendar,
  ExternalLink,
  Users,
  BarChart3,
  Building,
  MessageSquare,
  Headphones,
  FileText,
  DollarSign,
  Menu,
  X,
  Mic,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  PhoneCall,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { AnimatedWaves } from "@/components/animated-waves"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { EnhancedDemo } from "@/components/enhanced-demo"
import {
  ParticleSystem,
  MorphingShape,
  FloatingElements,
  GlowingOrb,
  TypewriterText,
} from "@/components/enhanced-animations"
import { HeroSVG, VoiceWaveSVG } from "@/components/svg-graphics"

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function RetellAI() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .hover-scale {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #06B6D4, #3B82F6, #8B5CF6, #EC4899);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Top Banner */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-orange-100 via-pink-100 to-blue-100 px-4 py-3 text-center border-b animate-slideIn">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            <span className="font-medium text-gray-700">OpenAI x Retell Partnership</span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:scale-105 transition-transform"
            >
              Read the Story
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Animated Background */}
      <AnimatedWaves />
      <ParticleSystem />

      {/* Header */}
      <AnimatedSection>
        <header className="relative z-40 px-4 py-4 md:px-6 glass-effect sticky top-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 hover-scale">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">Retell AI</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {["Features", "Solutions", "Resources"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer transition-all hover:scale-105 group"
                >
                  <span className="font-medium">{item}</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </div>
              ))}
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-all hover:scale-105">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-all hover:scale-105">
                Documentation
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hidden md:inline-flex font-medium bg-transparent hover:bg-gray-50 hover:scale-105 transition-all"
              >
                CONTACT SALES
              </Button>
              <Button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium hover:scale-105 transition-all shadow-lg">
                LOG IN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:scale-105 transition-transform"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </header>
      </AnimatedSection>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 glass-effect shadow-xl p-6 animate-slideUp">
            <nav className="space-y-4">
              {["Features", "Pricing", "Documentation", "Solutions", "Resources"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block font-medium text-gray-900 py-2 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full bg-transparent hover:scale-105 transition-transform">
                  CONTACT SALES
                </Button>
                <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-105 transition-transform">
                  LOG IN
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <AnimatedSection delay={200}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-8 animate-float">
                  <Sparkles className="w-4 h-4" />
                  <TypewriterText text="Next-generation AI voice technology" speed={50} />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Supercharge your <span className="gradient-text">Call Operations</span> with Voice AI
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  Discover the new way to build, test, deploy, and monitor production-ready AI voice agents at scale
                  with real-time metrics and seamless integrations.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={800}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-20">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 transition-all group shadow-xl animate-glow">
                    TRY FOR FREE
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all shadow-lg"
                  >
                    CONTACT SALES
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={1000}>
              <div className="relative">
                <HeroSVG />
                <FloatingElements />
                <div className="absolute top-10 right-10">
                  <GlowingOrb size={150} color="blue" />
                </div>
                <div className="absolute bottom-10 left-10">
                  <GlowingOrb size={120} color="purple" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      {/* Trusted By Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-12 md:px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-500 mb-12 tracking-wider">TRUSTED BY</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
              {[
                "SEMPER HEALTH",
                "JustCall",
                "WRENCH",
                "STORAGEVAULT",
                "CAPSULE",
                "spare",
                "EVERISE",
                "SWTCH",
                "tripleton",
                "HONK",
                "THE HOTELS NETWORK",
                "gifthealth",
                "Matic",
                "Wenolo",
                "rely.",
                "vivian",
              ].map((company, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="text-gray-400 font-medium text-sm hover:text-gray-600 cursor-pointer hover:scale-110 transition-all">
                    {company}
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={800}>
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  SEE CUSTOMER STORIES
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Use Cases Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="mb-4 text-center">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">INTERACTIVE DEMO</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience AI in Action</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                  Try our live demo with customizable scenarios, real-time metrics, and live integrations
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Live Call Demo */}
              <AnimatedSection delay={200}>
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden hover-lift">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                              <PhoneCall className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">AI Demo Studio</h3>
                              <p className="text-blue-200 text-sm">Experience real conversations with live metrics</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-blue-100">Phone Number</label>
                              <input
                                type="tel"
                                placeholder="123-456-7890"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-blue-100">Name</label>
                              <input
                                type="text"
                                placeholder="John"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-blue-100">Email Address</label>
                              <input
                                type="email"
                                placeholder="john@company.com"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-sm"
                              />
                            </div>
                            <Button
                              onClick={() => setIsDemoOpen(true)}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 hover:scale-105 transition-all shadow-xl rounded-xl"
                            >
                              <PhoneCall className="w-5 h-5 mr-2" />
                              LAUNCH INTERACTIVE DEMO
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>

              {/* Use Case Icons */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users className="w-8 h-8" />, title: "Receptionist", color: "from-blue-500 to-cyan-500" },
                  {
                    icon: <Calendar className="w-8 h-8" />,
                    title: "Appointment Setter",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <BarChart3 className="w-8 h-8" />,
                    title: "Lead Qualification",
                    color: "from-green-500 to-emerald-500",
                  },
                  { icon: <FileText className="w-8 h-8" />, title: "Survey", color: "from-orange-500 to-red-500" },
                  {
                    icon: <Headphones className="w-8 h-8" />,
                    title: "Customer Service",
                    color: "from-indigo-500 to-purple-500",
                  },
                  {
                    icon: <DollarSign className="w-8 h-8" />,
                    title: "Debt Collection",
                    color: "from-gray-500 to-gray-600",
                  },
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={index * 150}>
                    <Card className="border-0 shadow-lg bg-white hover-lift cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="mb-4 text-center">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">PROCESS</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">How It Works</h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Build",
                  description:
                    "Utilize the voice AI API and our intuitive agent builder to create custom voice AI agents effortlessly.",
                  icon: <Building className="w-8 h-8" />,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  number: "02",
                  title: "Test",
                  description:
                    "Perform comprehensive agent testing with built-in test LLM features to ensure seamless handling of edge cases.",
                  icon: <MessageSquare className="w-8 h-8" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  number: "03",
                  title: "Deploy",
                  description:
                    "Easily deploy your agents to phone calls, web calls, SMS, and more with one-click deployment.",
                  icon: <Zap className="w-8 h-8" />,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  number: "04",
                  title: "Monitor",
                  description:
                    "Track success rates, latency, and user sentiment through call history dashboard. Quickly identify failed calls.",
                  icon: <TrendingUp className="w-8 h-8" />,
                  color: "from-orange-500 to-red-500",
                },
              ].map((step, index) => (
                <AnimatedSection key={index} delay={index * 200}>
                  <Card className="border-0 shadow-xl bg-white hover-lift h-full group relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {step.icon}
                      </div>
                      <div className="text-6xl font-bold text-gray-100 mb-4 group-hover:text-blue-100 transition-colors absolute top-4 right-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="mb-4 text-center">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">CAPABILITIES</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
                  Powerful AI Agent Creation Features
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  {
                    icon: <Building className="w-6 h-6" />,
                    title: "Auto-Sync Knowledge Base",
                    description: "Automatically sync and update your knowledge base with real-time data integration.",
                    active: false,
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: "Powerful Call Transfer Feature",
                    description:
                      "Seamlessly transfer calls to human agents when needed with full context preservation.",
                    active: true,
                  },
                  {
                    icon: <Calendar className="w-6 h-6" />,
                    title: "Easy Appointment Booking",
                    description:
                      "Let your AI agent schedule meetings in seconds with simple, natural language. Integrate tools like Cal.com to ensure appointments are automatically logged.",
                    active: false,
                  },
                  {
                    icon: <MessageSquare className="w-6 h-6" />,
                    title: "Navigate IVR Systems",
                    description: "AI can navigate complex phone menus and IVR systems automatically.",
                    active: false,
                  },
                ].map((feature, index) => (
                  <AnimatedSection key={index} delay={index * 150}>
                    <div
                      className={`p-6 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                        feature.active
                          ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-lg"
                          : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                            feature.active
                              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection delay={400}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl hover-lift">
                    <div className="bg-white rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center gap-3 mb-6 hover-scale">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Book on the Calendar (Cal.com)</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            When users ask for availability, check the calendar and provide available slots with
                            real-time sync.
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">API key</label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                              <span className="text-gray-400 font-mono">••••••••••</span>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Event Type ID (Cal.com)
                          </label>
                          <input
                            type="text"
                            value="042011"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                            readOnly
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                          <span>Integration active and syncing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Add this after the existing features content */}
      <AnimatedSection delay={600}>
        <div className="mt-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Voice AI in Action</h3>
                <p className="text-cyan-100 mb-8 max-w-2xl mx-auto text-lg">
                  Experience natural, smooth, and empathetic AI conversations with ultra-low latency
                </p>
                <VoiceWaveSVG />
                <div className="mt-8">
                  <MorphingShape />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* Enterprise Features */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">ENTERPRISE</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Enterprise Scale</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Deploy AI voice agents that handle thousands of concurrent calls with enterprise-grade reliability and
                  security.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description: "Sub-second response times with optimized voice processing and real-time streaming.",
                  gradient: "from-yellow-400 to-orange-500",
                  metric: "<500ms",
                  metricLabel: "Response Time",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Enterprise Security",
                  description: "SOC 2 compliant with end-to-end encryption and comprehensive audit logs.",
                  gradient: "from-green-400 to-blue-500",
                  metric: "SOC 2",
                  metricLabel: "Compliant",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Scale",
                  description: "Deploy across multiple regions with automatic failover and load balancing.",
                  gradient: "from-purple-400 to-pink-500",
                  metric: "99.9%",
                  metricLabel: "Uptime",
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Advanced Analytics",
                  description: "Real-time monitoring and detailed analytics for all your voice interactions.",
                  gradient: "from-blue-400 to-cyan-500",
                  metric: "Real-time",
                  metricLabel: "Insights",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Team Collaboration",
                  description: "Built-in tools for team management, role-based access, and workflow automation.",
                  gradient: "from-indigo-400 to-purple-500",
                  metric: "Unlimited",
                  metricLabel: "Team Size",
                },
                {
                  icon: <Mic className="w-8 h-8" />,
                  title: "Natural Conversations",
                  description: "Advanced NLP and voice synthesis for human-like conversation experiences.",
                  gradient: "from-pink-400 to-red-500",
                  metric: "98%",
                  metricLabel: "Accuracy",
                },
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="border-0 shadow-xl bg-white hover-lift group relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div
                            className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                          >
                            {feature.metric}
                          </div>
                          <div className="text-sm text-gray-500">{feature.metricLabel}</div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            {/* Voice API Demo */}
            <AnimatedSection delay={800}>
              <div className="mt-16">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white overflow-hidden">
                  <CardContent className="p-12 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4">Voice AI API</h3>
                      <p className="text-cyan-100 mb-8 max-w-2xl mx-auto text-lg">
                        Natural, smooth, and empathetic AI conversations with only 500ms latency
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                          <div className="w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
                          <span className="text-cyan-100 font-medium">Ultra-low latency</span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                          <div
                            className="w-3 h-3 bg-green-300 rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                          <span className="text-cyan-100 font-medium">Natural speech</span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                          <div
                            className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                          <span className="text-cyan-100 font-medium">Real-time processing</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="mb-4">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider text-center">TESTIMONIALS</p>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 lg:mb-0">
                    See Why Over 3000+ Businesses Trust Retell AI
                  </h2>
                  <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm shadow-lg"
                  >
                    SEE CUSTOMERS
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden hover-lift">
                <CardContent className="p-12 lg:p-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10">
                    <div className="max-w-4xl">
                      <blockquote className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
                        "We were able to contain 65% of voice calls with the bot, which previously would have been
                        directly gone to a manual agent for resolution."
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="font-bold text-xl">S</span>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Saurabh Sodhani</div>
                          <div className="text-blue-200">SVP of Digital Transformation, Everise</div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="absolute right-8 top-8 space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-orange-400 mb-2">500+</div>
                        <div className="text-sm text-orange-200">Hours saved per month</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-green-400 mb-2">65%</div>
                        <div className="text-sm text-green-200">Call Resolution</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                        <div className="text-sm text-blue-200">Customer Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Call Operations?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using Retell AI to automate their voice interactions and deliver
              exceptional customer experiences with real-time metrics and seamless integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-xl rounded-xl">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-transparent hover:scale-105 transition-all rounded-xl"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="relative z-10 bg-gray-50 px-4 py-16 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6 hover-scale">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Retell AI</span>
                </div>
                <p className="text-gray-600 mb-4">
                  The leading platform for building production-ready AI voice agents at scale with real-time metrics and
                  seamless integrations.
                </p>
              </div>

              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "API", "Integrations"],
                },
                {
                  title: "Resources",
                  links: ["Documentation", "Blog", "Case Studies", "Support"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact", "Privacy"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="hover:text-gray-900 transition-colors hover:scale-105 inline-block">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">© 2024 Retell AI. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                {["Twitter", "LinkedIn", "GitHub"].map((social, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-gray-600 transition-all hover:scale-110">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded hover:bg-gray-600 transition-colors"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>

      {/* Enhanced Demo Modal */}
      <EnhancedDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  )
}
