import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Shield, 
  Wifi, 
  Smartphone, 
  Link, 
  CheckCircle, 
  Users, 
  Building, 
  Globe,
  ArrowRight,
  Play,
  Star,
  Award,
  Zap,
  Lock
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { InstallPrompt } from '../components/PWA/InstallPrompt'
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    students: 0,
    institutions: 0,
    forms: 0
  })
  const navigate = useNavigate();

  // Animate numbers on load
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000
      const steps = 60
      const increment = duration / steps

      let current = 0
      const timer = setInterval(() => {
        current += increment
        const progress = Math.min(current / duration, 1)
        
        setStats({
          students: Math.floor(progress * 1000000), // 10 lakh
          institutions: Math.floor(progress * 200),
          forms: Math.floor(progress * 50000)
        })

        if (progress >= 1) {
          clearInterval(timer)
        }
      }, increment)
    }

    animateNumbers()
  }, [])

  const benefits = [
    {
      icon: <Wifi className="h-10 w-10 text-blue-600" />,
      title: t('home.benefits.offline'),
      description: 'Work seamlessly without internet. Auto-sync when connected.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Link className="h-10 w-10 text-emerald-600" />,
      title: t('home.benefits.blockchain'),
      description: 'Every submission gets blockchain verification for transparency.',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: t('home.benefits.secure'),
      description: 'End-to-end encryption and DPDP Act compliance.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Smartphone className="h-10 w-10 text-purple-600" />,
      title: t('home.benefits.mobile'),
      description: 'Install as PWA app for native mobile experience.',
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

  const features = [
    'Support for all competitive exams across India',
    'Multi-language support (English, Hindi, Regional)',
    'Offline-first architecture with IndexedDB',
    'Blockchain audit trails on Ethereum',
    'AI chatbot for 24/7 assistance',
    'DPDP Act compliant data handling',
    'Real-time queue management',
    'Digital receipts and certificates',
    'Admin dashboard with analytics'
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      content: "ExamVector made my JEE application so smooth! The offline feature saved me when my internet was down.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "UPSC Aspirant",
      content: "The blockchain verification gives me confidence that my application is secure and tamper-proof.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Dr. Anita Verma",
      role: "College Administrator",
      content: "Managing thousands of applications has never been easier. The admin dashboard is incredibly intuitive.",
      rating: 5,
      avatar: "AV"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-fadeIn">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10 Lakh+ Students
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fadeIn">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
              {t('home.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeIn">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                <a href="/form" className="flex items-center space-x-2 text-white">
                  <Play className="h-5 w-5" />
                  <span>{t('home.startForm')}</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                <a href="/demo" className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.students.toLocaleString('en-IN')}+
                </div>
                <p className="text-gray-600 font-medium">Students Served</p>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <Building className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.institutions}+
                </div>
                <p className="text-gray-600 font-medium">Partner Institutions</p>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.forms.toLocaleString('en-IN')}+
                </div>
                <p className="text-gray-600 font-medium">Forms Submitted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-gradient">ExamVector</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built for all competitive exams across India with cutting-edge technology and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(benefit.icon, { className: "h-10 w-10 text-white" })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4 mr-2" />
                Enterprise-Grade Platform
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need in <span className="text-gradient">One Platform</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Comprehensive solution for secure, scalable management of all competitive exams across India
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
                <a href="/features" className="flex items-center space-x-2 text-white">
                  <Zap className="h-5 w-5" />
                  <span>Explore All Features</span>
                </a>
              </Button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold">Secure & Compliant</h3>
                      <p className="text-blue-100">DPDP Act 2023 Compliant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span className="text-lg">Click "Start Form" to begin</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span className="text-lg">Fill information securely offline</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <span className="text-lg">Get blockchain receipt instantly</span>
                    </div>
                  </div>

                  <Button variant="secondary" size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-50 font-semibold">
                    <a href="/form" className="flex items-center justify-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>{t('home.startForm')}</span>
                    </a>
                  </Button>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by <span className="text-gradient">Students & Institutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users say about their experience with ExamVector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Exam Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join millions of students who trust ExamVector for their competitive exam applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-gray-50 shadow-lg">
              <a href="/form" className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Your Application</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-700">
              <a href="/contact" className="flex items-center space-x-2">
                <span>Contact Support</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  )
}