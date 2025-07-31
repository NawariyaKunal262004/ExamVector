export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'admin'
  createdAt: Date
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'checkbox' | 'file' | 'textarea'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    pattern?: string
    min?: number
    max?: number
    fileTypes?: string[]
    maxSize?: number
  }
  order: number
}

export interface Form {
  id: string
  title: string
  description: string
  fields: FormField[]
  status: 'draft' | 'active' | 'closed'
  deadline: Date
  institutionId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Submission {
  id: string
  formId: string
  userId?: string
  data: Record<string, any>
  status: 'pending' | 'approved' | 'rejected' | 'pending-sync'
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  notes?: string
  txHash?: string
  offline?: boolean
  consentGiven: boolean
  ipAddress?: string
  userAgent?: string
}

export interface QueueItem {
  id: string
  sessionToken: string
  resumeToken: string
  position: number
  estimatedWait: number
  createdAt: Date
  status: 'waiting' | 'processing' | 'completed'
}

export interface ChatMessage {
  id: string
  message: string
  response: string
  timestamp: Date
  userId?: string
  language: string
  offline?: boolean
}

export interface Institution {
  id: string
  name: string
  code: string
  address: string
  contactEmail: string
  contactPhone: string
  logo?: string
  createdAt: Date
  isActive: boolean
}

export interface AdminStats {
  totalForms: number
  totalSubmissions: number
  pendingSubmissions: number
  approvedSubmissions: number
  rejectedSubmissions: number
  queueSize: number
  offlineSubmissions: number
  onlineSubmissions: number
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

export interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Import exam types
export * from './exam';