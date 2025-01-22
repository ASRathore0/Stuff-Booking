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
 

// --------------------------------------sidebar

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.toggle-btn');

  // Toggle the sidebar visibility
  sidebar.classList.toggle('active');

  // Change the toggle button's content based on the sidebar state
  if (sidebar.classList.contains('active')) {
    toggleBtn.innerHTML = '×'; // Close icon when sidebar is open
  } else {
    toggleBtn.innerHTML = '☰'; // Hamburger icon when sidebar is closed
  }
}


function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active"); // Add or remove 'active' class to show/hide the sidebar
}

// Categories and Service Data
function selectCategory(button, category) {
  console.log(`Button clicked: ${button.textContent}, Category: ${category}`);
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Add active class to the clicked button
  button.classList.add("active");

  // button.scrollIntoView({ behavior: "smooth", inline: "center" });

  // Hide all service grids
  const grids = document.querySelectorAll(".service-grid");
  grids.forEach(grid => grid.classList.add("hidden"));

  // Show the selected category's grid
  const selectedGrid = document.getElementById(category);
  if (selectedGrid) {
    selectedGrid.classList.remove("hidden");
    console.log(`Displayed category: ${category}`);
  } else {
    console.error(`Category "${category}" not found.`);
  }
}
  
// -----------------------

document.addEventListener('DOMContentLoaded', function () {
  // Function to show the thanks message when a service box is clicked
  function showThanksMessage(serviceName) {
    alert("Thanks! We will get in touch soon regarding the " + serviceName + " service.");
  }

  // Attach the click event to all service-box elements
  const serviceBoxes = document.querySelectorAll('.service-box');
  
  serviceBoxes.forEach(function(serviceBox) {
    serviceBox.addEventListener('click', function() {
      const serviceName = serviceBox.querySelector('span').textContent; // Get the service name
      showThanksMessage(serviceName); // Call the function to show the thanks message
    });
  });
});

 
 