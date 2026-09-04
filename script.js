// ==========================================
// 1. EXTENSIVE DATASET WITH CITIES
// ==========================================
let jobsData = [
    { id: 1, title: "Data Entry Operator", category: "Administration", type: "Full Time", salary: 45000, company: "Metro Logistics", location: "Karachi" },
    { id: 2, title: "Senior Data Entry Specialist", category: "Administration", type: "Remote", salary: 55000, company: "DataCraft Global", location: "Remote" },
    { id: 3, title: "Assistant Manager Operations", category: "Management", type: "Full Time", salary: 95000, company: "Engro Enterprises", location: "Lahore" },
    { id: 4, title: "Personal Assistant (PA) to CEO", category: "Administration", type: "Hybrid", salary: 75000, company: "Apex Holdings", location: "Islamabad" },
    { id: 5, title: "Executive PA & Office Admin", category: "Administration", type: "Full Time", salary: 65000, company: "Synergy Group", location: "Karachi" },
    { id: 6, title: "Senior UI/UX Designer", category: "Graphic Design", type: "Remote", salary: 110000, company: "Creative Minds PK", location: "Remote" },
    { id: 7, title: "Graphic Designer & Animator", category: "Graphic Design", type: "Full Time", salary: 70000, company: "Pixel Studios", location: "Karachi" },
    { id: 8, title: "Brand Identity Designer", category: "Graphic Design", type: "Hybrid", salary: 85000, company: "DesignHub", location: "Lahore" },
    { id: 9, title: "Frontend React Developer", category: "Web Development", type: "Full Time", salary: 120000, company: "Systems Ltd", location: "Lahore" },
    { id: 10, title: "WordPress Developer", category: "Web Development", type: "Hybrid", salary: 65000, company: "WebPro Pakistan", location: "Karachi" },
    { id: 11, title: "SEO Content Writer", category: "Content Writing", type: "Remote", salary: 50000, company: "WordCraft Media", location: "Remote" },
    { id: 12, title: "Digital Marketing Manager", category: "Digital Marketing", type: "Hybrid", salary: 105000, company: "MarketPro PK", location: "Lahore" },
    { id: 13, title: "Assistant Accounts Manager", category: "Finance", type: "Full Time", salary: 85000, company: "Lucky Core Industries", location: "Karachi" }
];

let selectedCategory = "all";

// ==========================================
// 2. DISPLAY FUNCTION
// ==========================================
function displayJobs(jobsToDisplay) {
    let jobListContainer = document.getElementById("jobList");
    jobListContainer.innerHTML = "";

    let totalSalary = 0;

    for (let i = 0; i < jobsToDisplay.length; i++) {
        let job = jobsToDisplay[i];
        totalSalary += job.salary;

        let card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
            <div>
                <h3>${job.title}</h3>
                <p class="company"><i class="fa-solid fa-building"></i> ${job.company}</p>
                <div>
                    <span class="badge badge-cat">${job.category}</span>
                    <span class="badge badge-type">${job.type}</span>
                    <span class="badge badge-loc"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                </div>
            </div>
            <div>
                <p class="salary">PKR ${job.salary.toLocaleString()} / mo</p>
                <button class="btn-primary full-width" onclick="openApplyModal('${job.title}')">Apply Now</button>
            </div>
        `;
        jobListContainer.appendChild(card);
    }

    let count = jobsToDisplay.length;
    let avgSalary = count > 0 ? totalSalary / count : 0;

    if (count === 0) {
        jobListContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 50px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
                <i class="fa-solid fa-magnifying-glass-blur" style="font-size: 40px; color: #94a3b8; margin-bottom: 10px;"></i>
                <h3 style="color: #475569;">No Jobs Found Matching Your Criteria</h3>
                <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">Try relaxing your city or minimum salary filter.</p>
            </div>`;
    }

    document.getElementById("totalCount").innerText = "Total Jobs Available: " + count;
    document.getElementById("salaryStats").innerText = "Average Salary: PKR " + Math.round(avgSalary).toLocaleString();
}

// ==========================================
// 3. MULTI-FILTER SEARCH (CITY + SALARY + TYPE + KEYWORD)
// ==========================================
function filterJobs() {
    let keyword = document.getElementById("keywordSearch").value.toLowerCase().trim();
    let city = document.getElementById("cityFilter").value;
    let type = document.getElementById("typeFilter").value;
    let minSalary = Number(document.getElementById("salaryFilter").value);

    let filtered = [];

    for (let i = 0; i < jobsData.length; i++) {
        let job = jobsData[i];

        let matchesKeyword = (keyword === "") || 
                             job.title.toLowerCase().includes(keyword) || 
                             job.category.toLowerCase().includes(keyword) || 
                             job.company.toLowerCase().includes(keyword);

        let matchesCity = (city === "all" || job.location === city);
        let matchesType = (type === "all" || job.type === type);
        let matchesSalary = (job.salary >= minSalary);
        let matchesCat = (selectedCategory === "all" || job.category === selectedCategory);

        if (matchesKeyword && matchesCity && matchesType && matchesSalary && matchesCat) {
            filtered.push(job);
        }
    }

    displayJobs(filtered);
}

function selectCategory(cat, element) {
    selectedCategory = cat;
    let pills = document.querySelectorAll(".pill");
    pills.forEach(p => p.classList.remove("active"));
    element.classList.add("active");
    filterJobs();
}

// ==========================================
// 4. NAVIGATION & MODAL WITH CV HANDLER
// ==========================================
function switchTab(tabName) {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("postPage").classList.add("hidden");
    document.getElementById("aboutPage").classList.add("hidden");

    if(tabName === 'home' || tabName === 'jobs') {
        document.getElementById("homePage").classList.remove("hidden");
    } else if(tabName === 'post') {
        document.getElementById("postPage").classList.remove("hidden");
    } else if(tabName === 'about') {
        document.getElementById("aboutPage").classList.remove("hidden");
    }
}

function addNewJob(event) {
    event.preventDefault();
    let newJob = {
        id: jobsData.length + 1,
        title: document.getElementById("newTitle").value,
        company: document.getElementById("newCompany").value,
        location: document.getElementById("newLocation").value,
        category: document.getElementById("newCategory").value,
        type: document.getElementById("newType").value,
        salary: Number(document.getElementById("newSalary").value)
    };

    jobsData.unshift(newJob);
    alert("New Job Published Successfully!");
    switchTab('home');
    filterJobs();
}

function openApplyModal(title) {
    document.getElementById("modalTitle").innerText = "Apply for: " + title;
    document.getElementById("applyModal").classList.remove("hidden");
    document.getElementById("applicationStatus").classList.add("hidden");
    document.getElementById("applyForm").reset();
}

function closeModal() {
    document.getElementById("applyModal").classList.add("hidden");
}

function submitApplication(e) {
    e.preventDefault();
    let name = document.getElementById("applicantName").value;
    let exp = Number(document.getElementById("applicantExp").value);
    let cvInput = document.getElementById("applicantCV");
    let status = document.getElementById("applicationStatus");

    status.classList.remove("hidden", "status-success", "status-error");

    // Check if CV file is selected
    if (cvInput.files.length === 0) {
        status.innerText = "Please attach your CV / Resume before submitting.";
        status.classList.add("status-error");
        return;
    }

    let fileName = cvInput.files[0].name;

    if (exp >= 1) {
        status.innerText = `Success! Application & CV (${fileName}) submitted for ${name}.`;
        status.classList.add("status-success");
    } else {
        status.innerText = `Sorry ${name}, at least 1 year experience is required.`;
        status.classList.add("status-error");
    }
}

// Initial Call
displayJobs(jobsData);