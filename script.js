let currentPage = 1; // This will represent the LEFT page number
const totalPages = 604; // Total number of single pages
const pageImageLeft = document.getElementById("pageImageLeft");
const pageImageRight = document.getElementById("pageImageRight");
const pageNumber = document.getElementById("pageNumber");
const progressBar = document.getElementById("progressBar");
const statsBox = document.getElementById("stats");
const loadingOverlay = document.getElementById("loadingOverlay");
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const surahListElement = document.getElementById("surahList");
let zoomLevel = 1;
let isFullScreen = false;

// Surah data (Page numbers are for the LEFT page of the pair)
const surahs = [
    { name: "الفاتحة", page: 1 },
    { name: "البقرة", page: 2 },
    { name: "آل عمران", page: 50 },
    { name: "النساء", page: 77 },
    { name: "المائدة", page: 106 },
    { name: "الأنعام", page: 128 },
    { name: "الأعراف", page: 151 },
    { name: "الأنفال", page: 177 },
    { name: "التوبة", page: 187 },
    { name: "يونس", page: 208 },
    { name: "هود", page: 221 },
    { name: "يوسف", page: 235 },
    { name: "الرعد", page: 249 },
    { name: "إبراهيم", page: 255 },
    { name: "الحجر", page: 262 },
    { name: "النحل", page: 267 },
    { name: "الإسراء", page: 282 },
    { name: "الكهف", page: 293 },
    { name: "مريم", page: 305 },
    { name: "طه", page: 312 },
    { name: "الأنبياء", page: 322 },
    { name: "الحج", page: 332 },
    { name: "المؤمنون", page: 342 },
    { name: "النور", page: 350 },
    { name: "الفرقان", page: 359 },
    { name: "الشعراء", page: 367 },
    { name: "النمل", page: 377 },
    { name: "القصص", page: 385 },
    { name: "العنكبوت", page: 396 },
    { name: "الروم", page: 404 },
    { name: "لقمان", page: 411 },
    { name: "السجدة", page: 415 },
    { name: "الأحزاب", page: 418 },
    { name: "سبأ", page: 428 },
    { name: "فاطر", page: 434 },
    { name: "يس", page: 440 },
    { name: "الصافات", page: 446 },
    { name: "ص", page: 453 },
    { name: "الزمر", page: 458 },
    { name: "غافر", page: 467 },
    { name: "فصلت", page: 477 },
    { name: "الشورى", page: 483 },
    { name: "الزخرف", page: 489 },
    { name: "الدخان", page: 496 },
    { name: "الجاثية", page: 499 },
    { name: "الأحقاف", page: 502 },
    { name: "محمد", page: 507 },
    { name: "الفتح", page: 510 },
    { name: "الحجرات", page: 515 },
    { name: "ق", page: 518 },
    { name: "الذاريات", page: 520 },
    { name: "الطور", page: 523 },
    { name: "النجم", page: 526 },
    { name: "القمر", page: 528 },
    { name: "الرحمن", page: 531 },
    { name: "الواقعة", page: 534 },
    { name: "الحديد", page: 537 },
    { name: "المجادلة", page: 542 },
    { name: "الحشر", page: 545 },
    { name: "الممتحنة", page: 549 },
    { name: "الصف", page: 551 },
    { name: "الجمعة", page: 553 },
    { name: "المنافقون", page: 554 },
    { name: "التغابن", page: 556 },
    { name: "الطلاق", page: 558 },
    { name: "التحريم", page: 560 },
    { name: "الملك", page: 562 },
    { name: "القلم", page: 564 },
    { name: "الحاقة", page: 566 },
    { name: "المعارج", page: 568 },
    { name: "نوح", page: 570 },
    { name: "الجن", page: 572 },
    { name: "المزمل", page: 574 },
    { name: "المدثر", page: 575 },
    { name: "القيامة", page: 577 },
    { name: "الإنسان", page: 578 },
    { name: "المرسلات", page: 580 },
    { name: "النبأ", page: 582 },
    { name: "النازعات", page: 583 },
    { name: "عبس", page: 585 },
    { name: "التكوير", page: 586 },
    { name: "الإنفطار", page: 587 },
    { name: "المطففين", page: 587 },
    { name: "الإنشقاق", page: 589 },
    { name: "البروج", page: 590 },
    { name: "الطارق", page: 591 },
    { name: "الأعلى", page: 591 },
    { name: "الغاشية", page: 592 },
    { name: "الفجر", page: 593 },
    { name: "البلد", page: 594 },
    { name: "الشمس", page: 595 },
    { name: "الليل", page: 595 },
    { name: "الضحى", page: 596 },
    { name: "الشرح", page: 596 },
    { name: "التين", page: 597 },
    { name: "العلق", page: 597 },
    { name: "القدر", page: 598 },
    { name: "البينة", page: 598 },
    { name: "الزلزلة", page: 599 },
    { name: "العاديات", page: 599 },
    { name: "القارعة", page: 600 },
    { name: "التكاثر", page: 600 },
    { name: "العصر", page: 601 },
    { name: "الهمزة", page: 601 },
    { name: "الفيل", page: 602 },
    { name: "قريش", page: 602 },
    { name: "الماعون", page: 602 },
    { name: "الكوثر", page: 603 },
    { name: "الكافرون", page: 603 },
    { name: "النصر", page: 603 },
    { name: "المسد", page: 604 },
    { name: "الإخلاص", page: 604 },
    { name: "الفلق", page: 604 },
    { name: "الناس", page: 604 }
];

