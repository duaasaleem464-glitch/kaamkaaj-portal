// Initial Jobs List (Includes Managers, Assistants, Operators, Teaching & Tech Roles)
let jobsList = [
  { id: 1, title: "Assistant Manager Operations", company: "Al-Fatah Corp", city: "Lahore", type: "Full-Time", salary: "110k - 150k PKR", logo: "AM" },
  { id: 2, title: "Data Entry & Computer Operator", company: "Systems Limited", city: "Karachi", type: "Full-Time", salary: "50k - 75k PKR", logo: "DE" },
  { id: 3, title: "Personal Assistant (PA) to CEO", company: "Packages Ltd", city: "Lahore", type: "Full-Time", salary: "90k - 130k PKR", logo: "PA" },
  { id: 4, title: "Senior School Teacher (Math/Sci)", company: "Beaconhouse School", city: "Islamabad", type: "Full-Time", salary: "70k - 100k PKR", logo: "EDU" },
  { id: 5, title: "Python / Django Developer", company: "NetSol Technologies", city: "Lahore", type: "Full-Time", salary: "180k - 240k PKR", logo: "NS" },
  { id: 6, title: "UI/UX Product Designer", company: "10Pearls PK", city: "Remote", type: "Freelance", salary: "120k - 160k PKR", logo: "10P" },
  { id: 7, title: "Admin Assistant & Coordinator", company: "Engro Corporation", city: "Karachi", type: "Full-Time", salary: "65k - 90k PKR", logo: "ENG" }
];

let savedIds = [];

// Switch Page Tabs
function switchTab(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active-page'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const selectedPage = document.getElementById('page-' + pageId);
  const selectedBtn = document.getElementById('btn-' + pageId);

  if (selectedPage) selectedPage.classList.add('active-page');
  if (selectedBtn) selectedBtn.classList.add('active');

  if (pageId === 'saved') renderSaved();
}

// Render Home Jobs
function renderJobs(data) {
  const container = document.getElementById('jobsContainer');
  if(!container) return;
  document.getElementById('jobCounter').innerText = `Showing ${data.length} Vacancies`;

  container.innerHTML = data.map(job => {
    const isSaved = savedIds.includes(job.id);
    return `
      <div class="job-card">
        <div>
          <div class="card-header">
            <div class="logo-box">${job.logo}</div>
            <button class="bookmark-icon ${isSaved ? 'saved' : ''}" onclick="toggleSave(${job.id})">
              <i class="fa-solid fa-bookmark"></i>
            </button>
          </div>
          <h3 class="job-title">${job.title}</h3>
          <p class="company">${job.company} • ${job.city}</p>
          <div>
            <span class="badge">${job.type}</span>
            <span class="badge">${job.salary}</span>
          </div>
        </div>
        <button class="apply-btn" onclick="openModal('${job.title}')">Quick Apply 🚀</button>
      </div>
    `;
  }).join('');
}

// Handle Posting New Job from Form
function handlePostJob(e) {
  e.preventDefault();
  
  const newJob = {
    id: Date.now(),
    title: document.getElementById('postTitle').value,
    company: document.getElementById('postCompany').value,
    city: document.getElementById('postCity').value,
    type: document.getElementById('postType').value,
    salary: document.getElementById('postSalary').value,
    logo: document.getElementById('postLogo').value.toUpperCase()
  };

  // Add to top of list
  jobsList.unshift(newJob);
  
  alert("Job published successfully! 🎉 It is now live on the Home page.");
  
  // Reset form and redirect to Home
  e.target.reset();
  switchTab('home');
  filterJobs();
}

// Filter Jobs Search
function filterJobs() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const city = document.getElementById('citySelect').value;

  const filtered = jobsList.filter(j => {
    return (j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query)) &&
           (city === "" || j.city === city);
  });
  renderJobs(filtered);
}

// Bookmark Toggle
function toggleSave(id) {
  if(savedIds.includes(id)) {
    savedIds = savedIds.filter(i => i !== id);
  } else {
    savedIds.push(id);
  }
  document.getElementById('savedCount').innerText = savedIds.length;
  filterJobs();
  if(document.getElementById('page-saved').classList.contains('active-page')) renderSaved();
}

// Render Saved Jobs Page
function renderSaved() {
  const container = document.getElementById('savedJobsContainer');
  const savedData = jobsList.filter(j => savedIds.includes(j.id));

  if(savedData.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#94a3b8; padding:40px;">No saved bookmarks yet.</p>`;
    return;
  }

  container.innerHTML = savedData.map(job => `
    <div class="job-card">
      <h3 class="job-title">${job.title}</h3>
      <p class="company">${job.company} • ${job.city}</p>
      <button class="apply-btn" onclick="openModal('${job.title}')">Quick Apply 🚀</button>
    </div>
  `).join('');
}

// Modal Windows
function openModal(title) {
  document.getElementById('modalTitle').innerText = "Apply for: " + title;
  document.getElementById('applyModal').classList.add('active');
}

function closeModal() {
  document.getElementById('applyModal').classList.remove('active');
}

function handleApply(e) {
  e.preventDefault();
  alert("Application submitted successfully! 🎉");
  closeModal();
}

// Initialize
renderJobs(jobsList);
