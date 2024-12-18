// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}


//toggletheme 
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');

  if (body.getAttribute('data-theme') === 'dark') {
  body.setAttribute('data-theme', 'light');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
  } else {
  body.setAttribute('data-theme', 'dark');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
  }
}

