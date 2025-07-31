/**
 * Mock Exam Data
 * This file contains sample exam data for development and testing
 */

export const mockExams = [
  {
    id: 'reet-2025',
    title: 'REET 2025',
    organization: 'Board of Secondary Education, Rajasthan',
    applicationStartDate: '2025-01-15T00:00:00.000Z',
    applicationEndDate: '2025-02-15T23:59:59.999Z',
    examDate: '2025-04-20T09:00:00.000Z',
    eligibility: 'Bachelor of Education (B.Ed) or equivalent',
    applicationFee: {
      general: 550,
      obc: 350,
      sc: 250,
      st: 250
    },
    vacancies: 32000,
    status: 'open',
    applicationUrl: 'https://reet.rajasthan.gov.in',
    resultUrl: ''
  },
  {
    id: 'rajasthan-police-2025',
    title: 'Rajasthan Police Constable Recruitment 2025',
    organization: 'Rajasthan Police Department',
    applicationStartDate: '2025-02-10T00:00:00.000Z',
    applicationEndDate: '2025-03-10T23:59:59.999Z',
    examDate: '2025-05-15T09:00:00.000Z',
    eligibility: '12th Pass, Age: 18-26 years',
    applicationFee: {
      general: 600,
      obc: 400,
      sc: 300,
      st: 300
    },
    vacancies: 5000,
    status: 'open',
    applicationUrl: 'https://police.rajasthan.gov.in',
    resultUrl: ''
  },
  {
    id: 'delhi-police-si-2024',
    title: 'Delhi Police Sub-Inspector Recruitment 2024',
    organization: 'Delhi Police',
    applicationStartDate: '2024-11-01T00:00:00.000Z',
    applicationEndDate: '2024-12-01T23:59:59.999Z',
    examDate: '2025-02-10T09:00:00.000Z',
    eligibility: 'Bachelor\'s Degree, Age: 20-30 years',
    applicationFee: {
      general: 700,
      obc: 500,
      sc: 300,
      st: 300
    },
    vacancies: 800,
    status: 'closed',
    applicationUrl: 'https://delhipolice.gov.in',
    resultUrl: 'https://delhipolice.gov.in/results'
  },
  {
    id: 'up-police-2025',
    title: 'UP Police Recruitment 2025',
    organization: 'Uttar Pradesh Police Recruitment Board',
    applicationStartDate: '2025-03-01T00:00:00.000Z',
    applicationEndDate: '2025-04-01T23:59:59.999Z',
    examDate: '2025-06-15T09:00:00.000Z',
    eligibility: '12th Pass, Age: 18-25 years',
    applicationFee: {
      general: 500,
      obc: 350,
      sc: 250,
      st: 250
    },
    vacancies: 10000,
    status: 'open',
    applicationUrl: 'https://uppbpb.gov.in',
    resultUrl: ''
  },
  {
    id: 'jee-main-2025',
    title: 'JEE Main 2025',
    organization: 'National Testing Agency (NTA)',
    applicationStartDate: '2024-12-01T00:00:00.000Z',
    applicationEndDate: '2025-01-15T23:59:59.999Z',
    examDate: '2025-02-25T09:00:00.000Z',
    eligibility: '12th Pass or appearing, Age: No limit',
    applicationFee: {
      general: 1000,
      obc: 900,
      sc: 500,
      st: 500
    },
    vacancies: null,
    status: 'closed',
    applicationUrl: 'https://jeemain.nta.nic.in',
    resultUrl: 'https://jeemain.nta.nic.in/results'
  },
  {
    id: 'neet-ug-2025',
    title: 'NEET UG 2025',
    organization: 'National Testing Agency (NTA)',
    applicationStartDate: '2025-01-05T00:00:00.000Z',
    applicationEndDate: '2025-02-05T23:59:59.999Z',
    examDate: '2025-05-05T14:00:00.000Z',
    eligibility: '12th Pass with PCB, Age: 17+ years',
    applicationFee: {
      general: 1600,
      obc: 1400,
      sc: 900,
      st: 900
    },
    vacancies: null,
    status: 'open',
    applicationUrl: 'https://neet.nta.nic.in',
    resultUrl: ''
  },
  {
    id: 'cuet-ug-2025',
    title: 'CUET UG 2025',
    organization: 'National Testing Agency (NTA)',
    applicationStartDate: '2025-02-10T00:00:00.000Z',
    applicationEndDate: '2025-03-10T23:59:59.999Z',
    examDate: '2025-05-15T09:00:00.000Z',
    eligibility: '12th Pass or appearing',
    applicationFee: {
      general: 800,
      obc: 700,
      sc: 450,
      st: 450
    },
    vacancies: null,
    status: 'open',
    applicationUrl: 'https://cuet.nta.nic.in',
    resultUrl: ''
  },
  {
    id: 'ssc-cgl-2025',
    title: 'SSC CGL 2025',
    organization: 'Staff Selection Commission',
    applicationStartDate: '2025-01-20T00:00:00.000Z',
    applicationEndDate: '2025-02-20T23:59:59.999Z',
    examDate: '2025-04-10T09:00:00.000Z',
    eligibility: 'Bachelor\'s Degree',
    applicationFee: {
      general: 1000,
      obc: 1000,
      sc: 0,
      st: 0
    },
    vacancies: 7500,
    status: 'open',
    applicationUrl: 'https://ssc.nic.in',
    resultUrl: ''
  },
  {
    id: 'ibps-po-2025',
    title: 'IBPS PO 2025',
    organization: 'Institute of Banking Personnel Selection',
    applicationStartDate: '2025-07-01T00:00:00.000Z',
    applicationEndDate: '2025-07-31T23:59:59.999Z',
    examDate: '2025-10-15T09:00:00.000Z',
    eligibility: 'Bachelor\'s Degree, Age: 20-30 years',
    applicationFee: {
      general: 850,
      obc: 850,
      sc: 175,
      st: 175
    },
    vacancies: 4500,
    status: 'upcoming',
    applicationUrl: 'https://ibps.in',
    resultUrl: ''
  }
];