// Function to populate surah list
function populateSurahList() {
    surahListElement.innerHTML = ''; // Clear existing list
    surahs.forEach(surah => {
        const li = document.createElement('li');
        li.textContent = surah.name;
        li.onclick = () => goToSurah(surah.page);
        surahListElement.appendChild(li);
    });
}

// Function to filter surahs based on search input
function filterSurahs() {
    const searchTerm = document.getElementById("surahSearch").value.trim();
    const filterValue = searchTerm.toLowerCase();
    const listItems = surahListElement.getElementsByTagName('li');

    for (let i = 0; i < listItems.length; i++) {
        const text = listItems[i].textContent || listItems[i].innerText;
        if (text.toLowerCase().indexOf(filterValue) > -1) {
            listItems[i].style.display = "";
        } else {
            listItems[i].style.display = "none";
        }
    }
}

// تحديث الصفحة (الآن صفحتين)
function updatePage() {
    loadingOverlay.style.display = 'flex'; // Show loading spinner

    // Ensure currentPage is always an odd number for the left page
    if (currentPage % 2 === 0) {
        currentPage--; // If it's even, make it odd to start a pair
    }

    const rightPageNumber = currentPage + 1;

    // Preload images
    const imgLeft = new Image();
    const imgRight = new Image();

    let loadedCount = 0;
    // Determine how many images to load based on screen width and total pages
    const totalImagesToLoad = (rightPageNumber <= totalPages && window.innerWidth > 768) ? 2 : 1;

    const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === totalImagesToLoad) {
            pageImageLeft.src = imgLeft.src;
            if (totalImagesToLoad === 2) {
                pageImageRight.src = imgRight.src;
                pageImageRight.style.display = 'block'; // Ensure it's visible
            } else {
                pageImageRight.src = ''; // No image for the right page
                pageImageRight.style.display = 'none'; // Hide the right image element
            }
            loadingOverlay.style.display = 'none'; // Hide loading spinner
        }
    };

    imgLeft.onload = onImageLoad;
    imgLeft.onerror = () => {
        console.error(`Failed to load image: pages/${currentPage}.jpg`);
        loadingOverlay.style.display = 'none'; // Hide spinner on error
    };
    imgLeft.src = `pages/${currentPage}.jpg`;

    if (rightPageNumber <= totalPages && window.innerWidth > 768) {
        imgRight.onload = onImageLoad;
        imgRight.onerror = () => {
            console.error(`Failed to load image: pages/${rightPageNumber}.jpg`);
            loadingOverlay.style.display = 'none'; // Hide spinner on error
        };
        imgRight.src = `pages/${rightPageNumber}.jpg`;
    } else if (totalImagesToLoad === 1) {
        // If only one image is expected, hide right image immediately
        pageImageRight.src = '';
        pageImageRight.style.display = 'none';
        loadingOverlay.style.display = 'none'; // Hide spinner if only one image
    }


    // Update page number display to show the range
    if (rightPageNumber <= totalPages && window.innerWidth > 768) {
        pageNumber.textContent = `صفحة ${currentPage} - ${rightPageNumber} / ${totalPages}`;
    } else {
        pageNumber.textContent = `صفحة ${currentPage} / ${totalPages}`;
    }

    pageImageLeft.style.transform = `scale(${zoomLevel})`;
    pageImageRight.style.transform = `scale(${zoomLevel})`; // Apply zoom to both
    updateProgress();
    updateStats();
    localStorage.setItem("lastPage", currentPage);
    localStorage.setItem("lastVisit", new Date().toLocaleString());
}

