import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Users, 
  BarChart2, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  RefreshCw,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../contexts/AuthContext'
import { AdminStats } from '../types'

export const AdminPanel: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // Check if user is admin, if not redirect to home
    if (user && user.role !== 'admin') {
      navigate('/')
    }
    
    loadAdminData()
  }, [user, navigate])

  const loadAdminData = async () => {
    setLoading(true)
    try {
      // In a real app, this would fetch from API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockStats: AdminStats = {
        totalForms: 15,
        totalSubmissions: 1250,
        pendingSubmissions: 48,
        approvedSubmissions: 1150,
        rejectedSubmissions: 52,
        queueSize: 12,
        offlineSubmissions: 35,
        onlineSubmissions: 1215
      }
      
      setStats(mockStats)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    try {
      await loadAdminData()
    } finally {
      setRefreshing(false)
    }
  }

  // Mock blockchain verification function
  const verifyOnBlockchain = async (submissionId: string) => {
    // In a real app, this would call the blockchain API
    console.log(`Verifying submission ${submissionId} on blockchain`)
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert(`Submission ${submissionId} verified on blockchain. Transaction hash: 0x${Math.random().toString(16).substring(2)}`)
  }

  // Mock data for forms and submissions
  const mockForms = [
    { id: 'form-1', title: 'JEE Main 2025', createdAt: new Date('2025-01-05'), status: 'active', submissions: 450 },
    { id: 'form-2', title: 'NEET 2025', createdAt: new Date('2025-01-10'), status: 'active', submissions: 620 },
    { id: 'form-3', title: 'UPSC Prelims 2025', createdAt: new Date('2025-01-15'), status: 'draft', submissions: 0 },
    { id: 'form-4', title: 'GATE 2025', createdAt: new Date('2025-01-20'), status: 'closed', submissions: 180 },
  ]

  const mockSubmissions = [
    { id: 'sub-1', formId: 'form-1', formTitle: 'JEE Main 2025', applicant: 'Rahul Sharma', submittedAt: new Date('2025-01-25'), status: 'approved', txHash: '0x1a2b3c4d5e6f' },
    { id: 'sub-2', formId: 'form-1', formTitle: 'JEE Main 2025', applicant: 'Priya Patel', submittedAt: new Date('2025-01-26'), status: 'pending', txHash: null },
    { id: 'sub-3', formId: 'form-2', formTitle: 'NEET 2025', applicant: 'Amit Kumar', submittedAt: new Date('2025-01-27'), status: 'approved', txHash: '0x7e8f9a0b1c2d' },
    { id: 'sub-4', formId: 'form-2', formTitle: 'NEET 2025', applicant: 'Sneha Gupta', submittedAt: new Date('2025-01-28'), status: 'rejected', txHash: '0x3d4e5f6a7b8c' },
    { id: 'sub-5', formId: 'form-4', formTitle: 'GATE 2025', applicant: 'Vikram Singh', submittedAt: new Date('2025-01-29'), status: 'approved', txHash: '0x9a0b1c2d3e4f' },
  ]

  // Filter forms and submissions based on search query
  const filteredForms = mockForms.filter(form => 
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSubmissions = mockSubmissions.filter(sub => 
    sub.formTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to access the admin panel.
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
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage forms, submissions, and view analytics
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Button
                variant="outline"
                onClick={refreshData}
                loading={refreshing}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              
              <Button>
                <a href="/form" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Form</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search forms, submissions, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`${activeTab === 'forms' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Forms
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`${activeTab === 'submissions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Submissions
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Forms</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalForms}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Submissions</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pendingSubmissions}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Queue Size</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.queueSize}</p>
                    </div>
                    <BarChart2 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Submission Approved</p>
                      <p className="text-xs text-gray-500">JEE Main 2025 - Rahul Sharma</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Submission Rejected</p>
                      <p className="text-xs text-gray-500">NEET 2025 - Sneha Gupta</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Form Created</p>
                      <p className="text-xs text-gray-500">UPSC Prelims 2025</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Forms Tab */}
        {activeTab === 'forms' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Forms
              </h2>
            </CardHeader>
            <CardContent>
              {filteredForms.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No forms found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? `No forms match "${searchQuery}"` : 'Create your first form to get started.'}
                  </p>
                  {!searchQuery && (
                    <Button>
                      <a href="/form" className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Create Form</span>
                      </a>
                    </Button>
                  )}
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
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submissions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredForms.map((form) => (
                        <tr key={form.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {form.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {form.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {form.createdAt.toLocaleDateString()}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.status === 'active' ? 'bg-green-100 text-green-800' : form.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                              {form.status}
                            </span>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {form.submissions}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Submissions
              </h2>
            </CardHeader>
            <CardContent>
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No submissions found
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery ? `No submissions match "${searchQuery}"` : 'There are no submissions yet.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Form
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
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
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {submission.applicant}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {submission.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.formTitle}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.submittedAt.toLocaleDateString()}
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.status === 'approved' ? 'bg-green-100 text-green-800' : submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {submission.status}
                            </span>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button 
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => verifyOnBlockchain(submission.id)}
                                title="Verify on blockchain"
                              >
                                {submission.txHash ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                              </button>
                              <button className="text-green-600 hover:text-green-900" title="Download receipt">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  Submission Analytics
                </h2>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Analytics Visualization
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      In a real implementation, this would show charts and graphs of submission trends, form performance, and user demographics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Blockchain Verification Stats
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Verifications:</span>
                      <span className="font-medium">1,205</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Verification Time:</span>
                      <span className="font-medium">2.3 seconds</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Blockchain Network:</span>
                      <span className="font-medium">Ethereum (Sepolia)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Smart Contract Address:</span>
                      <span className="font-mono text-xs">0x1a2b3c4d5e6f7g8h9i0j...</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    System Performance
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">API Response Time:</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cache Hit Rate:</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active API Instances:</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Redis Memory Usage:</span>
                      <span className="font-medium">256MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}