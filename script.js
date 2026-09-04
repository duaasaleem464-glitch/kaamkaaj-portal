// KaamKaaj.pk - Complete Multi-Page Engine

// 20 Professional Job Entries
const jobsData = [
  { id: 1, title: "Frontend React Developer", company: "TechSolutions PK", city: "Karachi", category: "Software", salary: "120,000", type: "Full-Time", badge: "Urgent", rating: "4.9" },
  { id: 2, title: "UI/UX Designer", company: "Creative Mindz", city: "Lahore", category: "Graphics", salary: "85,000", type: "Remote", badge: "Featured", rating: "4.8" },
  { id: 3, title: "HR Operations Manager", company: "Engro Corp", city: "Karachi", category: "HR", salary: "150,000", type: "Full-Time", badge: "Hot", rating: "4.7" },
  { id: 4, title: "Digital Marketing Lead", company: "ByteCraft", city: "Islamabad", category: "Marketing", salary: "95,000", type: "Hybrid", badge: "Urgent", rating: "4.9" },
  { id: 5, title: "Python Backend Developer", company: "Systems Ltd", city: "Lahore", category: "Software", salary: "140,000", type: "Full-Time", badge: "Featured", rating: "5.0" },
  { id: 6, title: "Social Media Specialist", company: "MediaPlus", city: "Karachi", category: "Marketing", salary: "60,000", type: "Remote", badge: "New", rating: "4.5" },
  { id: 7, title: "SQA Automation Engineer", company: "10Pearls", city: "Karachi", category: "Software", salary: "110,000", type: "Full-Time", badge: "Hot", rating: "4.8" },
  { id: 8, title: "SEO Strategist", company: "Digitex", city: "Rawalpindi", category: "Marketing", salary: "75,000", type: "Full-Time", badge: "Featured", rating: "4.6" },
  { id: 9, title: "Senior Brand Designer", company: "Ideation Lab", city: "Lahore", category: "Graphics", salary: "105,000", type: "Hybrid", badge: "Urgent", rating: "4.9" },
  { id: 10, title: "Talent Acquisition Specialist", company: "KFC Pakistan", city: "Karachi", category: "HR", salary: "90,000", type: "Full-Time", badge: "New", rating: "4.4" },
  { id: 11, title: "Flutter App Developer", company: "AppStudio", city: "Islamabad", category: "Software", salary: "130,000", type: "Remote", badge: "Hot", rating: "4.9" },
  { id: 12, title: "Motion Graphics Artist", company: "Pixel Studio", city: "Lahore", category: "Graphics", salary: "80,000", type: "Full-Time", badge: "Featured", rating: "4.7" },
  { id: 13, title: "E-commerce Manager", company: "Daraz PK", city: "Karachi", category: "Marketing", salary: "160,000", type: "Full-Time", badge: "Urgent", rating: "5.0" },
  { id: 14, title: "HR Payroll Officer", company: "Interloop", city: "Faisalabad", category: "HR", salary: "70,000", type: "Full-Time", badge: "New", rating: "4.3" },
  { id: 15, title: "Full Stack MERN Developer", company: "Arbisoft", city: "Lahore", category: "Software", salary: "180,000", type: "Hybrid", badge: "Featured", rating: "4.9" },
  { id: 16, title: "3D Artist & Illustrator", company: "GameTrain", city: "Islamabad", category: "Graphics", salary: "100,000", type: "Remote", badge: "Hot", rating: "4.8" },
  { id: 17, title: "Google Ads Specialist", company: "GrowthX", city: "Karachi", category: "Marketing", salary: "90,000", type: "Remote", badge: "Urgent", rating: "4.7" },
  { id: 18, title: "Technical Recruiter", company: "Netsol", city: "Lahore", category: "HR", salary: "85,000", type: "Full-Time", badge: "New", rating: "4.5" },
  { id: 19, title: "Data Analyst", company: "Jazz PK", city: "Islamabad", category: "Software", salary: "125,000", type: "Full-Time", badge: "Featured", rating: "4.8" },
  { id: 20, title: "Creative Art Director", company: "Ogilvy", city: "Karachi", category: "Graphics", salary: "200,000", type: "Full-Time", badge: "Hot", rating: "5.0" }
];

let savedJobsCount = 0;
let currentSelectedJob = null;

// Multi-Page Switching Navigation Logic
function switchPage(pageId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) targetPage.classList.add('active');

  // Highlight Nav Item
  const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(a => a.getAttribute('onclick').includes(pageId));
  if (activeNav) activeNav.classList.add('active');

  // Close Mobile Menu if open
  document.getElementById('navLinks').classList.remove('show');
}

