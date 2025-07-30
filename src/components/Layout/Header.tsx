import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' }
  ]

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setLanguageMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">ExamVector</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.home')}
            </a>
            {user && (
              <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('nav.dashboard')}
              </a>
            )}
            {user?.role === 'admin' && (
              <a href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
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
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm">{languages.find(l => l.code === i18n.language)?.name}</span>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm">
                <a href="/login">{t('nav.login')}</a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
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
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-2">
            <a
              href="/"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {t('nav.home')}
            </a>
            {user && (
              <a
                href="/dashboard"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('nav.dashboard')}
              </a>
            )}
            {user?.role === 'admin' && (
              <a
                href="/admin"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('nav.admin')}
              </a>
            )}
            
            {/* Mobile Language Selector */}
            <div className="py-2">
              <div className="text-sm font-medium text-gray-700 mb-2">{t('nav.language')}</div>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`block w-full text-left py-1 text-sm ${
                      i18n.language === lang.code
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="py-2 border-t">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 py-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="block py-2 text-blue-600 font-medium"
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