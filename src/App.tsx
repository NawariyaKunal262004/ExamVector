import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { OfflineIndicator } from './components/PWA/OfflineIndicator'
import { Chatbot } from './components/Chat/Chatbot'
import { Home } from './pages/Home'
import { FormPage } from './pages/FormPage'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { ExamsPage } from './pages/ExamsPage'
import { ExamResultsPage } from './pages/ExamResultsPage'
import { ExamApplicationPage } from './pages/ExamApplicationPage'
import { ResultsPage } from './pages/ResultsPage'
import { localStorage } from './lib/storage'
import './lib/i18n'

function App() {
  useEffect(() => {
    // Initialize offline storage
    localStorage.init().catch(console.error)

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <OfflineIndicator />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/apply/:examId" element={<ExamApplicationPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/exam-results" element={<ExamResultsPage />} />
              <Route path="/exam-application" element={<ExamApplicationPage />} />
              <Route path="/exam-application/:examId" element={<ExamApplicationPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  )
}

// Privacy Policy Component
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none">
        <h2>Digital Personal Data Protection (DPDP) Act Compliance</h2>
        <p>
          ExamVector is fully compliant with India's Digital Personal Data Protection Act, 2023.
          We are committed to protecting your personal data and ensuring transparent data processing.
        </p>
        
        <h3>Data Collection</h3>
        <p>We collect the following personal data:</p>
        <ul>
          <li>Name, email address, and phone number</li>
          <li>Educational qualifications and work experience</li>
          <li>Address and category information</li>
          <li>Uploaded documents (optional)</li>
          <li>Technical data (IP address, browser info) for security</li>
        </ul>
        
        <h3>Purpose of Processing</h3>
        <p>Your data is processed for:</p>
        <ul>
          <li>Exam form submission and processing</li>
          <li>Communication regarding your application</li>
          <li>Compliance with legal requirements</li>
          <li>Security and fraud prevention</li>
        </ul>
        
        <h3>Data Storage and Security</h3>
        <ul>
          <li>All data is encrypted using AES-256 encryption</li>
          <li>Data is stored in India (AWS Mumbai region)</li>
          <li>Blockchain audit trails ensure data integrity</li>
          <li>Access is restricted to authorized personnel only</li>
        </ul>
        
        <h3>Your Rights</h3>
        <p>Under the DPDP Act, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data (subject to legal requirements)</li>
          <li>Withdraw consent</li>
          <li>Data portability</li>
        </ul>
        
        <h3>Contact Us</h3>
        <p>
          For any privacy-related queries, contact our Data Protection Officer at:
          dpo@examvector.com or +91 98765 43210
        </p>
      </div>
    </div>
  )
}

// Terms of Service Component
const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none">
        <h2>Terms and Conditions</h2>
        <p>
          By using ExamVector, you agree to these terms and conditions.
          Please read them carefully before using our services.
        </p>
        
        <h3>Service Description</h3>
        <p>
          ExamVector provides a secure, offline-first exam platform for Indian students
          and institutions. Our services include form filling, document upload,
          blockchain verification, and result management.
        </p>
        
        <h3>User Responsibilities</h3>
        <ul>
          <li>Provide accurate and truthful information</li>
          <li>Keep your login credentials secure</li>
          <li>Use the platform only for legitimate purposes</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>
        
        <h3>Prohibited Activities</h3>
        <ul>
          <li>Submitting false or misleading information</li>
          <li>Attempting to bypass security measures</li>
          <li>Using automated tools to access the platform</li>
          <li>Interfering with the platform's operation</li>
        </ul>
        
        <h3>Data Processing</h3>
        <p>
          By using our services, you consent to data processing as described
          in our Privacy Policy and in compliance with the DPDP Act.
        </p>
        
        <h3>Limitation of Liability</h3>
        <p>
          ExamVector is provided "as is" without warranties. We are not liable
          for any indirect, incidental, or consequential damages.
        </p>
        
        <h3>Governing Law</h3>
        <p>
          These terms are governed by Indian law, and any disputes will be
          resolved in Indian courts.
        </p>
        
        <p className="text-sm text-gray-600 mt-8">
          Last updated: January 2025
        </p>
      </div>
    </div>
  )
}

export default App