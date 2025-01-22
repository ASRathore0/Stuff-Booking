  
document.addEventListener("DOMContentLoaded", function () {
  // Get the current page path
  const currentPath = window.location.pathname;

  // Map of page paths to button IDs
  const pathToIdMap = {
    "/index.html": "explore-button",
    "/": "home-button",
    "/assets/other.html": "cart-button",
    "/assets/login.html": "profile-button",
    // Add more mappings as needed
  };

  // Find the corresponding button ID for the current path
  const activeButtonId = pathToIdMap[currentPath];

  // If a match is found, add the 'active' class to the button with that ID
  if (activeButtonId) {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
});
 
// Get the user's current location without an API key
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const nearestLocation = findNearestLocation(userLat, userLng);

        if (nearestLocation) {
          alert(`You are near ${nearestLocation.name}.`);
          locationInput.value = nearestLocation.name;
        } else {
          alert("Sorry, we are not available in your area yet.");
        }
      },
      error => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

//  ----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButto");
  const cityPopup = document.getElementById("cityPopup");
  const closePopup = document.getElementById("closePopup");
  const cityItems = document.querySelectorAll(".city-item");
  const searchInput = document.getElementById("searchInput");
  const serviceBoxes = document.querySelectorAll(".service-box");
  const serviceCards = document.querySelectorAll(".service-card");
  const servicesSection = document.querySelector(".services-section");
  const servicesHeading = servicesSection.querySelector("h2");

  // Popup message container
  const resultPopup = document.createElement("div");
  resultPopup.id = "resultPopup";
  resultPopup.style.position = "fixed";
  resultPopup.style.top = "50%";
  resultPopup.style.left = "50%";
  resultPopup.style.transform = "translate(-50%, -50%)";
  resultPopup.style.backgroundColor = "#f8d7da";
  resultPopup.style.color = "#721c24";
  resultPopup.style.padding = "20px";
  resultPopup.style.border = "1px solid #f5c6cb";
  resultPopup.style.borderRadius = "8px";
  resultPopup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  resultPopup.style.display = "none";
  resultPopup.style.zIndex = "9999";
  resultPopup.style.fontSize = "16px";
  document.body.appendChild(resultPopup);

  // Toggle popup visibility on toggle button click
  toggleButton.addEventListener("click", () => {
      if (cityPopup.classList.contains("hidden")) {
          cityPopup.classList.remove("hidden");
      } else {
          cityPopup.classList.add("hidden");
      }
  });

  // Close popup on close button click
  closePopup.addEventListener("click", () => {
      cityPopup.classList.add("hidden");
  });

  // Fill city name in the search box when a city is clicked
  cityItems.forEach((city) => {
      city.addEventListener("click", () => {
          const cityName = city.getAttribute("data-city");
          searchInput.value = cityName;
          cityPopup.classList.add("hidden");
      });
  });

  // Show matching services when a service box is clicked
  serviceBoxes.forEach((box) => {
      box.addEventListener("click", () => {
          const locationName = searchInput.value.trim();
          const selectedService = box.getAttribute("data-target");
          const serviceName = box.querySelector("span").textContent;

          if (!locationName) {
              showPopup("Please select a location first!");
              return;
          }

          // Update the heading with the selected service and location
          servicesHeading.textContent = `${serviceName} in ${locationName}`;

          // Hide all service cards initially
          serviceCards.forEach((card) => {
              card.classList.add("hidden");
          });

          let foundMatch = false;

          // Show matching service cards based on location and service type
          serviceCards.forEach((card) => {
              const cardServiceType = card.getAttribute("id");
              const cardLocation = card.querySelector(".service-details p:nth-child(3)").innerText.trim();

              if (cardServiceType === selectedService && cardLocation.includes(locationName)) {
                  card.classList.remove("hidden");
                  foundMatch = true;
              }
          });

          if (foundMatch) {
              // showPopup("Results found for your selection!", "#d4edda", "#155724"); // Green popup
              servicesSection.scrollIntoView({ behavior: "smooth" });
          } else {
              showPopup(`Currently we're unable to serve a ${serviceName}  in ${locationName}. We'll serve soon. Stay tunned!`);
          }
      });
  });

  // Function to show popup messages
  function showPopup(message, bgColor = "#f8d7da", textColor = "#721c24") {
      resultPopup.textContent = message;
      resultPopup.style.backgroundColor = bgColor;
      resultPopup.style.color = textColor;
      resultPopup.style.display = "block";

      // Hide popup after 3 seconds
      setTimeout(() => {
          resultPopup.style.display = "none";
      }, 4000);
  }
});



