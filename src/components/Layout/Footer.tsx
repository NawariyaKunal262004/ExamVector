import React from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">ExamVector</h3>
            <p className="text-gray-300 text-sm">
              Secure, offline-first exam platform for Indian students and institutions.
              DPDP compliant with blockchain audit trails.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@examvector.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <div className="space-y-2 text-sm">
              <a
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a
                href="/terms"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t('footer.terms')}
              </a>
              <a
                href="/dpdp-compliance"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                DPDP Compliance
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div>✓ Offline-First Architecture</div>
              <div>✓ Blockchain Audit Trails</div>
              <div>✓ DPDP Act Compliant</div>
              <div>✓ Multi-language Support</div>
              <div>✓ PWA Mobile App</div>
              <div>✓ AI Chatbot Assistant</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 ExamVector. All rights reserved. | Made in India 🇮🇳
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{t('footer.credits')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}