// Job Data
const jobsList = [
  { id: 1, title: "Senior Python / Django Dev", company: "Systems Limited", city: "Lahore", type: "Full-Time", salary: "200k - 260k PKR", logo: "SL" },
  { id: 2, title: "UI/UX Product Designer", company: "10Pearls PK", city: "Remote", type: "Freelance", salary: "140k - 180k PKR", logo: "10P" },
  { id: 3, title: "Flutter Mobile Lead", company: "Contour Software", city: "Karachi", type: "Full-Time", salary: "180k - 230k PKR", logo: "CS" },
  { id: 4, title: "React Frontend Engineer", company: "TPS Pakistan", city: "Islamabad", type: "Full-Time", salary: "150k - 200k PKR", logo: "TPS" },
  { id: 5, title: "Cyber Security Analyst", company: "TRG Pakistan", city: "Karachi", type: "Full-Time", salary: "170k - 220k PKR", logo: "TRG" },
  { id: 6, title: "SEO & Content Manager", company: "Gul Ahmed", city: "Karachi", type: "Part-Time", salary: "80k - 110k PKR", logo: "GA" }
];

let savedIds = [];

// Switch Page Tabs
function switchTab(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active-page'));
  // Un-highlight all nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  // Show selected page
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
      <p class="company">${job.company}</p>
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
