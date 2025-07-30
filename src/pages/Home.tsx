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
  Play
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { InstallPrompt } from '../components/PWA/InstallPrompt'

export const Home: React.FC = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    students: 0,
    institutions: 0,
    forms: 0
  })

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
      icon: <Wifi className="h-8 w-8 text-blue-600" />,
      title: t('home.benefits.offline'),
      description: 'Work seamlessly without internet. Auto-sync when connected.'
    },
    {
      icon: <Link className="h-8 w-8 text-teal-600" />,
      title: t('home.benefits.blockchain'),
      description: 'Every submission gets blockchain verification for transparency.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t('home.benefits.secure'),
      description: 'End-to-end encryption and DPDP Act compliance.'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-600" />,
      title: t('home.benefits.mobile'),
      description: 'Install as PWA app for native mobile experience.'
    }
  ]

  const features = [
    'Multi-language support (English, Hindi, Regional)',
    'Offline-first architecture with IndexedDB',
    'Blockchain audit trails on Ethereum',
    'AI chatbot for 24/7 assistance',
    'DPDP Act compliant data handling',
    'Real-time queue management',
    'Digital receipts and certificates',
    'Admin dashboard with analytics'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {t('home.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8 py-4 text-lg">
                <a href="/form" className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>{t('home.startForm')}</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <a href="/demo" className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.students.toLocaleString('en-IN')}+
                  </span>
                </div>
                <p className="text-gray-600">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-teal-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.institutions}+
                  </span>
                </div>
                <p className="text-gray-600">Institutions</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.forms.toLocaleString('en-IN')}+
                  </span>
                </div>
                <p className="text-gray-600">Forms Submitted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for Indian students and institutions with cutting-edge technology and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Enterprise-Grade Features
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Everything you need for secure, scalable exam management
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button size="lg">
                  <a href="/features">Learn More About Features</a>
                </Button>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <span>Click "Start Form" to begin</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <span>Fill your information securely</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <span>Get blockchain receipt instantly</span>
                  </div>
                </div>

                <Button variant="secondary" size="lg" className="w-full">
                  <a href="/form">{t('home.startForm')}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  )
}