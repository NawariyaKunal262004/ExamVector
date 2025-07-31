import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, User, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ]

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setLanguageMenuOpen(false)
  }

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0]

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EV</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200">
                  ExamVector
                </h1>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a 
              href="/" 
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              {t('nav.home')}
            </a>
            <a 
              href="/exams" 
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Exams
            </a>
            <a 
              href="/exam-results" 
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Results
            </a>
            {user && (
              <a 
                href="/dashboard" 
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                {t('nav.dashboard')}
              </a>
            )}
            {user?.role === 'admin' && (
              <a 
                href="/admin" 
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                {t('nav.admin')}
              </a>
            )}
          </nav>

          {/* Right side - Language selector and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{currentLanguage.flag} {currentLanguage.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        i18n.language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <a href="/login" className="text-white">{t('nav.login')}</a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-md animate-fadeIn">
          <div className="px-4 py-4 space-y-2">
            <a
              href="/"
              className="block py-3 px-4 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a
              href="/exams"
              className="block py-3 px-4 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exams
            </a>
            <a
              href="/exam-results"
              className="block py-3 px-4 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Results
            </a>
            {user && (
              <a
                href="/dashboard"
                className="block py-3 px-4 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.dashboard')}
              </a>
            )}
            {user?.role === 'admin' && (
              <a
                href="/admin"
                className="block py-3 px-4 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.admin')}
              </a>
            )}
            
            {/* Mobile Language Selector */}
            <div className="py-3 px-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{t('nav.language')}</span>
              </div>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors duration-200 ${
                      i18n.language === lang.code
                        ? 'text-blue-600 bg-blue-50 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="py-3 px-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.login')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}