import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Save, 
  Send, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { localStorage } from '../lib/storage'
import { generateId, generateHash, createPDFBlob } from '../lib/utils'

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  qualification: z.string().min(1, 'Qualification is required'),
  experience: z.string().min(1, 'Experience is required'),
  category: z.string().min(1, 'Category is required'),
  documents: z.any().optional(),
  dpdpConsent: z.boolean().refine(val => val === true, 'DPDP consent is required')
})

type FormData = z.infer<typeof formSchema>

export const FormPage: React.FC = () => {
  const { t } = useTranslation()
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)
  const [queuePosition, setQueuePosition] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const formData = watch()
    
    const autoSave = setInterval(() => {
      if (isDirty && Object.keys(formData).some(key => formData[key as keyof FormData])) {
        saveDraft()
      }
    }, 30000)

    return () => clearInterval(autoSave)
  }, [watch, isDirty])

  const saveDraft = async () => {
    try {
      const formData = watch()
      await localStorage.saveForm({
        id: 'draft-' + Date.now(),
        data: formData,
        savedAt: new Date(),
        type: 'draft'
      })
      // Show brief success indicator
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }

  const simulateQueue = async (): Promise<number> => {
    // Simulate queue position assignment
    const position = Math.floor(Math.random() * 50) + 1
    setQueuePosition(position)
    
    // Simulate queue progression
    for (let i = position; i > 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setQueuePosition(i)
    }
    
    return 0
  }

  const simulateBlockchainSubmission = async (formData: any): Promise<string> => {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const dataHash = generateHash(JSON.stringify(formData))
    const txHash = `0x${dataHash}${Date.now().toString(16)}`
    
    return txHash
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Add queue processing
      await simulateQueue()
      
      const submissionId = generateId()
      const submissionData = {
        id: submissionId,
        formId: 'exam-form-2025',
        data,
        submittedAt: new Date(),
        status: isOnline ? 'submitted' : 'pending-sync',
        consentGiven: data.dpdpConsent,
        ipAddress: '192.168.1.1', // Would be actual IP in production
        userAgent: navigator.userAgent,
        offline: !isOnline
      }

      if (isOnline) {
        // Simulate blockchain submission
        const txHash = await simulateBlockchainSubmission(submissionData)
        submissionData.status = 'confirmed'
        submissionData.txHash = txHash
        
        setSubmissionResult({
          submissionId,
          txHash,
          timestamp: new Date(),
          receiptUrl: '#'
        })
      } else {
        // Save for offline sync
        await localStorage.saveSubmission(submissionData)
        
        setSubmissionResult({
          submissionId,
          timestamp: new Date(),
          offline: true,
          message: 'Saved offline - will sync when online'
        })
      }

      setShowSuccess(true)
      
    } catch (error) {
      console.error('Submission failed:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
      setQueuePosition(null)
    }
  }

  const downloadReceipt = () => {
    if (!submissionResult) return

    const receiptContent = `
EXAMVECTOR - SUBMISSION RECEIPT

Submission ID: ${submissionResult.submissionId}
${submissionResult.txHash ? `Transaction Hash: ${submissionResult.txHash}` : ''}
Timestamp: ${submissionResult.timestamp.toLocaleString()}
Status: ${submissionResult.offline ? 'Offline (Will Sync)' : 'Confirmed'}

This is a digitally generated receipt.
For verification, visit: https://examvector.com/verify
    `

    const pdfBlob = createPDFBlob(receiptContent)
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ExamVector_Receipt_${submissionResult.submissionId}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (queuePosition !== null && queuePosition > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Clock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('queue.title')}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">{t('queue.position')}</p>
                <p className="text-3xl font-bold text-blue-600">#{queuePosition}</p>
              </div>
              <div>
                <p className="text-gray-600">{t('queue.estimated')}</p>
                <p className="text-xl font-semibold">{queuePosition * 2} {t('queue.minutes')}</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(0, (50 - queuePosition) / 50 * 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('form.title')}
              </h1>
              <p className="text-gray-600 mt-2">
                Fill out this form completely and accurately. All fields marked with * are required.
              </p>
            </div>
            
            {/* Online/Offline Indicator */}
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <>
                  <Wifi className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-600">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-orange-600">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                  <Input
                    label="Phone Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="98765 43210"
                    required
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    {...register('dateOfBirth')}
                    error={errors.dateOfBirth?.message}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Input
                  label="Complete Address"
                  {...register('address')}
                  error={errors.address?.message}
                  placeholder="House No., Street, City, State, PIN Code"
                  required
                />
              </div>

              {/* Education & Experience */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Education & Experience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Qualification *
                    </label>
                    <select
                      {...register('qualification')}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Qualification</option>
                      <option value="10th">10th Pass</option>
                      <option value="12th">12th Pass</option>
                      <option value="diploma">Diploma</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="phd">PhD</option>
                    </select>
                    {errors.qualification && (
                      <p className="text-sm text-red-600 mt-1">{errors.qualification.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Experience *
                    </label>
                    <select
                      {...register('experience')}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-10">5-10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                    {errors.experience && (
                      <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    {...register('documents')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    id="documents"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, JPG, PNG up to 10MB each
                  </p>
                </div>
              </div>

              {/* DPDP Consent */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('dpdpConsent')}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <label className="text-sm text-gray-700">
                      <strong>DPDP Act Consent *</strong>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('form.consent')}. I understand that my data will be processed securely, 
                      stored in India, and I can access/delete it anytime. 
                      <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                        Read Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
                {errors.dpdpConsent && (
                  <p className="text-sm text-red-600 mt-2">{errors.dpdpConsent.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={saveDraft}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{t('form.save')}</span>
                </Button>
                
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{t('form.submit')}</span>
                </Button>
              </div>

              {!isOnline && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="text-sm text-orange-800">
                      {t('form.offline')}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Form Submitted Successfully!"
        size="lg"
      >
        <div className="text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('form.success')}
            </h3>
            <p className="text-gray-600">
              {submissionResult?.offline
                ? 'Your form has been saved offline and will sync automatically when you\'re back online.'
                : 'Your form has been submitted and recorded on the blockchain for verification.'
              }
            </p>
          </div>

          {submissionResult && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Submission ID:</span>
                <span className="font-mono text-sm">{submissionResult.submissionId}</span>
              </div>
              
              {submissionResult.txHash && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transaction Hash:</span>
                  <span className="font-mono text-xs text-blue-600 truncate">
                    {submissionResult.txHash}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Timestamp:</span>
                <span className="text-sm">{submissionResult.timestamp.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={downloadReceipt}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Download Receipt</span>
            </Button>
            
            <Button onClick={() => window.location.href = '/dashboard'}>
              View Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}