function nextPage() {
    // Move forward by 2 pages (one pair)
    if (currentPage + 1 < totalPages) { // Check if there's at least one more page to form a pair
        currentPage += 2;
        updatePage();
    } else if (currentPage < totalPages) { // If only one page left (e.g., 603), show it alone
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    // Move backward by 2 pages (one pair)
    if (currentPage > 2) { // If current page is 3 or more, go back 2 pages
        currentPage -= 2;
        updatePage();
    } else if (currentPage === 2) { // If current page is 2, go back to 1
        currentPage = 1;
        updatePage();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.2, 3); // Max zoom 3x
    pageImageLeft.style.transform = `scale(${zoomLevel})`;
    pageImageRight.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.2, 0.4); // Min zoom 0.4x
    pageImageLeft.style.transform = `scale(${zoomLevel})`;
    pageImageRight.style.transform = `scale(${zoomLevel})`;
}

// مشاركة (تعديل النص ليعكس الصفحات المزدوجة)
function shareAyah() {
    const rightPageNumber = currentPage + 1;
    let text;
    if (rightPageNumber <= totalPages && window.innerWidth > 768) {
        text = `📖 الصفحتان ${currentPage} و ${rightPageNumber} من المصحف الشريف`;
    } else {
        text = `📖 صفحة ${currentPage} من المصحف الشريف`;
    }

    if (navigator.share) {
        navigator.share({ text });
    } else {
        navigator.clipboard.writeText(text);
        alert("تم نسخ النص للمشاركة ✅");
    }
}

// إحصائيات القراءة
function updateStats() {
    let lastVisit = localStorage.getItem("lastVisit") || "—";
    let lastPage = localStorage.getItem("lastPage") || 1;
    // Calculate progress based on the left page of the current pair
    let progress = Math.round((currentPage / totalPages) * 100);
    statsBox.innerHTML = `
        ✅ آخر زيارة: ${lastVisit}<br>
        📖 آخر صفحة تمت زيارتها: ${lastPage}<br>
        📊 نسبة التقدم: ${progress}%
    `;
}

// التقدم
function updateProgress() {
    // Progress based on the left page of the current pair
    let percent = (currentPage / totalPages) * 100;
    progressBar.style.width = percent + "%";
}

// الذهاب لسورة
function goToSurah(page) {
    currentPage = page;
    if (currentPage % 2 === 0) { // If the target page is even, make it the left page of the pair
        currentPage--;
    }
    updatePage();
    // Collapse sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        toggleSidebarBtn.textContent = '☰'; // Change icon back to hamburger
    }
}

// الذهاب لصفحة معينة
function showGoToPagePrompt() {
    let pageInput = prompt(`أدخل رقم الصفحة (1 - ${totalPages}):`);
    let pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        // Ensure the target page is the left page of a pair
        if (currentPage % 2 === 0) {
            currentPage--;
        }
        updatePage();
    } else if (pageInput !== null) {
        alert("رقم صفحة غير صالح.");
    }
}

// Toggle sidebar visibility
toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        toggleSidebarBtn.textContent = '☰'; // Hamburger icon when collapsed (sidebar hidden on desktop, open on mobile)
    } else {
        toggleSidebarBtn.textContent = '✕'; // Close icon when expanded (sidebar open on desktop, hidden on mobile)
    }
});

// Fullscreen functionality
function toggleFullScreen() {
    const viewer = document.getElementById('viewer');
    if (!document.fullscreenElement) {
        viewer.requestFullscreen().then(() => {
            isFullScreen = true;
            viewer.classList.add('fullscreen-viewer');
        }).catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (Please ensure your browser allows fullscreen requests)`);
        });
    } else {
        document.exitFullscreen().then(() => {
            isFullScreen = false;
            viewer.classList.remove('fullscreen-viewer');
        });
    }
}

// Event listener for fullscreen change
document.addEventListener('fullscreenchange', () => {
    const viewer = document.getElementById('viewer');
    if (!document.fullscreenElement) {
        isFullScreen = false;
        viewer.classList.remove('fullscreen-viewer');
    }
});

// Handle window resize for responsive page display
window.addEventListener('resize', () => {
    updatePage(); // Re-evaluate page display (single vs. double) on resize
    // Adjust sidebar state on resize if it was open on mobile and now on desktop
    if (window.innerWidth > 768 && sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        toggleSidebarBtn.textContent = '✕';
    } else if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
        // If on mobile and sidebar is open, collapse it by default
        sidebar.classList.add('collapsed');
        toggleSidebarBtn.textContent = '☰';
    }
});


// بدء (Initialization on load)
window.onload = () => {
    populateSurahList(); // Populate surah list on load

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    const saved = localStorage.getItem("lastPage");
    if (saved) {
        currentPage = parseInt(saved);
        if (currentPage % 2 === 0) { // If the saved page was even, adjust to the left page of the pair
            currentPage--;
        }
    }
    updatePage();

    // Initial sidebar state for mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed'); // Start collapsed on mobile
        toggleSidebarBtn.textContent = '☰';
    } else {
        toggleSidebarBtn.textContent = '✕'; // Start open on desktop
    }
};