// Toggle Three Lines Hamburger Menu on Mobile
function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('show');
}

// Render Job Cards Dynamically
function renderJobs(data) {
  const container = document.getElementById("jobContainer");
  if (!container) return;
  
  container.innerHTML = "";
  
  if (data.length === 0) {
    container.innerHTML = `<h3 style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">No Vacancies Found!</h3>`;
    return;
  }

  data.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <div class="card-header">
        <span class="card-badge">${job.badge}</span>
        <button class="bookmark-btn" onclick="toggleBookmark(this)"><i class="fa-regular fa-bookmark"></i></button>
      </div>
      <h3>${job.title}</h3>
      <p class="company">🏢 ${job.company} • 📍 ${job.city}</p>
      <p class="salary">PKR ${job.salary} / mo</p>
      <div class="card-actions">
        <button class="btn-view" onclick="openJobModal(${job.id})">View Details</button>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById("totalJobsCount").innerText = data.length;
}

// Search Filtering
function filterJobs() {
  const keyword = document.getElementById("keywordInput").value.toLowerCase();
  const city = document.getElementById("citySelect").value;
  const salaryVal = document.getElementById("salarySelect").value;

  const filtered = jobsData.filter(job => {
    const matchesKeyword = job.title.toLowerCase().includes(keyword) || job.category.toLowerCase().includes(keyword);
    const matchesCity = city === "" || job.city === city;
    
    let numericSalary = parseInt(job.salary.replace(/,/g, ''));
    let matchesSalary = true;
    if (salaryVal === "100k") matchesSalary = numericSalary >= 100000;
    if (salaryVal === "150k") matchesSalary = numericSalary >= 150000;

    return matchesKeyword && matchesCity && matchesSalary;
  });

  renderJobs(filtered);
}

// Category Pills
function filterByCategory(cat) {
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (cat === 'All') {
    renderJobs(jobsData);
  } else {
    const filtered = jobsData.filter(j => j.category === cat);
    renderJobs(filtered);
  }
}

// Bookmark Toggle
function toggleBookmark(btn) {
  const icon = btn.querySelector('i');
  if (icon.classList.contains('fa-regular')) {
    icon.className = 'fa-solid fa-bookmark';
    btn.classList.add('saved');
    savedJobsCount++;
  } else {
    icon.className = 'fa-regular fa-bookmark';
    btn.classList.remove('saved');
    savedJobsCount--;
  }
  document.getElementById("savedCount").innerText = savedJobsCount;
}

// Modal Functions
function openJobModal(id) {
  currentSelectedJob = jobsData.find(j => j.id === id);
  if (!currentSelectedJob) return;

  document.getElementById("modalTitle").innerText = currentSelectedJob.title;
  document.getElementById("modalCompany").innerText = currentSelectedJob.company;
  document.getElementById("modalCity").innerText = currentSelectedJob.city;
  document.getElementById("modalSalary").innerText = currentSelectedJob.salary;
  document.getElementById("modalType").innerText = currentSelectedJob.type;
  document.getElementById("modalRating").innerText = currentSelectedJob.rating;
  document.getElementById("modalBadge").innerText = currentSelectedJob.badge;

  document.getElementById("jobModal").style.display = "flex";
}

function closeJobModal() {
  document.getElementById("jobModal").style.display = "none";
}

function confirmApply() {
  alert(`Application successfully sent for ${currentSelectedJob.title} at ${currentSelectedJob.company}!`);
  closeJobModal();
}

// Forms Submission
document.getElementById("cvForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const fileInput = document.getElementById("candidateCV");
  const feedback = document.getElementById("formFeedback");

  const fileName = fileInput.files[0].name;
  const ext = fileName.split('.').pop().toLowerCase();

  if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
    feedback.style.color = "#4ade80";
    feedback.innerText = "Success! Resume uploaded and candidate profile registered.";
    this.reset();
  } else {
    feedback.style.color = "#ef4444";
    feedback.innerText = "Error: Please upload a valid PDF or DOC file.";
  }
});

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const feedback = document.getElementById("contactFeedback");
  feedback.style.color = "#4ade80";
  feedback.innerText = "Thank you! Your message has been sent to KaamKaaj Support.";
  this.reset();
});

// Setup Initial Load
document.addEventListener("DOMContentLoaded", () => {
  renderJobs(jobsData);
  document.getElementById("searchBtn").addEventListener("click", filterJobs);
});
