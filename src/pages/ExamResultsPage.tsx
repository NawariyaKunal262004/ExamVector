import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  Award,
  TrendingUp,
  Eye,
  ExternalLink
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

export const ExamResultsPage: React.FC = () => {
  const { t } = useTranslation()

  // Mock data for exam results
  const examResults = [
    {
      id: 'JEE-2024-001',
      examName: 'JEE Main 2024',
      applicationDate: '2024-01-15',
      status: 'qualified',
      score: 285,
      rank: 1250,
      percentile: 99.2,
      category: 'General',
      resultDate: '2024-04-20',
      certificateUrl: '#'
    },
    {
      id: 'NEET-2024-002',
      examName: 'NEET 2024',
      applicationDate: '2024-02-10',
      status: 'qualified',
      score: 650,
      rank: 850,
      percentile: 99.5,
      category: 'General',
      resultDate: '2024-05-15',
      certificateUrl: '#'
    },
    {
      id: 'GATE-2024-003',
      examName: 'GATE 2024 - Computer Science',
      applicationDate: '2024-01-20',
      status: 'qualified',
      score: 750,
      rank: 450,
      percentile: 98.8,
      category: 'General',
      resultDate: '2024-03-25',
      certificateUrl: '#'
    },
    {
      id: 'CAT-2024-004',
      examName: 'CAT 2024',
      applicationDate: '2024-03-05',
      status: 'pending',
      score: null,
      rank: null,
      percentile: null,
      category: 'General',
      resultDate: null,
      certificateUrl: null
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'qualified':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'not-qualified':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'not-qualified':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const qualifiedResults = examResults.filter(result => result.status === 'qualified')
  const pendingResults = examResults.filter(result => result.status === 'pending')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t('examResults.title', 'Exam Results')}
              </h1>
              <p className="text-lg text-gray-600">
                View and download your exam results and certificates
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-blue-900">{examResults.length}</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full">
                  <FileText className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Qualified</p>
                  <p className="text-3xl font-bold text-green-900">{qualifiedResults.length}</p>
                </div>
                <div className="p-3 bg-green-200 rounded-full">
                  <Award className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900">{pendingResults.length}</p>
                </div>
                <div className="p-3 bg-yellow-200 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Best Percentile</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {Math.max(...qualifiedResults.map(r => r.percentile || 0))}%
                  </p>
                </div>
                <div className="p-3 bg-purple-200 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {examResults.map((result) => (
            <Card key={result.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Section - Exam Info */}
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {result.examName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Applied: {new Date(result.applicationDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>ID: {result.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        <span className="ml-2 capitalize">{result.status}</span>
                      </div>
                    </div>

                    {/* Results Details */}
                    {result.status === 'qualified' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Score</p>
                          <p className="text-xl font-bold text-gray-900">{result.score}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Rank</p>
                          <p className="text-xl font-bold text-gray-900">{result.rank?.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Percentile</p>
                          <p className="text-xl font-bold text-green-600">{result.percentile}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Category</p>
                          <p className="text-xl font-bold text-gray-900">{result.category}</p>
                        </div>
                      </div>
                    )}

                    {result.status === 'pending' && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <p className="text-yellow-800 font-medium">
                            Result declaration is pending. You will be notified once results are available.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col space-y-3 lg:ml-8">
                    {result.status === 'qualified' && (
                      <>
                        <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Download Certificate</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>Official Result</span>
                        </Button>
                      </>
                    )}
                    
                    {result.status === 'pending' && (
                      <Button variant="outline" disabled className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Awaiting Results</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Result Date */}
                {result.resultDate && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Result declared on: {new Date(result.resultDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {examResults.length === 0 && (
          <Card className="bg-white text-center py-16">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't applied for any exams yet. Start your journey by applying for an exam.
                </p>
                <Button size="lg">
                  <a href="/exams" className="flex items-center space-x-2">
                    <span>Browse Exams</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help with Your Results?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have questions about your exam results, scoring, or need assistance with downloading certificates, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Contact Support
                </Button>
                <Button variant="outline" size="lg">
                  View FAQ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}