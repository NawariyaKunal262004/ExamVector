// IndexedDB wrapper for offline storage
export class LocalStorage {
  private dbName = 'examvector-db'
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Create stores
        if (!db.objectStoreNames.contains('forms')) {
          const formStore = db.createObjectStore('forms', { keyPath: 'id' })
          formStore.createIndex('status', 'status', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('submissions')) {
          const submissionStore = db.createObjectStore('submissions', { keyPath: 'id' })
          submissionStore.createIndex('formId', 'formId', { unique: false })
          submissionStore.createIndex('status', 'status', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('queue')) {
          db.createObjectStore('queue', { keyPath: 'id' })
        }
      }
    })
  }

  async saveForm(formData: any): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')
      const request = store.put(formData)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getForms(): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['forms'], 'readonly')
      const store = transaction.objectStore('forms')
      const request = store.getAll()
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async saveSubmission(submission: any): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['submissions'], 'readwrite')
      const store = transaction.objectStore('submissions')
      const request = store.put({
        ...submission,
        timestamp: Date.now(),
        status: 'pending-sync',
        offline: true
      })
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getPendingSubmissions(): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['submissions'], 'readonly')
      const store = transaction.objectStore('submissions')
      const index = store.index('status')
      const request = index.getAll('pending-sync')
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async updateSubmissionStatus(id: string, status: string, txHash?: string): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['submissions'], 'readwrite')
      const store = transaction.objectStore('submissions')
      const getRequest = store.get(id)
      
      getRequest.onsuccess = () => {
        const submission = getRequest.result
        if (submission) {
          submission.status = status
          submission.offline = false
          if (txHash) submission.txHash = txHash
          
          const putRequest = store.put(submission)
          putRequest.onerror = () => reject(putRequest.error)
          putRequest.onsuccess = () => resolve()
        } else {
          reject(new Error('Submission not found'))
        }
      }
      
      getRequest.onerror = () => reject(getRequest.error)
    })
  }
}

export const localStorage = new LocalStorage()