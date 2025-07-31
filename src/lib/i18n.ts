import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.dashboard': 'Dashboard',
      'nav.admin': 'Admin',
      'nav.language': 'Language',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      
      // Home Page
      'home.title': 'ExamVector - All India Competitive Exams Platform',
      'home.subtitle': 'Offline-first, blockchain-secured platform for all competitive exams across India',
      'home.startForm': 'Start Form',
      'home.installApp': 'Install App',
      'home.benefits.title': 'Platform Benefits',
      'home.benefits.offline': 'Works offline with auto-sync',
      'home.benefits.blockchain': 'Blockchain audit trail',
      'home.benefits.secure': 'DPDP compliant & secure',
      'home.benefits.mobile': 'Mobile-first PWA design',
      
      // Form
      'form.title': 'Examination Form',
      'form.required': 'Required field',
      'form.submit': 'Submit Form',
      'form.save': 'Save Draft',
      'form.consent': 'I consent to data processing as per DPDP Act',
      'form.consentRequired': 'Consent is required to proceed',
      'form.success': 'Form submitted successfully!',
      'form.error': 'Error submitting form',
      'form.offline': 'Saved offline - will sync when online',
      
      // Queue
      'queue.title': 'Queue Status',
      'queue.position': 'Position in queue',
      'queue.estimated': 'Estimated wait time',
      'queue.minutes': 'minutes',
      
      // Dashboard
      'dashboard.title': 'My Submissions',
      'dashboard.noSubmissions': 'No submissions found',
      'dashboard.status.pending': 'Pending',
      'dashboard.status.approved': 'Approved',
      'dashboard.status.rejected': 'Rejected',
      'dashboard.downloadReceipt': 'Download Receipt',
      
      // Admin
      'admin.title': 'Admin Dashboard',
      'admin.forms': 'Forms',
      'admin.submissions': 'Submissions',
      'admin.analytics': 'Analytics',
      'admin.createForm': 'Create Form',
      'admin.editForm': 'Edit Form',
      'admin.deleteForm': 'Delete Form',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.download': 'Download',
      'common.upload': 'Upload',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.all': 'All',
      'common.name': 'Name',
      'common.email': 'Email',
      'common.phone': 'Phone',
      'common.date': 'Date',
      'common.status': 'Status',
      'common.actions': 'Actions',
      
      // Footer
      'footer.contact': 'Contact Us',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      'footer.credits': 'Built with ❤️ by ExamVector Team',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.home': 'होम',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.admin': 'एडमिन',
      'nav.language': 'भाषा',
      'nav.login': 'लॉगिन',
      'nav.logout': 'लॉगआउट',
      
      // Home Page
      'home.title': 'एक्जामवेक्टर - अखिल भारतीय प्रतियोगी परीक्षा प्लेटफॉर्म',
      'home.subtitle': 'पूरे भारत में सभी प्रतियोगी परीक्षाओं के लिए ऑफलाइन-फर्स्ट, ब्लॉकचेन-सुरक्षित प्लेटफॉर्म',
      'home.startForm': 'फॉर्म शुरू करें',
      'home.installApp': 'ऐप इंस्टॉल करें',
      'home.benefits.title': 'प्लेटफॉर्म के फायदे',
      'home.benefits.offline': 'ऑटो-सिंक के साथ ऑफलाइन काम करता है',
      'home.benefits.blockchain': 'ब्लॉकचेन ऑडिट ट्रेल',
      'home.benefits.secure': 'DPDP अनुपालित और सुरक्षित',
      'home.benefits.mobile': 'मोबाइल-फर्स्ट PWA डिजाइन',
      
      // Form
      'form.title': 'परीक्षा फॉर्म',
      'form.required': 'आवश्यक फील्ड',
      'form.submit': 'फॉर्म जमा करें',
      'form.save': 'ड्राफ्ट सेव करें',
      'form.consent': 'मैं DPDP अधिनियम के अनुसार डेटा प्रोसेसिंग के लिए सहमति देता हूं',
      'form.consentRequired': 'आगे बढ़ने के लिए सहमति आवश्यक है',
      'form.success': 'फॉर्म सफलतापूर्वक जमा हुआ!',
      'form.error': 'फॉर्म जमा करने में त्रुटि',
      'form.offline': 'ऑफलाइन सेव किया गया - ऑनलाइन होने पर सिंक होगा',
      
      // Queue
      'queue.title': 'क्यू स्थिति',
      'queue.position': 'क्यू में स्थिति',
      'queue.estimated': 'अनुमानित प्रतीक्षा समय',
      'queue.minutes': 'मिनट',
      
      // Dashboard
      'dashboard.title': 'मेरे सबमिशन',
      'dashboard.noSubmissions': 'कोई सबमिशन नहीं मिला',
      'dashboard.status.pending': 'लंबित',
      'dashboard.status.approved': 'स्वीकृत',
      'dashboard.status.rejected': 'अस्वीकृत',
      'dashboard.downloadReceipt': 'रसीद डाउनलोड करें',
      
      // Admin
      'admin.title': 'एडमिन डैशबोर्ड',
      'admin.forms': 'फॉर्म',
      'admin.submissions': 'सबमिशन',
      'admin.analytics': 'एनालिटिक्स',
      'admin.createForm': 'फॉर्म बनाएं',
      'admin.editForm': 'फॉर्म संपादित करें',
      'admin.deleteForm': 'फॉर्म हटाएं',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'त्रुटि',
      'common.success': 'सफलता',
      'common.cancel': 'रद्द करें',
      'common.save': 'सेव करें',
      'common.delete': 'हटाएं',
      'common.edit': 'संपादित करें',
      'common.view': 'देखें',
      'common.download': 'डाउनलोड',
      'common.upload': 'अपलोड',
      'common.search': 'खोजें',
      'common.filter': 'फिल्टर',
      'common.all': 'सभी',
      'common.name': 'नाम',
      'common.email': 'ईमेल',
      'common.phone': 'फोन',
      'common.date': 'दिनांक',
      'common.status': 'स्थिति',
      'common.actions': 'कार्य',
      
      // Footer
      'footer.contact': 'संपर्क करें',
      'footer.privacy': 'गोपनीयता नीति',
      'footer.terms': 'सेवा की शर्तें',
      'footer.credits': 'एक्जामवेक्टर टीम द्वारा ❤️ के साथ बनाया गया',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n