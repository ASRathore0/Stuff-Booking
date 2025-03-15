  
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
      function () {
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
      }, 2500);
  }
});

// ---------------------------

function showButtons(card) {
  // Get the buttons container
  const buttons = document.querySelector(".buttons");

  // Check if the buttons are already appended to the clicked card
  if (card.contains(buttons)) {
      // Toggle visibility if the buttons are already in the clicked card
      buttons.classList.toggle("hidden");
  } else {
      // Remove buttons from any previous card and append to the current one
      document.querySelectorAll(".service-card").forEach(c => c.querySelector(".buttons")?.remove());

      // Append buttons to the clicked card and show them
      buttons.classList.remove("hidden");
      card.appendChild(buttons);
  }
}

// ------------------------------------

 // Example details for each card
 const cardDetails = {
  Plumber1: {
      address: "Office Number 9 Second Floor, R K Complex, Grain Market, Nyi Abadi, Khanna - 141401 (Behind Arora Palace)",
      services: ["Pipes", "Taps", "Valves", "Sink installation", "Water Heaters","drain cleaning"],
      contact: "+91 9876543210"
  },
  Plumber2: {
      address: "Fatehgarh Sahib, Khanna - 141401",
      services: [ "Tap Repair", "Valve", "Pipes","Power socket", "Septic Tank", "Sink", "Pipes"],
      contact: "+91 9988776655"
  },
  Electrician1: {
      address: "Plot No 21, Industrial Area Phase 1, Khanna - 141401",
      services: ["Fan Installation & Repair", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 9988776655"
  },
  Electrician2: {
      address: "Gulmohar Nagar, Khanna - 141401",
      services: ["Refrigerator Repair ", "Air Conditioner (AC) Repair", "Washing Machine Repair", "Geyser & Water Heater Repair", " Microwave Oven Repair"],
      contact: "+91 8809296250"
  },
  Cleaner1: {
      address: "Nyi Abadi, Khanna - 141401",
      services: ["Curtain Cleaning","Bathroom Cleaning", "Kitchen Cleaning", "Home Cleaning", "Sinks", "Office Cleaning"]
  },
  Cleaner2: {
      address: "Malerkotla road, Khanna - 141401",
      services: ["Home Cleaning","Mattress ", "Window & Glass Cleaning", "Hotel & Restaurant", "Bathroom Cleaning", "Kitchen Cleaning"]
  },
  Gardener1: {
      address: "Ferozepur Road, Khanna - 141401",
      services: ["Fall Cleanup", "Planting ", "Lawn Mowing & Maintenance", "Tree Pruning & Trimming", "Stump Grinding"]
  },
  Gardener2: {
      address: "Pakhowal Road, Khanna - 141401",
      services: ["Planting ", "Lawn Mowing & Maintenance", "Fall Cleanup", "Tree Removal"]
  },
  Painter1: {
      address: "Samrala chowk, Khanna - 141401",
      services: ["House Painting", "Wall Painting", "Furniture", "Epoxy Coating", "Spray Painting","Machinery Painting"]
  },
  Painter2: {
      address: "Gt Road, Khanna - 141401",
      services: ["Wall Painting", "Furniture Painting", "Putty Work", "House Painting", "Wall Crack Filling "]
  },
  Carpenter1: {
      address: "Laheri Road, Khanna - 141401",
      services: ["Furniture Making", "Wood Carving", "Table", "chair", "Bed"]
  },
  Carpenter2: {
      address: "Model Town, Khanna - 141401",
      services: ["Furniture Making", "Table", "bed", "Chair"]
  },
  Pest1: {
      address: "Khanna HO- 141401",
      services: ["Rodents", "Snakes", "Mosquitoes", "Cockroaches", "Flies", "Termites", "Bed Bugs"]
  },
  Pest2: {
      address: "Baddi Sitalpur, Khanna - 141401",
      services: ["Mosquitoes", "Cockroaches", "Flies", "Termites"]
  },
  Tution1: {
      address: "Staion Road, Khanna - 141401",
      services: ["Basics", "Core Subjects","Mock Exams", "Homework Assistance"]
  },
  Tution2: {
      address: "Jamalpur, Khanna - 141401",
      services: ["Core Subjects","Study Skills Development", "Basics"]
  },
  Family1: {
      address: "Nyi Abadi, Khanna - 141401",
      services: ["Routine Check-Ups", "Acute Illness Treatment", "Therapy", "Immunizations"]
  },
  Family2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Routine Check-Ups", "Immunizations", "Acute Illness Treatment", "Therapy"]
  },
  dj1: {
      address: "Bhatttian, Khanna - 141401",
      services: ["smoke machines"]
  },
  dj2: {
      address: "Anant Nagar, Khanna - 141401",
      services: ["DJ","Trolly"]
  },
  Photographer1: {
      address: "Krishna Nagar, Khanna - 141401",
      services: ["Weddings", "Fashion Lookbooks","Corporate Events", "Underwater Photography", "Parties ", "Family Portraits"]
  },
  Photographer2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Parties ", "Weddings", "Family Portraits", "Corporate Events", "Magazine Shoots"]
  },
  Catering1: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Buffet Service", "Plated Service", "Arranging tables, chairs"]
  },
  Catering2: {
      address: "Bhandari park Khanna - 141401",
      services: ["Plated Service", "Equipment Rental", "Buffet Service"]
  },
  Decorator1: {
      address: "Meena Bazar, Khanna - 141401",
      services: ["Lighting Design", "Stage", "Welcome Gate"]
  },
  Decorator2: {
      address: "Ahluwalia Mohalla, Khanna - 141401",
      services: ["Venue Decoration", "Stage", "Lighting Design"]
  },
  Tent1: {
      address: "Libra, Khanna - 141401",
      services: ["DJ", "Sound","chair & Tables" ,"Lights", "Trolly"]
  },
  Tent2: {
      address: "Doraha, Khanna - 141401",
      services: ["Sound", "Light", "Stage", "Seating Arrangements"]
  },
  Chef1: {
      address: "Rangia, Khanna - 141401",
      services: ["Food Consulting", "Restaurant Consulting", "Cooking Services"]
  },
  Chef2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Cooking Services", "Food Consulting"]
  },
  Jaimala1: {
      address: "Dehlon, Khanna - 141401",
      services: ["Stage", "Decoration", "Flowers", "Lightning"]
  },
  Jaimala2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Decoration", "Flowers", "Lightning"]
  },
  Bride1: {
      address: "GT Road, Khanna - 141401",
      services: ["Makeup Services", "Hair Styling", "Nail Services", "Skincare Treatments", "Beard Grooming"]
  },
  Bride2: {
      address: "Samrala Road, Khanna - 141401",
      services: ["Hair Styling", "Nail Services", "Makeup Services", "Shaving and Beard Grooming", "Facials"]
  },
  Vehicles1: {
      address: "Pratap Calony, Khanna - 141401",
      services: ["Cars", "Bus", "Taxi", "Auto", "Truck "]
  },
  Vehicles2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Bus", "Cars", "Tractor", "Taxi", "Auto", "Truck "]
  },
  Bike1: {
      address: "Libra, Khanna - 141401",
      services: ["Apache", "Splender", "Scooty", "Yamaha", "cars", "Truck "]
  },
  Bike2: {
      address: "Nyi Abadi, Khanna - 141401",
      services: ["Pulser", "Apache", "Scooty", "Auto"]
  },
  Toto1: {
      address: "Nyi Abadi, Khanna - 141401",
      services: []
  },
  Toto2: {
      address: "Amloh Road, Khanna - 141401",
      services: []
  },
