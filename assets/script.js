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

// Define the data for services based on categories
const servicesData = {
  Event: ["Tent House", "Photographer", "DJ", "Catering"],
  "Home Service": ["Plumber", "Electrician", "Carpenter", "Cleaner"],
  Hotels: ["Room Booking", "Catering Service", "Conference Hall", "Valet Parking"],
};

// Get DOM elements
const categoryButtons = document.querySelectorAll(".category-button");
const servicesContainer = document.querySelector(".services");
const nextButton = document.querySelector(".next-button");

// Function to display services based on the selected category
function displayServices(category) {
  // Clear the current services
  servicesContainer.innerHTML = "";

  // Get the services for the selected category
  const services = servicesData[category];

  // Create and append service boxes dynamically
  services.forEach((service) => {
    const serviceBox = document.createElement("div");
    serviceBox.classList.add("service-box");
    serviceBox.textContent = service;

    // Add a click event for each service (optional: for interactivity)
    serviceBox.addEventListener("click", () => {
      alert(`You selected the service: ${service}`);
    });

    servicesContainer.appendChild(serviceBox);
  });
}

// Add click event listeners for each category button
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.textContent;
    displayServices(category); // Show services for the clicked category
  });
});

// Handle the Next button click
nextButton.addEventListener("click", () => {
  alert("You clicked the Next button. Implement further navigation here.");
});

 /* JavaScript for Filtering */
//  function filterServices(category) {
//   const services = document.querySelectorAll('.service-box');
//   services.forEach(service => {
//       if (service.getAttribute('data-category') === category || category === 'all') {
//           service.classList.remove('hidden');
//       } else {
//           service.classList.add('hidden');
//       }
//   });
// }

// function selectCategory(category) {
//   // Get all service grids
//   const grids = document.querySelectorAll('.service-grid');

//   // Loop through each grid
//   grids.forEach(grid => {
//       if (grid.id === category) {
//           grid.classList.remove('hidden'); // Show the matching grid
//       } else {
//           grid.classList.add('hidden'); // Hide the other grids
//       }
//   });
// }

// Categories and Service Data
function selectCategory(button, category) {
  console.log(`Button clicked: ${button.textContent}, Category: ${category}`);
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Add active class to the clicked button
  button.classList.add("active");

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

// Default category on page load
document.addEventListener("DOMContentLoaded", () => {
  const defaultButton = document.querySelector(".category-btn.active") || document.querySelector(".category-btn");
  if (defaultButton) {
    const defaultCategory = defaultButton.getAttribute("onclick").split("'")[1];
    console.log(`Default category: ${defaultCategory}`);
    selectCategory(defaultButton, defaultCategory);
  }
});


// ---------------------

function selectCategory(button, category) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Add active class to the clicked button
  button.classList.add("active");

  // Auto-scroll the active button into view
  button.scrollIntoView({ behavior: "smooth", inline: "center" });

  // Hide all service grids
  const grids = document.querySelectorAll(".service-grid");
  grids.forEach(grid => grid.classList.add("hidden"));

  // Show the selected category's grid
  const selectedGrid = document.getElementById(category);
  if (selectedGrid) {
    selectedGrid.classList.remove("hidden");
  } else {
    console.error(`Category "${category}" not found.`);
  }
}


// -------------------------------

// function getCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         alert(`Your location: Latitude ${lat}, Longitude ${lon}`);
//       },
//       (error) => {
//         alert("Unable to retrieve location. Please try again.");
//       }
//     );
//   } else {
//     alert("Geolocation is not supported by your browser.");
//   }
// }

async function getCurrentLocation() {
  const locationInput = document.getElementById("locationInput");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch address using reverse geocoding
        const address = await getAddressFromCoords(lat, lon);
        locationInput.value = address; // Autofill the search box
      },
      (error) => {
        alert("Unable to retrieve location. Please try again.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

async function getAddressFromCoords(lat, lon) {
  try {
    const apiKey = "YOUR_API_KEY"; // Replace with your Geocoding API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.results[0]) {
      return data.results[0].formatted_address; // Return the formatted address
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
}

let debounceTimer;
const suggestionsList = document.getElementById("suggestions");

async function handleInput() {
  const query = document.getElementById("locationInput").value;

  if (query.trim() === "") {
    clearSuggestions();
    return;
  }

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const suggestions = await getPlaceSuggestions(query);
    displaySuggestions(suggestions);
  }, 300); // Debounce for 300ms
}

async function getPlaceSuggestions(query) {
  const apiKey = "YOUR_API_KEY"; // Replace with your Google API key
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      query
    )}&key=${apiKey}`
  );

  const data = await response.json();

  if (data.status === "OK") {
    return data.predictions.map((prediction) => prediction.description);
  } else {
    console.error("Error fetching suggestions:", data.error_message);
    return [];
  }
}

function displaySuggestions(suggestions) {
  clearSuggestions();

  suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    li.addEventListener("click", () => {
      document.getElementById("locationInput").value = suggestion;
      clearSuggestions();
    });
    suggestionsList.appendChild(li);
  });
}

function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// -----------------------------

// Get all the offer slides
const slides = document.querySelectorAll('.offer-slide');

// Set the first slide as active by default
let currentIndex = 0;
slides[currentIndex].classList.add('active');

// Function to change the slide
function changeSlide() {
  // Hide the current slide
  slides[currentIndex].classList.remove('active');

  // Calculate the next slide index
  currentIndex = (currentIndex + 1) % slides.length;  // Loop back to the first slide when the last is reached

  // Show the next slide
  slides[currentIndex].classList.add('active');
}

// Set interval to change slides every 3 seconds
setInterval(changeSlide, 3000); // 3000ms = 3 seconds


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

 
