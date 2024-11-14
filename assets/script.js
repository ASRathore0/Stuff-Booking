let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const footer = document.getElementById("footer");
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    footer.classList.add("hidden-footer");
  } else {
    // Scrolling up
    footer.classList.remove("hidden-footer");
  }
  lastScrollY = window.scrollY;
});


    // Toggle between Login and Sign Up forms
function toggleAuth(type) {
  document.getElementById('login-form').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('signup-form').style.display = type === 'signup' ? 'block' : 'none';
  
  document.getElementById('login-tab').classList.toggle('active', type === 'login');
  document.getElementById('signup-tab').classList.toggle('active', type === 'signup');
}

// Toggle between User and Vendor in the form header
function showFormType(type) {
  document.getElementById('user-toggle').classList.toggle('active', type === 'user');
  document.getElementById('vendor-toggle').classList.toggle('active', type === 'vendor');
  
  // You could set form action or add hidden input depending on user or vendor type if needed
}

// Initialize default view
toggleAuth('login');
showFormType('user');


function showNoticeBoard() {
  document.getElementById("notice-board").style.display = "flex";
}

function closeNoticeBoard() {
  document.getElementById("notice-board").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("notice-board");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// -------------------------

function viewAll(category) {
  alert(`View all services in ${category}`);
  // Add functionality to navigate to detailed category page if necessary
}

// -----------------------------------

function showMoreItems() {
  // Get all elements with the 'hidden' class and remove the class to show them
  const hiddenItems = document.querySelectorAll('.item.hidden');
  hiddenItems.forEach(item => item.classList.remove('hidden'));

  // Hide the "Browse More" button after revealing the items
  const browseMoreBtn = document.getElementById('browseMoreBtn');
  browseMoreBtn.style.display = 'none';
}

function bookItem(itemName) {
  alert(`Booking details for ${itemName}`);
  // Add additional booking functionality here
}


function toggleMenu() {
  // Toggle code to show/hide menu goes here
  alert("Menu toggled!"); // For now, it just shows an alert.
  // You can replace this alert with actual code to show/hide a side menu or dropdown.
}

// --------------------------------------sidebar

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active"); // Add or remove 'active' class to show/hide the sidebar
}

 