// Siwan location
  Plumber51: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Tap", "sink"],
      contact: "+91 07947431168"
  },
  Plumber52: {
      address: "Purani Quila, Siwan - 841226",
      services: ["Tap", "sink", "Tank", "Pipe"],
      contact: "+91 07947428985"
  }, 
  Plumber53: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Drain cleaning", "Tap", "sink"],
      contact: "+91 07947129036"
  }, 
  Electrician50: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Fan Installation & Repair", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 07947129036"
  }, 
  
};

document.addEventListener("DOMContentLoaded", function () {
    let activeCard = null; // Keep track of the currently selected card

    // Select all service cards
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", function () {
            const cardId = card.getAttribute("data-card-id");
            const buttonsContainer = document.querySelector(".buttons");

            // If the same card is clicked again, toggle visibility
            if (activeCard === cardId) {
                buttonsContainer.classList.add("hidden"); // Hide buttons
                activeCard = null; // Reset active card
            } else {
                // Update the common buttons' functionality
                buttonsContainer.querySelector("button:nth-child(1)").setAttribute("onclick", `makeCall('${cardId}')`);
                buttonsContainer.querySelector("button:nth-child(2)").setAttribute("onclick", `openWhatsApp('${cardId}')`);
                buttonsContainer.querySelector("button:nth-child(3)").setAttribute("onclick", `openGoogleMaps('${cardId}')`);

                // Show buttons
                buttonsContainer.classList.remove("hidden");
                activeCard = cardId; // Set the clicked card as active
            }
        });
    });
});

// Function to make a call
function makeCall(cardId) {
    const phoneNumber = cardDetails[cardId]?.contact || "Not available";
    if (phoneNumber !== "Not available") {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        alert("Phone number not available.");
    }
}

// Function to open WhatsApp chat
function openWhatsApp(cardId) {
    const phoneNumber = cardDetails[cardId]?.contact || "";
    if (phoneNumber) {
        window.location.href = `https://wa.me/${phoneNumber.replace("+", "")}`;
    } else {
        alert("WhatsApp number not available.");
    }
}

// Function to open Google Maps for directions
function openGoogleMaps(cardId) {
    const address = cardDetails[cardId]?.address || "";
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
    } else {
        alert("Address not available.");
    }
}

function showDetails(event, button) {
  event.stopPropagation(); // Prevent parent click event

  // Get the parent card
  const card = button.closest('.service-card');
  const cardId = card.getAttribute('data-card-id'); // Fetch unique card identifier

  // Get the details section within the card
  const detailsDiv = card.querySelector('.details');

  // Check if details are already visible
  if (!detailsDiv.classList.contains('hidden')) {
      detailsDiv.classList.add('hidden');
      detailsDiv.innerHTML = ""; // Clear the details
  } else {
      // Populate details dynamically
      const details = cardDetails[cardId];

      if (details) {
          detailsDiv.innerHTML = `
              <div class="address">
                  <p><b>Address:</b></p>
                  <p>${details.address}</p>
              </div>
              <div class="services">
                  <h3>Services</h3>
                  <ul>
                      ${details.services.map(service => `<li><i class="fas fa-check-circle"></i> ${service}</li>`).join('')}
                  </ul>
              </div>
          `;
          detailsDiv.classList.remove('hidden');
      } else {
          detailsDiv.innerHTML = `<p>Details not available.</p>`;
          detailsDiv.classList.remove('hidden');
      }
  }
}
