// Global Variables
const API_BASE = '/api';
let currentExamData = null;
let allExams = {
    schoolBoard: [],
    university: [],
    government: []
};

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to clicked nav item
    event.target.classList.add('active');
    
    // Load page-specific data
    loadPageData(pageId);
    
    // Close mobile menu if open
    document.getElementById('navMenu').classList.remove('active');
}

function toggleNav() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Page Data Loading
async function loadPageData(pageId) {
    switch(pageId) {
        case 'home':
            await loadHomeData();
            break;
        case 'school-board':
            await loadSchoolBoardExams();
            break;
        case 'university':
            await loadUniversityExams();
            break;
        case 'government':
            await loadGovernmentExams();
            break;
        case 'results':
            await loadResultExamOptions();
            break;
        case 'admin':
            await loadAdminData();
            break;
    }
}

// Home Page Functions
async function loadHomeData() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const stats = await response.json();
        
        // Update main stats
        document.getElementById('homeStats').innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${stats.totalExams}</div>
                <div class="stat-label">Total Exams</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalApplications.toLocaleString()}</div>
                <div class="stat-label">Total Applications</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">₹${(stats.totalRevenue / 10000000).toFixed(1)}Cr</div>
                <div class="stat-label">Total Revenue</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.todayApplications.toLocaleString()}</div>
                <div class="stat-label">Today's Applications</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.activeUsers.toLocaleString()}</div>
                <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.serverLoad}%</div>
                <div class="stat-label">Server Load</div>
            </div>
        `;
        
        // Update category counts
        document.getElementById('schoolBoardCount').textContent = stats.schoolBoardExams;
        document.getElementById('universityCount').textContent = stats.universityExams;
        document.getElementById('governmentCount').textContent = stats.governmentExams;
        
    } catch (error) {
        console.error('Error loading home data:', error);
        document.getElementById('homeStats').innerHTML = '<div class="loading">Error loading statistics</div>';
    }
}

// School Board Functions
async function loadSchoolBoardExams() {
    try {
        const response = await fetch(`${API_BASE}/exams/schoolBoard`);
        const exams = await response.json();
        allExams.schoolBoard = exams;
        
        displaySchoolBoardExams(exams);
    } catch (error) {
        console.error('Error loading school board exams:', error);
        document.getElementById('schoolBoardExams').innerHTML = '<div class="loading">Error loading examinations</div>';
    }
}

function displaySchoolBoardExams(exams) {
    const container = document.getElementById('schoolBoardExams');
    
    if (exams.length === 0) {
        container.innerHTML = '<div class="loading">No examinations found</div>';
        return;
    }
    
    container.innerHTML = exams.map(exam => `
        <div class="exam-card">
            <div class="exam-title">${exam.name}</div>
            <div class="exam-meta">${exam.type} • ${exam.board} • Class ${exam.class}</div>
            
            <div class="exam-details">
                <div><strong>Exam Date:</strong> <span>${new Date(exam.examDate).toLocaleDateString()}</span></div>
                <div><strong>Result Date:</strong> <span>${new Date(exam.resultDate).toLocaleDateString()}</span></div>
                <div><strong>Registration:</strong> <span>${new Date(exam.registrationStart).toLocaleDateString()} - ${new Date(exam.registrationEnd).toLocaleDateString()}</span></div>
                <div><strong>Fee (General):</strong> <span>₹${exam.fee.general}</span></div>
            </div>
            
            <div class="exam-stats">
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.registrations.toLocaleString()}</div>
                    <div class="exam-stat-label">Registrations</div>
                </div>
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.subjects.length}</div>
                    <div class="exam-stat-label">Subjects</div>
                </div>
            </div>
            
            <div style="margin: 15px 0; font-size: 0.9rem;">
                <strong>Subjects:</strong> ${exam.subjects.join(', ')}
            </div>
            
            <button class="btn btn-primary" onclick="openApplicationModal('${exam.id}')">
                Register Now
            </button>
        </div>
    `).join('');
}

function filterSchoolExams() {
    const boardFilter = document.getElementById('boardFilter').value;
    const classFilter = document.getElementById('classFilter').value;
    
    let filteredExams = allExams.schoolBoard;
    
    if (boardFilter) {
        filteredExams = filteredExams.filter(exam => exam.board === boardFilter);
    }
    
    if (classFilter) {
        filteredExams = filteredExams.filter(exam => exam.class === classFilter);
    }
    
    displaySchoolBoardExams(filteredExams);
}

// University Functions
async function loadUniversityExams() {
    try {
        const response = await fetch(`${API_BASE}/exams/university`);
        const exams = await response.json();
        allExams.university = exams;
        
        displayUniversityExams(exams);
    } catch (error) {
        console.error('Error loading university exams:', error);
        document.getElementById('universityExams').innerHTML = '<div class="loading">Error loading examinations</div>';
    }
}

function displayUniversityExams(exams) {
    const container = document.getElementById('universityExams');
    
    if (exams.length === 0) {
        container.innerHTML = '<div class="loading">No examinations found</div>';
        return;
    }
    
    container.innerHTML = exams.map(exam => `
        <div class="exam-card">
            <div class="exam-title">${exam.name}</div>
            <div class="exam-meta">${exam.type} • ${exam.university}</div>
            
            <div class="exam-details">
                <div><strong>Exam Date:</strong> <span>${new Date(exam.examDate).toLocaleDateString()}</span></div>
                <div><strong>Result Date:</strong> <span>${new Date(exam.resultDate).toLocaleDateString()}</span></div>
                <div><strong>Application:</strong> <span>${new Date(exam.applicationStart).toLocaleDateString()} - ${new Date(exam.applicationEnd).toLocaleDateString()}</span></div>
                <div><strong>Fee (General):</strong> <span>₹${exam.fee.general}</span></div>
                <div><strong>Eligibility:</strong> <span>${exam.eligibility}</span></div>
            </div>
            
            <div class="exam-stats">
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.applicants.toLocaleString()}</div>
                    <div class="exam-stat-label">Applicants</div>
                </div>
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.seats.toLocaleString()}</div>
                    <div class="exam-stat-label">Seats</div>
                </div>
            </div>
            
            <div style="margin: 15px 0; font-size: 0.9rem;">
                <strong>Courses:</strong> ${exam.courses.join(', ')}
            </div>
            
            <button class="btn btn-primary" onclick="openApplicationModal('${exam.id}')">
                <span class="btn-icon">📝</span>
                Apply Now
            </button>
        </div>
    `).join('');
}

function filterUniversityExams() {
    const typeFilter = document.getElementById('universityTypeFilter').value;
    
    let filteredExams = allExams.university;
    
    if (typeFilter) {
        filteredExams = filteredExams.filter(exam => exam.type === typeFilter);
    }
    
    displayUniversityExams(filteredExams);
}

// Government Functions
async function loadGovernmentExams() {
    try {
        const response = await fetch(`${API_BASE}/exams/government`);
        const exams = await response.json();
        allExams.government = exams;
        
        displayGovernmentExams(exams);
    } catch (error) {
        console.error('Error loading government exams:', error);
        document.getElementById('governmentExams').innerHTML = '<div class="loading">Error loading examinations</div>';
    }
}

function displayGovernmentExams(exams) {
    const container = document.getElementById('governmentExams');
    
    if (exams.length === 0) {
        container.innerHTML = '<div class="loading">No examinations found</div>';
        return;
    }
    
    container.innerHTML = exams.map(exam => `
        <div class="exam-card">
            <div class="exam-title">${exam.name}</div>
            <div class="exam-meta">${exam.type} • ${exam.organization}</div>
            
            <div class="exam-details">
                <div><strong>Exam Date:</strong> <span>${new Date(exam.examDate).toLocaleDateString()}</span></div>
                <div><strong>Result Date:</strong> <span>${new Date(exam.resultDate).toLocaleDateString()}</span></div>
                <div><strong>Application:</strong> <span>${new Date(exam.applicationStart).toLocaleDateString()} - ${new Date(exam.applicationEnd).toLocaleDateString()}</span></div>
                <div><strong>Fee (General):</strong> <span>₹${exam.fee.general}</span></div>
                <div><strong>Eligibility:</strong> <span>${exam.eligibility}</span></div>
                <div><strong>Salary Range:</strong> <span>${exam.salary}</span></div>
            </div>
            
            <div class="exam-stats">
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.applicants.toLocaleString()}</div>
                    <div class="exam-stat-label">Applicants</div>
                </div>
                <div class="exam-stat">
                    <div class="exam-stat-number">${exam.vacancies.toLocaleString()}</div>
                    <div class="exam-stat-label">Vacancies</div>
                </div>
            </div>
            
            <div style="margin: 15px 0; font-size: 0.9rem;">
                <strong>Posts:</strong> ${exam.posts.join(', ')}
            </div>
            
            <button class="btn btn-primary" onclick="openApplicationModal('${exam.id}')">
                <span class="btn-icon">📝</span>
                Apply Now
            </button>
        </div>
    `).join('');
}

function filterGovernmentExams() {
    const orgFilter = document.getElementById('govOrgFilter').value;
    
    let filteredExams = allExams.government;
    
    if (orgFilter) {
        filteredExams = filteredExams.filter(exam => exam.organization === orgFilter);
    }
    
    displayGovernmentExams(filteredExams);
}

// Application Modal Functions
async function openApplicationModal(examId) {
    try {
        const response = await fetch(`${API_BASE}/exam/${examId}`);
        const exam = await response.json();
        currentExamData = exam;
        
        document.getElementById('modalTitle').textContent = `Apply for ${exam.name}`;
        document.getElementById('examIdInput').value = examId;
        
        // Display fee information
        const feeInfo = document.getElementById('feeInfo');
        feeInfo.innerHTML = `
            <h4>Application Fee</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 10px;">
                <div style="text-align: center; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <div style="font-weight: bold;">General</div>
                    <div style="color: #1e40af;">₹${exam.fee.general}</div>
                </div>
                <div style="text-align: center; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <div style="font-weight: bold;">OBC</div>
                    <div style="color: #1e40af;">₹${exam.fee.obc || exam.fee.general}</div>
                </div>
                <div style="text-align: center; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <div style="font-weight: bold;">SC</div>
                    <div style="color: #1e40af;">₹${exam.fee.sc}</div>
                </div>
                <div style="text-align: center; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <div style="font-weight: bold;">ST</div>
                    <div style="color: #1e40af;">₹${exam.fee.st}</div>
                </div>
            </div>
        `;
        
        document.getElementById('applicationModal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading exam details:', error);
        alert('Error loading exam details. Please try again.');
    }
}

function closeApplicationModal() {
    document.getElementById('applicationModal').style.display = 'none';
    currentExamData = null;
}

function showApplicationForm() {
    alert('Please select a specific exam from the School Board, University, or Government sections to apply.');
}

// Result Functions
async function loadResultExamOptions() {
    try {
        // Load all exams for result checking
        const [schoolResponse, universityResponse, governmentResponse] = await Promise.all([
            fetch(`${API_BASE}/exams/schoolBoard`),
            fetch(`${API_BASE}/exams/university`),
            fetch(`${API_BASE}/exams/government`)
        ]);
        
        const schoolExams = await schoolResponse.json();
        const universityExams = await universityResponse.json();
        const governmentExams = await governmentResponse.json();
        
        const resultSelect = document.getElementById('resultExamSelect');
        resultSelect.innerHTML = '<option value="">Choose Exam</option>';
        
        // Add school board exams
        if (schoolExams.length > 0) {
            const schoolGroup = document.createElement('optgroup');
            schoolGroup.label = 'School Board Exams';
            schoolExams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam.id;
                option.textContent = exam.name;
                schoolGroup.appendChild(option);
            });
            resultSelect.appendChild(schoolGroup);
        }
        
        // Add university exams
        if (universityExams.length > 0) {
            const universityGroup = document.createElement('optgroup');
            universityGroup.label = 'University Exams';
            universityExams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam.id;
                option.textContent = exam.name;
                universityGroup.appendChild(option);
            });
            resultSelect.appendChild(universityGroup);
        }
        
        // Add government exams
        if (governmentExams.length > 0) {
            const governmentGroup = document.createElement('optgroup');
            governmentGroup.label = 'Government Exams';
            governmentExams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam.id;
                option.textContent = exam.name;
                governmentGroup.appendChild(option);
            });
            resultSelect.appendChild(governmentGroup);
        }
        
    } catch (error) {
        console.error('Error loading exam options:', error);
    }
}

// Admin Functions
async function loadAdminData() {
    try {
        const response = await fetch(`${API_BASE}/admin/dashboard`);
        const data = await response.json();
        
        // Update admin stats
        document.getElementById('adminStats').innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${data.overview.totalExams}</div>
                <div class="stat-label">Total Exams</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.overview.totalApplications.toLocaleString()}</div>
                <div class="stat-label">Total Applications</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">₹${(data.overview.totalRevenue / 10000000).toFixed(1)}Cr</div>
                <div class="stat-label">Total Revenue</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.overview.activeUsers.toLocaleString()}</div>
                <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">₹${(data.overview.todayRevenue / 100000).toFixed(1)}L</div>
                <div class="stat-label">Today's Revenue</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.overview.pendingApplications.toLocaleString()}</div>
                <div class="stat-label">Pending Applications</div>
            </div>
        `;
        
        // Update recent applications
        const recentApplicationsContainer = document.getElementById('recentApplications');
        if (data.recentApplications && data.recentApplications.length > 0) {
            recentApplicationsContainer.innerHTML = data.recentApplications.map(app => `
                <div class="admin-item">
                    <div>
                        <div style="font-weight: bold;">${app.studentName}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">${app.examName || app.examId}</div>
                        <div style="opacity: 0.7; font-size: 0.8rem;">${new Date(app.appliedAt).toLocaleDateString()}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: #00ff88; font-weight: bold;">₹${app.fee}</div>
                        <div style="font-size: 0.8rem; opacity: 0.8;">${app.status}</div>
                    </div>
                </div>
            `).join('');
        } else {
            recentApplicationsContainer.innerHTML = '<div style="text-align: center; opacity: 0.7; padding: 20px;">No recent applications</div>';
        }
        
        // Update recent messages
        const recentMessagesContainer = document.getElementById('recentMessages');
        if (data.recentMessages && data.recentMessages.length > 0) {
            recentMessagesContainer.innerHTML = data.recentMessages.map(msg => `
                <div class="admin-item">
                    <div>
                        <div style="font-weight: bold;">${msg.name}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">${msg.subject}</div>
                        <div style="opacity: 0.7; font-size: 0.8rem;">${new Date(msg.submittedAt).toLocaleDateString()}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.8rem; opacity: 0.8;">${msg.status}</div>
                    </div>
                </div>
            `).join('');
        } else {
            recentMessagesContainer.innerHTML = '<div style="text-align: center; opacity: 0.7; padding: 20px;">No recent messages</div>';
        }
        
        // Update system health
        document.getElementById('systemHealth').innerHTML = `
            <div class="health-item">
                <div class="health-value">${data.systemHealth.serverUptime}</div>
                <div class="health-label">Server Uptime</div>
            </div>
            <div class="health-item">
                <div class="health-value">${data.systemHealth.databaseStatus}</div>
                <div class="health-label">Database</div>
            </div>
            <div class="health-item">
                <div class="health-value">${data.systemHealth.apiResponseTime}</div>
                <div class="health-label">API Response</div>
            </div>
            <div class="health-item">
                <div class="health-value">${data.systemHealth.errorRate}</div>
                <div class="health-label">Error Rate</div>
            </div>
            <div class="health-item">
                <div class="health-value">${data.systemHealth.activeConnections}</div>
                <div class="health-label">Active Connections</div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading admin data:', error);
        document.getElementById('adminStats').innerHTML = '<div class="loading">Error loading admin data</div>';
    }
}

// Form Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Application Form Handler
    document.getElementById('applicationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const applicationData = {
            studentName: formData.get('studentName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            category: formData.get('category'),
            fatherName: formData.get('fatherName'),
            motherName: formData.get('motherName'),
            school: formData.get('school'),
            address: formData.get('address')
        };
        
        const examId = formData.get('examId');
        
        try {
            const response = await fetch(`${API_BASE}/exam/${examId}/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert(`Application submitted successfully!\\n\\nApplication ID: ${result.applicationId}\\nExam: ${result.examName}\\nFee: ₹${result.fee}\\n\\nYou will receive a confirmation email shortly.`);
                closeApplicationModal();
                e.target.reset();
                
                // Refresh current page data
                const activePage = document.querySelector('.page-section.active').id;
                loadPageData(activePage);
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            alert('Error submitting application: ' + error.message);
        }
    });
    
    // Result Form Handler
    document.getElementById('resultForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const rollNumber = formData.get('rollNumber');
        const examId = formData.get('examId');
        
        if (!rollNumber || !examId) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE}/result/${rollNumber}/${examId}`);
            const result = await response.json();
            
            if (response.ok) {
                displayResult(result);
            } else {
                alert('Result not found. Please check your roll number and exam selection.');
            }
        } catch (error) {
            alert('Error fetching result: ' + error.message);
        }
    });
    
    // Contact Form Handler
    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert(result.message);
                e.target.reset();
            } else {
                alert('Error sending message: ' + result.error);
            }
        } catch (error) {
            alert('Error sending message: ' + error.message);
        }
    });
});

// Result Display Function
function displayResult(result) {
    const resultDisplay = document.getElementById('resultDisplay');
    
    resultDisplay.innerHTML = `
        <div class="result-header">
            <h3 style="color: #1e40af; margin-bottom: 10px;">Examination Result</h3>
            <div style="font-size: 1.3rem; font-weight: bold;">${result.studentName}</div>
            <div style="opacity: 0.8;">Roll Number: ${result.rollNumber}</div>
            <div style="opacity: 0.8;">Exam: ${result.examName}</div>
            <div style="opacity: 0.8;">Board/Organization: ${result.board}</div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <div class="result-status ${result.status.toLowerCase()}">
                Status: ${result.status}
            </div>
            <div style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">
                Grade: ${result.grade} | Percentage: ${result.percentage}%
            </div>
            <div style="opacity: 0.8;">
                Marks: ${result.obtainedMarks}/${result.totalMarks}
            </div>
        </div>
        
        ${result.subjects && result.subjects.length > 0 ? `
            <div>
                <h4 style="color: #1e40af; margin-bottom: 20px; text-align: center;">Subject-wise Results</h4>
                <div class="subjects-grid">
                    ${result.subjects.map(subject => `
                        <div class="subject-card">
                            <div style="font-weight: bold; margin-bottom: 8px;">${subject.name}</div>
                            <div style="font-size: 1.2rem; color: #1e40af; font-weight: bold;">${subject.obtainedMarks}/${subject.maxMarks}</div>
                            <div style="opacity: 0.8;">Grade: ${subject.grade}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <div style="opacity: 0.7; font-size: 0.9rem;">
                Result declared on: ${new Date(result.resultDate).toLocaleDateString()}
            </div>
            <button class="btn btn-primary" style="margin-top: 15px;" onclick="window.print()">
                Print Result
            </button>
        </div>
    `;
    
    resultDisplay.style.display = 'block';
    resultDisplay.scrollIntoView({ behavior: 'smooth' });
}

// Modal Click Outside to Close
window.onclick = function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeApplicationModal();
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Load home data on initial load
    loadHomeData();
    
    // Auto-refresh stats every 60 seconds
    setInterval(() => {
        const activePage = document.querySelector('.page-section.active').id;
        if (activePage === 'home' || activePage === 'admin') {
            loadPageData(activePage);
        }
    }, 60000);
    
    console.log('🚀 ExamVector Complete Platform Loaded Successfully');
    console.log('📊 All sections functional with backend integration');
    console.log('🎯 Ready for production use');
});
