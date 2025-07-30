import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  WifiOff,
  RefreshCw
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'
import { localStorage } from '../lib/storage'
import { Submission } from '../types'

export const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    try {
      // In a real app, this would fetch from API
      // For now, we'll get from localStorage
      const forms = await localStorage.getForms()
      const mockSubmissions: Submission[] = [
        {
          id: '1',
          formId: 'exam-form-2025',
          data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '9876543210'
          },
          status: 'approved',
          submittedAt: new Date('2025-01-10'),
          reviewedAt: new Date('2025-01-11'),
          txHash: '0x1234567890abcdef',
          consentGiven: true,
          offline: false
        },
        {
          id: '2',
          formId: 'exam-form-2025',
          data: {
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543211'
          },
          status: 'pending',
          submittedAt: new Date('2025-01-12'),
          consentGiven: true,
          offline: false
        },
        {
          id: '3',
          formId: 'exam-form-2025',
          data: {
            fullName: 'Bob Johnson',
            email: 'bob@example.com',
            phone: '9876543212'
          },
          status: 'pending-sync',
          submittedAt: new Date('2025-01-13'),
          consentGiven: true,
          offline: true
        }
      ]
      
      setSubmissions(mockSubmissions)
    } catch (error) {
      console.error('Failed to load submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const syncOfflineSubmissions = async () => {
    if (!navigator.onLine) {
      alert('Please connect to the internet to sync offline submissions.')
      return
    }

    setSyncing(true)
    try {
      const pendingSubmissions = await localStorage.getPendingSubmissions()
      
      for (const submission of pendingSubmissions) {
        // Simulate API sync
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update status
        await localStorage.updateSubmissionStatus(
          submission.id, 
          'submitted', 
          `0x${Date.now().toString(16)}`
        )
      }
      
      // Reload submissions
      await loadSubmissions()
      alert('All offline submissions have been synced successfully!')
    } catch (error) {
      console.error('Sync failed:', error)
      alert('Failed to sync submissions. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'pending-sync':
        return <WifiOff className="h-5 w-5 text-orange-600" />
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return t('dashboard.status.approved')
      case 'rejected':
        return t('dashboard.status.rejected')
      case 'pending-sync':
        return 'Pending Sync'
      default:
        return t('dashboard.status.pending')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending-sync':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const downloadReceipt = (submission: Submission) => {
    const receiptContent = `
EXAMVECTOR - SUBMISSION RECEIPT

Submission ID: ${submission.id}
Form: ${submission.formId}
${submission.txHash ? `Transaction Hash: ${submission.txHash}` : ''}
Submitted: ${submission.submittedAt.toLocaleString()}
Status: ${submission.status}

Submitted Data:
- Name: ${submission.data.fullName}
- Email: ${submission.data.email}
- Phone: ${submission.data.phone}

This is a digitally generated receipt.
For verification, visit: https://examvector.com/verify/${submission.id}
    `

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ExamVector_Receipt_${submission.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to view your submissions.
            </p>
            <Button>
              <a href="/login">Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.title')}
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user.name}! Here are your form submissions.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Button
                variant="outline"
                onClick={syncOfflineSubmissions}
                loading={syncing}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Sync Offline</span>
              </Button>
              
              <Button>
                <a href="/form">New Form</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {submissions.filter(s => s.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {submissions.filter(s => s.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Offline Pending</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {submissions.filter(s => s.status === 'pending-sync').length}
                  </p>
                </div>
                <WifiOff className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Submissions
            </h2>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('dashboard.noSubmissions')}
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by filling out your first form.
                </p>
                <Button>
                  <a href="/form">Fill New Form</a>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Form
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {submission.formId}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {submission.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.submittedAt.toLocaleDateString()}
                          <div className="text-xs text-gray-500">
                            {submission.submittedAt.toLocaleTimeString()}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(submission.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                              {getStatusText(submission.status)}
                            </span>
                            {submission.offline && (
                              <WifiOff className="h-4 w-4 text-orange-500" title="Submitted offline" />
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadReceipt(submission)}
                            className="flex items-center space-x-1"
                          >
                            <Download className="h-4 w-4" />
                            <span>{t('dashboard.downloadReceipt')}</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}